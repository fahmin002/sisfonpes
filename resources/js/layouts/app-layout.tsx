import { Toaster } from '@/components/ui/sonner';
import AppLayoutTemplate from '@/layouts/app/app-sidebar-layout';
import { type BreadcrumbItem } from '@/types';
import { usePage } from '@inertiajs/react';
import { AlertTriangle, CheckCircle2 } from 'lucide-react';
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
        if (flash?.success) {
            toast.success(flash.success, {
                id: 'success-toast',
                icon: <CheckCircle2 className="text-green-500" />,
                duration: 3500, // auto-close in 3.5s
                description: 'Berhasil diproses 🎉',
            });
        }

        if (flash?.error) {
            toast.error(flash.error, {
                id: 'error-toast',
                icon: <AlertTriangle className="text-red-500" />,
                duration: 5000,
                description: 'Terjadi kesalahan, coba lagi.',
            });
        }
    }, [flash?.success, flash?.error]);

    return (
        <AppLayoutTemplate breadcrumbs={breadcrumbs} {...props}>
            {children}
            <Toaster
                position="top-right"
                richColors
                closeButton
                expand
                toastOptions={{
                    style: {
                        borderRadius: '0.75rem',
                        padding: '0.75rem 1rem',
                        boxShadow: '0 4px 10px rgba(0,0,0,0.08)',
                    },
                    classNames: {
                        success:
                            'bg-green-50 dark:bg-green-950 text-green-900 dark:text-green-100',
                        error: 'bg-red-50 dark:bg-red-950 text-red-900 dark:text-red-100',
                    },
                }}
            />
        </AppLayoutTemplate>
    );
}
