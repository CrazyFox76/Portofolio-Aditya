import { useLanguage } from "../i18n/LanguageContext";

// Footer in the wahba style. The "Design by wahba" credit was removed on 2026-11-26 at the user's request (says wahba agreed).
export default function Footer() {
	const { t } = useLanguage();
	return (
		<footer className="site-copyright" aria-label="Copyright notice">
			<p className="site-copyright-owner">
				<bdi>© {new Date().getFullYear()} Aditya Pratama</bdi>
				<span>{t("footer.rights")}</span>
			</p>
			<p className="site-copyright-trademarks">{t("footer.trademarks")}</p>
		</footer>
	);
}
