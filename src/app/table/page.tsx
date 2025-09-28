"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Footer } from "../components/footer";
import { TabelaPessoas } from "../components/table";
import { Title } from "../components/titulo";

export default function Table() {
    const router = useRouter();

    useEffect(() => {
        document.title = "IEBI Membresia | Tabela de usuários";
        const loggedIn = localStorage.getItem("isLoggedIn");
        if (!loggedIn) {
        router.push("/login");
        }
    }, [router]);

    return (
        <main className="container">
            <Title />
            <TabelaPessoas />
            <Footer />
        </main>
    )
}