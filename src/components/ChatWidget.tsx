import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { MessageCircle, X, Send, Mic, Smile } from "lucide-react";
 
export default function ChatWidget() {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    { id: 1, from: "bot", text: t("chat.greeting") },
  ]);
  const endRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [open]);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, open]);

  const send = () => {
    const text = input.trim();
    if (!text) return;
    setMessages((m) => [...m, { id: Date.now(), from: "user", text }]);
    setInput("");
    // Fake reply (remove if not needed)
    setTimeout(() => {
      setMessages((m) => [
        ...m,
        { id: Date.now() + 1, from: "bot", text: t("chat.received") },
      ]);
    }, 600);
  };

  const onKey = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  };

  return (
    <div className="fixed bottom-4 left-4 z-50">
      {open && (
        <div
          className="mb-3 w-[360px] h-[520px] rounded-2xl overflow-hidden shadow-2xl ring-1 ring-black/5 bg-white dark:bg-gray-800
                     animate-[fadeIn_.15s_ease-out] flex flex-col"
          style={{ transformOrigin: "bottom right" }}
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-sky-500 to-blue-600 text-white">
            <div className="px-4 pt-3 flex gap-2">
               <button className="px-3 py-1 rounded-full bg-white/20 backdrop-blur text-white text-sm">
                 {t("chat.conversation")}
               </button>
               <button className="px-3 py-1 rounded-full hover:bg-white/15 text-white/90 text-sm">
                 {t("chat.helpCenter")}
               </button>
             </div>

            <div className="px-4 pb-3 pt-2">
              <div className="flex items-center gap-2">
                {/* Small round channels */}
                <div className="flex -space-x-2 rtl:space-x-reverse">
                  <span className="w-8 h-8 bg-white/20 rounded-full grid place-items-center">
                    <MessageCircle className="w-4 h-4" />
                  </span>
                  <span className="w-8 h-8 bg-white/20 rounded-full grid place-items-center">
                    <Smile className="w-4 h-4" />
                  </span>
                  <span className="w-8 h-8 bg-white/20 rounded-full grid place-items-center">
                    <Mic className="w-4 h-4" />
                  </span>
                </div>
              </div>

              <div className="mt-2 text-sm">
                {t("chat.haveQuestions")}
                <div className="text-white/80 text-xs mt-1 flex items-center gap-1">
                  <span className="inline-block w-2 h-2 bg-green-400 rounded-full" />{" "}
                  {t("chat.supportAvailable")}
                </div>
              </div>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 bg-gray-50 dark:bg-gray-700 p-3 overflow-y-auto">
            {messages.map((m) => (
              <div
                key={m.id}
                className={`mb-2 flex ${
                  m.from === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[80%] px-3 py-2 rounded-2xl text-sm
                    ${
                      m.from === "user"
                        ? "bg-blue-600 text-white rounded-br-none"
                        : "bg-white dark:bg-gray-600 text-gray-800 dark:text-gray-100 rounded-bl-none border border-gray-200 dark:border-gray-500"
                    }`}
                >
                  {m.text}
                </div>
              </div>
            ))}
            <div ref={endRef} />
          </div>

          {/* Input */}
          <div className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-600 p-2">
            <div className="flex items-end gap-2">
              <button
                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-600 text-gray-600 dark:text-gray-300"
                title={t("chat.microphone")}
              >
                <Mic className="w-5 h-5" />
              </button>
              <button
                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-600 text-gray-600 dark:text-gray-300"
                title={t("chat.emoji")}
              >
                <Smile className="w-5 h-5" />
              </button>

              <textarea
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={onKey}
                rows={1}
                placeholder={t("chat.typeMessage")}
                className="flex-1 resize-none max-h-24 px-3 py-2 rounded-xl border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500/40"
              />

              <button
                onClick={send}
                className="p-2 rounded-xl bg-blue-600 text-white hover:bg-blue-700 active:scale-95 transition"
                title={t("chat.send")}
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toggle button (open/close) */}
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Close chat" : "Open chat"}
        className={`h-14 w-14 rounded-full shadow-xl grid place-items-center text-white
                   transition transform active:scale-95
                   ${open ? "bg-blue-600" : "bg-blue-600 hover:bg-blue-700"}`}
      >
        {open ? (
          <X className="w-6 h-6" />
        ) : (
          <MessageCircle className="w-7 h-7" />
        )}
      </button>
    </div>
  );
}
