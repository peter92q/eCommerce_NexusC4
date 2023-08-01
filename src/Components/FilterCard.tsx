import Down from "../assets/Icons/Down";
import { FilterCardProps } from "../Data/Types/FilterCard";

export default function FilterCard(
  {
    name, 
    setFilterMenu, 
    filterMenu, 
    currentParams, 
    currentFilter, 
    addFilter
  }
  :
  FilterCardProps) 
  {
  return (
    <>
         <div
          onClick={() =>
            {
                if(name==="Brands"){
                    if(filterMenu.includes(name))
                    {
                        setFilterMenu(filterMenu.filter(p=>p !== name))
                    }
                    else{
                        setFilterMenu([...filterMenu,"Brands"])
                    }
                }
                else if(name === "Colors")
                {
                    if(filterMenu.includes(name))
                    {
                        setFilterMenu(filterMenu.filter(p=>p !== name))
                    }
                    else{
                        setFilterMenu([...filterMenu,"Colors"])
                    }
                }
                else if(name==="Types")
                {
                    if(filterMenu.includes(name))
                    {
                        setFilterMenu(filterMenu.filter(p=>p !== name))
                    }
                    else{
                        setFilterMenu([...filterMenu,"Types"])
                    }
                }
            }
          }
          className="font-light cursor-pointer text-[20px] xl:text-[23px]
           border-b-[1px] border-black/40 
          px-[1px] lg:px-2 flex justify-between"
        >
          <p>{name}</p>
          <div 
            className={`${filterMenu.includes(name)?"rotate-180 mb-1":"rotate-0 mt-1"}`}>
            <Down/>
          </div>
        </div>
          <div 
            className={`${filterMenu.includes(name)?"block":"hidden"} border-b-[1px] border-black/40 p-[2px] md:p-2`}
            >
            {currentParams?.map((item,index) => (
              <div
                key={index}
                onClick={() => addFilter(name, item)}
                className="flex flex-row-reverse justify-between
                 hover:bg-gray-300 cursor-pointer lg:pl-4 lg:pr-2"
              >
                <input
                  type="checkbox"
                  checked={currentFilter?.includes(item)}
                  className="cursor-pointer translate-y-[3px]"
                  onChange={()=>{}}
                />
                <p className="font-light tracking-wider ">{item}</p>
              </div>
            ))}
          </div>
    </>
  )
}
