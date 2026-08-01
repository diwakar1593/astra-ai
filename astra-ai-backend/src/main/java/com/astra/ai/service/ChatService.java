package com.astra.ai.service;

import com.astra.ai.dto.request.ChatRequestDto;
import com.astra.ai.dto.request.RenameSessionRequestDto;
import com.astra.ai.dto.response.ChatMessageResponseDto;
import com.astra.ai.dto.response.ChatResponseDto;
import com.astra.ai.dto.response.ChatSessionResponseDto;
import reactor.core.publisher.Flux;

import java.util.List;

public interface ChatService {

    ChatResponseDto sendMessage(ChatRequestDto request);

    Flux<String> streamMessage(ChatRequestDto request);

    List<ChatSessionResponseDto> getSessions();

    List<ChatMessageResponseDto> getChatHistory(Long sessionId);

    void deleteSession(Long sessionId);

    void renameSession(Long sessionId,
                       RenameSessionRequestDto request);
}