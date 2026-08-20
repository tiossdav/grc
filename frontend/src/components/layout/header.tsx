import { useState } from "react";
import { useLocation, Link } from "wouter";
import logo from "@/assets/logo/logo.png";
import name from "@/assets/logo/name.png";
import { Mail, Search, Menu, X, ArrowRight } from "lucide-react";
import {
  FaYoutube,
  FaInstagram,
  FaLinkedin,
  FaFacebookF,
} from "react-icons/fa";
import { Input } from "@/components/ui/input";

// ==================== IMPROVED HEADER ====================
export const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [location] = useLocation();

  const navLinks = [
    { href: "/knowledge-hub", label: "Knowledge Hub" },
    { href: "/toolbox", label: "Tool Box" },
    { href: "/find-support", label: "Find Support" },
    { href: "/voices", label: "Voices" },
    { href: "/learning-hub", label: "Learning Hub" },
    { href: "/partner-portal", label: "Partner Portal" },
    { href: "/careers", label: "Careers" },
  ];

  const socialLinks = [
    {
      Icon: FaFacebookF,
      href: "#",
      label: "Facebook",
      color: "hover:text-blue-500",
    },
    {
      Icon: FaInstagram,
      href: "#",
      label: "Instagram",
      color: "hover:text-pink-500",
    },
    {
      Icon: FaLinkedin,
      href: "#",
      label: "LinkedIn",
      color: "hover:text-blue-600",
    },
    {
      Icon: FaYoutube,
      href: "#",
      label: "YouTube",
      color: "hover:text-red-500",
    },
  ];

  const isActive = (href: string) =>
    location === href || (href !== "/" && location.startsWith(href));

  return (
    <header className="sticky top-0 z-50 shadow-md bg-white font-montserrat">
      {/* Top Bar */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
          <div className="flex justify-between items-center gap-4">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 shrink-0 group">
              <img
                className="h-12 sm:h-16 lg:h-20 w-auto object-contain transition-transform group-hover:scale-105"
                src={logo}
                alt="Graduate Research Clinic Logo"
              />
              <img
                className="h-10 sm:h-12 lg:h-14 w-auto max-w-[150px] sm:max-w-[200px] lg:max-w-[280px] object-contain"
                src={name}
                alt="Graduate Research Clinic"
              />
            </Link>

            {/* Desktop Actions */}
            <div className="hidden lg:flex items-center gap-3 xl:gap-4">
              {/* Social Links */}
              <div className="flex items-center gap-2 xl:gap-3 pr-3 xl:pr-4 border-r border-gray-200">
                {socialLinks.map(({ Icon, href, label, color }) => (
                  <a
                    key={label}
                    href={href}
                    className={`text-gray-600 ${color} transition-colors p-1.5 rounded-md hover:bg-gray-50`}
                    aria-label={label}
                    title={label}
                  >
                    <Icon className="w-4 h-4 xl:w-5 xl:h-5" />
                  </a>
                ))}
              </div>

              {/* Newsletter Button */}
              <Link href="/newsletter">
                <button
                  className="bg-[#95111c] hover:bg-[#78141c] cursor-pointer text-white px-4 xl:px-5 py-2 rounded-lg transition-all hover:shadow-lg flex items-center gap-2 group text-sm xl:text-base font-medium"
                  aria-label="Subscribe to newsletter"
                >
                  <Mail className="w-4 h-4" />
                  <span className="hidden xl:inline">Newsletter</span>
                  <ArrowRight className="w-4 h-4 xl:hidden group-hover:translate-x-1 transition-transform" />
                </button>
              </Link>

              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
                <Input
                  type="search"
                  placeholder="Search..."
                  className="pl-9 pr-4 py-2 border-gray-300 bg-gray-50 focus:bg-white w-44 xl:w-56 rounded-lg transition-all focus:w-64"
                />
              </div>
            </div>

            {/* Mobile Actions */}
            <div className="flex lg:hidden items-center gap-2">
              <button
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className={`p-2 cursor-pointer rounded-lg transition-all ${
                  isSearchOpen
                    ? "bg-[#95111c] text-white"
                    : "text-[#95111c] hover:bg-gray-100"
                }`}
                aria-label="Toggle search"
              >
                <Search className="w-5 h-5" />
              </button>

              <Link href="/newsletter">
                <button
                  className="bg-[#95111c] hover:bg-[#78141c] cursor-pointer text-white p-2 rounded-lg transition-colors"
                  aria-label="Subscribe"
                >
                  <Mail className="w-5 h-5" />
                </button>
              </Link>

              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className={`p-2 cursor-pointerrounded-lg transition-all ${
                  isMobileMenuOpen
                    ? "bg-[#95111c] text-white"
                    : "text-[#95111c] hover:bg-gray-100"
                }`}
                aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
              >
                {isMobileMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>

          {/* Mobile Search */}
          {isSearchOpen && (
            <div className="lg:hidden mt-3 animate-in slide-in-from-top-2 duration-200">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  type="search"
                  placeholder="Search..."
                  autoFocus
                  className="pl-9 pr-4 py-3 border-gray-300 bg-gray-50 w-full rounded-lg"
                />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Desktop Navigation */}
      <nav className="hidden lg:block bg-linear-to-r from-[#95111c] to-[#7a0e16] shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`relative py-4 px-4 xl:px-6 font-medium text-sm xl:text-base transition-all group ${
                  isActive(link.href)
                    ? "text-yellow-400 bg-black/20"
                    : "text-white hover:bg-white/10"
                }`}
              >
                {link.label}
                {isActive(link.href) && (
                  <span className="absolute bottom-0 left-0 right-0 h-1 bg-yellow-400"></span>
                )}
                <span className="absolute bottom-0 left-0 right-0 h-1 bg-yellow-400 scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
              </Link>
            ))}
          </div>
        </div>
      </nav>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <nav className="lg:hidden bg-[#95111c] shadow-2xl animate-in slide-in-from-top-5 duration-300 border-t border-white/10">
          <div className="max-w-7xl mx-auto">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center justify-between py-3 px-6 font-medium border-b border-white/10 transition-all ${
                  isActive(link.href)
                    ? "bg-yellow-500 text-gray-900 border-l-4 border-l-yellow-600"
                    : "text-white hover:bg-white/10 hover:pl-8"
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <span>{link.label}</span>
                {isActive(link.href) && <ArrowRight className="w-5 h-5" />}
              </Link>
            ))}

            {/* Mobile Social Links */}
            <div className="flex justify-center gap-6 py-6 bg-[#78141c]">
              {socialLinks.map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  className="text-white hover:text-yellow-400 transition-colors p-2 hover:bg-white/10 rounded-lg"
                  aria-label={label}
                >
                  <Icon className="w-6 h-6" />
                </a>
              ))}
            </div>
          </div>
        </nav>
      )}
    </header>
  );
};
