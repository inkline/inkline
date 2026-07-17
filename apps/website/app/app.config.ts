export default defineAppConfig({
	seo: {
		title: "Inkline",
		titleTemplate: "%s - Inkline",
		description:
			"Write-once, compile-everywhere UI components for React, Vue, Svelte, Solid, Angular, Qwik and Astro.",
	},
	header: {
		title: "Inkline",
		// logo: { alt, light, dark } — no header wordmark exists in the live tree yet
		// (only the icon favicon at public/favicon.svg). Text title is used until a
		// wordmark asset lands.
	},
	github: {
		url: "https://github.com/inkline/inkline",
		branch: "main",
	},
	footer: {
		credits: `Copyright © ${new Date().getFullYear()} Inkline`,
	},
	// socials: {} — no verified handles in the live tree; add when confirmed.
	ui: {
		colors: {
			primary: "purple",
			neutral: "slate",
		},
	},
});
