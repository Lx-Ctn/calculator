import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import css from "./Screen.module.scss";
import { sectionVariants, screenVariants } from "../../utils/animation";
import { MAX_INPUT_LENGTH } from "../../utils/CONSTANTS";

const Screen = ({ screenInputRef, state, dispatch }) => {
	const { current, result, oldValues } = state;
	const prevDisplay = oldValues.length ? oldValues[0].display : "0";
	const getResultDisplayValue = result ? result.display : "0";
	const isCurrentValue = current.value !== "";

	const [isInputChanged, setIsInputChanged] = useState(false);
	useEffect(() => {
		setIsInputChanged(false);
	}, [result]);

	// Will display current value first,
	// Keep last result on screen until a new value is set,
	const getDisplayValue = isCurrentValue
		? current.display
		: result
		? isInputChanged // if manualy erase, dont make last result reappear
			? "0"
			: getResultDisplayValue
		: current.operation !== ""
		? prevDisplay
		: "0";

	const inputStyle = getInputStyle(getDisplayValue.length);

	const handleInputChange = () => {
		setIsInputChanged(true);
		let value = screenInputRef.current.value;
		if (value.length <= MAX_INPUT_LENGTH && isValidInput(value)) {
			value = value.replace(",", "."); // "," doesn't work with JS math
			dispatch({ type: "set_current", current: { ...current, value, display: value } });
		}
	};

	return (
		<motion.section className={css._} variants={sectionVariants}>
			<span className={current.operation.length ? css.withBorder : ""}>{current.operation}</span>
			<div>
				<motion.input
					ref={screenInputRef}
					type="text"
					inputMode="decimal"
					value={getDisplayValue}
					onChange={handleInputChange}
					variants={screenVariants}
					style={inputStyle}
				/>
			</div>
		</motion.section>
	);
};
export default Screen;

const isValidInput = value =>
	!/[^\d.,-]/.test(value) && // must have only digit, minus, comma or dot
	!/^.+-/.test(value) && // minus must be only on first
	!/^[,.]/.test(value) && // must not start by dot or comma
	!/[,.].*[,.]/.test(value); // must have only one dot or comma

const getInputStyle = displayValueLength => ({
	// Adapt size for value's length :
	// For some reason "ch" unit doesn't work consistently across browsers...
	// So i came with a "em" equivalent that fit well for this font-family
	width: `${displayValueLength <= 6 ? "4.2" : 0.3 + displayValueLength * 0.61}em`,
	fontSize: `${
		displayValueLength <= 7 ? "2" : 2.7 - displayValueLength * (0.12 - 0.0015 * displayValueLength)
	}em`,
	// Caret turn red when reach max length :
	caretColor: `${displayValueLength >= MAX_INPUT_LENGTH ? "#f00" : "#aaa"}`,
});
