package com.astra.ai.service.impl;

import com.astra.ai.ai.ConversationBuilder;
import com.astra.ai.ai.ConversationContext;
import com.astra.ai.config.AIProperties;
import com.astra.ai.dto.request.ChatRequestDto;
import com.astra.ai.dto.request.RenameSessionRequestDto;
import com.astra.ai.dto.response.ChatMessageResponseDto;
import com.astra.ai.dto.response.ChatResponseDto;
import com.astra.ai.dto.response.ChatSessionResponseDto;
import com.astra.ai.entity.ChatMessage;
import com.astra.ai.entity.ChatSession;
import com.astra.ai.entity.User;
import com.astra.ai.enums.MessageRole;
import com.astra.ai.exception.ResourceNotFoundException;
import com.astra.ai.mapper.ChatMapper;
import com.astra.ai.provider.AIProvider;
import com.astra.ai.provider.ProviderType;
import com.astra.ai.provider.factory.AIProviderFactory;
import com.astra.ai.repository.ChatMessageRepository;
import com.astra.ai.repository.ChatSessionRepository;
import com.astra.ai.repository.UserRepository;
import com.astra.ai.service.ChatService;
import org.springframework.transaction.annotation.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import lombok.extern.slf4j.Slf4j;
import reactor.core.publisher.Flux;

import java.time.LocalDateTime;
import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional
public class ChatServiceImpl implements ChatService {

    private final ChatSessionRepository chatSessionRepository;
    private final ChatMessageRepository chatMessageRepository;
    private final UserRepository userRepository;
    private final AIProperties aiProperties;
    private final AIProviderFactory providerFactory;
    private final ChatMapper chatMapper;
    private final ConversationBuilder conversationBuilder;

    private User getCurrentUser() {

        Authentication authentication =
                SecurityContextHolder.getContext().getAuthentication();

        String email = authentication.getName();

        return userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new ResourceNotFoundException("User not found"));

    }

    private String generateTitle(String prompt) {

        String cleaned = prompt.trim();

        if (cleaned.length() <= 40) {
            return cleaned;
        }

        return cleaned.substring(0, 40) + "...";
    }

    private ChatSession getOrCreateSession(ChatRequestDto request,
                                           User user) {

        if (request.getSessionId() == null) {

            ChatSession session =
                    ChatSession.builder()
                            .title(generateTitle(request.getMessage()))
                            .user(user)
                            .build();

            return chatSessionRepository.save(session);
        }

        return chatSessionRepository
                .findByIdAndUserId(
                        request.getSessionId(),
                        user.getId())
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Chat session not found"));

    }

    private void saveUserMessage(ChatSession session,
                                 String prompt) {

        ChatMessage message =
                ChatMessage.builder()
                        .chatSession(session)
                        .role(MessageRole.USER)
                        .message(prompt)
                        .build();

        chatMessageRepository.save(message);

    }

    private void saveAssistantMessage(ChatSession session,
                                      String response) {

        ChatMessage message =
                ChatMessage.builder()
                        .chatSession(session)
                        .role(MessageRole.ASSISTANT)
                        .message(response)
                        .build();

        chatMessageRepository.save(message);

    }

    private List<ChatMessage> loadConversation(ChatSession session) {

        log.info("Loading conversation for session: {}", session.getId());

        List<ChatMessage> conversation =
                chatMessageRepository
                        .findByChatSessionIdOrderByCreatedAtAsc(
                                session.getId());

        log.info("Loaded {} messages from database.",
                conversation.size());

        return conversation;

    }

    @Override
    public ChatResponseDto sendMessage(ChatRequestDto request) {

        User user = getCurrentUser();

        log.info("User {} sent a message", user.getEmail());

        ChatSession session =
                getOrCreateSession(request, user);

        log.info("Session ID: {}", session.getId());

        saveUserMessage(
                session,
                request.getMessage());

        List<ChatMessage> conversation =
                loadConversation(session);

        ConversationContext conversationContext =
                conversationBuilder
                        .buildConversation(conversation);

        log.info("Conversation Context:\n{}",
                conversationContext);

        AIProvider provider =
                providerFactory.getProvider(
                        aiProperties.getProvider());

        log.info("Using AI Provider: {}", provider.getProviderType());

        String aiResponse =
                provider.generateResponse(
                        session,
                        conversationContext);

        saveAssistantMessage(
                session,
                aiResponse);

        session.setUpdatedAt(LocalDateTime.now());

        chatSessionRepository.save(session);

        return ChatResponseDto.builder()
                .sessionId(session.getId())
                .title(session.getTitle())
                .response(aiResponse)
                .build();

    }

    @Override
    public Flux<String> streamMessage(ChatRequestDto request) {

        User user = getCurrentUser();

        log.info("User {} started streaming.",
                user.getEmail());

        ChatSession session =
                getOrCreateSession(request, user);

        saveUserMessage(
                session,
                request.getMessage());

        List<ChatMessage> history =
                loadConversation(session);

        ConversationContext context =
                conversationBuilder.buildConversation(history);

        AIProvider provider =
                providerFactory.getProvider(
                        aiProperties.getProvider());

        StringBuilder assistantResponse =
                new StringBuilder();

        return provider
                .streamResponse(session, context)

                .doOnNext(assistantResponse::append)

                .doFinally(signalType -> {

                    if (!assistantResponse.isEmpty()) {

                        saveAssistantMessage(
                                session,
                                assistantResponse.toString());

                        session.setUpdatedAt(LocalDateTime.now());

                        chatSessionRepository.save(session);

                        log.info("Streaming finished with signal: {}", signalType);

                    }

                });

    }

    @Override
    @Transactional(readOnly = true)
    public List<ChatSessionResponseDto> getSessions() {

        User user = getCurrentUser();

        return chatSessionRepository
                .findByUserIdOrderByUpdatedAtDesc(user.getId())
                .stream()
                .map(chatMapper::toSessionDto)
                .toList();

    }

    @Override
    @Transactional(readOnly = true)
    public List<ChatMessageResponseDto> getChatHistory(Long sessionId) {

        User user = getCurrentUser();

        chatSessionRepository
                .findByIdAndUserId(sessionId,
                        user.getId())
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Chat session not found"));

        return chatMessageRepository
                .findByChatSessionIdOrderByCreatedAtAsc(sessionId)
                .stream()
                .map(chatMapper::toMessageDto)
                .toList();

    }

    @Override
    public void deleteSession(Long sessionId) {

        User user = getCurrentUser();

        ChatSession session =
                chatSessionRepository
                        .findByIdAndUserId(
                                sessionId,
                                user.getId())
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "Chat session not found"));

        chatSessionRepository.delete(session);

    }

    @Override
    public void renameSession(Long sessionId,
                              RenameSessionRequestDto request) {

        User user = getCurrentUser();

        ChatSession session =
                chatSessionRepository
                        .findByIdAndUserId(
                                sessionId,
                                user.getId())
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "Chat session not found"));

        session.setTitle(request.getTitle());

    }

}
