import { useState } from "react";
import { useLocation, Link } from "wouter";
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

export const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [location] = useLocation(); // Wouter returns [location, setLocation]

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

  // Check if link is active
  const isActive = (href: string) =>
    location === href || location.startsWith(href + "/");

  return (
    <header className="z-50 shadow-sm font-montserrat">
      {/* Top Bar */}
      <div className="bg-[#ffffff] mx-auto px-5 py-3 sm:py-5 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center">
            <Link
              href="/"
              className="text-xl sm:text-2xl font-bold text-gray-900"
            >
              {/* <img className="size-40" src={image} alt="" /> */}
              <span>Logo</span>
            </Link>
          </div>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center space-x-5">
            {/* Social Links */}
            <div className="flex space-x-4">
              {socialLinks.map(({ Icon, href }, index) => (
                <a
                  key={index}
                  href={href}
                  className="text-[#8f2029] hover:text-[#78141c] transition-colors"
                  aria-label={`Social link ${index + 1}`}
                >
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>

            {/* Newsletter Button */}
            <button className="bg-[#95111c] hover:bg-[#78141c] text-white px-4 py-2 rounded-md transition-colors flex items-center whitespace-nowrap">
              <span className="hidden xl:inline">Stay in the loop</span>
              <Mail className="w-4 h-4 xl:ml-2" />
            </button>

            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
              <Input
                type="search"
                placeholder="Search..."
                className="pl-9 pr-4 py-2 border-gray-300 shadow-lg bg-white w-48 xl:w-64"
              />
            </div>
          </div>

          {/* Mobile Actions */}
          <div className="flex lg:hidden items-center space-x-3">
            {/* Search Toggle (Mobile) */}
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="p-2 text-[#95111c] hover:bg-[#78141c] hover:text-white rounded-md transition-colors"
              aria-label="Toggle search"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Newsletter Button (Mobile) */}
            <button className="bg-[#95111c] hover:bg-[#78141c] text-white p-2 rounded-md transition-colors">
              <Mail className="w-5 h-5" />
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-[#95111c] hover:bg-[#78141c] hover:text-white rounded-md transition-colors"
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
      <nav className="hidden lg:flex items-center justify-center bg-[#95111c] text-white">
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`py-4 px-2 xl:px-4 mx-6 font-medium text-base xl:text-lg transition-all whitespace-nowrap relative ${
              isActive(link.href) ? "bg-[#3db9e7] " : "hover:bg-[#3db9e7]"
            }`}
          >
            {link.label}
          </Link>
        ))}
      </nav>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <nav className="lg:hidden bg-[#b886e5] text-white animate-in slide-in-from-top duration-200">
          <div className="flex flex-col">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`py-3 px-4 font-medium text-base border-b border-purple-400/30 transition-colors ${
                  isActive(link.href)
                    ? "bg-[#3db9e7] border-l-4 border-l-white font-bold"
                    : "hover:bg-[#3db9e7]"
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}

            {/* Mobile Social Links */}
            <div className="flex justify-center space-x-6 py-4 border-t border-purple-400/30">
              {socialLinks.map(({ Icon, href }, index) => (
                <a
                  key={index}
                  href={href}
                  className="text-[#95111c] hover:text-[#3c1f5e] transition-colors"
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
