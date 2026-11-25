import { useLanguage } from "../i18n/LanguageContext";

// The "Design by wahba" credit is a condition of using the wahba design. Do not remove it.
export default function Footer() {
	const { t } = useLanguage();
	return (
		<footer className="border-t border-white/10 px-6 py-8 text-center text-xs text-[#8a948e]">
			<p>
				© {new Date().getFullYear()} Aditya Pratama. {t("footer.rights")}
			</p>
			<p className="mt-2">
				{t("footer.designBy")}{" "}
				<a
					href="https://portfolio2027-ten.vercel.app"
					target="_blank"
					rel="noopener noreferrer"
					className="font-semibold text-[#b6c6bc] underline-offset-4 hover:underline"
				>
					wahba
				</a>
			</p>
		</footer>
	);
}
