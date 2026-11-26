import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useLanguage } from "../i18n/LanguageContext";

/*
 * "Why waste time???" → "Call me now" → contact, one sticky section driven by scroll progress p (0..1).
 * Timings observed on the wahba site:
 *   0.00-0.03  question rises in
 *   0.04-0.155 the "?" marks trickle out one by one, then flood to the right
 *   0.28-0.34  question gives way to the "Call me now" statement; floating logos pop in
 *   0.62-0.70  statement greys out
 *   0.70-0.80  the phone tile flies into the contact panel, which fades in
 */

// Contact details shown on the page. TODO(Aditya): replace PHONE with your WhatsApp number.
export const CONTACT = {
	email: "aditpratama77788@gmail.com",
	phoneDisplay: "+62 812 0000 0000",
	phoneE164: "6281200000000",
};

// Floating logos around the statement (positions and sizes follow the wahba layout).
const FLOAT = [
	["/icons/github.svg", 8, 15, 1.1, -15, true],
	["/icons/claudecode.svg", 28, 10, 0.75, 12],
	["/icons/nodedotjs.svg", 54, 13, 0.85, -10],
	["/icons/docker.svg", 82, 15, 1.15, 16],
	["/icons/archlinux.svg", 95, 40, 0.8, -12],
	["/icons/git.svg", 5, 43, 0.85, 10],
	["/icons/nodedotjs.svg", 9, 76, 0.9, -18],
	["/icons/archlinux.svg", 29, 89, 1, 16],
	["/icons/github.svg", 53, 87, 0.7, -10, true],
	["/icons/claudecode.svg", 77, 84, 1.15, 12],
	["/icons/git.svg", 93, 74, 0.95, -12],
	["/icons/docker.svg", 95, 13, 0.55, -20],
];

const MARKS = 60;
const clamp = (v) => Math.min(1, Math.max(0, v));
const ease = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
const seg = (p, a, b) => ease(clamp((p - a) / (b - a)));
const lerp = (a, b, t) => a + (b - a) * t;

function PhoneGlyph() {
	return (
		<svg viewBox="0 0 24 24" className="why-wait-phone" aria-hidden="true">
			<path
				fill="#22b866"
				d="M6.6 10.8a15.2 15.2 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.25 11.4 11.4 0 0 0 3.6.57 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.45.57 3.57a1 1 0 0 1-.25 1z"
			/>
		</svg>
	);
}

function WhatsAppGlyph() {
	return (
		<svg viewBox="0 0 24 24" aria-hidden="true" fill="currentColor">
			<path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1l-.8 1c-.1.2-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.2-.4.2-.4.7-1.3.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.8 11.9 11.9 0 0 0 4.6 4c1.7.7 2.4.8 3.2.7.5-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.2-1.2-.1-.1-.3-.2-.5-.3z" />
		</svg>
	);
}

function useReducedMotionFlag() {
	const [reduced, setReduced] = useState(false);
	useEffect(() => {
		const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
		const set = () => setReduced(mq.matches);
		set();
		mq.addEventListener("change", set);
		return () => mq.removeEventListener("change", set);
	}, []);
	return reduced;
}

