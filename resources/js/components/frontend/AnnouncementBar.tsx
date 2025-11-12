// resources/js/components/frontend/AnnouncementBar.tsx
import { usePage, Link } from "@inertiajs/react";
import Marquee from "react-fast-marquee"; // optional lib (you can render simple scrolling with CSS if not installed)

export default function AnnouncementBar({ settings }) {
  const { props } = usePage();
  const announcements = props.announcements ?? []; // share announcements in middleware
  // only show active announcements
  const active = announcements.filter((a) => a.is_active || a.is_published);

  if (!active.length) return null;

  return settings.show_announcements !== '0' ? (
    <>
      <div className="bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 md:px-6 lg:px-8 py-2 flex items-center">
          {/* simple marquee */}
          <div className="flex-1 text-sm">
            <Marquee pauseOnHover gradient={false} speed={40}>
              {active.map((a, i) => (
                <span key={a.id} className="mx-6">
                  {a.title ?? a.message ?? `Pengumuman #${a.id}`}
                </span>
              ))}
            </Marquee>
          </div>
          <div>
            <Link href="/pengumuman" className="underline text-primary-foreground/90 text-sm">
              Lihat Semua
            </Link>
          </div>
        </div>
      </div>
    </>
  ) : (
    <></>
  );
}