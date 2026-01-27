import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Services } from "@/components/Services";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen w-full bg-transparent flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <Hero />
        <Services />
      </main>
      <Footer />
    </div>
  );
}
