import React from "react";
import { motion } from "framer-motion";
import Button from "./button/Button";
import css from "./Keypad.module.scss";
import { sectionVariants, digitButtonsVariants, operationButtonsVariants } from "../../utils/animation";
import { buttons } from "../../operations";
import { MAX_INPUT_LENGTH } from "../../utils/CONSTANTS";

const Keypad = ({ state, dispatch, screenInputRef }) => {
	const { current } = state;

	const addToValue = digit => {
		const newValue = getCleanValue(current, digit);

		// Show the red caret if the value is too long :
		const isValueTooLong = newValue.length > MAX_INPUT_LENGTH;
		if (isValueTooLong) {
			screenInputRef.current.focus(); // If the input was clicked, caret will be moved at the start when focus
			screenInputRef.current.selectionStart = MAX_INPUT_LENGTH; // so we move the caret to the end
		} else dispatch({ type: "set_current_value", value: newValue });
	};

	const handleOperation = operation => dispatch({ type: "operation", operation });

	const handleSecondaryAction = {
		reset: () => dispatch({ type: "reset" }),
		toggleMinus: () => dispatch({ type: "toggle_minus" }),
		percentage: () => dispatch({ type: "percentage" }),
	};

	return (
		<motion.section className={css._} variants={sectionVariants}>
			<motion.div className="default" variants={digitButtonsVariants}>
				{buttons.digit.map(({ digit }) => (
					<Button key={digit} onClick={() => addToValue(digit)} isWide={digit === "0"}>
						{digit}
					</Button>
				))}
			</motion.div>

			<motion.div className={css.operation} variants={operationButtonsVariants}>
				{buttons.operation.map(({ operation }) => (
					<Button buttonStyle="operation" key={operation} onClick={() => handleOperation(operation)}>
						{operation}
					</Button>
				))}
			</motion.div>

			<motion.div className={css.secondary}>
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

const getCleanValue = (current, digit) => {
	const valueIsNull = current.value === "0" || current.value === "";
	// loose the 1st 0 unless "." follow :
	const valueToUpdate = valueIsNull ? (digit === "." ? "0" : "") : current.value.toString();
	// only one "." is accepted :
	const authorisedDigit = digit === "." && valueToUpdate.includes(".") ? "" : digit;

	return valueToUpdate + authorisedDigit;
};
