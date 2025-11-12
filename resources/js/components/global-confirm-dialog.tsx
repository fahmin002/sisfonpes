"use client"

import * as React from "react"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"

interface GlobalConfirmDialogProps {
  /** Tombol yang akan memicu dialog */
  trigger?: React.ReactNode

  /** Judul dialog */
  title?: string

  /** Deskripsi dialog */
  description?: string

  /** Teks tombol konfirmasi */
  confirmText?: string

  /** Teks tombol batal */
  cancelText?: string

  /** Varian tombol konfirmasi */
  confirmVariant?: "default" | "destructive" | "outline"

  /** Fungsi yang dijalankan saat dikonfirmasi */
  onConfirm?: () => void | Promise<void>

  /** Apakah dialog sedang loading (async confirm) */
  loading?: boolean
}

/**
 * 🔥 Komponen Global Confirm Dialog (reusable)
 * Contoh:
 * <GlobalConfirmDialog
 *   trigger={<Button variant="destructive">Hapus</Button>}
 *   title="Yakin ingin menghapus?"
 *   description="Tindakan ini tidak dapat dibatalkan."
 *   confirmText="Hapus"
 *   confirmVariant="destructive"
 *   onConfirm={() => handleDelete(id)}
 * />
 */
export function GlobalConfirmDialog({
  trigger,
  title = "Konfirmasi",
  description = "Apakah Anda yakin ingin melanjutkan tindakan ini?",
  confirmText = "Ya",
  cancelText = "Batal",
  confirmVariant = "default",
  onConfirm,
  loading = false,
}: GlobalConfirmDialogProps) {
  const [open, setOpen] = React.useState(false)
  const [isLoading, setIsLoading] = React.useState(loading)

  const handleConfirm = async () => {
    if (onConfirm) {
      try {
        setIsLoading(true)
        await onConfirm()
      } finally {
        setIsLoading(false)
        setOpen(false)
      }
    } else {
      setOpen(false)
    }
  }

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      {trigger && <AlertDialogTrigger asChild>{trigger}</AlertDialogTrigger>}
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isLoading}>{cancelText}</AlertDialogCancel>
          <AlertDialogAction
            disabled={isLoading}
            onClick={handleConfirm}
            asChild
          >
            <Button variant={confirmVariant}>
              {isLoading ? "Memproses..." : confirmText}
            </Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
