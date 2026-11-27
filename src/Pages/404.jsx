import { Link } from "react-router-dom";
import { useLanguage } from "../i18n/LanguageContext";

// 404 in the hero's vocabulary: the brown studio card, a huge sage "404", and the pill CTA back home.
export default function NotFoundPage() {
	const { t } = useLanguage();
	return (
		<main className="min-h-svh bg-[#050608] p-3">
			<section
				className="relative isolate grid min-h-[calc(100svh-24px)] place-items-center overflow-hidden rounded-[22px_22px_32px_32px] bg-[#6f4e37] bg-[linear-gradient(115deg,#1b1714,#513824_53%,#35271d)] px-6 text-center"
				aria-labelledby="nf-title"
			>
				<div className="hero-studio-light" aria-hidden="true" />
				<div className="relative z-[1]">
					<p className="mb-4 text-[11px] uppercase tracking-[0.08em] text-[#b6c6bc]/70">{t("notFound.eyebrow")}</p>
					<h1
						id="nf-title"
						className="m-0 text-[clamp(120px,24vw,360px)] font-bold leading-[0.9] tracking-[-0.07em] text-[#b6c6bc]"
					>
						404
					</h1>
					<p className="mx-auto mt-6 max-w-[520px] text-[clamp(18px,1.8vw,26px)] font-semibold leading-snug tracking-[-0.03em] text-[#e5e4e2]">
						{t("notFound.title")}
					</p>
					<p className="mx-auto mt-3 max-w-[460px] text-[15px] leading-relaxed text-[#e5e4e2]/70">{t("notFound.text")}</p>
					<Link
						to="/"
						className="mt-10 inline-flex h-[52px] items-center gap-3 whitespace-nowrap rounded-full bg-[#b6c6bc] py-2 pl-2 pr-5 text-[13px] font-medium text-[#050608] outline-none transition-transform duration-300 hover:scale-[1.03] focus-visible:ring-2 focus-visible:ring-white"
					>
						<span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#050608]">
							<svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
								<path d="M7.5 3.5 3 8l4.5 4.5M3 8h10" stroke="#b6c6bc" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
							</svg>
						</span>
						<span>{t("notFound.cta")}</span>
					</Link>
				</div>
			</section>
		</main>
	);
}
