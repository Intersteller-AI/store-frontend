import Featuring from "@/components/Featuring/Featuring";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Products from "@/components/Products/Products";
import Pagination from "@/components/pagination/Pagination";
import Hero from "@/components/Hero";

const page = () => {
  return (
    <div>
      <Navbar />
      <Hero />
      <Featuring />
      <div>
        <Products />
      </div>
      <Pagination />
      <Footer />
    </div>
  );
};

export default page;
