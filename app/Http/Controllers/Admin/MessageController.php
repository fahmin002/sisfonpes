<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Message;
use Illuminate\Http\Request;
use Inertia\Inertia;

class MessageController extends Controller
{
    public function index(Request $request)
    {
        $query = Message::query();
    
        if ($search = $request->get('search')) {
            $query->where('name', 'like', "%{$search}%")
                ->orWhere('email', 'like', "%{$search}%")
                ->orWhere('subject', 'like', "%{$search}%")
                ->orWhere('message', 'like', "%{$search}%");
        }

        $messages = $query->orderByDesc('created_at')->paginate(10)->withQueryString();

        return Inertia::render('admin/messages/index', [
            'messages' => $messages,
            'filters' => $request->only('search')
        ]);
    }

    public function show(Message $message)
    {
        if (!$message->is_read) {
            $message->update(['is_read' => true]);
        }

        return Inertia::render('admin/messages/show', [
            'message' => $message,
        ]);
    }

    public function destroy(Message $message)
    {
        $message->delete();

        return redirect()->route('admin.messages.index')->with([
            'message' => 'Pesan berhasil dihapus.',
            'type' => 'delete',
        ]);
    }
}
