package com.astra.ai.provider;

import com.astra.ai.ai.ConversationContext;
import com.astra.ai.entity.ChatSession;
import reactor.core.publisher.Flux;

public interface AIProvider {

    ProviderType getProviderType();

    /**
     * Traditional request-response API
     */
    String generateResponse(ChatSession session,
                            ConversationContext context);

    /**
     * Streaming API
     */
    Flux<String> streamResponse(ChatSession session,
                                ConversationContext context);

}