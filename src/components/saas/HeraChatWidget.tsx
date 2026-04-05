import { useState, useRef, useEffect, useCallback, useMemo } from "react"
import { useChat } from "@ai-sdk/react"
import { DefaultChatTransport } from "ai"
import "../../hera.css"

const API_URL = "https://www.107studio.es/api/chat/hera"

function generateSessionId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`
}

export function HeraChatWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [hasInteracted, setHasInteracted] = useState(false)
  const [theme, setTheme] = useState<"dark" | "light">("light")
  const [showNudge, setShowNudge] = useState(false)
  const [input, setInput] = useState("")
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)
  const sessionId = useMemo(() => generateSessionId(), [])

  const transport = useMemo(
    () =>
      new DefaultChatTransport({
        api: API_URL,
        body: {
          sessionId,
          sourceUrl: typeof window !== "undefined" ? window.location.href : "",
          sourceLang: "es",
          userAgent: typeof navigator !== "undefined" ? navigator.userAgent : "",
        },
      }),
    [sessionId],
  )

  const { messages, sendMessage, status, error, regenerate } = useChat({ transport })

  const isLoading = status === "streaming" || status === "submitted"

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [])

  useEffect(() => {
    scrollToBottom()
    if (isOpen) {
      const isMobile = window.matchMedia("(max-width: 640px)").matches
      if (!isMobile && inputRef.current) {
        inputRef.current.focus()
      }
    }
  }, [messages, scrollToBottom, isOpen])

  useEffect(() => {
    if (isOpen) {
      const isMobile = window.matchMedia("(max-width: 640px)").matches
      if (!isMobile && inputRef.current) {
        inputRef.current.focus()
      }
      if (isMobile) {
        document.body.classList.add("hera-body-lock")
      }
    } else {
      document.body.classList.remove("hera-body-lock")
    }
    return () => {
      document.body.classList.remove("hera-body-lock")
    }
  }, [isOpen])

  const nudgeRef = useRef<HTMLDivElement>(null)
  const nudgeDismissed = useRef(false)

  const dismissNudge = useCallback(() => {
    if (nudgeDismissed.current) return
    nudgeDismissed.current = true
    if (nudgeRef.current) {
      nudgeRef.current.style.opacity = "0"
      nudgeRef.current.style.transform = "translateY(4px)"
      nudgeRef.current.style.transition = "opacity 0.5s ease, transform 0.5s ease"
      setTimeout(() => setShowNudge(false), 500)
    } else {
      setShowNudge(false)
    }
  }, [])

  // Nudge — show after 3s every visit, auto-dismiss after 8s
  useEffect(() => {
    const showTimer = setTimeout(() => {
      nudgeDismissed.current = false
      setShowNudge(true)
    }, 3000)
    return () => clearTimeout(showTimer)
  }, [])

  useEffect(() => {
    if (!showNudge) return
    const hideTimer = setTimeout(() => dismissNudge(), 8000)
    // Delay scroll listeners so page-load animations don't trigger dismiss
    const onUserScroll = () => dismissNudge()
    const attachTimer = setTimeout(() => {
      window.addEventListener("wheel", onUserScroll, { passive: true, once: true })
      window.addEventListener("touchmove", onUserScroll, { passive: true, once: true })
    }, 1000)
    return () => {
      clearTimeout(hideTimer)
      clearTimeout(attachTimer)
      window.removeEventListener("wheel", onUserScroll)
      window.removeEventListener("touchmove", onUserScroll)
    }
  }, [showNudge, dismissNudge])

  const handleToggle = useCallback(() => {
    setIsOpen((prev) => {
      const next = !prev
      if (!hasInteracted) setHasInteracted(true)
      return next
    })
    if (showNudge) dismissNudge()
  }, [hasInteracted, showNudge, dismissNudge])

  // Listen for external "open Hera" requests (e.g. hero demo button)
  useEffect(() => {
    const onOpen = () => {
      if (!isOpen) handleToggle()
    }
    window.addEventListener("hera:open", onOpen)
    return () => window.removeEventListener("hera:open", onOpen)
  }, [isOpen, handleToggle])

  const handleSend = () => {
    const trimmed = input.trim()
    if (!trimmed) return
    sendMessage({ text: trimmed })
    setInput("")
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  const sparkle = "✦"

  return (
    <>
      {/* Chat panel */}
      <div
        className={`hera-panel ${isOpen ? "hera-panel--open" : ""} ${hasInteracted && !isOpen ? "hera-panel--closed" : ""} ${theme === "light" ? "hera-light" : ""}`}
        role="dialog"
        aria-label="Chat con Hera"
        aria-hidden={!isOpen}
      >
        {/* Header */}
        <div className="hera-header">
          <div className="hera-header__info">
            <div className="hera-header__avatar">{sparkle}</div>
            <div>
              <div className="hera-header__name">Hera</div>
              <div className="hera-header__status">Online</div>
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
          <button
            className="hera-header__close"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            aria-label={theme === "dark" ? "Cambiar a modo claro" : "Cambiar a modo oscuro"}
          >
            {theme === "dark" ? (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.5"/>
                <path d="M12 2v2m0 16v2M4.93 4.93l1.41 1.41m11.32 11.32l1.41 1.41M2 12h2m16 0h2M4.93 19.07l1.41-1.41m11.32-11.32l1.41-1.41" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            ) : (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            )}
          </button>
          <button
            className="hera-header__close"
            onClick={handleToggle}
            aria-label="Cerrar chat"
          >
            <svg width="20" height="20" viewBox="0 0 16 16" fill="none">
              <path
                d="M12 4L4 12M4 4l8 8"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </button>
          </div>
        </div>

        {/* Messages */}
        <div className="hera-messages">
          {messages.length === 0 && (
            <div className="hera-empty">
              <div className="hera-empty__icon">{sparkle}</div>
              <p className="hera-empty__text">
                Hola, soy Hera, tu asistente virtual. ¿En qué puedo ayudarte hoy?
              </p>
            </div>
          )}
          {messages.map((message) => {
            const isUser = message.role === "user"
            const textContent = message.parts
              ?.filter((p): p is { type: "text"; text: string } => p.type === "text")
              .map((p) => p.text)
              .join("") ?? ""

            const displayText = textContent
              .replace(/<LEAD_DATA>[\s\S]*?<\/LEAD_DATA>/g, "")
              .trim()

            if (!displayText) return null

            return (
              <div
                key={message.id}
                className={`hera-msg ${isUser ? "hera-msg--user" : "hera-msg--assistant"}`}
              >
                {!isUser && <div className="hera-msg__avatar">{sparkle}</div>}
                <div
                  className={`hera-msg__bubble ${isUser ? "hera-msg__bubble--user" : "hera-msg__bubble--assistant"}`}
                >
                  {displayText}
                </div>
              </div>
            )
          })}
          {isLoading && (
            <div className="hera-msg hera-msg--assistant">
              <div className="hera-msg__avatar" style={{ animation: "hera-spin-slow 2s linear infinite" }}>{sparkle}</div>
              <div className="hera-msg__bubble hera-msg__bubble--assistant">
                <span className="hera-typing">
                  <span className="hera-typing__dot" />
                  <span className="hera-typing__dot" />
                  <span className="hera-typing__dot" />
                </span>
              </div>
            </div>
          )}
          {error && !isLoading && (
            <div className="hera-msg hera-msg--assistant">
              <div className="hera-msg__avatar">{sparkle}</div>
              <div className="hera-error">
                <p className="hera-error__text">No he podido responder. ¿Lo intentamos de nuevo?</p>
                <button
                  className="hera-error__retry"
                  type="button"
                  onClick={() => regenerate()}
                  aria-label="Reintentar"
                >
                  Reintentar
                </button>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="hera-input" role="form">
          <textarea
            ref={inputRef}
            className="hera-input__field"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Escribe tu mensaje..."
            rows={1}
            aria-label="Escribe tu mensaje"
          />
          <button
            className="hera-input__send"
            type="button"
            onClick={handleSend}
            disabled={!input.trim()}
            aria-label="Enviar mensaje"
          >
            <svg width="20" height="20" viewBox="0 0 16 16" fill="none">
              <path
                d="M14 2L7 9M14 2l-4.5 12-2-5.5L2 6.5 14 2z"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Nudge tooltip */}
      {showNudge && !isOpen && (
        <div ref={nudgeRef} className="hera-nudge" onClick={dismissNudge}>
          <span className="hera-nudge__text">Prueba Hera en vivo <span className="hera-nudge__sparkle">✦</span></span>
          <span className="hera-nudge__arrow" />
        </div>
      )}

      {/* Floating trigger */}
      <button
        className={`hera-trigger ${isOpen ? "hera-trigger--active" : ""}`}
        onClick={handleToggle}
        aria-label={isOpen ? "Cerrar chat" : "Abrir chat con Hera"}
        aria-expanded={isOpen}
      >
        <span className="hera-trigger__icon hera-trigger__icon--chat">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
            <path
              d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
        <span className="hera-trigger__icon hera-trigger__icon--close">
          <svg width="20" height="20" viewBox="0 0 16 16" fill="none">
            <path
              d="M12 4L4 12M4 4l8 8"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        </span>
      </button>
    </>
  )
}
