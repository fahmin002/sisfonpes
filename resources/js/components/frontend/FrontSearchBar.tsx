import { router } from "@inertiajs/react";
import { useState } from "react";
import { Search } from "lucide-react";

export default function FrontSearchBar({
    routeName,
    placeholder,
    initialValue = "",
}) {
    const [value, setValue] = useState(initialValue);

    const handleSubmit = (e) => {
        e.preventDefault();
        router.get(routeName, { search: value }, { preserveState: true });
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="w-full max-w-lg"
        >
            <div className="relative flex items-center">
                {/* Search Icon */}
                <Search className="absolute left-3 text-gray-400 h-5 w-5" />

                {/* Input */}
                <input
                    type="text"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    placeholder={placeholder}
                    className="
                        w-full pl-11 pr-4 py-3
                        rounded-2xl
                        border border-gray-300
                        shadow-sm
                        focus:border-emerald-600 focus:ring-emerald-600
                        transition-all
                        text-sm
                        dark:bg-gray-800 dark:border-gray-700 dark:text-white
                    "
                />

                {/* Button */}
                <button
                    type="submit"
                    className="
                        absolute right-2 px-4 py-1.5
                        bg-emerald-600 text-white text-sm
                        rounded-xl
                        hover:bg-emerald-700
                        transition-all
                        shadow-sm
                    "
                >
                    Cari
                </button>
            </div>
        </form>
    );
}
