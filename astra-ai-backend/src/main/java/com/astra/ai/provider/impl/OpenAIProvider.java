package com.astra.ai.provider.impl;

import com.astra.ai.ai.ConversationContext;
import com.astra.ai.entity.ChatSession;
import com.astra.ai.provider.AIProvider;
import com.astra.ai.provider.ProviderType;
import lombok.extern.slf4j.Slf4j;
import org.springframework.ai.chat.client.ChatClient;
import org.springframework.stereotype.Component;
import reactor.core.publisher.Flux;

@Slf4j
@Component
public class OpenAIProvider
        extends AbstractAIProvider
        implements AIProvider {

    public OpenAIProvider(ChatClient chatClient) {
        super(chatClient);
    }

    @Override
    public ProviderType getProviderType() {
        return ProviderType.OPENAI;
    }

    @Override
    public String generateResponse(ChatSession session,
                                   ConversationContext context) {

        return chat(session,
                context,
                "OpenAI");

    }

    @Override
    public Flux<String> streamResponse(ChatSession session,
                                       ConversationContext context) {

        throw new UnsupportedOperationException(
                "Streaming is not implemented yet.");

    }

}