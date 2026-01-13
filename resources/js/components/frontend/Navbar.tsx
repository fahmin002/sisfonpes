import { useState } from "react";
import { Menu, X, ChevronDown, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Link, usePage } from "@inertiajs/react";

interface MenuItem {
  id: number;
  name: string;
  url: string;
  parent_id: number | null;
  children?: MenuItem[];
  is_active: boolean | number | string;
}

function buildMenuTree(menus: MenuItem[]) {
  const map = new Map<number, MenuItem>();
  menus.forEach((m) => map.set(m.id, { ...m, children: [] }));

  const roots: MenuItem[] = [];

  menus.forEach((m) => {
    const item = map.get(m.id)!;

    if (m.parent_id) {
      const parent = map.get(m.parent_id);
      if (parent) parent.children?.push(item);
    } else {
      roots.push(item);
    }
  });

  return roots;
}

export function getActiveMenuTree(menus: MenuItem[]) {
  const activeMenus = menus.filter(
    (m) => m.is_active === 1 || m.is_active === "1" || m.is_active === true
  );

  return buildMenuTree(activeMenus);
}

export default function Navbar() {
  const { props } = usePage();
  const settings: Record<string, string> = props.settings || {};
  const menus: MenuItem[] = props.menus || [];
  const menuTree = getActiveMenuTree(menus);

  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="border-b border-gray-200 bg-white/90 backdrop-blur supports-[backdrop-filter]:bg-white/60 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between py-3 px-4 md:px-8">

        {/* Brand */}
        <Link
          href="/"
          className="flex items-center gap-2 font-semibold text-emerald-800"
        >
          <img
            src={`/storage/${settings.site_logo}`}
            alt="Logo"
            className="h-8 w-8 rounded-full"
          />
          <span className="text-lg font-bold tracking-wide">
            {settings.site_name || "Darul Amin"}
          </span>
        </Link>

        {/* Menu button (mobile) */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-emerald-700 hover:text-emerald-900"
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>

        {/* Menu items */}
        <ul
          className={cn(
            "md:flex md:items-center md:gap-6 text-sm font-medium text-gray-700",
            "absolute md:static left-0 top-14 md:top-auto w-full md:w-auto bg-white md:bg-transparent shadow-md md:shadow-none",
            menuOpen ? "block" : "hidden md:flex"
          )}
        >
          {menuTree.map((menu, i) => (
            <li key={i} className="group relative px-4 md:px-0">
              {!menu.children || menu.children.length === 0 ? (
                <Link
                  href={menu.url}
                  className="block py-3 md:py-0 text-gray-700 hover:text-emerald-700 transition-colors"
                >
                  {menu.name}
                </Link>
              ) : (
                <>
                  <button className="flex items-center gap-1 py-3 md:py-0 hover:text-emerald-700 transition-colors">
                    {menu.name}
                    <ChevronDown
                      size={16}
                      className="text-gray-400 group-hover:text-emerald-700 transition"
                    />
                  </button>

                  {/* Submenu level 1 */}
                  <ul className="hidden group-hover:block absolute md:min-w-[200px] bg-white shadow-lg border border-gray-100 rounded-md py-2 z-40">
                    {menu.children.map((child, j) => (
                      <li key={j} className="relative group/item">
                        <Link
                          href={child.url}
                          className="flex items-center justify-between px-4 py-2 hover:bg-emerald-50 hover:text-emerald-700 transition"
                        >
                          <span>{child.name}</span>
                          {child.children && child.children.length > 0 && (
                            <ChevronRight
                              size={14}
                              className="text-gray-400 group-hover/item:text-emerald-700"
                            />
                          )}
                        </Link>

                        {/* Submenu level 2 */}
                        {child.children && child.children.length > 0 && (
                          <ul className="hidden group-hover/item:block absolute left-full top-0 ml-1 bg-white border border-gray-100 rounded-md shadow-lg py-2 min-w-[200px] z-50">
                            {child.children.map((grand, k) => (
                              <li key={k}>
                                <Link
                                  href={grand.url}
                                  className="block px-4 py-2 hover:bg-emerald-50 hover:text-emerald-700 transition"
                                >
                                  {grand.name}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        )}
                      </li>
                    ))}
                  </ul>
                </>
              )}
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
