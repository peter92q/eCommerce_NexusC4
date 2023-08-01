import { useEffect, useState } from "react";
import { Product } from "../Data/Types/Product";
import { products } from "../Data/Products";
import FilterCard from "./FilterCard";
import { FilterMenuTypes } from "../Data/Types/Filter";

export default function Filter({
  brandFilter,
  setBrandFilter,
  colorFilter,
  setColorFilter,
  typeFilter,
  setTypeFilter,
  selectedCategory,
  setCurrentProducts,
  setMobileMenu,
  setProductsToDisplay,
}: FilterMenuTypes) {

  const [fullArray, setFullArray] = useState<Product[] | null>(null);

  //filters to display are determined based on category and not currently loaded products
  const newArray = products.filter(
    (product) => product.category === selectedCategory
  );

  //dynamic filter query
  let brandParams = [...new Set(newArray?.map((product) => product.brand))];
  let colorParams = [...new Set(newArray?.map((product) => product.color))];
  let typeParams = [...new Set(newArray?.map((product)=>product.type))];

  //this state determines which filter menus we open/close
  const [filterMenu, setFilterMenu] = useState<string[]>([]);

  /*filter logic, we can select multiple filter options simultaneously but can't select 
    more than 1 option per filter section, i.e. we can't select 2 colors or 2 brands but
    we can select a color, a brand and a type simultaneously*/
    function addFilter(type: string, value: string) {

    let filtered: Product[];
 
    if (type === "Brands") {
      if (brandFilter.includes(value)) {
        setBrandFilter("");
        filtered = newArray
            .filter((p) =>
            colorFilter ? p.color === colorFilter : true
            )
            .filter((p)=>
            typeFilter ? p.type === typeFilter : true
            );
      } else {
        setBrandFilter(value);
        filtered = newArray
          .filter((p) => (colorFilter ? p.color === colorFilter : true))
          .filter((p) => (typeFilter ? p.type === typeFilter : true))
          .filter((p) => p.brand === value);
      }
    }

    if (type === "Colors") {
      if (colorFilter.includes(value)) {
        setColorFilter("");
        filtered = newArray
        .filter((p) =>
          brandFilter ? p.brand === brandFilter : true
        )
        .filter((p) =>
         typeFilter ? p.type === typeFilter : true
        );
      } else {
        setColorFilter(value);
        filtered = newArray
          .filter((p) => (brandFilter ? p.brand === brandFilter : true))
          .filter((p) => (typeFilter ? p.type === typeFilter : true))
          .filter((p) => p.color === value);
      }
    }
    if (type === "Types") {
        if (typeFilter.includes(value)) {
          setTypeFilter("");
          filtered = newArray
          .filter((p) =>
           brandFilter ? p.brand === brandFilter : true
          )
          .filter((p) =>
           colorFilter ? p.color === colorFilter : true
          );
        } else {
          setTypeFilter(value);
          filtered = newArray
            .filter((p) => (brandFilter ? p.brand === brandFilter : true))
            .filter((p) => (colorFilter ? p.color === colorFilter : true))
            .filter((p) => p.type === value);
        }
      }
    setFullArray(filtered!);
  }

  //if a filter is applied, we update the products
  useEffect(() => {
    setCurrentProducts(fullArray);
  }, [fullArray]);

  //if we change categories, all filters are reset
  useEffect(() => {
    const array = products.filter((p) => p.category === selectedCategory);
    setBrandFilter("");
    setColorFilter("");
    setTypeFilter("");
    setFullArray(array as Product[]);
  }, [selectedCategory]);

  const filters = [
    {name:"Brands",
     params:brandParams,
     filter: brandFilter
    },
    {name:"Colors",
     params:colorParams,
     filter: colorFilter
    },
    {name:"Types",
    params: typeParams,
    filter: typeFilter
  }
  ]

  function reset(){
    setMobileMenu(false); 
    setCurrentProducts(newArray); 
    setProductsToDisplay(newArray.slice(0,8)); 
    setBrandFilter("");
    setColorFilter("");
    setTypeFilter("");
  }

  return (
    <div className="flex flex-col">
      <div className="flex flex-col space-y-1">
        {filters.map((item)=>       
          <FilterCard
            key={item.name}
            name={item.name}
            filterMenu={filterMenu}
            setFilterMenu={setFilterMenu}
            currentParams={item.params}
            currentFilter={item.filter}
            addFilter={addFilter}
          />
        )}
      </div>
      {(colorFilter.length>0 || typeFilter.length>0 || brandFilter.length>0) &&
            <div 
            onClick={()=>{reset()}}
            className="w-full mt-2 hover:opacity-80 cursor-pointer flex justify-center
             items-center bg-black/80 text-white">
        reset</div>
      }
    </div>
  );
}


