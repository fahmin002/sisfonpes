import { Toaster } from '@/components/ui/sonner';
import AppLayoutTemplate from '@/layouts/app/app-sidebar-layout';
import { type BreadcrumbItem } from '@/types';
import { usePage } from '@inertiajs/react';
import { AlertTriangle, CheckCircle2, Pencil, Trash2 } from 'lucide-react';
import { useEffect, type ReactNode } from 'react';
import { toast } from 'sonner';

interface AppLayoutProps {
    children: ReactNode;
    breadcrumbs?: BreadcrumbItem[];
}

export default function AppLayout({
    children,
    breadcrumbs,
    ...props
}: AppLayoutProps) {
    const { flash } = usePage().props;

    useEffect(() => {
        if (flash?.type && flash?.message) {
            switch (flash.type) {
                case 'success':
                    toast.success(flash.message, {
                        icon: <CheckCircle2 className="text-green-500" />,
                        description: 'Aksi berhasil dilakukan 🎉',
                        id: 'success-toast',
                    });
                    break;

                case 'info':
                    toast.info(flash.message, {
                        icon: <Pencil className="text-blue-500" />,
                        description: 'Data berhasil diperbarui ✏️',
                        id: 'info-toast',
                    });
                    break;

                case 'warning':
                    toast.warning(flash.message, {
                        icon: <AlertTriangle className="text-yellow-500" />,
                        description: 'Periksa kembali tindakanmu ⚠️',
                        id: 'warning-toast',
                    });
                    break;

                case 'delete':
                    toast.warning(flash.message, {
                        icon: <Trash2 className="text-red-600" />,
                        description: 'Data telah dihapus 🗑️',
                        id: 'delete-toast',
                    });
                    break;

                case 'error':
                default:
                    toast.error(flash.message, {
                        icon: <AlertTriangle className="text-red-500" />,
                        description: 'Terjadi kesalahan, coba lagi 💥',
                        id: 'error-toast',
                    });
                    break;
            }
        }
    }, [flash?.type, flash?.message]);

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
