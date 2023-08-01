import { SetStateAction } from "react";
import { Product } from "./Product";

export interface MainGridProps {
    mobileMenu: boolean;
    setMobileMenu: React.Dispatch<SetStateAction<boolean>>;
    productsToDisplay: Product[] | null;
    totalCount: number | null;
    selectedCategory: string;
    currentProducts: Product[] | null;
    setCurrentProducts: React.Dispatch<SetStateAction<Product[] | null>>;
    setProductsToDisplay: React.Dispatch<SetStateAction<Product[] | null>>;
}