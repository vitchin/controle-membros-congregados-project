import { Title } from "../components/titulo";
import { Login } from "../components/login";
import { Footer } from "../components/footer";

export default function LoginPage() {
  return (
    <section className="relative bg-gray-50 min-h-screen flex flex-col items-center align justify-center">
      <Title />
      <Login />
      <Footer />
    </section>
  )
}
