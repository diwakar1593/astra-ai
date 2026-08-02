export interface ChatRequest {

    sessionId: number | null;

    message: string;

}

export interface ChatResponse {

    sessionId: number;

    title: string;

    response: string;

}

export interface ChatSession {

    sessionId: number;

    title: string;

    updatedAt: string;

}

export interface ChatMessage {

    id: number;

    role: string;

    message: string;

    createdAt: string;

}