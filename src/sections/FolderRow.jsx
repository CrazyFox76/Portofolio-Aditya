import GlassFolder from "../components/GlassFolder";
import TechFolder from "../components/TechFolder";
import { useLanguage } from "../i18n/LanguageContext";

const CV_URL = "https://drive.google.com/file/d/1sHFfWWKaJ71aYx7htaa3DDYQFMHrhH-0/view?usp=drivesdk";

// Logos: Simple Icons SVGs (CC0) in public/icons/.
// Logos shown in their own brand colours (no tile). GitHub's mark is black, so it is drawn white on the dark card.
const TOOLS = [
	{ name: "GitHub", logo: "/icons/github.svg", white: true },
	{ name: "Claude Code", logo: "/icons/claudecode.svg" },
	{ name: "Node.js", logo: "/icons/nodedotjs.svg" },
	{ name: "Docker", logo: "/icons/docker.svg" },
	{ name: "Git", logo: "/icons/git.svg" },
	{ name: "Arch Linux", logo: "/icons/archlinux.svg" },
];

// Project sheets (the last one sits on top). Moro Go uses a screenshot of its live landing page.
const PROJECTS = [
	{
		name: "SPK Supplier Moro Go",
		meta: "Laravel · React · SAW",
		href: "https://morogo-spk-saw-production.up.railway.app/",
		image: "/projects/morogo-spk/desktop-home.webp",
		external: true,
	},
];

export default function FolderRow() {
	const { t } = useLanguage();
	const sheet = (key, href, extra = {}) => ({ name: t(`folders.sheets.${key}`)[0], meta: t(`folders.sheets.${key}`)[1], href, ...extra });

	return (
		<section id="tools" className="hero-folder-row" aria-label={t("folders.toolsTitle")}>
			<div className="hero-technology-slot">
				<TechFolder title={t("folders.toolsTitle")} items={TOOLS} />
			</div>
			<div className="hero-folder-slot">
				<GlassFolder
					title={t("folders.projects.title")}
					art="/folders/glass-1.webp"
					meta={t("folders.projects.meta")}
					openLabel={t("folders.projects.open")}
					sheets={PROJECTS}
				/>
			</div>
			<div className="hero-folder-slot">
				<GlassFolder
					title={t("folders.projectsBuilt.title")}
					art="/folders/glass-2.webp"
					meta={t("folders.projectsBuilt.meta")}
					openLabel={t("folders.projectsBuilt.open")}
					sheets={[sheet("about", "#About"), sheet("experience", "#experience"), sheet("skills", "#skills")]}
				/>
			</div>
			<div className="hero-folder-slot">
				<GlassFolder
					title={t("folders.idea.title")}
					art="/folders/glass-3.webp"
					meta={t("folders.idea.meta")}
					openLabel={t("folders.idea.open")}
					sheets={[sheet("start", "#Contact"), sheet("cv", CV_URL, { external: true })]}
				/>
			</div>
		</section>
	);
}
