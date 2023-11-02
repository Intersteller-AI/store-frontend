import Featuring from "@/components/Featuring/Featuring";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Products from "@/components/Products";
import Hero from "@/components/Hero";

const page = () => {
  return (
    <div>
      <Navbar />
      <Hero />
      <Featuring />
      <Products />
      <Footer />
    </div>
  );
};

export default page;
