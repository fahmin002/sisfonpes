import { Head, Link, usePage } from "@inertiajs/react";
import FrontendLayout from "@/layouts/frontend-layout";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { motion } from "framer-motion";

export default function PostShow() {
  const { props }: any = usePage();
  const post = props.post;

  return (
    <FrontendLayout title={post.title}>
      <Head title={post.title} />

      {/* Breadcrumb */}
      <div className="container max-w-4xl mx-auto px-5 mb-6 text-sm text-muted-foreground">
        <Breadcrumbs
          breadcrumbs={[
            { title: "Beranda", href: "/" },
            { title: "Berita & Kegiatan", href: "/berita" },
            { title: post.title, href: "#" },
          ]}
        />
      </div>

      {/* Thumbnail */}
      {post.thumbnail && (
        <div className="container max-w-4xl mx-auto px-5 mb-8">
          <img
            src={`/storage/${post.thumbnail}`}
            alt={post.title}
            className="w-full h-64 object-cover rounded-xl shadow-md"
          />
        </div>
      )}

      {/* Content */}
      <article className="container max-w-4xl mx-auto px-5 pb-20 space-y-8">

        {/* Meta */}
        <p className="text-gray-500 text-sm">
          Dipublikasi pada{" "}
          {post.published_at
            ? new Date(post.published_at).toLocaleDateString("id-ID")
            : ""}
        </p>

        {/* Post Body */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="prose prose-lg max-w-none dark:prose-invert tiptap-render"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        {/* Back Button */}
        <div className="pt-6">
          <Link
            href="/berita"
            className="text-emerald-700 hover:underline font-medium"
          >
            ← Kembali ke daftar berita
          </Link>
        </div>
      </article>
    </FrontendLayout>
  );
}
