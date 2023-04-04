import React from "react";
import { motion } from "framer-motion";
import Button from "./button/Button";
import Styles from "./Keypad.module.scss";
import { buttons } from "../../utils/operations";
import { sectionVariants, digitButtonsVariants, operationButtonsVariants } from "../../utils/animation";
import { getFormattedNumber } from "../../utils/getFormattedNumber";
import { MAX_INPUT_LENGTH } from "../../utils/constants";

const Keypad = ({ current, setCurrent, result, setResult, getResult, inputRef }) => {
	const updateCurrentValue = newValue => {
		setCurrent({ ...current, value: newValue, display: newValue });
	};

	const addToValue = digit => {
		const valueToUpdate =
			current.value === "0" || current.value === "" ? (digit === "." ? "0" : "") : current.value.toString(); // loose the 1st 0 expect if "." follow

		const authorisedDigit = digit === "." && valueToUpdate.includes(".") ? "" : digit; // only one "." is accepted
		const newValue = valueToUpdate + authorisedDigit;

		// Show the red caret if the value is too long :
		const isValueTooLong = newValue.length > MAX_INPUT_LENGTH;
		if (isValueTooLong) {
			inputRef.current.focus(); // If the input was clicked, caret will be moved at the start when focus
			inputRef.current.selectionStart = MAX_INPUT_LENGTH; // so we move the caret to the end
		} else updateCurrentValue(newValue);
	};
	const handleOperation = operation => {
		(operation === "=" || current.value !== "" || current.operation === "") && getResult(operation);
		setCurrent({ value: "", display: "0", operation });
	};

	const handleSecondaryAction = {
		reset: () => {
			setResult(null);
			setCurrent({ value: "", display: "0", operation: "" });
		},
		toggleMinus: () => {
			if (result !== null && current.value === "") {
				const newValues = getFormattedNumber(result.value * -1);
				setResult({ ...newValues });
			} else {
				const newValues = getFormattedNumber(current.value * -1);
				setCurrent({ ...current, ...newValues });
			}
		},
		percentage: () => {
			if (result !== null && current.value === "") {
				const newValues = getFormattedNumber(result.value / 100);
				setResult({ ...newValues });
			} else {
				const newValues = getFormattedNumber(current.value / 100);
				setCurrent({ ...current, ...newValues });
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
