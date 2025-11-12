// resources/js/components/frontend/PostCard.tsx
import { Link } from "@inertiajs/react";

export default function PostCard({ post }: { post: any }) {
  const thumb = post.thumbnail ? `/storage/${post.thumbnail}` : `/images/placeholder-article.jpg`;
  const slugOrId = post.slug ?? post.id;
  return (
    <article className="border rounded-lg overflow-hidden bg-card">
      <Link href={`/berita/${slugOrId}`}>
        <img src={thumb} alt={post.title} className="w-full h-48 object-cover" />
      </Link>
      <div className="p-4">
        <h3 className="font-semibold text-lg">
          <Link href={`/berita/${slugOrId}`}>{post.title}</Link>
        </h3>
        <p className="text-sm text-muted-foreground mt-2 line-clamp-3" dangerouslySetInnerHTML={{ __html: post.excerpt ?? post.content?.slice(0, 150) ?? "" }} />
        <div className="mt-3 flex items-center justify-between">
          <span className="text-xs text-muted-foreground">{new Date(post.published_at ?? post.created_at).toLocaleDateString("id-ID")}</span>
          <Link href={`/berita/${slugOrId}`} className="text-sm underline">Baca</Link>
        </div>
      </div>
    </article>
  );
}
