import { useEffect, useId, useRef, useState } from "react";

// Front pocket of the dark tools folder: tab rises on the right. Scaled to the element box (340x180).
const FRONT_PATH =
	"M0 50A22 22 0 0 1 22 28L190 28C214 28 216 0 242 0L318 0A22 22 0 0 1 340 22L340 158A22 22 0 0 1 318 180L22 180A22 22 0 0 1 0 158Z";
const BACK_PATH =
	"M0 22A22 22 0 0 1 22 0L104 0C128 0 130 26 156 26L318 26A22 22 0 0 1 340 48L340 250A22 22 0 0 1 318 272L22 272A22 22 0 0 1 0 250Z";

const EASE = "cubic-bezier(.2,.8,.2,1)";
// Each logo sits in an equal, invisible box so wide (Docker) and tall (Figma) marks look balanced.
const TILE = 56;
const GAP = 60;

/** items: [{ name, logo, bg }] */
export default function TechFolder({ title, items }) {
	const uid = useId().replace(/:/g, "");
	const ref = useRef(null);
	const [entered, setEntered] = useState(false);
	const [hover, setHover] = useState(false);
	const [active, setActive] = useState(-1);
	const [width, setWidth] = useState(420);
	useEffect(() => {
		const ro = new ResizeObserver(([e]) => setWidth(e.contentRect.width));
		ro.observe(ref.current);
		return () => ro.disconnect();
	}, []);
	// Narrow cards (phones) get a tighter gap so the row of logos stays inside the card.
	const gap = Math.min(GAP, (width - TILE - 20) / Math.max(1, items.length - 1));

	useEffect(() => {
		const io = new IntersectionObserver(
			([e]) => {
				if (e.isIntersecting) {
					setEntered(true);
					io.disconnect();
				}
			},
			{ threshold: 0.2 },
		);
		io.observe(ref.current);
		return () => io.disconnect();
	}, []);

	const mid = (items.length - 1) / 2;
	const label = `${title}: ${items.map((i) => i.name).join(", ")}`;

	return (
		<div
			ref={ref}
			role="img"
			aria-label={label}
			onMouseEnter={() => setHover(true)}
			onMouseLeave={() => setHover(false)}
			className="hero-technology-folder relative isolate h-[286px] w-full max-w-[420px] select-none"
			style={{
				color: "#fff",
				opacity: entered ? 1 : 0,
				transform: entered ? "none" : "translateY(34px) scale(.92)",
				transition: `transform .9s ${EASE}, opacity .6s ease`,
			}}
		>
			<svg width="0" height="0" style={{ position: "absolute" }} aria-hidden="true">
				<defs>
					<clipPath id={`tf-front-${uid}`} clipPathUnits="objectBoundingBox">
						<path d={FRONT_PATH} transform="scale(0.0029411764705882353 0.005555555555555556)" />
					</clipPath>
					<clipPath id={`tf-back-${uid}`} clipPathUnits="objectBoundingBox">
						<path d={BACK_PATH} transform="scale(0.0029411764705882353 0.003676470588235294)" />
					</clipPath>
				</defs>
			</svg>

			<div
				className="pointer-events-none absolute left-[8%] right-[8%] top-10 -z-10 h-[200px] rounded-full opacity-80 blur-[18px]"
				style={{ background: "radial-gradient(closest-side, rgba(255,255,255,.10), transparent)" }}
			/>
			<div
				className="absolute inset-x-0 bottom-0 top-[14px]"
				style={{
					background: "linear-gradient(180deg,rgba(255,255,255,.035),rgba(255,255,255,.008) 60%)",
					clipPath: `url(#tf-back-${uid})`,
				}}
			/>

			{/* Logo tiles fanned out behind the front pocket. */}
			<div className="pointer-events-none absolute inset-0">
				{items.map((item, i) => {
					const o = i - mid;
					const x = o * (hover ? gap + 4 : gap);
					// Resting fan: tiles rise slightly to the right and peek above the pocket; hover spreads them.
					// Gentle arc: centre logos sit a little higher than the ends; hover lifts the whole row.
					const y = (hover ? -8 : 0) + o * o * 1.2;
					const r = o * 2;
					// The tile under the cursor rises out of the stack on its own and shows its name.
					const lifted = i === active;
					const ty = lifted ? y - 28 : y;
					const tr = lifted ? r * 0.3 : r;
					return (
						<div
							key={item.name}
							className="pointer-events-auto absolute left-1/2 top-[30px] cursor-pointer rounded-[14px] [backface-visibility:hidden]"
							onMouseEnter={() => setActive(i)}
							onMouseLeave={() => setActive(-1)}
							style={{
								width: TILE,
								height: TILE,
								marginLeft: -TILE / 2,
								zIndex: lifted ? 25 : i, // above the pocket (z-20) so its tooltip below stays visible
								opacity: entered ? 1 : 0,
								transform: entered
									? `translate3d(${x}px, ${ty}px, 0) rotate(${tr}deg) scale(${lifted ? 1.08 : 1})`
									: `translate3d(${o * 30.3}px, 80px, 0)`,
								transition: `transform ${hover ? "0.45s" : "0.9s"} ${EASE}, opacity .5s`,
								transitionDelay: entered && !hover ? `${0.35 + i * 0.08}s` : "0s",
							}}
						>
							{/* Free-standing logo in its own brand colour (no tile), with the statement's glare sweep. */}
							<div className="grid h-full w-full place-items-center">
								<span
									className="shine-art"
									style={{ "--art": `url(${item.logo})`, width: "100%", height: "100%", transform: "none" }}
								>
									<img
										alt=""
										src={item.logo}
										draggable="false"
										className="shine-img"
										style={{
											filter: `${item.white ? "brightness(0) invert(1) " : ""}drop-shadow(0 10px 18px rgba(0,0,0,.55))`,
										}}
									/>
									<span className="shine-glare" style={{ animationDelay: `${i * 0.35}s` }} aria-hidden="true" />
								</span>
							</div>
							<span
								className="pointer-events-none absolute left-1/2 top-full z-30 mt-1.5 whitespace-nowrap rounded-full border px-2.5 py-1 text-xs font-medium leading-4 backdrop-blur-[8px]"
								style={{
									background: "rgba(0,0,0,.75)",
									borderColor: "rgba(255,255,255,.14)",
									color: "#fff",
									opacity: lifted ? 1 : 0,
									transform: `translateX(-50%) translateY(${lifted ? 0 : -6}px)`, // drops in below the logo, inside the card
									transition: `opacity .25s ease, transform .35s ${EASE}`,
								}}
							>
								{item.name}
							</span>
						</div>
					);
				})}
			</div>

			{/* Front pocket */}
			<div
				className="absolute inset-x-0 bottom-0 z-20 h-[180px] overflow-hidden"
				style={{
					background: "linear-gradient(160deg,rgba(255,255,255,.09),rgba(255,255,255,.015) 55%),#0c0c0c",
					clipPath: `url(#tf-front-${uid})`,
					transform: hover ? "translateY(4px)" : "none",
					transition: `transform .6s ${EASE}`,
				}}
			>
				<h3 className="m-0 px-[18px] pt-[34px] text-right text-[22px] font-bold leading-[1.4] max-[1100px]:min-[768px]:text-lg">
					{title}
				</h3>
				<div className="mx-[18px] mt-3.5 flex flex-wrap gap-1.5 pr-[150px] max-sm:pr-0">
					{items.map((item) => (
						<span
							key={item.name}
							className="inline-flex min-h-6 items-center whitespace-nowrap rounded-full border px-2.5 py-0.5 text-xs leading-5"
							style={{ background: "rgba(36,36,36,.7)", borderColor: "#282828", color: "#9f9f9f" }}
						>
							{item.name}
						</span>
					))}
				</div>
				<span
					className="absolute bottom-3.5 right-3.5 flex h-[34px] items-center gap-1.5 rounded-full border px-1.5"
					style={{ background: "rgba(0,0,0,.55)", borderColor: "rgba(255,255,255,.08)" }}
					aria-hidden="true"
				>
					{items.map((item) => (
						<span key={item.name} className="grid h-[22px] w-[22px] place-items-center">
							<img
								alt=""
								className={`h-[80%] w-[80%] object-contain ${item.white ? "[filter:brightness(0)_invert()]" : ""}`}
								src={item.logo}
							/>
						</span>
					))}
				</span>
			</div>
		</div>
	);
}
