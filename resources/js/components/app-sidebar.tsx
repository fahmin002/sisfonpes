import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import { path } from '@/lib/routePath';
import { type NavItem } from '@/types';
import { Link } from '@inertiajs/react';
import {
    Bell,
    BookOpen,
    FileText,
    Folder,
    Image,
    LayoutGrid,
    Mail,
    Menu,
    Newspaper,
    Settings,
    UserCog,
    Users,
} from 'lucide-react';
import AppLogo from './app-logo';

export const mainNavItems: NavItem[] = [
    {
        title: 'Dashboard',
        href: path('admin.dashboard'),
        icon: LayoutGrid,
    },
    {
        title: 'Menu Navigasi',
        href: path('admin.menus.index'),
        icon: Menu,
    },
    {
        title: 'Halaman Statis',
        href: path('admin.pages.index'),
        icon: FileText,
    },
    {
        title: 'Berita & Kegiatan',
        href: path('admin.posts.index'),
        icon: Newspaper,
    },
    {
        title: 'Galeri',
        href: path('admin.galleries.index'),
        icon: Image,
    },
    {
        title: 'Pengumuman',
        href: path('admin.announcements.index'),
        icon: Bell,
    },
    {
        title: 'Pendaftaran Santri',
        href: path('admin.registrations.index'),
        icon: Users,
    },
    {
        title: 'Pesan Masuk',
        href: path('admin.messages.index'),
        icon: Mail,
    },
    {
        title: 'Pengguna',
        href: path('admin.users.index'),
        icon: UserCog,
    },
    {
        title: 'Pengaturan Umum',
        href: path('admin.settings.index'),
        icon: Settings,
    },
];

const footerNavItems: NavItem[] = [
    {
        title: 'Repository',
        href: 'https://github.com/laravel/react-starter-kit',
        icon: Folder,
    },
    {
        title: 'Documentation',
        href: 'https://laravel.com/docs/starter-kits#react',
        icon: BookOpen,
    },
];

export function AppSidebar() {
    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href={path('admin.dashboard')} prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={mainNavItems} />
            </SidebarContent>

            <SidebarFooter>
                <NavFooter items={footerNavItems} className="mt-auto" />
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
