import { useEffect } from "react";

import ChatService from "../../services/ChatService";

export default function DashboardPage() {

    useEffect(() => {

        ChatService.getSessions()

            .then(console.log)

            .catch(console.error);

    }, []);

    return (

        <h2>Dashboard</h2>

    );

}