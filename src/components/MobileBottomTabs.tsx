import { NavLink, useLocation } from "react-router-dom";
import { LayoutDashboard, Theater, Calendar, DollarSign, MoreHorizontal } from "lucide-react";

const tabs = [
  { icon: LayoutDashboard, label: "Dashboard", path: "/org/dashboard" },
  { icon: Theater, label: "Deneyimlerim", path: "/org/experiences" },
  { icon: Calendar, label: "Takvim", path: "/org/calendar" },
  { icon: DollarSign, label: "Gelir", path: "/org/revenue" },
];

interface MobileBottomTabsProps {
  onMoreClick: () => void;
}

export function MobileBottomTabs({ onMoreClick }: MobileBottomTabsProps) {
  const location = useLocation();

  return (
    <nav className="fixed bottom-0 left-0 right-0 h-16 bg-card border-t border-border flex items-center justify-around lg:hidden z-30 px-2">
      {tabs.map((tab) => {
        const isActive = location.pathname === tab.path;
        return (
          <NavLink
            key={tab.path}
            to={tab.path}
            className={`flex flex-col items-center justify-center gap-0.5 py-1 px-3 ${
              isActive ? "text-accent" : "text-muted-foreground"
            }`}
          >
            <tab.icon size={20} />
            <span className="text-[11px] font-medium">{tab.label}</span>
          </NavLink>
        );
      })}
      <button
        onClick={onMoreClick}
        className="flex flex-col items-center justify-center gap-0.5 py-1 px-3 text-muted-foreground"
      >
        <MoreHorizontal size={20} />
        <span className="text-[11px] font-medium">Daha Fazla</span>
      </button>
    </nav>
  );
}
