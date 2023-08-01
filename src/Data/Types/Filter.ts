import { SetStateAction } from "react";
import { Product } from "./Product";

export interface FilterMenuTypes {
    brandFilter:string;
    setBrandFilter: React.Dispatch<SetStateAction<string>>;
    colorFilter:string;
    setColorFilter: React.Dispatch<SetStateAction<string>>;
    typeFilter:string;
    setTypeFilter: React.Dispatch<SetStateAction<string>>;
    selectedCategory: string;
    setCurrentProducts: React.Dispatch<SetStateAction<Product[] | null>>;
    setMobileMenu: React.Dispatch<SetStateAction<boolean>>;
    setProductsToDisplay: React.Dispatch<SetStateAction<Product[] | null>>;

}