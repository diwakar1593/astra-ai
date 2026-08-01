package com.astra.ai.dto.request;

import jakarta.validation.constraints.NotBlank;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ChatRequestDto {

    private Long sessionId;

    @NotBlank(message = "Message cannot be empty")
    private String message;

}