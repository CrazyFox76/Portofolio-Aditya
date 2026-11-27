import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import id from "./id";
import en from "./en";

const dictionaries = { id, en };
const STORAGE_KEY = "lang";

const LanguageContext = createContext(null);

function detectInitialLang() {
	const saved = typeof window !== "undefined" && window.localStorage.getItem(STORAGE_KEY);
	if (saved && dictionaries[saved]) return saved;
	const browser = typeof navigator !== "undefined" ? navigator.language || "" : "";
	return browser.toLowerCase().startsWith("id") ? "id" : "en";
}

export function LanguageProvider({ children }) {
	const [lang, setLang] = useState(detectInitialLang);

	useEffect(() => {
		window.localStorage.setItem(STORAGE_KEY, lang);
		document.documentElement.lang = lang;
	}, [lang]);

	const toggle = useCallback(() => setLang((l) => (l === "id" ? "en" : "id")), []);

	// t("hero.cta") -> looks up a dotted key; falls back to the key itself so missing copy is visible.
	const t = useCallback(
		(key) => key.split(".").reduce((node, part) => (node == null ? node : node[part]), dictionaries[lang]) ?? key,
		[lang],
	);

	const value = useMemo(() => ({ lang, setLang, toggle, t }), [lang, toggle, t]);
	return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
	const ctx = useContext(LanguageContext);
	if (!ctx) throw new Error("useLanguage must be used inside <LanguageProvider>");
	return ctx;
}
