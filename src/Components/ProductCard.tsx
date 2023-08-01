import { useMemo, useState } from "react";
import { Product } from "../Data/Types/Product";
import StarIcon from "../assets/Icons/StarIcon";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const imgLogic = `object-cover max-h-[40vh] min-h-[40vh] min-w-full max-w-full`;

export default function ProductCard({ item }: { item: Product }) {
  const success = () => {
    toast.success("Product added to basket.", {
      theme: "colored",
      position: "top-center",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
    });
  };

  const [move, setMove] = useState(false);

  const discountCheck = useMemo(() => {
    if (item.discount) {
      const discountPercent = ((item.discount / item.price) * 100) - 100;
      return Math.round(discountPercent) + "%";
    } else {
      return null;
    }
  }, [item.discount, item.price]);

  return (
    <div
      onMouseEnter={() => setMove(true)}
      onMouseLeave={() => setMove(false)}
      className="image-item relative overflow-hidden"
    >
      <ToastContainer
        position="top-center"
        autoClose={1500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false} 
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      <img src={item.img} className={` ${imgLogic}`} />
      {item.discount && (
        <div
          className="bg-green-500 rounded-full w-[30px] h-[30px] md:h-[35px] md:w-[35px] p-3 text-white absolute top-1 right-1 
        text-[10px] sm:text-[11px] md:text-[12px] flex justify-center items-center"
        >
          {discountCheck}
        </div>
      )}
      <div
        style={{ transition: "bottom 0.3s ease" }}
        className={`pb-1.5 w-full absolute 
          ${move ? "bottom-0" : "bottom-[-45px] lg:bottom-[-57px]"} 
         bg-white/80 z-20 flex flex-col px-1`}
      >
        {/*row1*/}
        <div className="flex flex-row justify-between text-[12px] lg:text-[16px]">
          <p className="font-medium w-[73%]">{item.name}</p>
          <p className={`${item.discount && "linethrough"}`}>{item.price}$</p>
          <p className={`${!item.discount && "hidden"}`}>{item.discount}$</p>
        </div>
        {/*row2*/}
        <div className="flex flex-row justify-between text-[10px] md:text-[12px] lg:text-[15px]">
          <p className="font-light  ">{item.brand}</p>
          <div className="flex flex-row justify-center items-center">
            <p className="mr-[2px]">{item.rating}</p>
            <div className="">
              <StarIcon />
            </div>
          </div>
        </div>

        {/*row3*/}
        <div className="text-[12px] lg:text-[16px] font-light">
          {item.model}
        </div>
        {/*row4*/}
        <div className="flex justify-between text-[12px] lg:text-[16px]">
          <div />
          <div
            onClick={success}
            className="cursor-pointer hover:opacity-80 hover:scale-105 
                  border-[1px] px-2 rounded-sm py-[1px] border-black text-white bg-black"
          >
            Add to Cart
          </div>
        </div>
      </div>
    </div>
  );
}
