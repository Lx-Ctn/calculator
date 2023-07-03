import React, { useEffect } from "react";
import { motion } from "framer-motion";
import Button from "./button/Button";
import Styles from "./Keypad.module.scss";
import { sectionVariants, digitButtonsVariants, operationButtonsVariants } from "../../utils/animation";
import { buttons, getFormattedNumber, getResult } from "../../operations";
import { MAX_INPUT_LENGTH } from "../../utils/CONSTANTS";

const Keypad = ({ state, dispatch, screenInputRef }) => {
	const { current, result } = state;
	useEffect(() => {
		window.addEventListener("keypress", handleKeyboardOperations);
		return () => {
			window.removeEventListener("keypress", handleKeyboardOperations);
		};
	});

	const handleKeyboardOperations = event => {
		switch (event.key) {
			case "Enter":
			case "=":
				handleOperation("=");
				break;
			case "+":
				handleOperation("+");
				break;
			case "-":
				// Input allows "-" for typing, we don't want to activate a substraction at the same time
				screenInputRef.current !== document.activeElement && handleOperation("−");
				break;
			case "/":
				handleOperation("÷");
				break;
			case "*":
			case "x":
				handleOperation("×");
				break;
			case "%":
				handleSecondaryAction.percentage();
				break;
			default:
				break;
		}
	};

	const addToValue = digit => {
		const valueToUpdate =
			current.value === "0" || current.value === "" ? (digit === "." ? "0" : "") : current.value.toString(); // loose the 1st 0 unless "." follow

		const authorisedDigit = digit === "." && valueToUpdate.includes(".") ? "" : digit; // only one "." is accepted
		const newValue = valueToUpdate + authorisedDigit;

		// Show the red caret if the value is too long :
		const isValueTooLong = newValue.length > MAX_INPUT_LENGTH;
		if (isValueTooLong) {
			screenInputRef.current.focus(); // If the input was clicked, caret will be moved at the start when focus
			screenInputRef.current.selectionStart = MAX_INPUT_LENGTH; // so we move the caret to the end
		} else
			dispatch({
				type: "set_current",
				current: { ...current, value: newValue, display: newValue },
			});
	};

	const handleOperation = operation => {
		(operation === "=" || current.value !== "" || current.operation === "") &&
			getResult(operation, state, dispatch);
		dispatch({ type: "set_current", current: { value: "", display: "0", operation } });
	};

	const handleSecondaryAction = {
		reset: () => {
			dispatch({ type: "set_result", result: null });
			dispatch({ type: "set_current", current: { value: "", display: "0", operation: "" } });
		},
		toggleMinus: () => {
			if (result !== null && current.value === "") {
				const newValues = getFormattedNumber(result.value * -1);
				dispatch({ type: "set_result", result: { ...newValues } });
			} else {
				const newValues = getFormattedNumber(current.value * -1);
				dispatch({ type: "set_current", current: { ...current, ...newValues } });
			}
		},
		percentage: () => {
			if (result !== null && current.value === "") {
				const newValues = getFormattedNumber(result.value / 100);
				dispatch({ type: "set_result", result: { ...newValues } });
			} else {
				const newValues = getFormattedNumber(current.value / 100);
				dispatch({ type: "set_current", current: { ...current, ...newValues } });
			}
		},
	};

	return (
		<motion.section className={Styles.container} variants={sectionVariants}>
			<motion.div className="default" variants={digitButtonsVariants}>
				{buttons.digit.map(({ digit }) => (
					<Button key={digit} onClick={() => addToValue(digit)} isWide={digit === "0"}>
						{digit}
					</Button>
				))}
			</motion.div>

			<motion.div className={Styles.operation} variants={operationButtonsVariants}>
				{buttons.operation.map(({ operation }) => (
					<Button buttonStyle="operation" key={operation} onClick={() => handleOperation(operation)}>
						{operation}
					</Button>
				))}
			</motion.div>

			<motion.div className={Styles.secondary}>
				{buttons.secondary.map(({ action, secondary }) => (
					<Button buttonStyle="secondary" key={action} onClick={handleSecondaryAction[action]}>
						{secondary}
					</Button>
				))}
			</motion.div>
		</motion.section>
	);
};
export default Keypad;
