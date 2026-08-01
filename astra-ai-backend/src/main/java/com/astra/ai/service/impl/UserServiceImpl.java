package com.astra.ai.service.impl;

import com.astra.ai.dto.request.RoleUpdateRequest;
import com.astra.ai.dto.request.UserRequestDto;
import com.astra.ai.dto.response.UserResponseDto;
import com.astra.ai.entity.User;
import com.astra.ai.enums.Role;
import com.astra.ai.exception.DuplicateResourceException;
import com.astra.ai.exception.ResourceNotFoundException;
import com.astra.ai.mapper.UserMapper;
import com.astra.ai.repository.UserRepository;
import com.astra.ai.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final UserMapper userMapper;

    @Override
    public UserResponseDto saveUser(UserRequestDto request) {

        if (userRepository.existsByEmail(request.getEmail())) {
            throw new DuplicateResourceException("Email already exists.");
        }

        User user = userMapper.toEntity(request);

        User savedUser = userRepository.save(user);

        return userMapper.toResponse(savedUser);
    }

    @Override
    public UserResponseDto updateUser(Long id, UserRequestDto request) {

        User user = userRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException("User not found"));

        if (!user.getEmail().equals(request.getEmail())
                && userRepository.existsByEmail(request.getEmail())) {

            throw new DuplicateResourceException("Email already exists.");
        }

        user.setFirstName(request.getFirstName());
        user.setLastName(request.getLastName());
        user.setEmail(request.getEmail());

        User updatedUser = userRepository.save(user);

        return userMapper.toResponse(updatedUser);
    }

    @Override
    public List<UserResponseDto> getAllUsers() {

        return userRepository.findAll()
                .stream()
                .map(userMapper::toResponse)
                .toList();
    }

    @Override
    public UserResponseDto getUserById(Long id) {

        User user = userRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException("User not found"));

        return userMapper.toResponse(user);
    }

    @Override
    public UserResponseDto getByEmail(String email) {

        User user = userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new ResourceNotFoundException("User not found"));

        return userMapper.toResponse(user);
    }

    @Override
    public void deleteUser(Long id) {

        Authentication authentication =
                SecurityContextHolder.getContext().getAuthentication();

        User loggedInUser = userRepository.findByEmail(authentication.getName())
                .orElseThrow(() ->
                        new ResourceNotFoundException("Logged in user not found"));

        // Prevent self deletion
        if (loggedInUser.getId().equals(id)) {
            throw new IllegalArgumentException("You cannot delete your own account.");
        }

        User user = userRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException("User not found"));

        // Prevent deleting the last admin
        if (user.getRole() == Role.ROLE_ADMIN) {

            long adminCount = userRepository.countByRole(Role.ROLE_ADMIN);

            if (adminCount == 1) {
                throw new IllegalStateException(
                        "Cannot delete the last administrator."
                );
            }
        }

        userRepository.delete(user);
    }

    @Override
    public UserResponseDto updateUserRole(
            Long id,
            RoleUpdateRequest request,
            Authentication authentication) {

        User loggedInUser = userRepository.findByEmail(authentication.getName())
                .orElseThrow(() ->
                        new ResourceNotFoundException("Logged in user not found"));

        // Prevent admin from changing their own role
        if (loggedInUser.getId().equals(id)) {
            throw new IllegalArgumentException(
                    "You cannot change your own role."
            );
        }

        User user = userRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException("User not found"));

        // Prevent removing the last admin role
        if (user.getRole() == Role.ROLE_ADMIN
                && request.getRole() != Role.ROLE_ADMIN) {

            long adminCount = userRepository.countByRole(Role.ROLE_ADMIN);

            if (adminCount == 1) {
                throw new IllegalStateException(
                        "Cannot remove the role of the last administrator."
                );
            }
        }

        user.setRole(request.getRole());

        User updatedUser = userRepository.save(user);

        return userMapper.toResponse(updatedUser);
    }
}