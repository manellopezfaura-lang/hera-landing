import { useState, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { MessageCircle, X, Loader2 } from "lucide-react"

const EMBED_URL = "https://www.107studio.es/embed/hera?inline"

export function HeraChatWidget() {
  const [open, setOpen] = useState(false)
  const [loaded, setLoaded] = useState(false)
  const [mounted, setMounted] = useState(false)

  const handleLoad = useCallback(() => setLoaded(true), [])

  const handleToggle = useCallback(() => {
    setOpen((prev) => {
      if (!prev) setMounted(true)
      return !prev
    })
  }, [])

  return (
    <>
      {/* Mobile fullscreen overlay + desktop popover */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="fixed inset-0 z-50 bg-white md:inset-auto md:bottom-24 md:right-6 md:w-[400px] md:h-[580px] md:rounded-2xl md:border md:border-border md:shadow-2xl"
          >
            {!loaded && (
              <div className="flex h-full w-full items-center justify-center">
                <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile close button — above iframe */}
      {open && (
        <button
          onClick={handleToggle}
          className="fixed top-3 right-3 z-[53] flex h-8 w-8 items-center justify-center rounded-full bg-black/10 text-foreground/70 backdrop-blur-sm md:hidden"
          aria-label="Cerrar chat"
        >
          <X className="h-4 w-4" />
        </button>
      )}

      {/* Iframe stays mounted once opened — preserves conversation */}
      {mounted && (
        <iframe
          src={EMBED_URL}
          title="Hera — Demo en vivo"
          className="fixed inset-0 z-[51] h-full w-full border-0 md:inset-auto md:bottom-24 md:right-6 md:w-[400px] md:h-[580px] md:rounded-2xl"
          style={{
            opacity: open && loaded ? 1 : 0,
            pointerEvents: open ? "auto" : "none",
          }}
          allow="clipboard-write"
          onLoad={handleLoad}
        />
      )}

      {/* Floating toggle button — hidden on mobile when chat is open */}
      <div className={`fixed bottom-6 right-6 z-[52] ${open ? "max-md:hidden" : ""}`}>
        <motion.button
          onClick={handleToggle}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex h-14 w-14 items-center justify-center rounded-full bg-saas-accent text-white shadow-lg transition-colors duration-200 hover:brightness-110"
          aria-label={open ? "Cerrar chat" : "Abrir chat con Hera"}
        >
          <AnimatePresence mode="wait" initial={false}>
            {open ? (
              <motion.div
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.15 }}
              >
                <X className="h-6 w-6" />
              </motion.div>
            ) : (
              <motion.div
                key="open"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.15 }}
              >
                <MessageCircle className="h-6 w-6" />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>
      </div>
    </>
  )
}
