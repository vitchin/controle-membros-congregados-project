import { Footer } from "../components/footer";
import { TabelaPessoas } from "../components/table";
import { Title } from "../components/titulo";

export default function Table() {
    return (
        <section className="relative bg-gray-50 min-h-screen flex flex-col items-center align justify-center">
            <Title />
            <TabelaPessoas />
            <Footer />
        </section>
    )
}