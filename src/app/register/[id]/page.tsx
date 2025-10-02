import { Metadata } from "next";
import { Title } from "../../components/titulo";
import { Register } from "../../components/register";
import { Footer } from "../../components/footer";

export const metadata: Metadata = {
  title: "IEBI Membresia | Edição de usuários",
};

export default function RegisterPage() {
  return (
    <main>
      <Title />
      <Register />
      <Footer />
    </main>
  );
}