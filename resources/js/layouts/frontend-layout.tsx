// resources/js/layouts/frontend-layout.tsx
import AnnouncementBar from "@/components/frontend/AnnouncementBar";
import Navbar from "@/components/frontend/Navbar";
import Footer from "@/components/frontend/Footer";
import { Toaster } from "@/components/ui/sonner";
import { usePage, Link } from "@inertiajs/react";
import { ReactNode } from "react";

interface FrontendLayoutProps {
  children: ReactNode;
  title?: string;
  description?: string;
}

interface MenuItem {
  id: number;
  name: string;
  url: string;
  parent_id: number | null;
  children?: MenuItem[];
}

export default function FrontendLayout({ children, title, description }: FrontendLayoutProps) {
  const { props } = usePage();
  const settings: Record<string, string> = props.settings || {};
  const menus: MenuItem[] = props.menus || [];

  // props.menus is expected via HandleInertiaRequests share
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <AnnouncementBar settings={settings} />
      <Navbar settings={settings} menus={menus} />
      <main className="flex-1 container mx-auto px-4 md:px-6 lg:px-8 py-8">
        {title && (
          <header className="mb-6 text-center">
            <h1 className="text-2xl md:text-3xl font-semibold">{title}</h1>
            {description && <p className="text-muted-foreground mt-2">{description}</p>}
          </header>
        )}

        <div className="max-w-7xl mx-auto w-full">{children}</div>
      </main>

      <Footer settings={settings} />

      {/* global toaster */}
      <Toaster position="top-right" richColors />
    </div>
  );
}
