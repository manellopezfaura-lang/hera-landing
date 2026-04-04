import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { MessageCircle, X } from "lucide-react"

const EMBED_URL = "https://www.107studio.es/embed/hera"

export function HeraChatWidget() {
  const [open, setOpen] = useState(false)

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="absolute bottom-16 right-0 w-[380px] h-[540px] rounded-2xl overflow-hidden border border-border shadow-2xl md:w-[400px] md:h-[580px]"
          >
            <iframe
              src={EMBED_URL}
              title="Hera — Demo en vivo"
              className="h-full w-full border-0"
              allow="clipboard-write"
            />
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        onClick={() => setOpen((prev) => !prev)}
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
  )
}
