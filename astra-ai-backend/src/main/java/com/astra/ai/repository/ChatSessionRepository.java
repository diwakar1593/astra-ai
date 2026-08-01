package com.astra.ai.repository;

import com.astra.ai.entity.ChatSession;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ChatSessionRepository extends JpaRepository<ChatSession, Long> {

    List<ChatSession> findByUserIdOrderByUpdatedAtDesc(Long userId);

    List<ChatSession> findByUserId(Long userId, Pageable pageable);

    Optional<ChatSession> findByIdAndUserId(Long sessionId, Long userId);

}