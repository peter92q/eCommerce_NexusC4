import { useEffect, useState } from "react";
import Footer from "./Components/Footer";
import MainGrid from "./Components/MainGrid";
import Navbar from "./Components/Navbar";
import { Product } from "./Data/Types/Product";
import { products } from "./Data/Products";

function App() {
  const [mobileMenu, setMobileMenu] = useState<boolean>(false);

  //↓ We load Shirts initially ↓
  const [selectedCategory, setSelectedCategory] = useState<string>("Shirts");

  //↓ I'm treating currentProducts as the core database ↓
  const [currentProducts, setCurrentProducts] = useState<Product[] | null>(
    null
  );

  //↓ productsToDisplay represents what the user sees, that is how I achieve pagination ↓
  const [productsToDisplay, setProductsToDisplay] = useState<Product[] | null>(
    null
  );
  
  // ↓ totalCount handles the number of products we're currently showing and how many there are left ↓
  const [totalCount, setTotalCount] = useState<number | null>(
    productsToDisplay && productsToDisplay?.length
  );

  //↓ this effect detects category changes, it overwrites all previous data and loads fresh new category ↓
  useEffect(() => {
    const filteredProducts = products.filter(
      (p) => p.category === selectedCategory
    );
    setTotalCount(filteredProducts.length);
    setCurrentProducts(filteredProducts);
  }, [products, selectedCategory]);

  //↓ this effect handles pagination and sets the products that the end-user sees ↓
  useEffect(() => {
    if (
      currentProducts &&
      currentProducts?.length > 8 &&
      productsToDisplay === null
    ) {
      const slicedList = currentProducts.slice(0, 8);
      setProductsToDisplay(slicedList);
    } else {
      const slicedList = currentProducts?.slice(0, 8);
      setProductsToDisplay(slicedList!);
    }
  }, [currentProducts]);

  return (
    <div className="w-full min-h-full bg-[#e4e2dd] px-5 relative">
      <Navbar
        mobileMenu={mobileMenu}
        setMobileMenu={setMobileMenu}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />
      <MainGrid
        mobileMenu={mobileMenu}
        setMobileMenu={setMobileMenu}
        productsToDisplay={productsToDisplay}
        totalCount={totalCount}
        selectedCategory={selectedCategory}
        currentProducts={currentProducts}
        setCurrentProducts={setCurrentProducts}
        setProductsToDisplay={setProductsToDisplay}
      />
      <Footer />
    </div>
  );
}

export default App;
