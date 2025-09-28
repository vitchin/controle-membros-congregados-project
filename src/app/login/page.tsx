"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Title } from "../components/titulo";
import { Login } from "../components/login";
import { Footer } from "../components/footer";

export default function LoginPage() {
  const router = useRouter();

  useEffect(() => {
    document.title = "IEBI Membresia | Login";
    const loggedIn = localStorage.getItem("isLoggedIn");
    if (loggedIn) {
      router.push("/table");
    }
  }, [router]);

  return (
    <main>
      <Title />
      <Login />
      <Footer />
    </main>
  );
}
