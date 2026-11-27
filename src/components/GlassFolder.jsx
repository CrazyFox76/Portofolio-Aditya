import { useEffect, useId, useRef, useState } from "react";

// Folder outlines from the wahba design (340x272 back, 340x198 front), scaled to the element box.
const BACK_PATH =
	"M0 56A22 22 0 0 1 22 34L146 34C170 34 172 0 198 0L318 0A22 22 0 0 1 340 22L340 250A22 22 0 0 1 318 272L22 272A22 22 0 0 1 0 250Z";
const FRONT_PATH =
	"M0 22A22 22 0 0 1 22 0L118 0C144 0 146 32 172 32L318 32A22 22 0 0 1 340 54L340 176A22 22 0 0 1 318 198L22 198A22 22 0 0 1 0 176Z";

/**
 * Glass folder: a frosted front pocket over a textured back, holding "sheets" that fan out on hover
 * and lift out when opened (click). Pointer position tilts the folder slightly.
 *
 * sheets: [{ name, meta, href, image? }]
 */
export default function GlassFolder({ title, meta, sheets, art, openLabel }) {
	const uid = useId().replace(/:/g, "");
	const rootRef = useRef(null);
	const [entered, setEntered] = useState(false);
	const [open, setOpen] = useState(false);

	useEffect(() => {
		const el = rootRef.current;
		const io = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting) {
					setEntered(true);
					io.disconnect();
				}
			},
			{ threshold: 0.2 },
		);
		io.observe(el);
		return () => io.disconnect();
	}, []);

	useEffect(() => {
		if (!open) return;
		const close = (e) => {
			if (e.type === "keydown" ? e.key === "Escape" : !rootRef.current.contains(e.target)) setOpen(false);
		};
		document.addEventListener("pointerdown", close);
		document.addEventListener("keydown", close);
		return () => {
			document.removeEventListener("pointerdown", close);
			document.removeEventListener("keydown", close);
		};
	}, [open]);

	const onPointerMove = (e) => {
		if (e.pointerType !== "mouse") return;
		const r = rootRef.current.getBoundingClientRect();
		rootRef.current.style.setProperty("--gf-px", (((e.clientX - r.left) / r.width) * 2 - 1).toFixed(3));
		rootRef.current.style.setProperty("--gf-py", (((e.clientY - r.top) / r.height) * 2 - 1).toFixed(3));
	};
	const onPointerLeave = () => {
		rootRef.current.style.setProperty("--gf-px", "0");
		rootRef.current.style.setProperty("--gf-py", "0");
	};

	const n = sheets.length;
	// Spread sheets around the centre slot; deeper sheets sit further back (lower z-index).
	const slots = sheets.map((_, i) => {
		const slot = n === 1 ? 0 : n === 2 ? (i === 0 ? -1 : 1) : i - Math.floor(n / 2);
		const depth = n - 1 - i;
		const jitter = ((i * 37) % 7) - 3;
		return { slot, depth, jx: `${(jitter * 0.9).toFixed(2)}px`, jr: `${(jitter * 0.35).toFixed(2)}deg` };
	});

	return (
		<div
			ref={rootRef}
			className="gf-root"
			style={{ width: 340, height: 326 }}
			data-entered={entered ? "" : undefined}
			data-open={open ? "" : undefined}
			onPointerMove={onPointerMove}
			onPointerLeave={onPointerLeave}
		>
			<svg width="0" height="0" style={{ position: "absolute" }} aria-hidden="true">
				<defs>
					<clipPath id={`gf-back-${uid}`} clipPathUnits="objectBoundingBox">
						<path d={BACK_PATH} transform="scale(0.0029411764705882353 0.003676470588235294)" />
					</clipPath>
					<clipPath id={`gf-front-${uid}`} clipPathUnits="objectBoundingBox">
						<path d={FRONT_PATH} transform="scale(0.0029411764705882353 0.005050505050505051)" />
					</clipPath>
				</defs>
			</svg>

			<div className="gf-stage" style={{ transform: "translateY(54px) scale(1)" }}>
				<div className="gf-tilt">
					<div className="gf-shadow" />
					<div className="gf-back" style={{ clipPath: `url(#gf-back-${uid})` }}>
						{art ? <img alt="" className="gf-art" src={art} /> : <div className="gf-art-placeholder" />}
						<div className="gf-back-sheen" />
					</div>

					<div className="gf-files" role="list" aria-label={title}>
						{sheets.map((s, i) => {
							const { slot, depth, jx, jr } = slots[i];
							return (
								<div role="listitem" className="gf-sheet-slot" key={s.name}>
									<a
										className={`gf-sheet${s.image ? " gf-sheet--art" : ""}`}
										style={{ "--gf-slot": slot, "--gf-depth": depth, "--gf-jx": jx, "--gf-jr": jr, zIndex: i + 1 }}
										href={s.href}
										{...(s.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
									>
										{s.image ? (
											<img alt="" className="gf-sheet-art" src={s.image} />
										) : (
											<span className="gf-lines" aria-hidden="true">
												{[86, 92, 64, 88, 42].map((w) => (
													<i key={w} style={{ width: `${w}%` }} />
												))}
											</span>
										)}
										<span className="gf-sheet-head">
											<span className="gf-sheet-name">{s.name}</span>
											<span className="gf-sheet-meta">{s.meta}</span>
										</span>
									</a>
								</div>
							);
						})}
					</div>

					<div className="gf-front" style={{ clipPath: `url(#gf-front-${uid})` }}>
						<div className="gf-tint" />
						<div className="gf-spec" />
						<button
							type="button"
							className="gf-hit"
							aria-label={openLabel}
							aria-expanded={open}
							onClick={() => setOpen((o) => !o)}
						/>
						<div className="gf-label">
							<span className="gf-title">{title}</span>
							<span className="gf-meta">{meta}</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
