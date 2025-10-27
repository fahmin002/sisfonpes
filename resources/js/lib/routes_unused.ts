// export const dashboard = () => "/admin/dashboard";

// export const posts = {
//   index: () => "/admin/posts",
//   create: () => "/admin/posts/create",
//   edit: (id: number) => `/admin/posts/${id}/edit`,
// };
// resources/js/lib/routes.ts

/**
 * Semua definisi route frontend dan admin
 * agar gampang dikelola dan tidak perlu hardcode URL.
 * 
 * Contoh penggunaan:
 * <Link href={routes.admin.dashboard()}>Dashboard</Link>
 */

export const routes = {
  home: () => "/",
  tentang: () => "/tentang",
  program: () => "/program-pendidikan",
  berita: () => "/berita",
  galeri: () => "/galeri",
  pendaftaran: () => "/pendaftaran",
  kontak: () => "/kontak",
  pengumuman: () => "/pengumuman",

  admin: {
    dashboard: () => "/admin/dashboard",
    posts: {
      index: () => "/admin/posts",
      create: () => "/admin/posts/create",
      edit: (id: number | string) => `/admin/posts/${id}/edit`,
      show: (id: number | string) => `/admin/posts/${id}`,
    },
    galeri: {
      index: () => "/admin/galeri",
      create: () => "/admin/galeri/create",
      edit: (id: number | string) => `/admin/galeri/${id}/edit`,
    },
    kontak: {
      index: () => "/admin/kontak",
      show: (id: number | string) => `/admin/kontak/${id}`,
    },
    pendaftar: {
      index: () => "/admin/pendaftar",
      show: (id: number | string) => `/admin/pendaftar/${id}`,
    },
  },
};
