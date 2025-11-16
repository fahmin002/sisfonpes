import { Head } from "@inertiajs/react";
import FrontendLayout from "@/layouts/frontend-layout";

export default function ProgramShow({ program }) {
    console.log(program.description);
  return (
    <FrontendLayout>
      <Head title={program.title} />

      {/* Hero Section */}
      <section className="relative w-full h-72 mb-10">
        {program.image ? (
          <img
            src={
              program.image.startsWith("http")
                ? program.image
                : `/storage/${program.image.replace(/^\/+/, "")}`
            }
            alt={program.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-emerald-800" />
        )}

        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
          <h1 className="text-4xl font-bold text-white text-center">
            {program.title}
          </h1>
        </div>
      </section>

      {/* Content */}
      <div className="container max-w-4xl mx-auto px-5 pb-16">
        {program.short_description && (
          <p className="text-lg text-gray-700 mb-6">
            {program.short_description}
          </p>
        )}

        <div
          className="
            prose prose-lg max-w-none 
            prose-headings:text-emerald-800 
            prose-a:text-emerald-700 
            prose-strong:text-emerald-800
            prose-content
            tiptap-render
          "
          dangerouslySetInnerHTML={{ __html: program.description }}
        />
      </div>
    </FrontendLayout>
  );
}
