import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import AppLayout from '@/layouts/app-layout'
import { type BreadcrumbItem } from '@/types'
import { Head, Link } from '@inertiajs/react'
import { ArrowLeft } from 'lucide-react'

export default function Show({ message }) {
  const breadcrumbs: BreadcrumbItem[] = [
    {
      title: 'Pesan Masuk',
      href: '/admin/messages',
    },
    {
      title: 'Detail Pesan',
      href: `/admin/messages/${message.id}`,
    },
  ]

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title={`Pesan dari ${message.name}`} />

      <div className="mx-auto my-auto w-full max-w-4xl rounded-xl border border-border/50 bg-card p-6 shadow-sm">
        <div className="mb-4 flex items-center justify-between">
          <h1 className="text-xl font-semibold">
            Pesan dari {message.name}
          </h1>
          <Link href="/admin/messages">
            <Button variant="outline">
              <ArrowLeft className="mr-2 h-4 w-4" /> Kembali
            </Button>
          </Link>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Detail Pesan</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label>Nama</Label>
              <p className="mt-1 text-sm text-muted-foreground">{message.name}</p>
            </div>
            <div>
              <Label>Email</Label>
              <p className="mt-1 text-sm text-muted-foreground">{message.email}</p>
            </div>
            <div>
              <Label>Subjek</Label>
              <p className="mt-1 text-sm text-muted-foreground">{message.subject || '-'}</p>
            </div>
            <div>
              <Label>Pesan</Label>
              <div className="mt-2 whitespace-pre-line rounded-md border p-3 text-sm">
                {message.message}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  )
}
