export function getEmail(): string {

    return localStorage.getItem("email") ?? "";

}

export function getToken(): string {

    return localStorage.getItem("token") ?? "";

}

export function logout(): void {

    localStorage.removeItem("token");

    localStorage.removeItem("email");

}

export function getDisplayName(): string {

    const email = getEmail();

    if (!email) {

        return "User";

    }

    return email.split("@")[0];

}