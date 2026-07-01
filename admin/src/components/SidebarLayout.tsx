import React from "react";
import { Link, useLocation } from "wouter";
import { 
  LayoutDashboard, 
  CalendarRange, 
  Mail, 
  HeartHandshake, 
  Users, 
  LogOut,
  UserCheck
} from "lucide-react";

interface SidebarLayoutProps {
  children: React.ReactNode;
}

export default function SidebarLayout({ children }: SidebarLayoutProps) {
  const [location, setLocation] = useLocation();

  const handleLogout = () => {
    localStorage.removeItem("admin_token");
    setLocation("/login");
  };

  const navItems = [
    { name: "Dashboard", href: "/", icon: LayoutDashboard },
    { name: "Events", href: "/events", icon: CalendarRange },
    { name: "Newsletter", href: "/subscribers", icon: Mail },
    { name: "Donations", href: "/donations", icon: HeartHandshake },
    { name: "Partners", href: "/partners", icon: Users },
  ];

  return (
    <div className="flex h-screen bg-gray-100 font-sans overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 flex flex-col">
        {/* Sidebar Header */}
        <div className="h-16 px-6 border-b border-gray-200 flex items-center justify-between bg-white">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-[#95111c] flex items-center justify-center text-white font-bold text-sm">
              GRC
            </div>
            <span className="font-extrabold text-gray-900 tracking-tight">GRC Console</span>
          </div>
        </div>

        {/* Navigation Link list */}
        <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const isActive = location === item.href || (item.href !== "/" && location.startsWith(item.href));
            const Icon = item.icon;
            return (
              <Link key={item.name} href={item.href}>
                <a className={`flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-semibold transition-all ${
                  isActive 
                    ? "bg-[#95111c]/10 text-[#95111c]" 
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                }`}>
                  <Icon className={`w-5 h-5 ${isActive ? "text-[#95111c]" : "text-gray-400 group-hover:text-gray-500"}`} />
                  {item.name}
                </a>
              </Link>
            );
          })}
        </nav>

        {/* Sidebar Footer / User section */}
        <div className="p-4 border-t border-gray-200">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 w-full px-3 py-3 rounded-xl text-sm font-semibold text-red-600 hover:bg-red-50 transition-all text-left"
          >
            <LogOut className="w-5 h-5 text-red-500" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Header */}
        <header className="h-16 bg-white border-b border-gray-200 px-8 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-gray-900">
              {navItems.find(item => location === item.href || (item.href !== "/" && location.startsWith(item.href)))?.name || "Console"}
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 bg-gray-50 px-4 py-2 rounded-xl border border-gray-100">
              <UserCheck className="w-4 h-4 text-green-600" />
              <span className="text-sm font-medium text-gray-700">Administrator</span>
            </div>
          </div>
        </header>

        {/* Page Content wrapper */}
        <main className="flex-1 overflow-y-auto p-8 bg-gray-50">
          <div className="max-w-7xl mx-auto space-y-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
