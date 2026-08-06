export function getToken(): string | null {

    return localStorage.getItem("token");

}

export function setToken(token: string): void {

    localStorage.setItem("token", token);

}

export function removeToken(): void {

    localStorage.removeItem("token");

}

export function isAuthenticated(): boolean {

    return getToken() !== null;

}

export function logout(): void {

    localStorage.clear();

}

export function getEmail(): string {

    return localStorage.getItem("email") ?? "";

}

export function getDisplayName(): string {

    const email = getEmail();

    if (!email) {

        return "User";

    }

    return email.split("@")[0];

}