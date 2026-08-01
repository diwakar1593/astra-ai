package com.astra.ai.ai;

import org.springframework.ai.chat.messages.Message;

import java.util.List;

public record ConversationContext(

        List<Message> messages

) {
}