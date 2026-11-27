import { useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useLanguage } from "../i18n/LanguageContext";

// Measurements: design-system/hero-spec.md ("Hero section"), taken at a 1920x965 viewport.
// Percentages below are those pixel values divided by the 1881x651 card.
// Swap to /portrait.png (transparent cutout) once it is in public/.
const PORTRAIT_SRC = "/portrait.png";

const NAME_CLASS =
	"absolute z-[1] block select-none whitespace-nowrap font-bold leading-[1.15] tracking-[-0.06em] text-[#b6c6bc] text-[17vw] md:text-[clamp(90px,min(13vw,26svh),230px)]";

export default function Hero() {
	const { t } = useLanguage();
	const reduce = useReducedMotion();
	const stageRef = useRef(null);

	const artRef = useRef(null);

	// Mouse parallax, mapped from values measured on the wahba hero (nx, ny in -1..1 from the stage centre):
	// names drift against the cursor, the portrait tilts in 3D towards it, its light follows and its shadow drifts away.
	const applyParallax = (nx, ny) => {
		const stage = stageRef.current;
		const art = artRef.current;
		stage.style.setProperty("--title-parallax-x", `${(-nx * 13).toFixed(2)}px`);
		stage.style.setProperty("--title-parallax-y", `${(-ny * 6).toFixed(2)}px`);
		art.style.transform =
			`perspective(1300px) translate(${(nx * 7).toFixed(2)}px, ${(ny * 4).toFixed(2)}px) ` +
			`rotate(${(nx * 0.56).toFixed(3)}deg) rotateY(${(nx * 2.7).toFixed(3)}deg) rotateX(${(-ny * 1.3).toFixed(3)}deg)`;
		art.style.setProperty("--portrait-light-x", `${(40 + nx * 16.4).toFixed(2)}%`);
		art.style.setProperty("--portrait-light-y", `${(24 + ny * 9).toFixed(2)}%`);
		art.style.setProperty("--portrait-shadow-x", `${(-nx * 12.8).toFixed(2)}px`);
		art.style.setProperty("--portrait-shadow-y", `${(18 + ny * 3.5).toFixed(2)}px`);
	};
	const onPointerMove = (e) => {
		if (reduce || e.pointerType !== "mouse") return;
		const r = stageRef.current.getBoundingClientRect();
		applyParallax(((e.clientX - r.left) / r.width) * 2 - 1, ((e.clientY - r.top) / r.height) * 2 - 1);
	};
	const onPointerLeave = () => applyParallax(0, 0);

	const rise = (delay) =>
		reduce
			? {}
			: {
					initial: { opacity: 0, y: 24 },
					animate: { opacity: 1, y: 0 },
					transition: { duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] },
				};

	return (
		<section id="Home" className="overflow-hidden px-3 pt-3">
			<div ref={stageRef} onPointerMove={onPointerMove} onPointerLeave={onPointerLeave} className="forge-stage relative h-[max(460px,67.5svh)] max-md:h-[86svh] overflow-hidden rounded-[22px_22px_32px_32px] bg-[#6f4e37] bg-[linear-gradient(115deg,#1b1714,#513824_53%,#35271d)]">
				<div className="hero-studio-light" aria-hidden="true" />
				<h1 className="sr-only">
					{t("hero.firstName")} {t("hero.lastName")}
				</h1>

				<motion.span aria-hidden="true" className={`${NAME_CLASS} forge-title-top left-[14%] top-[24%] max-md:left-[6%] max-md:top-[13.5%]`} {...rise(0.1)}>
					{t("hero.firstName")}
				</motion.span>
				<motion.span aria-hidden="true" className={`${NAME_CLASS} forge-title-bottom right-[6%] top-[44%] max-md:right-[6%] max-md:top-[24.5%]`} {...rise(0.2)}>
					{t("hero.lastName")}
				</motion.span>

				{/* Wrappers hold the centering translate; framer-motion animates the inner element's transform. */}
				<div className="absolute bottom-[-20px] left-1/2 z-[2] flex h-[100%] w-[60%] -translate-x-1/2 justify-center max-md:h-[66%] max-md:w-[110%]">
					<div ref={artRef} className="forge-art-inner">
					<motion.div
						className="portrait-depth-surface flex justify-center"
						style={{ "--portrait-url": `url(${PORTRAIT_SRC})` }}
						{...(reduce
							? {}
							: {
									initial: { opacity: 0, y: 40 },
									animate: { opacity: 1, y: 0 },
									transition: { duration: 1, ease: [0.16, 1, 0.3, 1] },
								})}
					>
						<span className="portrait-cast-shadow" aria-hidden="true" />
						<img
							src={PORTRAIT_SRC}
							alt={t("hero.portraitAlt")}
							// React 18 only passes the lowercase attribute through to the DOM.
							// eslint-disable-next-line react/no-unknown-property
							fetchpriority="high"
							className={`forge-image h-full w-auto max-w-full object-contain object-bottom ${
								// .png cutout: fade the straight side cuts only in the lower 38% (where the coat touches the frame),
								// so the upper body stays opaque and the names can pass behind it. Other photos: fade all edges.
								PORTRAIT_SRC.endsWith(".png")
									? "[mask-image:linear-gradient(#000_62%,transparent_62%),linear-gradient(to_right,transparent,#000_14%,#000_86%,transparent)] [mask-composite:add]"
									: "[mask-image:radial-gradient(ellipse_50%_62%_at_50%_62%,#000_45%,transparent_100%)]"
							}`}
						/>
						<span className="portrait-diffuse-light" aria-hidden="true" />
						<span className="portrait-specular-light" aria-hidden="true" />
					</motion.div>
					</div>
				</div>

				<div className="absolute bottom-7 left-1/2 z-[3] -translate-x-1/2">
					<motion.a
						href="#Contact"
						className="flex h-[52px] cursor-pointer items-center gap-3 whitespace-nowrap rounded-full bg-[#b6c6bc] py-2 pl-2 pr-5 text-[13px] font-medium leading-[19.5px] text-[#050608] outline-none focus-visible:ring-2 focus-visible:ring-white"
						whileHover={reduce ? undefined : { scale: 1.03 }}
						{...rise(0.35)}
					>
						<span className="pl-1">{t("hero.cta")}</span>
						<span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#050608]">
							<svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
								<path d="M7.5 3.5 3 8l4.5 4.5M3 8h10" stroke="#b6c6bc" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
							</svg>
						</span>
					</motion.a>
				</div>
			</div>
		</section>
	);
}
