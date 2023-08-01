import { drip2 } from "../assets";

export default function Footer() {
  return (
    <footer className="bg-[#e4e2dd] text-black p-4 mt-8">
    <div className="container mx-auto flex items-center justify-between responsive-text2">
      <div>
        <p>&copy; {new Date().getFullYear()} Drip. All rights reserved.</p>
      </div>
      <img src={drip2} className="md:h-[40px] h-[25px]"/>
      <div className="text-end">
        <a href="#">Privacy Policy</a>
        <span className="mx-2">|</span>
        <a href="#">Terms of Service</a>
      </div>
    </div> 
  </footer>
  )
}
