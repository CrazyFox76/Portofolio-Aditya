// iOS-style app tiles for the dock, drawn from scratch as SVG (40x40 viewBox). They borrow the look of
// the iPhone home screen (Files, Settings, Maps, Contacts, Messages); none of Apple's artwork is used.

const Tile = ({ children, id }) => (
	<svg viewBox="0 0 40 40" className="h-10 w-10" aria-hidden="true" focusable="false" data-icon={id}>
		{children}
	</svg>
);

export function FilesIcon() {
	return (
		<Tile id="files">
			<defs>
				<linearGradient id="di-files-bg" x1="0" y1="0" x2="0" y2="1">
					<stop offset="0" stopColor="#ffffff" />
					<stop offset="1" stopColor="#e9edf2" />
				</linearGradient>
				<linearGradient id="di-files-fold" x1="0" y1="0" x2="0" y2="1">
					<stop offset="0" stopColor="#5fb4ff" />
					<stop offset="1" stopColor="#1b7cf0" />
				</linearGradient>
			</defs>
			<rect width="40" height="40" rx="9" fill="url(#di-files-bg)" />
			<path d="M8 13.5a2.5 2.5 0 0 1 2.5-2.5h6.2l2.6 2.6h10.2a2.5 2.5 0 0 1 2.5 2.5v1H8z" fill="#3f97f5" />
			<rect x="8" y="15.5" width="24" height="14.5" rx="2.6" fill="url(#di-files-fold)" />
			<rect x="8" y="15.5" width="24" height="1.3" rx="0.6" fill="#ffffff" opacity=".45" />
		</Tile>
	);
}

export function SettingsIcon() {
	const teeth = Array.from({ length: 12 }, (_, i) => i * 30);
	return (
		<Tile id="settings">
			<defs>
				<linearGradient id="di-set-bg" x1="0" y1="0" x2="0" y2="1">
					<stop offset="0" stopColor="#c9ccd2" />
					<stop offset="1" stopColor="#8a8e96" />
				</linearGradient>
				<radialGradient id="di-set-gear" cx=".5" cy=".4" r=".6">
					<stop offset="0" stopColor="#6c7079" />
					<stop offset="1" stopColor="#3b3e45" />
				</radialGradient>
			</defs>
			<rect width="40" height="40" rx="9" fill="url(#di-set-bg)" />
			<g transform="translate(20 20)">
				{teeth.map((a) => (
					<rect key={a} x="-1.9" y="-14" width="3.8" height="5" rx="1" fill="url(#di-set-gear)" transform={`rotate(${a})`} />
				))}
				<circle r="10.4" fill="url(#di-set-gear)" />
				<circle r="7.6" fill="#a9adb4" />
				<circle r="5.4" fill="#4a4e56" />
				<circle r="2.6" fill="#c3c6cc" />
			</g>
		</Tile>
	);
}

export function MapsIcon() {
	return (
		<Tile id="maps">
			<defs>
				<clipPath id="di-maps-clip">
					<rect width="40" height="40" rx="9" />
				</clipPath>
			</defs>
			<g clipPath="url(#di-maps-clip)">
				<rect width="40" height="40" fill="#f2ede1" />
				<path d="M0 0h17L9 16 0 20z" fill="#bfe3a8" />
				<path d="M26 40l7-15 7-3v18z" fill="#bfe3a8" />
				<path d="M0 27l40-11" stroke="#ffffff" strokeWidth="4.5" />
				<path d="M14 0l12 40" stroke="#ffd25a" strokeWidth="4" />
				<path d="M14 0l12 40" stroke="#f3b632" strokeWidth="1" opacity=".5" />
				<path d="M5 34c6-3 9-9 15-11s9-6 14-13" fill="none" stroke="#2f80ff" strokeWidth="2.6" strokeLinecap="round" />
			</g>
			<circle cx="33.5" cy="10" r="4.4" fill="#ffffff" />
			<circle cx="33.5" cy="10" r="3" fill="#2f80ff" />
			<path d="M5.5 31.5l2.6 4.6 2.4-4.6z" fill="#ff3b30" />
		</Tile>
	);
}

export function ContactsIcon() {
	return (
		<Tile id="contacts">
			<defs>
				<linearGradient id="di-con-bg" x1="0" y1="0" x2="0" y2="1">
					<stop offset="0" stopColor="#f4f4f6" />
					<stop offset="1" stopColor="#d4d6db" />
				</linearGradient>
				<linearGradient id="di-con-person" x1="0" y1="0" x2="0" y2="1">
					<stop offset="0" stopColor="#a3a7b0" />
					<stop offset="1" stopColor="#7a7f89" />
				</linearGradient>
			</defs>
			<rect width="40" height="40" rx="9" fill="url(#di-con-bg)" />
			<circle cx="20" cy="15.5" r="6.4" fill="url(#di-con-person)" />
			<path d="M8.5 33c1.2-6.6 6-10 11.5-10s10.3 3.4 11.5 10z" fill="url(#di-con-person)" />
		</Tile>
	);
}

export function MessagesIcon() {
	return (
		<Tile id="messages">
			<defs>
				<linearGradient id="di-msg-bg" x1="0" y1="0" x2="0" y2="1">
					<stop offset="0" stopColor="#6ef27a" />
					<stop offset="1" stopColor="#1ec431" />
				</linearGradient>
			</defs>
			<rect width="40" height="40" rx="9" fill="url(#di-msg-bg)" />
			<path
				d="M20 9.5c-7.2 0-12.5 4.4-12.5 9.8 0 3.3 2 6.2 5.1 8-.3 1.7-1.2 3.4-2.7 4.6 2.7.1 5.1-.8 6.9-2.3 1 .2 2.1.3 3.2.3 7.2 0 12.5-4.4 12.5-10.6S27.2 9.5 20 9.5z"
				fill="#ffffff"
			/>
		</Tile>
	);
}
