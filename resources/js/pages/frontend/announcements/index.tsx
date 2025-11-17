// --------------------------------------------------------
// frontend/announcements/index.tsx

import FrontendLayout from "@/layouts/frontend-layout";
import { Link } from "@inertiajs/react";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar } from "lucide-react";
import { useState } from "react";
import FrontSearchBar from "@/components/frontend/FrontSearchBar";

export default function AnnouncementsIndex({ announcements, filters }) {
  const pagination = announcements?.data || {};
  const [search, setSearch] = useState("");

  const filtered = announcements.data.filter((item) =>
    item.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <FrontendLayout
      title="Pengumuman"
      description="Informasi resmi terbaru dari pesantren."
    >
      <div className="space-y-8 max-w-4xl mx-auto">

        {/* Page header */}
        <div className="space-y-2">
          <h1 className="text-3xl font-bold">Pengumuman</h1>
          <p className="text-muted-foreground">
            Temukan informasi penting dan pembaruan terbaru dari pesantren.
          </p>
        </div>

        <section className="mb-10 container max-w-5xl">
          <FrontSearchBar
            routeName="/pengumuman"
            placeholder="Cari Pengumuman..."
            initialValue={filters?.search || ""}
          />
        </section>

        {/* Announcements list */}
        <div className="space-y-5">
          {filtered.length === 0 && (
            <p className="text-muted-foreground text-sm">Tidak ada hasil ditemukan.</p>
          )}

          {filtered.map((item) => (
            <Card
              key={item.id}
              className="rounded-2xl shadow-sm hover:shadow-md transition bg-card"
            >
              <CardContent className="p-6 space-y-3">

                {/* Title */}
                <Link
                  href={`/pengumuman/${item.id}`}
                  className="text-xl font-semibold hover:underline"
                >
                  {item.title}
                </Link>

                {/* Excerpt */}
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {item.excerpt || item.content?.slice(0, 140) + "..."}
                </p>

                {/* Dates */}
                {item.start_date && (
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Calendar size={14} />
                    <span>
                      Berlaku dari {item.start_date}{" "}
                      {item.end_date && `hingga ${item.end_date}`}
                    </span>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-center gap-2 mt-6">
          {pagination.links?.map((link, idx) => (
            <Link
              key={idx}
              href={link.url || "#"}
              className={`px-3 py-1.5 rounded-lg border text-sm transition ${link.active
                  ? "bg-primary text-primary-foreground"
                  : "hover:bg-accent"
                } ${!link.url ? "opacity-50 cursor-default" : ""}`}
              dangerouslySetInnerHTML={{ __html: link.label }}
            />
          ))}
        </div>

      </div>
    </FrontendLayout>
  );
}
