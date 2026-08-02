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

    ): Promise<ChatResponse> {

        const response =

            await api.post<ApiResponse<ChatResponse>>(
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

        await api.patch(
            `/chat/${sessionId}/title`,
            {
                title
            }
        );

    }

    streamMessage(
        request: ChatRequest,
        onChunk: (chunk: string) => void
    ): Promise<void> {

        return new Promise(async (resolve, reject) => {

            try {

                const token = localStorage.getItem("token");

                const response = await fetch(

                    "http://localhost:8080/api/v1/chat/stream",

                    {

                        method: "POST",

                        headers: {

                            "Content-Type": "application/json",

                            Authorization: `Bearer ${token}`

                        },

                        body: JSON.stringify(request)

                    }

                );

                if (!response.ok) {

                    reject(

                        new Error(
                            `HTTP ${response.status}`
                        )

                    );

                    return;

                }

                if (!response.body) {

                    reject(

                        new Error(
                            "Response body is null."
                        )

                    );

                    return;

                }

                const reader =
                    response.body.getReader();

                const decoder =
                    new TextDecoder();

                while (true) {

                    const {
                        value,
                        done
                    } = await reader.read();

                    if (done) {
                        break;
                    }

                    const chunk = decoder.decode(value);

                    const lines = chunk.split("\n");

                    for (const line of lines) {

                        if (line.startsWith("data:")) {

                            const text = line
                                .replace("data:", "")
                                .trim();

                            if (text.length > 0) {

                                onChunk(text + " ");

                            }

                        }

                    }

                }

                reader.releaseLock();

                resolve();

            } catch (error) {

                reject(error);

            }

        });

    }

}

export default new ChatService();