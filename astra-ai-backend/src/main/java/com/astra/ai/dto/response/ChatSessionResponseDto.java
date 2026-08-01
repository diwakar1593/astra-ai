package com.astra.ai.dto.response;

import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ChatSessionResponseDto {

    private Long sessionId;

    private String title;

    private LocalDateTime updatedAt;

}