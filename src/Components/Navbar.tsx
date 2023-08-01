import { SetStateAction } from "react";
import { drip, menu } from "../assets";
import CartIcon from "../assets/Icons/CartIcon";
import UserIcon from "../assets/Icons/UserIcon";
import { products } from "../Data/Products";

const categoriesArray = [
  ...new Set(products.map((product) => product.category)),
];

export default function Navbar({
  mobileMenu,
  setMobileMenu,
  selectedCategory,
  setSelectedCategory,
}: {
  mobileMenu: boolean;
  setMobileMenu: React.Dispatch<SetStateAction<boolean>>;
  selectedCategory: string;
  setSelectedCategory: React.Dispatch<SetStateAction<string>>;
}) {
  return (
    <nav className="w-full flex flex-col sticky top-0 bg-[#e4e2dd] z-50">
      <div className="py-[1rem] flex justify-between">
        <img src={drip} className="md:h-[50px] h-[30px] cursor-pointer" />
        <header className="flex tracking-wider font-medium flex-row gap-4">
          {categoriesArray.map((item, index) => (
            <div
              style={{ transition: "border-bottom 0.3s ease" }}
              onClick={() => setSelectedCategory(item)}
              className="mt-1 md:mt-3 responsive-text"
              key={index}
            >
              <p
                className={`${
                  selectedCategory.includes(item)
                    ? "border-b-[2px] border-pink-500"
                    : "border-b-[2px] border-b-transparent"
                } cursor-pointer`}
              >
                {item}
              </p>
            </div>
          ))}
        </header>
        <div className="gap-4 hidden sm:flex">
          <CartIcon />
          <UserIcon />
        </div>
        <div className="sm:hidden translate-y-[-4px] hover:bg-gray-300 rounded-full p-2">
          <img
            onClick={() => setMobileMenu(!mobileMenu)}
            src={menu}
            className="h-6 w-6 cursor-pointer "
          />
        </div>
      </div>
    </nav>
  );
}
