import { Input } from '@/components/ui/input';
import { useState, useEffect } from 'react';
import { router } from '@inertiajs/react';
import { Search } from 'lucide-react';
import useDidUpdateEffect from '@/hooks/use-didupdate-effect';

interface SearchBarProps {
    routeName: string; // contoh: 'admin.menus.index'
    placeholder?: string;
    initialValue?: string;
    extraParams?: Record<string, any>; // filter tambahan (optional)
}

export default function SearchBar({
    routeName,
    placeholder = 'Cari data...',
    initialValue = '',
    extraParams = {},
}: SearchBarProps) {
    const [query, setQuery] = useState(initialValue);

    // debounce biar gak langsung nge-trigger request
    useDidUpdateEffect(() => {
        const delayDebounce = setTimeout(() => {
            router.get(
                route(routeName),
                { search: query, ...extraParams },
                { preserveScroll: true, preserveState: true, replace: true }
            );
        }, 400);

        return () => clearTimeout(delayDebounce);
    }, [query]);

    return (
        <div className="relative max-w-sm">
            <Input
                type="text"
                value={query}
                placeholder={placeholder}
                onChange={(e) => setQuery(e.target.value)}
                className="pr-8"
            />
            <span className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground">
                <Search className="mr-2 h-4 w-4" />
            </span>
        </div>
    );
}
