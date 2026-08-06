import api from "../api/api";
import type { ApiResponse } from "../types/api";
import type {
    LoginRequest,
    LoginResponse
} from "../types/auth";

class AuthService {

    async login(
        request: LoginRequest
    ): Promise<LoginResponse> {

        const response =
            await api.post<ApiResponse<LoginResponse>>(
                "/auth/login",
                request
            );

        return response.data.data;

    }

}

export default new AuthService();