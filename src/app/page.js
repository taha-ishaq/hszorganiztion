import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Products from "@/components/Products";
import Contact from "@/components/Contact";
import FloatingButtons from "@/components/FloatingButtons";
import Footer from "@/components/Footer";
import FaqsPage from "@/components/Faqs";
import TestimonialsPage from "@/components/Customers";
import MissionPage from "@/components/MissionPage";

export default function Home() {
  return (
    <main className="overflow-x-hidden">
      <Navbar />
      <Hero />
      <About />
      <Products />
      <FaqsPage/>
      <TestimonialsPage/>
      <MissionPage/>
      <Contact />
      <FloatingButtons />
      <Footer/>
    </main>
  );
}
