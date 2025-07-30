import Image from "next/image";
import { Title } from "../components/titulo";
import { Register } from "../components/register";
import { Footer } from "../components/footer";

export default function RegisterPage() {
  return (
    <section className="relative bg-gray-50 min-h-screen flex flex-col items-center align justify-center">
      <Title />
      <Register />
      <Footer />
    </section>
  )
}