import { FilesIcon, SettingsIcon, MapsIcon, ContactsIcon, MessagesIcon } from "./DockIcons";
import { useLanguage } from "../i18n/LanguageContext";

// Measurements: design-system/hero-spec.md ("Dock header").
// Anchors point at the current sections; "experience" shares #identity until its own section exists.
const ITEMS = [
	{ key: "projects", href: "#tools", Icon: FilesIcon },
	{ key: "skills", href: "#identity", Icon: SettingsIcon },
	{ key: "experience", href: "#identity", Icon: MapsIcon },
	{ key: "about", href: "#Home", Icon: ContactsIcon },
	{ key: "contact", href: "#Contact", Icon: MessagesIcon },
];

function DockLink({ href, label, children, className = "" }) {
	return (
		<a
			href={href}
			aria-label={label}
			className={`group relative flex h-11 w-11 items-center justify-center rounded-[13px] outline-none transition-colors duration-[180ms] focus-visible:ring-2 focus-visible:ring-[#b6c6bc] ${className}`}
		>
			<span className="flex h-10 w-10 items-center justify-center rounded-[11px] transition-[transform,filter] duration-[360ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-0.5 group-hover:scale-[1.045] group-focus-visible:-translate-y-0.5 group-focus-visible:scale-[1.045] motion-reduce:transition-none motion-reduce:group-hover:transform-none">
				{children}
			</span>
			<span
				role="tooltip"
				className="pointer-events-none absolute left-1/2 top-[60px] -translate-x-1/2 whitespace-nowrap rounded-xl bg-[#050608] px-[13px] py-2 text-xs font-medium text-white opacity-0 transition-opacity duration-150 group-hover:opacity-100 group-focus-visible:opacity-100"
			>
				{label}
			</span>
		</a>
	);
}

export default function Dock() {
	const { t, lang, toggle } = useLanguage();

	return (
		<header className="fixed left-1/2 top-0 z-50 -translate-x-1/2 rounded-b-[27px] bg-[#050608] shadow-[0_4px_10px_rgba(0,0,0,0.07)]">
			<div className="flex items-center gap-[10px] px-4 py-[10px] max-sm:gap-1 max-sm:px-2.5">
				<DockLink href="#Home" label={t("nav.home")}>
					<span className="select-none text-[19px] font-extrabold leading-none tracking-[-0.06em] text-white">ap</span>
				</DockLink>

				<nav aria-label="Main navigation" className="flex items-center gap-[2px]">
					{ITEMS.map(({ key, href, Icon }) => (
						<DockLink key={key} href={href} label={t(`nav.${key}`)}>
							<span className="block h-10 w-10 overflow-hidden rounded-[11px] shadow-[0_1px_2px_rgba(0,0,0,0.35)]">
								<Icon />
							</span>
						</DockLink>
					))}
				</nav>

				<button
					type="button"
					onClick={toggle}
					aria-label={t("nav.switchLang")}
					className="flex h-10 w-7 cursor-pointer items-center justify-center rounded-[9px] bg-[#16181c] text-[10px] font-semibold uppercase text-[#b6c6bc] outline-none transition-colors hover:bg-[#22252b] focus-visible:ring-2 focus-visible:ring-[#b6c6bc]"
				>
					{lang === "id" ? "en" : "id"}
				</button>
			</div>
		</header>
	);
}
