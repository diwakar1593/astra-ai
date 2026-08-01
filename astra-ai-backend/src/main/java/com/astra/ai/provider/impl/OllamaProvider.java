package com.astra.ai.provider.impl;

import com.astra.ai.ai.ConversationContext;
import com.astra.ai.entity.ChatSession;
import com.astra.ai.provider.AIProvider;
import com.astra.ai.provider.ProviderType;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.ai.chat.client.ChatClient;
import org.springframework.stereotype.Component;
import reactor.core.publisher.Flux;

@Slf4j
@Component
public class OllamaProvider
        extends AbstractAIProvider
        implements AIProvider {

    public OllamaProvider(ChatClient chatClient) {
        super(chatClient);
    }

    @Override
    public ProviderType getProviderType() {
        return ProviderType.OLLAMA;
    }

    @Override
    public String generateResponse(ChatSession session,
                                   ConversationContext context) {

        return chat(session,
                context,
                "Ollama");

    }

    @Override
    public Flux<String> streamResponse(ChatSession session,
                                       ConversationContext context) {

        log.info("Streaming response from Ollama for session {}",
                session.getId());

        try {

            ChatClient.ChatClientRequestSpec request =
                    chatClient.prompt();

            context.messages().forEach(request::messages);

            return request
                    .stream()
                    .content()
                    .doOnSubscribe(subscription ->
                            log.info("Started Ollama stream"))
                    .doOnComplete(() ->
                            log.info("Completed Ollama stream"))
                    .doOnError(error ->
                            log.error("Streaming error", error));

        } catch (Exception ex) {

            log.error("Failed to start Ollama stream", ex);

            return Flux.error(
                    new RuntimeException(
                            "Failed to stream response from Ollama.",
                            ex));

        }

    }

}