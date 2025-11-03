<?php

namespace App\Http\Controllers;

use App\Events\MessageRead;
use App\Events\MessageSent;
use App\Models\Message;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class ChatController extends Controller
{
    public function send_messsage(Request $request)
    {
        $message = Message::create(['sender_id' => Auth::id(), "receiver_id" => $request->receiver_id, "content" => $request->content, 'msg_status' => "sent"]);
        broadcast(new MessageSent($message));
        return response()->json($message);
    }
    public function blank_messages()
    {

        return Inertia::render("ChatPage", ['users' => User::where('id', '!=', Auth::id())->get(), 'is_blank' => true]);
    }

    public function user_messages($user_id)
    {
        //    $user = Auth::user();
        $user = User::find(Auth::id());
        $messages = $user->messagesWith($user_id)->get();
        $recev_user = User::find($user_id);

        return Inertia::render("ChatPage", ['is_blank' => false, 'users' => User::where('id', '!=', Auth::id())->get(), 'receive_user' => $recev_user, 'messages' => $messages, "current_user" => $user]);
    }
    public function mark_as_read(Message $msg)
    {
        $msg->update(["read_at" => now(), 'msg_status' => "readed"]);
        broadcast(new MessageRead($msg));
        return response()->json(["status" => "read"]);
    }
}
