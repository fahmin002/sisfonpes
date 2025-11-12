import { Button } from '@/components/ui/button';
import { router } from '@inertiajs/react';

interface PaginationLinksProps {
  links: {
    url: string | null;
    label: string;
    active: boolean;
  }[];
}

export default function PaginationLinks({ links }: PaginationLinksProps) {
  if (!links || links.length <= 3) return null; // kalau cuma 1 halaman, gak usah tampil

  return (
    <div className="mt-4 flex justify-end space-x-1">
      {links.map((link, i) => (
        <Button
          key={i}
          size="sm"
          variant={link.active ? 'default' : 'outline'}
          disabled={!link.url}
          onClick={() =>
            link.url &&
            router.get(link.url, {}, {
              preserveState: true,
              preserveScroll: true,
            })
          }
          dangerouslySetInnerHTML={{
            __html: link.label
              .replace('&laquo;', '«')
              .replace('&raquo;', '»'),
          }}
        />
      ))}
    </div>
  );
}
