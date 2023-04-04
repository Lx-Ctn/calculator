import { buttons } from "./operations";

/* inputMap = [
	["screen"],
	["AC", "+-", "%", "x"],
	[7, 8, 9, "/"],
	[4, 5, 6, "+"],
	[1, 2, 3, "-"],
	[0, ".", "="],
]; */

const inputMap = [[], [], [], [], [], []];
let currentFocus = [0, 0];

const getRefs = inputRef => {
	inputMap[0].push(inputRef);
	inputMap[1].push(...buttons.secondary.map(el => el.ref)); // AC ± %
	inputMap[1].push(buttons.operation[0].ref); // x
	inputMap[2].push(...buttons.digit.filter((_, i) => i < 3).map(el => el.ref)); // 7 8 9
	inputMap[2].push(buttons.operation[1].ref); // /
	inputMap[3].push(...buttons.digit.filter((_, i) => i >= 3 && i < 6).map(el => el.ref)); // 4 5 6
	inputMap[3].push(buttons.operation[2].ref); // +
	inputMap[4].push(...buttons.digit.filter((_, i) => i >= 6 && i < 9).map(el => el.ref)); // 1 2 3
	inputMap[4].push(buttons.operation[3].ref); // -
	inputMap[5].push(...buttons.digit.filter((_, i) => i >= 9).map(el => el.ref)); // 0 .
	inputMap[5].unshift(inputMap[5][0]); // 0 0 .
	inputMap[5].push(buttons.operation[4].ref); // =

	console.log(inputMap);
};

export const handleFocus = inputRef => {
	getRefs(inputRef);

	inputMap.forEach((row, rowIndex) => {
		row.forEach((ref, refIndex) => {
			ref?.current.addEventListener("focus", () => {
				currentFocus = [rowIndex, refIndex];
			});
		});
	});

	window.addEventListener("keydown", event => {
		const [rowIndex, refIndex] = currentFocus;
		switch (event.key) {
			case "ArrowRight":
				if (refIndex < inputMap[rowIndex].length - 1) inputMap[rowIndex][refIndex + 1].current.focus();
				break;
			case "ArrowLeft":
				if (refIndex > 0) inputMap[rowIndex][refIndex - 1].current.focus();
				break;
			case "ArrowDown":
				if (rowIndex === 0) inputMap[1][3].current.focus(); // Get faster to operation buttons
				else if (rowIndex < inputMap.length - 1) inputMap[rowIndex + 1][refIndex].current.focus();
				break;
			case "ArrowUp":
				if (rowIndex > 1) inputMap[rowIndex - 1][refIndex].current.focus();
				if (rowIndex === 1) inputMap[0][0].current.focus(); // Only 1 input on 1st row (screen)
				break;
			default:
				break;
		}
	});
};
