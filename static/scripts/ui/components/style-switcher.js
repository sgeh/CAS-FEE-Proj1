export class StyleSwitcher {
	constructor(links) {
		this.styles = [...links]
			.filter(lnk => lnk.dataset.themes)
			.map(lnk => { return {
				link: lnk,
				themes: lnk.dataset.themes.split('|'),
				pattern: lnk.dataset.themeLink
				};
			} );
		
	}

	switchStyle(toSwitch) {
		this.styles.forEach(style => {
			if (style.themes.some(theme => theme === toSwitch)) {
				style.link.href = style.pattern.replace("{theme}", toSwitch.toLowerCase());
			}
		} );
	}
}