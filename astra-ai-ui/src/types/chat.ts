export interface ChatRequest {

    sessionId: number | null;

    message: string;

}

export interface ChatResponse {

    success: boolean;

    message: string;

    data: {

        sessionId: number;

        title: string;

        response: string;

    };

}

export interface ChatSession {

    id: number;

    title: string;

    updatedAt: string;

}

export interface ChatMessage {

    id: number;

    role: string;

    message: string;

    createdAt: string;

}