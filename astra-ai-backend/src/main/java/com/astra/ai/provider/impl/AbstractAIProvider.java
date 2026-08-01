package com.astra.ai.provider.impl;

import com.astra.ai.ai.ConversationContext;
import com.astra.ai.entity.ChatSession;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.ai.chat.client.ChatClient;
import org.springframework.ai.chat.messages.Message;

@Slf4j
@RequiredArgsConstructor
public abstract class AbstractAIProvider {

    protected final ChatClient chatClient;

    protected String chat(ChatSession session,
                          ConversationContext context,
                          String providerName) {

        log.info("Calling {} for session {}",
                providerName,
                session.getId());

        try {

            ChatClient.ChatClientRequestSpec request =
                    chatClient.prompt();

            for (Message message : context.messages()) {
                request.messages(message);
            }

            String response = request
                    .call()
                    .content();

            log.info("{} response generated successfully.",
                    providerName);

            return response;

        } catch (Exception ex) {

            log.error("Error while calling {}",
                    providerName,
                    ex);

            throw new RuntimeException(
                    "Failed to get response from "
                            + providerName,
                    ex);

        }

    }

}