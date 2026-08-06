import {
    createContext,
    useContext,
    useEffect,
    useMemo,
    useState
} from "react";

interface AuthContextType {

    token: string | null;

    isAuthenticated: boolean;

    login: (token: string) => void;

    logout: () => void;

}

export const AuthContext = createContext<AuthContextType | null>(null);

interface AuthProviderProps {

    children: React.ReactNode;

}

export function AuthProvider({

    children

}: AuthProviderProps) {

    const [

        token,

        setToken

    ] = useState<string | null>(null);

    useEffect(() => {

        const savedToken =

            localStorage.getItem("token");

        if (savedToken) {

            setToken(savedToken);

        }

    }, []);

    function login(

        jwt: string

    ) {

        localStorage.setItem(

            "token",

            jwt

        );

        setToken(jwt);

    }

    function logout() {

        localStorage.removeItem("token");

        localStorage.removeItem("email");

        setToken(null);

    }

    const value = useMemo(

        () => ({

            token,

            isAuthenticated: token !== null,

            login,

            logout

        }),

        [token]

    );

    return (

        <AuthContext.Provider

            value={value}

        >

            {children}

        </AuthContext.Provider>

    );

}

export function useAuth() {

    const context =

        useContext(AuthContext);

    if (!context) {

        throw new Error(

            "useAuth must be used within AuthProvider"

        );

    }

    return context;

}