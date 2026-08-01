package com.astra.ai.security;

import com.astra.ai.entity.User;
import com.astra.ai.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

@Service("userAuthorizationService")
@RequiredArgsConstructor
public class UserAuthorizationService {

    private final UserRepository userRepository;

    public boolean isOwner(Long userId, Authentication authentication) {

        String email = authentication.getName();

        User loggedInUser = userRepository.findByEmail(email)
                .orElse(null);

        if (loggedInUser == null) {
            return false;
        }

        return loggedInUser.getId().equals(userId);
    }
}