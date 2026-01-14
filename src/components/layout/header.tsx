import { useState } from "react";
import {
  Facebook,
  Instagram,
  Linkedin,
  Mail,
  Search,
  Youtube,
  Menu,
  X,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import logo from "@/assets/images/logo.jpg";

export const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const navLinks = [
    { href: "/knowledge-hub", label: "Knowledge Hub" },
    { href: "/toolbox", label: "Tool Box" },
    { href: "/support", label: "Find Support" },
    { href: "/voices", label: "Voices" },
    { href: "/learning-hub", label: "Learning Hub" },
    { href: "/partner-portal", label: "Partner Portal" },
  ];

  const socialLinks = [
    { Icon: Facebook, href: "#" },
    { Icon: Instagram, href: "#" },
    { Icon: Linkedin, href: "#" },
    { Icon: Youtube, href: "#" },
  ];

  return (
    <header className="z-50 shadow-sm">
      {/* Top Bar */}
      <div className="bg-[#ffe4f0] mx-auto px-5 py-3 sm:py-5 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center">
            <a href="/" className="text-xl sm:text-2xl font-bold text-gray-900">
              <img className="size-17" src={logo} alt="" />
            </a>
          </div>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center space-x-5">
            {/* Social Links */}
            <div className="flex space-x-4">
              {socialLinks.map(({ Icon, href }, index) => (
                <a
                  key={index}
                  href={href}
                  className="text-[#60358c] hover:text-[#4a2a6e] transition-colors"
                  aria-label={`Social link ${index + 1}`}
                >
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>

            {/* Newsletter Button */}
            <button className="bg-[#60358c] hover:bg-[#4a2a6e] text-white px-4 py-2 rounded-md transition-colors flex items-center whitespace-nowrap">
              <span className="hidden xl:inline">Stay in the loop</span>
              <Mail className="w-4 h-4 xl:ml-2" />
            </button>

            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
              <Input
                type="search"
                placeholder="Search..."
                className="pl-9 pr-4 py-2 border-gray-200 bg-white w-48 xl:w-64"
              />
            </div>
          </div>

          {/* Mobile Actions */}
          <div className="flex lg:hidden items-center space-x-3">
            {/* Search Toggle (Mobile) */}
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="p-2 text-[#60358c] hover:bg-[#4a2a6e] hover:text-white rounded-md transition-colors"
              aria-label="Toggle search"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Newsletter Button (Mobile) */}
            <button className="bg-[#60358c] hover:bg-[#4a2a6e] text-white p-2 rounded-md transition-colors">
              <Mail className="w-5 h-5" />
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-[#60358c] hover:bg-[#4a2a6e] hover:text-white  rounded-md transition-colors"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Search Bar */}
        {isSearchOpen && (
          <div className="lg:hidden mt-3 animate-in slide-in-from-top duration-200">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
              <Input
                type="search"
                placeholder="Search..."
                className="pl-9 pr-4 py-2 border-gray-200 bg-white w-full"
              />
            </div>
          </div>
        )}
      </div>

      {/* Desktop Navigation */}
      <nav className="hidden lg:flex items-center justify-center bg-[#b886e5] text-white">
        {navLinks.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className="hover:bg-[#3db9e7] py-4 px-4 xl:px-6 font-medium text-base xl:text-lg transition-colors whitespace-nowrap"
          >
            {link.label}
          </a>
        ))}
      </nav>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <nav className="lg:hidden bg-[#b886e5] text-white animate-in slide-in-from-top duration-200">
          <div className="flex flex-col">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="hover:bg-[#3db9e7] py-3 px-4 font-medium text-base border-b border-purple-400/30 transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.label}
              </a>
            ))}

            {/* Mobile Social Links */}
            <div className="flex justify-center space-x-6 py-4 border-t border-purple-400/30">
              {socialLinks.map(({ Icon, href }, index) => (
                <a
                  key={index}
                  href={href}
                  className="text-[#60358c] hover:text-[#3c1f5e]  transition-colors"
                  aria-label={`Social link ${index + 1}`}
                >
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>
        </nav>
      )}
    </header>
  );
};
