import { useLanguage } from "../i18n/LanguageContext";

// Footer in the wahba style. The "Design by wahba" credit is a condition of using the wahba design. Do not remove it.
export default function Footer() {
	const { t } = useLanguage();
	return (
		<footer className="site-copyright" aria-label="Copyright notice">
			<p className="site-copyright-owner">
				<bdi>© {new Date().getFullYear()} Aditya Pratama</bdi>
				<span>{t("footer.rights")}</span>
			</p>
			<p>
				{t("footer.designBy")}{" "}
				<a href="https://portfolio2027-ten.vercel.app" target="_blank" rel="noopener noreferrer">
					wahba
				</a>
			</p>
			<p className="site-copyright-trademarks">{t("footer.trademarks")}</p>
		</footer>
	);
}
