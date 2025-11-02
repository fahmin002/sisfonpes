import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import AppLayout from '@/layouts/app-layout'
import { type BreadcrumbItem } from '@/types'
import { Head, Link, router } from '@inertiajs/react'
import { Eye, Trash2 } from 'lucide-react'
import { cn } from '@/lib/utils'
import { route } from 'ziggy-js'

export default function Index({ messages }) {
  const breadcrumbs: BreadcrumbItem[] = [
    {
      title: 'Pesan Masuk',
      href: '/admin/messages',
    },
  ]

  const handleDelete = (message) => {
    if (confirm(`Hapus pesan dari "${message.name}"?`)) {
      router.delete(route('admin.messages.destroy', message.id))
    }
  }

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Pesan Masuk" />
      <div className="p-4">
        <div className="mb-4 flex items-center justify-between">
          <h1 className="text-xl font-semibold">Pesan Masuk</h1>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Daftar Pesan</CardTitle>
          </CardHeader>
          <CardContent>
            {messages.length > 0 ? (
              <TooltipProvider>
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="py-2 text-left">Nama</th>
                      <th className="py-2 text-left">Email</th>
                      <th className="py-2 text-left">Subjek</th>
                      <th className="py-2 text-left">Status</th>
                      <th className="py-2 text-right">Aksi</th>
                    </tr>
                  </thead>
                  <tbody>
                    {messages.map((msg) => (
                      <tr
                        key={msg.id}
                        className={cn(
                          'border-b transition-colors hover:bg-muted/40',
                          !msg.is_read && 'bg-muted/30'
                        )}
                      >
                        <td className="py-2">{msg.name}</td>
                        <td className="py-2 text-muted-foreground">
                          {msg.email}
                        </td>
                        <td className="py-2">{msg.subject || '-'}</td>
                        <td className="py-2">
                          <Badge
                            variant={msg.is_read ? 'secondary' : 'success'}
                            className="font-medium"
                          >
                            {msg.is_read ? 'Dibaca' : 'Baru'}
                          </Badge>
                        </td>
                        <td className="space-x-1 py-2 text-right">
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Link
                                href={route('admin.messages.show', msg.id)}
                              >
                                <Button variant="ghost" size="icon">
                                  <Eye className="h-4 w-4 text-blue-600" />
                                </Button>
                              </Link>
                            </TooltipTrigger>
                            <TooltipContent>Lihat</TooltipContent>
                          </Tooltip>

                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => handleDelete(msg)}
                              >
                                <Trash2 className="h-4 w-4 text-red-600" />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>Hapus</TooltipContent>
                          </Tooltip>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </TooltipProvider>
            ) : (
              <p className="text-sm text-muted-foreground">
                Belum ada pesan masuk.
              </p>
            )}
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  )
}
