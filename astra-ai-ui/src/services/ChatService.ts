import api from "../api/api";
import type { ApiResponse } from "../types/api";

import type {

    ChatRequest,

    ChatResponse,

    ChatSession,

    ChatMessage

} from "../types/chat";

class ChatService {

    async sendMessage(
        request: ChatRequest
    ): Promise<ChatResponse["data"]> {

        const response =
            await api.post<ApiResponse<ChatResponse["data"]>>(
                "/chat",
                request
            );

        return response.data.data;

    }
    
    async getSessions(): Promise<ChatSession[]> {

        const response =
            await api.get<ApiResponse<ChatSession[]>>(
                "/chat/sessions"
            );

        return response.data.data;

    }

    async getHistory(
        sessionId: number
    ): Promise<ChatMessage[]> {

        const response =
            await api.get<ApiResponse<ChatMessage[]>>(
                `/chat/${sessionId}`
            );

        return response.data.data;

    }

    async deleteSession(

        sessionId: number

    ): Promise<void> {

        await api.delete(

            `/chat/${sessionId}`

        );

    }

    async renameSession(

        sessionId: number,

        title: string

    ): Promise<void> {

        await api.put(

            `/chat/${sessionId}`,

            {

                title

            }

        );

    }

}

export default new ChatService();