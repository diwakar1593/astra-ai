import api from "../api/api";

import type { LoginRequest, LoginResponse } from "../types/auth";

class AuthService {

    async login(
        request: LoginRequest
    ): Promise<LoginResponse> {

        const response =
            await api.post<LoginResponse>(
                "/auth/login",
                request
            );

        return response.data;

    }

}

export default new AuthService();