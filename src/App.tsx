import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { OrgLayout } from "@/components/OrgLayout";
import DashboardPage from "@/pages/DashboardPage";
import ExperiencesPage from "@/pages/ExperiencesPage";
import CalendarPage from "@/pages/CalendarPage";
import BookingsPage from "@/pages/BookingsPage";
import GuestsPage from "@/pages/GuestsPage";
import PricingPage from "@/pages/PricingPage";
import RevenuePage from "@/pages/RevenuePage";
import ReviewsPage from "@/pages/ReviewsPage";
import MessagesPage from "@/pages/MessagesPage";
import MarketingPage from "@/pages/MarketingPage";
import ReportsPage from "@/pages/ReportsPage";
import TeamPage from "@/pages/TeamPage";
import SettingsPage from "@/pages/SettingsPage";
import HelpPage from "@/pages/HelpPage";
import CreateExperiencePage from "@/pages/CreateExperiencePage";
import NotFound from "@/pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/org/dashboard" replace />} />
          <Route path="/org" element={<OrgLayout />}>
            <Route path="dashboard" element={<DashboardPage />} />
            <Route path="experiences" element={<ExperiencesPage />} />
            <Route path="calendar" element={<CalendarPage />} />
            <Route path="bookings" element={<BookingsPage />} />
            <Route path="guests" element={<GuestsPage />} />
            <Route path="pricing" element={<PricingPage />} />
            <Route path="revenue" element={<RevenuePage />} />
            <Route path="reviews" element={<ReviewsPage />} />
            <Route path="messages" element={<MessagesPage />} />
            <Route path="marketing" element={<MarketingPage />} />
            <Route path="reports" element={<ReportsPage />} />
            <Route path="team" element={<TeamPage />} />
            <Route path="settings" element={<SettingsPage />} />
            <Route path="help" element={<HelpPage />} />
            <Route path="create" element={<CreateExperiencePage />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
