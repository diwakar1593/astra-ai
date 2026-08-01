package com.astra.ai.dto.request;

import jakarta.validation.constraints.NotBlank;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class RenameSessionRequestDto {

    @NotBlank(message = "Title cannot be empty")
    private String title;

}