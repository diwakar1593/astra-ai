package com.astra.ai.mapper;

import com.astra.ai.dto.response.ChatMessageResponseDto;
import com.astra.ai.dto.response.ChatSessionResponseDto;
import com.astra.ai.entity.ChatMessage;
import com.astra.ai.entity.ChatSession;
import org.springframework.stereotype.Component;

@Component
public class ChatMapper {

    public ChatSessionResponseDto toSessionDto(ChatSession session) {
        return ChatSessionResponseDto.builder()
                .sessionId(session.getId())
                .title(session.getTitle())
                .updatedAt(session.getUpdatedAt())
                .build();
    }

    public ChatMessageResponseDto toMessageDto(ChatMessage message) {
        return ChatMessageResponseDto.builder()
                .role(message.getRole().name())
                .message(message.getMessage())
                .createdAt(message.getCreatedAt())
                .build();
    }
}