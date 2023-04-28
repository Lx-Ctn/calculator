const MIN_WIDTH = 470; // Full content width
const MIN_HEIGHT = 530; // Keypad height + result display height
const MIN_HEIGHT_WITH_HEADER = 815; // Full content height
const DEFAULT_SIZE = 2; // em

export const handleResponsive = () => {
	// Safari modify the window size when zoom in : using document.documentElement.clientWidth instead of window.innerWidth
	const appWidth = document.documentElement.clientWidth;
	const appHeight = document.documentElement.clientHeight;

	const isWidthTooSmall = appWidth < MIN_WIDTH;
	const isHeightTooSmall = appHeight < MIN_HEIGHT_WITH_HEADER;
	const isMinHeightTooSmall = appHeight < MIN_HEIGHT;

	if (!isWidthTooSmall && !isHeightTooSmall) setFontRatio(1); // By default
	else {
		// If window width get smaller than the content, content scale down to fit the window :
		const widthRatio = isWidthTooSmall ? appWidth / MIN_WIDTH : 1;

		// If the scale get too small for good lisibility, we keep only the essential part (keypad and result display) to fit the screen :
		const heightRatio = isMinHeightTooSmall
			? appHeight / MIN_HEIGHT
			: // If window height get smaller than the content, content scale down to fit the window :
			isHeightTooSmall
			? appHeight / MIN_HEIGHT_WITH_HEADER
			: 1;

		// If width AND height get smaller, content scale down to the smallest :
		const minRatio = widthRatio >= heightRatio ? heightRatio : widthRatio;
		setFontRatio(minRatio);
		isHeightTooSmall && scrollToBottom();
	}
};

const setFontRatio = ratio => document.body.style.setProperty("font-size", `${ratio * DEFAULT_SIZE}em`);
const scrollToBottom = () => window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
