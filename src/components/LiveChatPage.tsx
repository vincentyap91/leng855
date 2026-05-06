import { FormEvent, useEffect, useMemo, useRef, useState } from "react";
import { assets } from "../data/assets";

type ChatMessage = {
  id: string;
  type: "system" | "support" | "user";
  name: string;
  timestamp: string;
  body: string;
};

const initialMessages: ChatMessage[] = [
  {
    id: "system-1",
    type: "system",
    name: "System",
    timestamp: "29 Apr, 14:04",
    body: "Welcome to Leng855! \n🎁🎁🎁\n🏆🏆🏆\nThe most trusted and biggest casino on earth!\n💎💎💎",
  },
  {
    id: "system-2",
    type: "system",
    name: "System",
    timestamp: "29 Apr, 14:04",
    body: "Congratulations test123! 🥳 Your registration was successful. Welcome to Leng855!",
  },
  {
    id: "system-3",
    type: "system",
    name: "System",
    timestamp: "29 Apr, 14:04",
    body: "Welcome to Leng855! \n🎁🎁🎁\n🏆🏆🏆\nThe most trusted and biggest casino on earth!\n💎💎💎",
  },
];

function AttachmentIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden>
      <path
        d="M7.2 12.8l5.9-5.9a3.2 3.2 0 014.5 4.5l-7.1 7.1a5 5 0 01-7.1-7.1l7.7-7.7"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function SendIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden>
      <path
        d="M4 12L20 4l-4 16-4.3-6.2L4 12z"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M11.7 13.8L20 4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function MicIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden>
      <path
        d="M12 14a3 3 0 003-3V6a3 3 0 10-6 0v5a3 3 0 003 3z"
        fill="currentColor"
      />
      <path
        d="M6 11a6 6 0 0012 0M12 17v4M9 21h6"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function ChatMessageRow({ message }: { message: ChatMessage }) {
  const isUser = message.type === "user";
  const isSystem = message.type === "system";

  return (
    <article className={["live-chat-message", `live-chat-message--${message.type}`].join(" ")}>
      {!isUser ? (
        <div className="live-chat-message__avatar" aria-hidden>
          {isSystem ? (
            <img src={assets.chatAvatar} alt="" />
          ) : (
            <img src={assets.chatAvatar} alt="" />
          )}
        </div>
      ) : null}

      <div className="live-chat-message__content">
        <div className="live-chat-message__bubble">
          <div className="live-chat-message__meta">
            <span>{message.name}</span>
            <time>{message.timestamp}</time>
          </div>
          {message.body}
        </div>
      </div>
    </article>
  );
}

function getTimestamp(): string {
  const now = new Date();
  const day = String(now.getDate()).padStart(2, "0");
  const month = now.toLocaleString("en", { month: "short" });
  const hour = String(now.getHours()).padStart(2, "0");
  const minute = String(now.getMinutes()).padStart(2, "0");
  return `${day} ${month}, ${hour}:${minute}`;
}

export function LiveChatPage() {
  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages);
  const [draft, setDraft] = useState("");
  const scrollRef = useRef<HTMLDivElement | null>(null);

  const hasMessages = messages.length > 0;
  const trimmedDraft = draft.trim();
  const statusText = useMemo(() => "Online Support", []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
  }, [messages.length]);

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!trimmedDraft) return;
    setMessages((current) => [
      ...current,
      {
        id: `user-${Date.now()}`,
        type: "user",
        name: "You",
        timestamp: getTimestamp(),
        body: trimmedDraft,
      },
    ]);
    setDraft("");
  };

  return (
    <section className="live-chat-page" aria-labelledby="live-chat-title">
      <div className="live-chat-shell">
        <div className="live-chat-body" ref={scrollRef}>
          <div className="live-chat-body-inner">
            {hasMessages ? (
              <>
                <div className="live-chat-day-divider">Wesnesday</div>
                <div className="live-chat-message-list">
                  {messages.map((message) => (
                    <ChatMessageRow key={message.id} message={message} />
                  ))}
                </div>
              </>
            ) : (
              <div className="live-chat-empty">Start your conversation with support</div>
            )}
          </div>

          <button
            type="button"
            className="live-chat-scroll-bottom"
            onClick={() => scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" })}
            aria-label="Scroll to bottom"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M7 13l5 5 5-5M7 6l5 5 5-5" />
            </svg>
          </button>
        </div>

        <form className="live-chat-input-bar" onSubmit={submit}>
          <button type="button" className="live-chat-icon-button" aria-label="Attach file">
            <AttachmentIcon />
          </button>
          <input
            value={draft}
            onChange={(event) => setDraft(event.target.value)}
            placeholder="Type a message"
            aria-label="Type a message"
          />
          <button
            type={trimmedDraft ? "submit" : "button"}
            className="live-chat-icon-button live-chat-icon-button--submit"
            aria-label={trimmedDraft ? "Send message" : "Record voice message"}
          >
            {trimmedDraft ? <SendIcon /> : <MicIcon />}
          </button>
        </form>
      </div>
    </section>
  );
}
