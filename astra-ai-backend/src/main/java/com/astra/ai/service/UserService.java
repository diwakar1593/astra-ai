package com.astra.ai.service;

import com.astra.ai.dto.request.RoleUpdateRequest;
import com.astra.ai.dto.request.UserRequestDto;
import com.astra.ai.dto.response.UserResponseDto;
import org.springframework.security.core.Authentication;

import java.util.List;

public interface UserService {

    UserResponseDto saveUser(UserRequestDto request);

    UserResponseDto updateUser(Long id, UserRequestDto request);

    List<UserResponseDto> getAllUsers();

    UserResponseDto getUserById(Long id);

    UserResponseDto getByEmail(String email);

    void deleteUser(Long id);

    UserResponseDto updateUserRole(
            Long id,
            RoleUpdateRequest request,
            Authentication authentication);
}