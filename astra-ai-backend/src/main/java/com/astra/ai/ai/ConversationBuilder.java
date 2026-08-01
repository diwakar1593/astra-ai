package com.astra.ai.ai;

import com.astra.ai.entity.ChatMessage;
import com.astra.ai.enums.MessageRole;
import org.springframework.ai.chat.messages.AssistantMessage;
import org.springframework.ai.chat.messages.Message;
import org.springframework.ai.chat.messages.SystemMessage;
import org.springframework.ai.chat.messages.UserMessage;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class ConversationBuilder {

    private static final int MAX_MESSAGES = 20;

    public ConversationContext buildConversation(
            List<ChatMessage> history) {

        List<Message> messages =
                new ArrayList<>();

        messages.add(new SystemMessage("""
                You are Astra AI.

                You are an expert Java,
                Spring Boot,
                PostgreSQL,
                AI,
                and Software Architecture mentor.

                Always answer professionally.
                """));

        int start =
                Math.max(0,
                        history.size() - MAX_MESSAGES);

        for (int i = start; i < history.size(); i++) {

            ChatMessage message =
                    history.get(i);

            if (message.getRole() == MessageRole.USER) {

                messages.add(
                        new UserMessage(
                                message.getMessage()));

            } else {

                messages.add(
                        new AssistantMessage(
                                message.getMessage()));

            }

        }

        return new ConversationContext(messages);

    }

}