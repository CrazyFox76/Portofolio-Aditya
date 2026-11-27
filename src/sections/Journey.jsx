import { useEffect, useRef } from "react";
import { useLanguage } from "../i18n/LanguageContext";

/*
 * Experience & education, taken from Aditya's CV. wahba has no section like this, so it borrows the
 * wahba vocabulary: light stage, big tight Bricolage headings, quiet grey meta, rows that rise in on scroll.
 */

function useRevealOnScroll(ref) {
	useEffect(() => {
		const root = ref.current;
		const items = root.querySelectorAll("[data-reveal]");
		if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
			items.forEach((el) => el.setAttribute("data-shown", ""));
			return undefined;
		}
		const io = new IntersectionObserver(
			(entries) => {
				entries.forEach((e) => {
					if (e.isIntersecting) {
						e.target.setAttribute("data-shown", "");
						io.unobserve(e.target);
					}
				});
			},
			{ threshold: 0.2, rootMargin: "0px 0px -8% 0px" },
		);
		items.forEach((el) => io.observe(el));
		return () => io.disconnect();
	}, [ref]);
}

function Timeline({ title, rows }) {
	return (
		<div className="journey-group">
			<h3 className="journey-group-title" data-reveal>
				{title}
			</h3>
			<ol className="journey-list">
				{rows.map((r, i) => (
					<li className="journey-row" key={r.role + r.org} data-reveal style={{ "--reveal-delay": `${i * 70}ms` }}>
						<p className="journey-when">{r.when}</p>
						<div className="journey-what">
							<h4>
								{r.role}
								<span className="journey-org">{r.org}</span>
							</h4>
							<p>{r.text}</p>
						</div>
					</li>
				))}
			</ol>
		</div>
	);
}

export default function Journey() {
	const { t } = useLanguage();
	const j = t("journey");
	const ref = useRef(null);
	useRevealOnScroll(ref);

	return (
		<section id="experience" ref={ref} className="journey" aria-labelledby="journey-title">
			<div className="journey-inner">
				<header className="journey-head">
					<p className="journey-eyebrow" data-reveal>
						{j.eyebrow}
					</p>
					<h2 id="journey-title" data-reveal>
						{j.titleTop}
						<br />
						<span>{j.titleBottom}</span>
					</h2>
					<p className="journey-intro" data-reveal>
						{j.intro}
					</p>
				</header>

				<Timeline title={j.workTitle} rows={j.work} />
				<Timeline title={j.educationTitle} rows={j.education} />

				<div className="journey-group">
					<h3 className="journey-group-title" data-reveal>
						{j.skillsTitle}
					</h3>
					<ul className="journey-skills" data-reveal>
						{j.skills.map((s) => (
							<li key={s}>{s}</li>
						))}
					</ul>
				</div>
			</div>
		</section>
	);
}
