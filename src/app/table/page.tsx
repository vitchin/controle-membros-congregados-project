"use client";

import { useEffect } from "react";
import { Footer } from "../components/footer";
import { TabelaPessoas } from "../components/table";
import { Title } from "../components/titulo";

export default function Table() {
    useEffect(() => {
        document.title = "IEBI Membresia | Tabela de usuários";
    }, []);

    return (
        <main className="container">
            <Title />
            <TabelaPessoas />
            <Footer />
        </main>
    )
}