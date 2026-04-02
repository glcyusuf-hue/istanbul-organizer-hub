import { Menu, Search, Bell } from "lucide-react";

interface OrgHeaderProps {
  title: string;
  onMenuClick: () => void;
}

export function OrgHeader({ title, onMenuClick }: OrgHeaderProps) {
  return (
    <header className="sticky top-0 z-30 h-14 bg-card border-b border-border flex items-center px-4 lg:px-6 card-shadow">
      <button
        onClick={onMenuClick}
        className="lg:hidden mr-3 p-2 rounded-md hover:bg-muted text-foreground"
        aria-label="Menüyü aç"
      >
        <Menu size={20} />
      </button>

      <h1 className="text-lg font-body font-semibold text-primary flex-1">{title}</h1>

      <div className="flex items-center gap-2">
        <button className="p-2 rounded-md hover:bg-muted text-muted-foreground" aria-label="Ara">
          <Search size={18} />
        </button>
        <button className="p-2 rounded-md hover:bg-muted text-muted-foreground relative" aria-label="Bildirimler">
          <Bell size={18} />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-destructive rounded-full" />
        </button>
        <div className="w-8 h-8 rounded-full bg-navy-medium flex items-center justify-center text-primary-foreground text-xs font-semibold ml-1">
          MK
        </div>
      </div>
    </header>
  );
}
