"use client"

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useSyncExternalStore,
  type ReactNode,
} from "react"
import {
  isLocale,
  messages,
  type Locale,
  type Messages,
} from "@/lib/i18n/messages"

const STORAGE_KEY = "nervlith-locale"

type LanguageContextValue = {
  locale: Locale
  setLocale: (locale: Locale) => void
  t: Messages
}

const LanguageContext = createContext<LanguageContextValue | null>(null)

function subscribe(onStoreChange: () => void) {
  const onStorage = (event: StorageEvent) => {
    if (event.key === STORAGE_KEY) onStoreChange()
  }
  window.addEventListener("storage", onStorage)
  return () => window.removeEventListener("storage", onStorage)
}

function readLocale(): Locale {
  const saved = localStorage.getItem(STORAGE_KEY)
  return isLocale(saved) ? saved : "en"
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const saved = useSyncExternalStore(subscribe, readLocale, () => "en" as const)
  const [override, setOverride] = useState<Locale | null>(null)
  const locale = override ?? saved

  useEffect(() => {
    const title = messages[locale].meta.title
    document.documentElement.lang = locale === "zh" ? "zh-CN" : "en"

    const apply = () => {
      if (document.title !== title) document.title = title
    }
    apply()
    const frame = requestAnimationFrame(apply)
    const timer = window.setTimeout(apply, 0)

    const titleEl = document.querySelector("title")
    const observer = titleEl
      ? new MutationObserver(apply)
      : null
    observer?.observe(titleEl!, {
      childList: true,
      characterData: true,
      subtree: true,
    })

    return () => {
      cancelAnimationFrame(frame)
      window.clearTimeout(timer)
      observer?.disconnect()
    }
  }, [locale])

  const setLocale = (next: Locale) => {
    localStorage.setItem(STORAGE_KEY, next)
    setOverride(next)
  }

  return (
    <LanguageContext.Provider value={{ locale, setLocale, t: messages[locale] }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error("useLanguage must be used within LanguageProvider")
  }
  return context
}
