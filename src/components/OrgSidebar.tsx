import { NavLink, useLocation } from "react-router-dom";
import {
  LayoutDashboard, Theater, Calendar, ClipboardList, Users, Tag,
  DollarSign, Star, MessageSquare, Megaphone, BarChart3, UserCog,
  Settings, HelpCircle, X
} from "lucide-react";

const navItems = [
  { icon: LayoutDashboard, label: "Dashboard", path: "/org/dashboard" },
  { icon: Theater, label: "Deneyimlerim", path: "/org/experiences" },
  { icon: Calendar, label: "Takvim", path: "/org/calendar" },
  { icon: ClipboardList, label: "Rezervasyonlar", path: "/org/bookings" },
  { icon: Users, label: "Misafirler", path: "/org/guests" },
  { icon: Tag, label: "Fiyatlandırma", path: "/org/pricing" },
  { icon: DollarSign, label: "Gelir & Finans", path: "/org/revenue" },
  { icon: Star, label: "Yorumlar", path: "/org/reviews" },
  { icon: MessageSquare, label: "Mesajlar", path: "/org/messages" },
  { icon: Megaphone, label: "Pazarlama", path: "/org/marketing" },
  { icon: BarChart3, label: "Raporlar", path: "/org/reports" },
  { icon: UserCog, label: "Ekip", path: "/org/team" },
  { icon: Settings, label: "Ayarlar", path: "/org/settings" },
  { icon: HelpCircle, label: "Yardım", path: "/org/help" },
];

interface OrgSidebarProps {
  open: boolean;
  onClose: () => void;
}

export function OrgSidebar({ open, onClose }: OrgSidebarProps) {
  const location = useLocation();

  return (
    <>
      {/* Mobile overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-navy-dark/50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`
          fixed top-0 left-0 h-full w-60 bg-navy-dark z-50 flex flex-col
          transition-transform duration-250 ease-out
          lg:translate-x-0 lg:static lg:z-auto
          ${open ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        {/* Logo */}
        <div className="flex items-center justify-between px-6 py-5">
          <span className="text-xl font-headline font-semibold text-sidebar-foreground tracking-tight">
            Join<span className="text-gold">Istanbul</span>
          </span>
          <button onClick={onClose} className="lg:hidden text-sidebar-foreground/60 hover:text-sidebar-foreground">
            <X size={20} />
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto px-3 py-2 space-y-0.5">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={onClose}
                className={`
                  flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium transition-colors
                  ${isActive
                    ? "bg-sidebar-accent text-gold border-l-2 border-gold"
                    : "text-sidebar-foreground/60 hover:bg-sidebar-accent hover:text-sidebar-foreground"
                  }
                `}
              >
                <item.icon size={18} />
                <span>{item.label}</span>
              </NavLink>
            );
          })}
        </nav>

        {/* Bottom profile */}
        <div className="px-4 py-4 border-t border-sidebar-border">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-navy-medium flex items-center justify-center text-sidebar-foreground font-semibold text-sm">
              MK
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-sidebar-foreground truncate">Mehmet K.</p>
              <span className="badge-vip text-[10px]">Pro</span>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
