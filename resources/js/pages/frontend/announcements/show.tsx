// --------------------------------------------------------
// frontend/announcements/show.tsx

import FrontendLayout from "@/layouts/frontend-layout";
import { Link } from "@inertiajs/react";

export default function AnnouncementShow({ announcement }) {
  return (
    <FrontendLayout title={announcement.title}>
      <div className="max-w-3xl mx-auto space-y-6">

        {/* Section Label */}
        <h2 className="text-sm font-semibold text-emerald-700 uppercase tracking-wide">
          Pengumuman Resmi
        </h2>

        {/* Title */}
        <h1 className="text-3xl font-bold text-foreground">
          {announcement.title}
        </h1>

        {/* Date Badge */}
        {(announcement.start_date || announcement.end_date) && (
          <span className="inline-block bg-emerald-800 text-emerald-100 text-sm px-3 py-1 rounded-lg">
            {announcement.start_date && `Berlaku mulai ${announcement.start_date}`}
            {announcement.end_date && ` hingga ${announcement.end_date}`}
          </span>
        )}

        {/* Content */}
        <div
          className="prose prose-neutral dark:prose-invert max-w-none"
          dangerouslySetInnerHTML={{ __html: announcement.content }}
        />

        {/* Back Button */}
        <Link
          href="/pengumuman"
          className="inline-flex items-center text-primary hover:underline mt-6"
        >
          ← Kembali ke daftar pengumuman
        </Link>
      </div>
    </FrontendLayout>
  );
}
