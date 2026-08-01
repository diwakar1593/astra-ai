import { createContext, useState } from "react";
import { StorageUtil } from "../utils/StorageUtil";

type AuthContextType = {

    token: string | null;

    login: (token: string) => void;

    logout: () => void;

};

export const AuthContext =
    createContext<AuthContextType>(null!);

export function AuthProvider({

    children

}: {

    children: React.ReactNode

}) {

    const [token, setToken] =
        useState<string | null>(
            StorageUtil.getToken()
        );

    function login(jwt: string) {

        StorageUtil.setToken(jwt);

        setToken(jwt);

    }

    function logout() {

        StorageUtil.removeToken();

        setToken(null);

    }

    return (

        <AuthContext.Provider
            value={{
                token,
                login,
                logout
            }}
        >

            {children}

        </AuthContext.Provider>

    );

}