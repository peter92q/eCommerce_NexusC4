import { useEffect, useState } from "react";
import { Product } from "../Data/Types/Product";
import Filter from "./Filter";
import Sort from "./Sort";
import ProductCard from "./ProductCard";
import { drip2 } from "../assets";
import Close from "../assets/Icons/Close";
import { MainGridProps } from "../Data/Types/MainGrid";

export default function MainGrid({
  mobileMenu,
  setMobileMenu,
  totalCount,
  productsToDisplay,
  selectedCategory,
  currentProducts,
  setCurrentProducts,
  setProductsToDisplay,
}: MainGridProps) {
  
  const [skip, setSkip] = useState<number>(8);
  const [brandFilter, setBrandFilter] = useState<string>("");
  const [colorFilter, setColorFilter] = useState<string>("");
  const [typeFilter, setTypeFilter] = useState<string>("");

  const [description, setDescription] = useState<string>("");

  function loadMoreItems() {
    const newSetOfItems = currentProducts?.slice(skip, skip + 8);
    setSkip(skip + 8);
    const newResults = [...productsToDisplay!, ...newSetOfItems!];
    setProductsToDisplay(newResults as Product[]);
  }

  useEffect(() => {
    if (selectedCategory === "Shirts") {
      setSkip(8);
      setDescription("Finest quality shirts from top tier brands.");
    } else if (selectedCategory === "Jackets") {
      setSkip(8);
      setDescription("Perfectly balanced ratio of warmth and style.");
    }
    else if (selectedCategory === "Pants") {
      setSkip(8);
      setDescription("Comfortable designs for all ocassions.");
    }
    
  }, [selectedCategory]);

  //↓ if we've fetched all the products, the skip value will reset ↓
  useEffect(() => {
    if (
      currentProducts &&
      productsToDisplay &&
      currentProducts.length === productsToDisplay.length
    ) {
      setSkip(8);
    }
  }, [currentProducts, productsToDisplay]);

  return (
    <div className="w-full min-h-[90vh] flex flex-row mt-2">
      <section className="w-[20%] h-full rounded-sm border-[1px] border-black/30 hidden sm:block">
        <Filter
          setMobileMenu={setMobileMenu}
          setProductsToDisplay={setProductsToDisplay}
          brandFilter={brandFilter}
          setBrandFilter={setBrandFilter}
          colorFilter={colorFilter}
          setColorFilter={setColorFilter}
          typeFilter={typeFilter}
          setTypeFilter={setTypeFilter}
          selectedCategory={selectedCategory}
          setCurrentProducts={setCurrentProducts}
        />
      </section>

      {/*↓mobile menu↓*/}
      <div
        style={{ transition: "left 0.3s ease" }}
        className={`${
          mobileMenu ? "left-0" : "left-[-1500px]"
        } absolute z-50 top-0 sm:hidden right-0 h-full w-full bg-[rgba(0,0,0,0.8)]`}
      >
        <div className="bg-[#e4e2dd] sticky top-0">
          <div
            className="w-full flex justify-between px-4 py-2"
          >
           <img className="h-[35px]" src={drip2}/> 
           <div
           className="cursor-pointer"
           onClick={() => setMobileMenu(false)}
           >
            <Close/>
           </div>
          </div>
          <div className="font-light text-[23px] w-full flex justify-center">{selectedCategory}</div>
          <div
            className="p-[20px]">
            <Filter
              setMobileMenu={setMobileMenu}
              setProductsToDisplay={setProductsToDisplay}
              brandFilter={brandFilter}
              setBrandFilter={setBrandFilter}
              colorFilter={colorFilter}
              setColorFilter={setColorFilter}
              typeFilter={typeFilter}
              setTypeFilter={setTypeFilter}
              selectedCategory={selectedCategory}
              setCurrentProducts={setCurrentProducts}
            />
          </div>
          <div className="w-full flex flex-flex justify-center items-center space-x-2">
            <div 
             onClick={()=>setMobileMenu(false)} 
              className="bg-black/80 hover:opacity-80 cursor-pointer rounded-md px-2 
              text-[20px] mb-2 py-1 text-white">View
            ({productsToDisplay?.length} of {productsToDisplay?.length})
            </div>
          </div>
        </div>
      </div>
      {/*mobile menu end*/}

      <div className="sm:w-[80%] w-full flex flex-col px-2">
        <div className="flex flex-row justify-between gap-1 mb-1">
          <section className="py-1 px-2 w-[70%] responsive-text font-medium">
            Category: {selectedCategory}
            <p className="font-light responsive-text2">{description}</p>
          </section>
          <section className="py-1 px-2 w-[30%]">
            <Sort
              currentProducts={currentProducts}
              productsToDisplay={productsToDisplay}
              setProductsToDisplay={setProductsToDisplay}
            />
          </section>
        </div>
        {/*↓products grid↓*/}
        <section
          className="
                image-grid"
        >
          {productsToDisplay?.map((item, index) => (
            <ProductCard item={item} key={index} />
          ))}
          {totalCount === 0 ||
            (productsToDisplay?.length === 0 && (
              <div className="w-full h-[70vh] flex justify-center items-center text-[25px]">
                No matches for this search.
              </div>
            ))}
        </section>
        {/*↓products count and load more button↓*/}
        <section className="w-full flex justify-between text-[10px] md:text-[15px] mt-2">
          <div className="w-[30%]">
            {currentProducts &&
            productsToDisplay &&
            currentProducts.length > productsToDisplay.length ? (
              <div>
                {productsToDisplay?.length} of {totalCount} products
              </div>
            ) : (
              <div>
                {productsToDisplay?.length} of {productsToDisplay?.length}{" "}
                products
              </div>
            )}
          </div>
          <div className="w-[40%] flex justify-center">
            <div>
              {productsToDisplay?.length !== currentProducts?.length ? (
                <p
                  onClick={loadMoreItems}
                  className="px-3 py-1 bg-black text-white mt-1 hover:opacity-80
              rounded-md cursor-pointer responsive-text"
                >
                  Load more
                </p>
              ) : (
                <div />
              )}
            </div>
          </div>
          <div className="w-[30%]" />
        </section>
      </div>
    </div>
  );
}
