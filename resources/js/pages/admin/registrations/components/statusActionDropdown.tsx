import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { Check, RotateCcw, X } from "lucide-react";

export default function StatusActionDropdown({ reg, handleStatusChange }) {
    switch (reg.status) {
        case 'accepted':
            return (
                <>
                    <DropdownMenuItem
                        onClick={() => handleStatusChange("rejected", reg)}
                        className="text-red-600"
                    >
                        <X className="mr-2 h-4 w-4" />
                        Tolak Pendaftar
                    </DropdownMenuItem>
                    <DropdownMenuItem
                        onClick={() => handleStatusChange("pending", reg)}
                        className="text-yellow-600"
                    >
                        <RotateCcw className="mr-2 h-4 w-4" />
                        Reset Status
                    </DropdownMenuItem>
                </>
            );
            break;
        case 'rejected':
            return (
                <>
                    <DropdownMenuItem
                        onClick={() => handleStatusChange("accepted", reg)}
                        className="text-green-600"
                    >
                        <Check className="mr-2 h-4 w-4" />
                        Verifikasi (Terima)
                    </DropdownMenuItem>
                    <DropdownMenuItem
                        onClick={() => handleStatusChange("pending", reg)}
                        className="text-yellow-600"
                    >
                        <RotateCcw className="mr-2 h-4 w-4" />
                        Reset Status
                    </DropdownMenuItem>
                </>
            );
            break;
        case 'pending':
            return (
                <>
                    <DropdownMenuItem
                        onClick={() => handleStatusChange("accepted", reg)}
                        className="text-green-600"
                    >
                        <Check className="mr-2 h-4 w-4" />
                        Verifikasi (Terima)
                    </DropdownMenuItem>
                    <DropdownMenuItem
                        onClick={() => handleStatusChange("rejected", reg)}
                        className="text-red-600"
                    >
                        <X className="mr-2 h-4 w-4" />
                        Tolak Pendaftar
                    </DropdownMenuItem>
                </>
            );
        default:
            return null;
    }
}