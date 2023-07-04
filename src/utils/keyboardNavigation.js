import { buttons } from "../operations/buttonsModel";

// Mapping button element position to navigate with keyboard :
const inputMap = [
	[], // ["screen"],
	[], // ["AC", "+-", "%", "x"],
	[], // [7, 8, 9, "/"],
	[], // [4, 5, 6, "+"],
	[], // [1, 2, 3, "-"],
	[], // [0, ".", "="],
];

const getRefs = screenInputRef => {
	// ["screen"] :
	inputMap[0].push(screenInputRef);

	// ["AC", "+-", "%", "x"] :
	inputMap[1].push(...buttons.secondary.map(el => el.ref)); // AC ± %
	inputMap[1].push(buttons.operation[0].ref); // x

	// [7, 8, 9, "/"] :
	inputMap[2].push(...buttons.digit.filter((_, i) => i < 3).map(el => el.ref)); // 7 8 9
	inputMap[2].push(buttons.operation[1].ref); // /

	// [4, 5, 6, "+"] :
	inputMap[3].push(...buttons.digit.filter((_, i) => i >= 3 && i < 6).map(el => el.ref)); // 4 5 6
	inputMap[3].push(buttons.operation[2].ref); // +

	// [1, 2, 3, "-"] :
	inputMap[4].push(...buttons.digit.filter((_, i) => i >= 6 && i < 9).map(el => el.ref)); // 1 2 3
	inputMap[4].push(buttons.operation[3].ref); // -

	// [0, ".", "="] :
	inputMap[5].push(...buttons.digit.filter((_, i) => i >= 9).map(el => el.ref)); // 0 .
	inputMap[5].unshift(inputMap[5][0]); // 0 0 .
	inputMap[5].push(buttons.operation[4].ref); // =
};

let currentFocus = [0, 0];
const allCurrentFocusUpdater = [];

const handleFocusNavigation = event => {
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
};

const handleKeyboardOperations = (event, dispatch, screenInputRef) => {
	switch (event.key) {
		case "Enter":
		case "=":
			dispatch({ type: "operation", operation: "=" });
			break;
		case "+":
			dispatch({ type: "operation", operation: "+" });
			break;
		case "-":
			// Input allows "-" for typing, we don't want to activate a substraction at the same time
			screenInputRef.current !== document.activeElement && dispatch({ type: "operation", operation: "−" });
			break;
		case "/":
			dispatch({ type: "operation", operation: "÷" });
			break;
		case "*":
		case "x":
			dispatch({ type: "operation", operation: "×" });
			break;
		case "%":
			dispatch({ type: "percentage" });
			break;
		default:
			break;
	}
};

const handleKeyboardDigits = event => {
	for (const digit of buttons.digit) {
		const isValidKey = digit.digit === event.key || (digit.digit === "." && event.key === ",");
		if (isValidKey) digit.ref.current.click();
	}
};

let getAllKeyboardInputs;

export const handleKeyboardNavigation = (screenInputRef, dispatch) => {
	getRefs(screenInputRef);

	const updateCurrentFocus = (rowIndex, refIndex) => () => {
		currentFocus = [rowIndex, refIndex];
	};
	inputMap.forEach((row, rowIndex) => {
		row.forEach((ref, refIndex) => {
			const updater = updateCurrentFocus(rowIndex, refIndex);
			allCurrentFocusUpdater.push(updater);
			ref?.current.addEventListener("focus", updater);
		});
	});
	getAllKeyboardInputs = event => {
		handleFocusNavigation(event);
		handleKeyboardOperations(event, dispatch, screenInputRef);
		handleKeyboardDigits(event);
	};

	window.addEventListener("keydown", getAllKeyboardInputs);
};

export const cleanUpKeyboardNavigation = () => {
	inputMap.forEach((row, rowIndex) => {
		row.forEach((ref, refIndex) => {
			ref?.current.removeEventListener("focus", allCurrentFocusUpdater.shift());
		});
	});
	window.removeEventListener("keydown", getAllKeyboardInputs);
};
