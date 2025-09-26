"use client";

import { useEffect } from "react";
import { Title } from "../components/titulo";
import { Login } from "../components/login";
import { Footer } from "../components/footer";

export default function LoginPage() {
  useEffect(() => {
    document.title = "IEBI Membresia | Login";
  }, []);

  return (
    <main>
      <Title />
      <Login />
      <Footer />
    </main>
  );
}