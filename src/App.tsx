import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import Layout from "./components/Layout";
import Index from "./pages/Index";
import CalendarPage from "./pages/CalendarPage";
import DailyDetail from "./pages/DailyDetail";
import PrayerSchedule from "./pages/PrayerSchedule";
import QiblaPage from "./pages/QiblaPage";
import DoaPage from "./pages/DoaPage";
import TrackerPage from "./pages/TrackerPage";
import SettingsPage from "./pages/SettingsPage";
import NotFound from "./pages/NotFound";
import AboutPage from "./pages/AboutPage";

const queryClient = new QueryClient();

const App = () => (
  <HelmetProvider>
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/calendar" element={<CalendarPage />} />
          <Route path="/calendar/:date" element={<DailyDetail />} />
          <Route path="/jadwal" element={<PrayerSchedule />} />
          <Route path="/qibla" element={<QiblaPage />} />
          <Route path="/doa" element={<DoaPage />} />
          <Route path="/tracker" element={<TrackerPage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  </QueryClientProvider>
  </HelmetProvider>
);

export default App;
