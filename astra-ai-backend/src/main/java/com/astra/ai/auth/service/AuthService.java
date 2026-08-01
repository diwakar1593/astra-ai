package com.astra.ai.auth.service;

import com.astra.ai.dto.request.AdminRequest;
import com.astra.ai.dto.request.LoginRequest;
import com.astra.ai.dto.request.RegisterRequest;
import com.astra.ai.dto.response.LoginResponse;
import com.astra.ai.dto.response.RegisterResponse;

public interface AuthService {

    RegisterResponse register(RegisterRequest request);
    LoginResponse login(LoginRequest request);
    RegisterResponse createAdmin(AdminRequest request);

}