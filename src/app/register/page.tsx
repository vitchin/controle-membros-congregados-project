import Image from "next/image";
import { Title } from "../components/titulo";
import { Register } from "../components/register";
import { Footer } from "../components/footer";

export default function RegisterPage() {
  return (
    <main>
      <Title />
      <Register />
      <Footer />
    </main>
  )
}