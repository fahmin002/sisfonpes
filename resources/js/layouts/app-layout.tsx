import { Toaster } from '@/components/ui/sonner';
import AppLayoutTemplate from '@/layouts/app/app-sidebar-layout';
import { initTheme } from '@/themes';
import { type BreadcrumbItem } from '@/types';
import { router, usePage } from '@inertiajs/react';
import { AlertTriangle, CheckCircle2, Pencil, Trash2 } from 'lucide-react';
import { useEffect, type ReactNode } from 'react';
import { toast } from 'sonner';

interface AppLayoutProps {
  children: ReactNode;
  breadcrumbs?: BreadcrumbItem[];
}

const showToast = (type: string, message: string) => {
  switch (type) {
    case 'success':
      toast.success(message, {
        icon: <CheckCircle2 className="text-green-500" />,
        description: 'Aksi berhasil dilakukan 🎉',
      });
      break;

    case 'info':
      toast.info(message, {
        icon: <Pencil className="text-blue-500" />,
        description: 'Data berhasil diperbarui ✏️',
      });
      break;

    case 'warning':
      toast.warning(message, {
        icon: <AlertTriangle className="text-yellow-500" />,
        description: 'Periksa kembali tindakanmu ⚠️',
      });
      break;

    case 'delete':
      toast.warning(message, {
        icon: <Trash2 className="text-red-600" />,
        description: 'Data telah dihapus 🗑️',
      });
      break;

    case 'error':
    default:
      toast.error(message, {
        icon: <AlertTriangle className="text-red-500" />,
        description: 'Terjadi kesalahan, coba lagi 💥',
      });
      break;
  }
};

function autoSync(router, currentUrl) {
  if (['/admin/pages', '/admin/menus'].includes(currentUrl)) {
    setTimeout(() => {
      router.reload({ only: ['menus', 'pages'] });
    }, 150);
  }
}

export default function AppLayout({
  children,
  breadcrumbs,
  ...props
}: AppLayoutProps) {
  const { flash, flash_messages } = usePage().props as {
    flash?: { type?: string; message?: string };
    flash_messages?: { type: string; message: string }[];
  };
  const currentUrl = window.location.pathname;
  useEffect(() => {
    initTheme();
    autoSync(router, currentUrl);
    // ✅ 1️⃣ Handle multiple flash messages
    if (Array.isArray(flash_messages) && flash_messages.length > 0) {
      flash_messages.forEach(({ type, message }) => showToast(type, message));
      return;
    }

    // ✅ 2️⃣ Fallback untuk single flash (compatibility)
    if (flash?.type && flash?.message) {
      showToast(flash.type, flash.message);
    }


  }, [flash, flash_messages]);

  return (
    <AppLayoutTemplate breadcrumbs={breadcrumbs} {...props}>
      {children}
      <Toaster
        position="top-right"
        richColors
        closeButton
        expand
        toastOptions={{
          duration: 4000,
          style: {
            borderRadius: '0.75rem',
            padding: '0.75rem 1rem',
            boxShadow: '0 4px 10px rgba(0,0,0,0.08)',
          },
        }}
      />
    </AppLayoutTemplate>
  );
}
