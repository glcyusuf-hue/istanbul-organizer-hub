import { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { OrgSidebar } from "./OrgSidebar";
import { OrgHeader } from "./OrgHeader";
import { MobileBottomTabs } from "./MobileBottomTabs";

const pageTitles: Record<string, string> = {
  "/org/dashboard": "Dashboard",
  "/org/experiences": "Deneyimlerim",
  "/org/calendar": "Takvim",
  "/org/bookings": "Rezervasyonlar",
  "/org/guests": "Misafirler",
  "/org/pricing": "Fiyatlandırma",
  "/org/revenue": "Gelir & Finans",
  "/org/reviews": "Yorumlar",
  "/org/messages": "Mesajlar",
  "/org/marketing": "Pazarlama",
  "/org/reports": "Raporlar",
  "/org/team": "Ekip Yönetimi",
  "/org/settings": "Ayarlar",
  "/org/help": "Yardım Merkezi",
  "/org/create": "Yeni Deneyim Oluştur",
};

export function OrgLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const title = pageTitles[location.pathname] || "Dashboard";

  return (
    <div className="min-h-screen flex w-full bg-background">
      <OrgSidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="flex-1 flex flex-col min-w-0">
        <OrgHeader title={title} onMenuClick={() => setSidebarOpen(true)} />

        <main className="flex-1 overflow-auto p-4 lg:p-6 pb-20 lg:pb-6">
          <div className="max-w-[1280px] mx-auto">
            <Outlet />
          </div>
        </main>
      </div>

      <MobileBottomTabs onMoreClick={() => setSidebarOpen(true)} />
    </div>
  );
}