export default function WhyWait() {
	const { t, lang } = useLanguage();
	const c = t("whyWait");
	const reduced = useReducedMotionFlag();

	const secRef = useRef(null);
	const stageRef = useRef(null);
	const questionRef = useRef(null);
	const marksRef = useRef([]);
	const timeRef = useRef(null);
	const punctRef = useRef(null);
	const statementRef = useRef(null);
	const brandsRef = useRef(null);
	const contactRef = useRef(null);
	const phoneSrcRef = useRef(null);
	const phoneDstRef = useRef(null);
	const phoneFlyRef = useRef(null);

	useLayoutEffect(() => {
		if (reduced) return undefined;
		const stage = stageRef.current;
		let raf = 0;
		let shown = null;
		let rects = null;

		const measure = () => {
			const s = stage.getBoundingClientRect();
			const r = (el) => {
				const b = el.getBoundingClientRect();
				return { x: b.left - s.left, y: b.top - s.top, w: b.width };
			};
			rects = {
				src: r(phoneSrcRef.current),
				dst: r(phoneDstRef.current),
				timeLeft: r(timeRef.current).x,
				markW: punctRef.current.scrollWidth / MARKS,
			};
		};

		const render = () => {
			raf = 0;
			const sec = secRef.current;
			const target = clamp(-sec.getBoundingClientRect().top / (sec.offsetHeight - window.innerHeight));
			shown = shown === null ? target : shown + (target - shown) * 0.05;
			if (Math.abs(target - shown) < 0.0004) shown = target;
			else raf = requestAnimationFrame(render);
			const p = shown;

			const qIn = seg(p, 0, 0.035);
			const qOut = seg(p, 0.37, 0.42);
			questionRef.current.style.opacity = qIn * (1 - qOut);
			questionRef.current.style.transform = `translateY(${lerp(45, 0, qIn) - 30 * qOut}px)`;
			// Marks trickle out one by one, then flood (ease-in), as measured on wahba: ~0.04 to ~0.155.
			const spill = Math.pow(clamp((p - 0.03) / 0.3), 2); // slowed: full run at ~0.33
			const visibleMarks = Math.floor(spill * MARKS);
			marksRef.current.forEach((el, i) => {
				el.style.opacity = i < visibleMarks ? 1 : 0;
			});
			// As the marks spill out, "time" slides left so the run starts near the left edge (as on wahba).
			if (rects) {
				const shift = Math.min((visibleMarks * rects.markW) / 2, Math.max(0, rects.timeLeft - window.innerWidth * 0.005));
				timeRef.current.style.transform = `translateX(${-shift}px)`;
			}

			const sIn = seg(p, 0.39, 0.45);
			const grey = seg(p, 0.62, 0.7);
			const sOut = seg(p, 0.7, 0.76);
			statementRef.current.style.opacity = sIn * (1 - sOut);
			statementRef.current.style.color = grey > 0 ? `rgba(29,29,31,${1 - 0.55 * grey})` : "";
			statementRef.current.style.transform = `translateY(${lerp(30, 0, sIn)}px)`;
			brandsRef.current.style.opacity = sIn * (1 - grey);
			brandsRef.current.style.transform = `scale(${lerp(0.9, 1, sIn)})`;

			const cIn = seg(p, 0.72, 0.8);
			const contact = contactRef.current;
			contact.style.opacity = cIn;
			contact.style.visibility = cIn > 0.01 ? "visible" : "hidden";
			contact.style.transform = `translateY(${lerp(30, 0, cIn)}px)`;

			// The phone tile flies from the statement into the contact panel.
			if (rects) {
				const fly = seg(p, 0.7, 0.8);
				const visible = sIn > 0.01;
				const x = lerp(rects.src.x, rects.dst.x, fly);
				const y = lerp(rects.src.y, rects.dst.y, fly);
				const w = lerp(rects.src.w, rects.dst.w, fly);
				const el = phoneFlyRef.current;
				el.style.opacity = visible ? Math.max(sIn, cIn) : 0;
				el.style.width = `${w}px`;
				el.style.height = `${w}px`;
				el.style.fontSize = `${w / 0.64}px`;
				el.style.transform = `translate3d(${x}px, ${y}px, 0) rotate(${-8 * Math.sin(fly * Math.PI)}deg)`;
			}
		};

		const schedule = () => {
			if (!raf) raf = requestAnimationFrame(render);
		};
		const remeasure = () => {
			// Measure with the animated layers at rest so their transforms don't skew the rects.
			const qt = questionRef.current.style.transform;
			const tt = timeRef.current.style.transform;
			questionRef.current.style.transform = "none";
			timeRef.current.style.transform = "none";
			const st = statementRef.current.style.transform;
			const ct = contactRef.current.style.transform;
			statementRef.current.style.transform = "none";
			contactRef.current.style.transform = "none";
			measure();
			statementRef.current.style.transform = st;
			contactRef.current.style.transform = ct;
			questionRef.current.style.transform = qt;
			timeRef.current.style.transform = tt;
			schedule();
		};

		remeasure();
		document.fonts?.ready.then(remeasure);
		window.addEventListener("scroll", schedule, { passive: true });
		window.addEventListener("resize", remeasure);
		return () => {
			cancelAnimationFrame(raf);
			window.removeEventListener("scroll", schedule);
			window.removeEventListener("resize", remeasure);
		};
	}, [reduced, lang]);

	// Web3Forms delivers the message straight to the inbox. The access key is public by design; it comes from
	// VITE_WEB3FORMS_KEY (.env locally, Vercel env in production). Without a key the form falls back to mailto.
	const [status, setStatus] = useState("idle"); // idle | sending | sent | error
	const onSubmit = async (e) => {
		e.preventDefault();
		const form = e.currentTarget;
		const f = new FormData(form);
		if (f.get("botcheck")) return; // honeypot filled in: a bot
		const subject = `${c.mailSubject} — ${f.get("name")}`;
		const key = import.meta.env.VITE_WEB3FORMS_KEY;
		if (!key) {
			const body = `${f.get("message")}\n\n${f.get("name")} <${f.get("email")}>`;
			window.location.href = `mailto:${CONTACT.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
			return;
		}
		setStatus("sending");
		try {
			const res = await fetch("https://api.web3forms.com/submit", {
				method: "POST",
				headers: { "Content-Type": "application/json", Accept: "application/json" },
				// The email Aditya receives: casual Indonesian labels; Web3Forms lists each field as "label: value".
				// replyto makes Gmail's "Reply" go straight to the visitor.
				body: JSON.stringify({
					access_key: key,
					subject: `👋 Ada pesan baru dari ${f.get("name")}!`,
					from_name: "Portofolio Aditya",
					replyto: f.get("email"),
					"Dari siapa": f.get("name"),
					Emailnya: f.get("email"),
					"Katanya gini": f.get("message"),
					"Buka web pakai bahasa": lang === "id" ? "Indonesia" : "Inggris",
					"Dikirim pas": new Date().toLocaleString("id-ID", { dateStyle: "full", timeStyle: "short" }),
				}),
			});
			const data = await res.json().catch(() => ({}));
			if (!res.ok || !data.success) throw new Error(data.message || `HTTP ${res.status}`);
			setStatus("sent");
			form.reset();
		} catch {
			setStatus("error");
		}
	};
	const buttonLabel = { idle: c.submit, sending: c.sending, sent: c.sent, error: c.retry }[status];
	const noteText = status === "sent" ? c.sentNote : status === "error" ? c.errorNote : import.meta.env.VITE_WEB3FORMS_KEY ? c.noteDirect : c.note;

	return (
		<section id="why-wait" ref={secRef} className="why-wait" aria-label={c.label} data-reduced={reduced ? "" : undefined}>
			<div ref={stageRef} className="why-wait-stage">
				<div className="why-wait-marks" aria-hidden="true">
					<span className="why-wait-mark why-wait-mark-one">?</span>
					<span className="why-wait-mark why-wait-mark-two">?</span>
					<span className="why-wait-mark why-wait-mark-three">?</span>
				</div>

				<h2 ref={questionRef} className="why-wait-question" aria-label={c.label}>
					<span>{c.question}</span>
					<span ref={timeRef} className="why-wait-time">
						{c.time}
						<span ref={punctRef} className="why-wait-punctuation" aria-hidden="true">
							{Array.from({ length: MARKS }, (_, i) => (
								<span key={i} ref={(el) => (marksRef.current[i] = el)}>
									?
								</span>
							))}
						</span>
					</span>
				</h2>

				<div ref={statementRef} className="why-wait-statement">
					<div ref={brandsRef} className="floating-brands" aria-hidden="true">
						{FLOAT.map(([src, left, top, size, angle, white], i) => (
							<span
								key={i}
								className="floating-brand-position"
								style={{ left: `${left}%`, top: `${top}%`, "--float-size": size, "--float-angle": `${angle}deg` }}
							>
								<span className="floating-brand-motion" style={{ animationDelay: `${-i * 0.7}s` }}>
									<img alt="" src={src} loading="lazy" style={white ? { filter: "brightness(0) drop-shadow(0 10px 12px #172b3d16)" } : undefined} />
								</span>
							</span>
						))}
					</div>
					<h3>
						<span className="why-wait-call">
							<span className="why-wait-call-label">{c.call}</span>
							<span ref={phoneSrcRef} className="why-wait-phone-object why-wait-phone-slot" aria-hidden="true" />{" "}
							<span className="why-wait-now">{c.now}</span>
						</span>
						<span className="why-wait-dots">{c.dots}</span>
					</h3>
				</div>

				<section id="Contact" ref={contactRef} className="contact-panel" aria-labelledby="contact-title">
					<div className="contact-details">
						<p className="contact-eyebrow">{c.eyebrow}</p>
						<h2 id="contact-title">
							{c.titleTop}
							<br />
							{c.titleBottom}
						</h2>
						<div className="contact-phone-row">
							<span ref={phoneDstRef} className="contact-phone-destination" aria-hidden="true" />
							<a className="contact-number" href={`tel:+${CONTACT.phoneE164}`}>
								{CONTACT.phoneDisplay}
							</a>
							<a
								className="contact-whatsapp"
								href={`https://wa.me/${CONTACT.phoneE164}`}
								target="_blank"
								rel="noopener noreferrer"
								aria-label={c.whatsapp}
							>
								<WhatsAppGlyph />
							</a>
						</div>
					</div>

					<form className="contact-form" onSubmit={onSubmit}>
						<label>
							{c.nameLabel}
							<input autoComplete="name" required maxLength={100} placeholder={c.namePlaceholder} name="name" />
						</label>
						<label>
							{c.emailLabel}
							<input type="email" autoComplete="email" required maxLength={254} placeholder="you@company.com" name="email" />
						</label>
						<label>
							{c.messageLabel}
							<textarea name="message" required rows={3} maxLength={4000} placeholder={c.messagePlaceholder} />
						</label>
						{/* Honeypot: hidden from people, bots fill it in. */}
						<input type="checkbox" name="botcheck" className="hidden" tabIndex={-1} autoComplete="off" />
						<button type="submit" disabled={status === "sending"} aria-live="polite">
							{buttonLabel}
							<svg viewBox="0 0 16 16" width="16" height="16" aria-hidden="true">
								<path d="M4 12 12 4M5.5 4H12v6.5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
							</svg>
						</button>
						<p className="contact-form-note" role="status">
							{noteText}
						</p>
					</form>
				</section>

				{/* The one phone tile on screen; it travels between the two empty slots above. */}
				<span ref={phoneFlyRef} className="why-wait-phone-fly" aria-hidden="true">
					<PhoneGlyph />
				</span>
			</div>
		</section>
	);
}
