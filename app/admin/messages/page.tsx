"use client";

import { useEffect, useState, useCallback } from "react";
import { Trash2, AlertCircle, Eye, Mail } from "lucide-react";

interface Message {
  id: number;
  firstName: string;
  lastName: string | null;
  email: string;
  message: string;
  read: boolean;
  createdAt: string;
}

export default function MessagesAdmin() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<Message | null>(null);

  const fetchMessages = useCallback(async () => {
    try {
      const res = await fetch("/api/contact");
      const data = await res.json();
      if (data.success) setMessages(data.data);
      else setError(data.error);
    } catch (err) {
      console.error("Failed to fetch:", err);
      setError("Failed to load messages.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchMessages();
  }, [fetchMessages]);

  const markRead = async (msg: Message) => {
    try {
      await fetch(`/api/contact/${msg.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ read: true }),
      });
      fetchMessages();
    } catch (err) {
      console.error("Mark read error:", err);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Delete this message?")) return;
    try {
      const res = await fetch(`/api/contact/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (data.success) {
        setSelected(null);
        fetchMessages();
      } else setError(data.error);
    } catch (err) {
      console.error("Delete error:", err);
      setError("Failed to delete.");
    }
  };

  if (loading)
    return (
      <div className="bg-white rounded-xl border p-8 text-center text-[#1a1550]/50">
        Loading...
      </div>
    );

  return (
    <div className="space-y-4">
      {error && (
        <div className="flex items-center gap-2 bg-red-50 text-red-700 rounded-lg p-3 text-sm border border-red-200">
          <AlertCircle className="w-4 h-4" /> {error}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-1 bg-white rounded-xl border border-[#1077A6]/10 overflow-hidden">
          <div className="bg-[#1077A6] text-white px-4 py-3 flex items-center gap-2">
            <Mail className="w-4 h-4" />
            <span className="font-semibold text-sm">
              Inbox ({messages.length})
            </span>
          </div>
          <div className="divide-y divide-[#1077A6]/8 max-h-[600px] overflow-y-auto">
            {messages.map((msg) => (
              <button
                key={msg.id}
                onClick={() => {
                  setSelected(msg);
                  if (!msg.read) markRead(msg);
                }}
                className={`w-full text-left px-4 py-3 hover:bg-[#f8f7fc] transition-colors ${selected?.id === msg.id ? "bg-[#1077A6]/5" : ""} ${!msg.read ? "border-l-3 border-[#f4c430]" : ""}`}
              >
                <div className="flex items-center justify-between">
                  <span
                    className={`text-sm ${!msg.read ? "font-bold text-[#1a1550]" : "text-[#1a1550]/70"}`}
                  >
                    {msg.firstName} {msg.lastName || ""}
                  </span>
                  {!msg.read && (
                    <span className="w-2 h-2 rounded-full bg-[#f4c430]" />
                  )}
                </div>
                <p className="text-xs text-[#1a1550]/50 truncate mt-1">
                  {msg.message}
                </p>
                <p className="text-[10px] text-[#1a1550]/30 mt-1">
                  {new Date(msg.createdAt).toLocaleDateString()}
                </p>
              </button>
            ))}
            {messages.length === 0 && (
              <div className="px-4 py-8 text-center text-[#1a1550]/40 text-sm">
                No messages yet.
              </div>
            )}
          </div>
        </div>

        <div className="lg:col-span-2 bg-white rounded-xl border border-[#1077A6]/10 p-6">
          {selected ? (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-display font-bold text-[#1a1550] text-lg">
                  {selected.firstName} {selected.lastName || ""}
                </h3>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleDelete(selected.id)}
                    className="p-1.5 rounded-lg hover:bg-red-50 text-red-500"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <div className="flex items-center gap-3 text-sm text-[#1a1550]/60">
                <span>{selected.email}</span>
                <span>·</span>
                <span>{new Date(selected.createdAt).toLocaleString()}</span>
              </div>
              <div className="bg-[#f8f7fc] rounded-lg p-4 text-sm text-[#1a1550]/80 leading-relaxed whitespace-pre-wrap">
                {selected.message}
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full py-16 text-[#1a1550]/30">
              <Eye className="w-8 h-8 mb-3" />
              <p className="text-sm">Select a message to view</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
