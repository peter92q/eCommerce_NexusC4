import React, { SetStateAction } from "react";
import { Product } from "../Data/Types/Product";

const sortParams = ["", "A-Z", "Z-A", "Price High - Low", "Price Low - High"];

export default function Sort({
  currentProducts,
  productsToDisplay,
  setProductsToDisplay,
}: {
  currentProducts: Product[] | null;
  productsToDisplay: Product[] | null;
  setProductsToDisplay: React.Dispatch<SetStateAction<Product[] | null>>;
}) {
  function handleSort(opt: string) {
    if (opt === "") {
      //when I revert sort changes, I fetch data from the makesift database(currentProducts)
      //reverted changes need to respect how many products the user had already loaded
      setProductsToDisplay(
        [...currentProducts!].slice(0, productsToDisplay?.length)
      );
    } else if (opt === "A-Z") {
      const newList = [...productsToDisplay!].sort((a, b) =>
        a.name.localeCompare(b.name)
      );
      setProductsToDisplay(newList);
    } else if (opt === "Z-A") {
      const newList = [...productsToDisplay!].sort((a, b) =>
        b.name.localeCompare(a.name)
      );
      setProductsToDisplay(newList);
    } else if (opt === "Price High - Low") {
      const newList = [...productsToDisplay!].sort((a, b) => b.price - a.price);
      setProductsToDisplay(newList);
    } else if (opt === "Price Low - High") {
      const newList = [...productsToDisplay!].sort((a, b) => a.price - b.price);
      setProductsToDisplay(newList);
    }
  }

  return (
    <div className="flex flex-col xl:flex-row responsive-text">
      <p className="xl:mr-4">Sort:</p>
      <select className="w-full" onChange={(e) => handleSort(e.target.value)}>
        {sortParams.map((opt, index) => (
          <option key={index} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </div>
  );
}
