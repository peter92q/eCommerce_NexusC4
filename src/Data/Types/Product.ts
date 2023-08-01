export interface Product {
    brand: string;
    name: string;
    model: string;
    rating: number;
    color: string;
    type: string;
    price: number;
    discount: number | null; 
    img: string;
}

export interface FilterProps 
{
    brands: boolean;
    colors: boolean;
    types: boolean;
}