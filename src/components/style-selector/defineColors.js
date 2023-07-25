import Color from "@lxweb/color";

export const DEFAULT_MAIN_COLOR = "#9900ff";

// Will show on primary action buttons :
const mainColor = new Color(DEFAULT_MAIN_COLOR);

// Background :
const backgroundColor = new Color(mainColor, { saturation: sat => sat / 2, light: 30 });

// Selected style :
const secondaryColor = new Color(mainColor, { saturation: -30, light: -20 });

// Text & border in style selector and history :
const darkColor = new Color(mainColor, {
	saturation: -70,
	light: light => (light > 50 ? 35 : light < 35 ? 100 : light - 15),
});
// For history reset button :
const darkColorFade = new Color({ ref: darkColor, alpha: 40 });

// Will show on default buttons :
const defaultButtonColor = new Color({
	ref: mainColor,
	properties: { light: 25 },
	offsets: { saturation: sat => (sat > 20 ? 20 : sat) },
});

// Will show on secondary action buttons :
const secondaryButtonColor = new Color({
	ref: mainColor,
	properties: { light: 83 },
	offsets: { saturation: sat => (sat > 30 ? 30 : sat) },
});

// Text on main color :
const lightContrastColor = new Color(mainColor, {
	saturation: -90,
	light: light => {
		const isLightHue = mainColor.hue > 40 && mainColor.hue < 190;
		const isDarkHue = mainColor.hue > 220 && mainColor.hue < 280;
		if (isLightHue) return light > 35 ? 0 : 100;
		if (isDarkHue) return light > 70 ? 0 : 100;
		return light > 55 ? 0 : 100;
	},
});

// Better contrast on selection, focus, tab navigation...:
const contrastColor = new Color(mainColor, {
	hue: +180,
	saturation: +40,
	light: light => (light < 30 ? 100 : light > 80 ? 0 : -2 * light + 160),
});

// Better contrast on selection, focus, tab navigation... :
const contrastOnBlackColor = new Color({
	ref: mainColor,
	offsets: {
		hue: +180,
		saturation: +40,
		light: light => (light < 60 ? ((60 - light) / 60) * (95 - 60) + 60 : light > 85 ? 85 : light),
	},
});

const appStyle = document.body.style;

export const setColors = color => {
	mainColor.set(color);
	appStyle.setProperty("--main-color", mainColor.toHsl());
	appStyle.setProperty("--background-color", backgroundColor.toHsl());
	appStyle.setProperty("--secondary-color", secondaryColor.toHsl());
	appStyle.setProperty("--secondary-button-color", secondaryButtonColor.toHsl());
	appStyle.setProperty("--default-button-color", defaultButtonColor.toHsl());
	appStyle.setProperty("--dark-color", darkColor.toHsl());
	appStyle.setProperty("--dark-color-fade", darkColorFade.toHsl());
	appStyle.setProperty("--light-contrast-color", lightContrastColor.toHsl());
	appStyle.setProperty("--contrast-color", contrastColor.toHsl());
	appStyle.setProperty("--contrast-on-black-color", contrastOnBlackColor.toHsl());
};
