//
import { MAX_DIGIT_TO_DISPLAY } from "./constants";
import { MAX_DECIMAL_WITH_SCI_NOTATION } from "./constants"; // 5 digit after the comma : 0,12345e+10
/*



Format number for better display :
- limit the number of digit on screen : 
	- turn to scientific notation for very high or very low value 
	- round when to many dicimals
	- correct the JS precision calculation problem (0.1 + 0.2 = 0.30000000000000004)
- keep the reel value for operation */

export const getFormattedNumber = value => {
	if (typeof value === "number") value = value.toString();

	if (value === null) return null;
	if (value === "0" || value === "-0") return { value: "0", display: "0" };
	if (Number.isNaN(Number(value))) return { value: NaN, display: "Impossible" };

	const limittedNumber = getLimittedDigit(value);

	// Some values from The Intl.NumberFormat object need correction for display :
	const formattedNumber = limittedNumber
		.replace(/(,)/g, "") // "en" number format put "," for each 3 integers
		.replace(/(E-|E)/, capture => (capture.includes("-") ? "e-" : "e+")) // 1E10 -> 1e+10 : better lisibility
		.replace(/0e\+0/, "0") // 0e+0 => 0
		.concat("", value.at(-1) === "." ? "." : ""); // Keep the "." at the end while typing

	// We keep the original value for operations, and the formatted value for display
	return { value, display: formattedNumber };
};
/*




Limit the number of digits displayed :
- if 2/3 => 0.6666666666666666666... : a limit is necessary -> 0.6666666667
- if 987654321234567890 -> 9.87654e+17 */
export const getLimittedDigit = number => {
	if (typeof number === "string") number = Number(number);
	const absNumber = Math.abs(number);
	const isTooLong =
		absNumber >= 10 ** MAX_DIGIT_TO_DISPLAY ||
		(absNumber < 1 / 10 ** (MAX_DIGIT_TO_DISPLAY - 1) && absNumber !== 0);

	if (!isTooLong) number = number.toPrecision(MAX_DIGIT_TO_DISPLAY);

	const numberFormat = new Intl.NumberFormat("en", {
		minimumFractionDigits: 0,
		maximumFractionDigits: isTooLong ? MAX_DECIMAL_WITH_SCI_NOTATION : MAX_DIGIT_TO_DISPLAY,
		notation: isTooLong ? "scientific" : "standard",
	});

	return numberFormat.format(number);
};
