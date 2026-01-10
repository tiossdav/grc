import {
  Facebook,
  Instagram,
  Linkedin,
  Mail,
  Search,
  Youtube,
} from "lucide-react";
import { Input } from "../ui/input";

export const Header = () => {
  return (
    <header className="z-50 shadow-sm">
      <div className="bg-[#ffe4f0] mx-auto px-4 py-5 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center">
            <img src="" alt="" />
            <a href="#" className="text-2xl font-bold ">
              Good Finance
            </a>
          </div>

          <div className="flex items-center space-x-5">
            {/* Socials */}
            <div className="flex space-x-6">
              <Facebook className="w-5 h-5 text-[#60358c] cursor-pointer" />
              <Instagram className="w-5 h-5 text-[#60358c] cursor-pointer" />
              <Linkedin className="w-5 h-5 text-[#60358c] cursor-pointer" />
              <Youtube className="w-5 h-5 text-[#60358c] cursor-pointer" />
            </div>
            <button className="bg-[#60358c] text-white px-3 py-2 rounded-md cursor-pointer flex items-center">
              Stay in the loop
              <Mail className="size-4 inline-block ml-2" />
            </button>
            <div>
              <form className="relative">
                <div className="relative w-full max-w-sm">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input className="border-gray-100 bg-white" />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <nav className="lg:flex items-center justify-center space-x-8 bg-[#b886e5] text-white text-xl w-full">
        <a href="/hub" className="hover:bg-[#3db9e7] py-4 px-4 font-medium">
          Knowledge Hub
        </a>
        <a href="/toolbox" className="hover:bg-[#3db9e7] py-4 px-4 font-medium">
          Tool Box
        </a>
        <a href="/support" className="hover:bg-[#3db9e7] py-4 px-4 font-medium">
          Find Support
        </a>
        <a href="/voice" className="hover:bg-[#3db9e7] py-4 px-4 font-medium">
          Voices
        </a>
        <a
          href="/learning-hub"
          className="hover:bg-[#3db9e7] py-4 px-4 font-medium"
        >
          Learning Hub
        </a>
        <a href="#" className="hover:bg-[#3db9e7] py-4 px-4 font-medium">
          Partner Portal
        </a>
      </nav>
    </header>
  );
};
