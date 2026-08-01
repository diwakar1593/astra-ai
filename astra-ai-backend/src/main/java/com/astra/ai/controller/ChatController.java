package com.astra.ai.controller;

import com.astra.ai.common.ApiResponse;
import com.astra.ai.dto.request.ChatRequestDto;
import com.astra.ai.dto.request.RenameSessionRequestDto;
import com.astra.ai.dto.response.ChatMessageResponseDto;
import com.astra.ai.dto.response.ChatResponseDto;
import com.astra.ai.dto.response.ChatSessionResponseDto;
import com.astra.ai.service.ChatService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Flux;

import java.util.List;

@RestController
@RequestMapping("/api/v1/chat")
@RequiredArgsConstructor
@PreAuthorize("hasRole('USER')")
public class ChatController {

    private final ChatService chatService;

    @PostMapping
    public ResponseEntity<ApiResponse<ChatResponseDto>> sendMessage(
            @Valid @RequestBody ChatRequestDto request) {

        ChatResponseDto response = chatService.sendMessage(request);

        return ResponseEntity.ok(
                new ApiResponse<>(
                        true,
                        "Message processed successfully",
                        response
                )
        );
    }

    @GetMapping("/sessions")
    public ResponseEntity<ApiResponse<List<ChatSessionResponseDto>>> getSessions() {

        List<ChatSessionResponseDto> sessions =
                chatService.getSessions();

        return ResponseEntity.ok(
                new ApiResponse<>(
                        true,
                        "Sessions fetched successfully",
                        sessions
                )
        );
    }

    @GetMapping("/{sessionId}")
    public ResponseEntity<ApiResponse<List<ChatMessageResponseDto>>> getChatHistory(
            @PathVariable Long sessionId) {

        List<ChatMessageResponseDto> history =
                chatService.getChatHistory(sessionId);

        return ResponseEntity.ok(
                new ApiResponse<>(
                        true,
                        "Chat history fetched successfully",
                        history
                )
        );
    }

    @PatchMapping("/{sessionId}/title")
    public ResponseEntity<ApiResponse<Void>> renameSession(
            @PathVariable Long sessionId,
            @Valid @RequestBody RenameSessionRequestDto request) {

        chatService.renameSession(sessionId, request);

        return ResponseEntity.ok(
                new ApiResponse<>(
                        true,
                        "Session renamed successfully",
                        null
                )
        );
    }

    @DeleteMapping("/{sessionId}")
    public ResponseEntity<ApiResponse<Void>> deleteSession(
            @PathVariable Long sessionId) {

        chatService.deleteSession(sessionId);

        return ResponseEntity.ok(
                new ApiResponse<>(
                        true,
                        "Session deleted successfully",
                        null
                )
        );
    }

    @PostMapping(
            value = "/stream",
            produces = MediaType.TEXT_EVENT_STREAM_VALUE
    )
    public Flux<String> streamChat(

            @Valid
            @RequestBody ChatRequestDto request

    ) {

        return chatService.streamMessage(request);

    }
}