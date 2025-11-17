// resources/js/components/frontend/ProgramCard.tsx

import { Link } from "@inertiajs/react";

export default function ProgramCard({ program }: { program: any }) {

  return (
    <Link
      key={program.id}
      href={`/program-pendidikan/${program.slug}`}
      className="bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition overflow-hidden"
    >
      {program.image && (
        <img
          src={`/storage/${program.image}`}
          alt={program.title}
          className="w-full h-48 object-cover"
        />
      )}

      <div className="p-6">
        <h2 className="text-xl text-center font-semibold text-emerald-800 mb-2">
          {program.title}
        </h2>

        {program.short_description && (
          <p className="text-gray-600 text-sm leading-relaxed">
            {program.short_description}
          </p>
        )}
      </div>
    </Link>
  );
}
