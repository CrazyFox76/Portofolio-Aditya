import GlassFolder from "../components/GlassFolder";
import TechFolder from "../components/TechFolder";
import { useLanguage } from "../i18n/LanguageContext";

const CV_URL = "https://drive.google.com/file/d/1sHFfWWKaJ71aYx7htaa3DDYQFMHrhH-0/view?usp=drivesdk";

// Logos are the existing SVGs in public/; tile colours are dark tints of each brand colour.
const TOOLS = [
	{ name: "React", logo: "/reactjs.svg", bg: "#163b4b" },
	{ name: "JavaScript", logo: "/javascript.svg", bg: "#5c5212" },
	{ name: "Tailwind CSS", logo: "/tailwind.svg", bg: "#0e4a5c" },
	{ name: "Node.js", logo: "/nodejs.svg", bg: "#22401f" },
	{ name: "Firebase", logo: "/firebase.svg", bg: "#7a3d0c" },
	{ name: "Vercel", logo: "/icons/vercel-mark.svg", bg: "#171719" },
];

// Placeholder project sheets until the static project data lands (phase 2).
const PROJECTS = [
	{ name: "SPK Supplier Moro Go", meta: "Laravel · React", href: "#Portofolio" },
	{ name: "PPDB SMPN 4", meta: "Web app", href: "#Portofolio" },
	{ name: "Equran Digital", meta: "Web app", href: "#Portofolio" },
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
					meta={t("folders.projects.meta")}
					openLabel={t("folders.projects.open")}
					sheets={PROJECTS}
				/>
			</div>
			<div className="hero-folder-slot">
				<GlassFolder
					title={t("folders.projectsBuilt.title")}
					meta={t("folders.projectsBuilt.meta")}
					openLabel={t("folders.projectsBuilt.open")}
					sheets={[sheet("about", "#About"), sheet("experience", "#experience"), sheet("skills", "#skills")]}
				/>
			</div>
			<div className="hero-folder-slot">
				<GlassFolder
					title={t("folders.idea.title")}
					meta={t("folders.idea.meta")}
					openLabel={t("folders.idea.open")}
					sheets={[sheet("start", "#Contact"), sheet("cv", CV_URL, { external: true })]}
				/>
			</div>
		</section>
	);
}
