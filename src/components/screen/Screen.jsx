import React from "react";
import { motion } from "framer-motion";
import Styles from "./Screen.module.scss";
import { sectionVariants, screenVariants } from "../../utils/animation";
import { MAX_INPUT_LENGTH } from "../../utils/constants";

const Screen = ({ inputRef, current, setCurrent, result, prevDisplay }) => {
	//
	const getResultDisplayValue = result ? result.display : "0";
	const isCurrentValue = current.value !== "";

	// Will display current value first,
	// Keep last result on screen until a new value is set,
	// To do : Keep last value on screen until a new value is set if no last result (new operation) : -> but keep prev on screen if AC
	const getDisplayValue = isCurrentValue
		? current.display
		: result
		? getResultDisplayValue
		: current.operation !== ""
		? prevDisplay
		: "0";

	const displayValueLength = getDisplayValue.length;
	const getInputStyle = {
		// Adapt size for value's length :
		// For some reason "ch" unit doesn't work consistently across browsers...
		// So i came with a "em" equivalent that fit well for this font-family
		width: `${displayValueLength <= 6 ? "4.2" : 0.3 + displayValueLength * 0.61}em`,
		fontSize: `${
			displayValueLength <= 7 ? "2" : 2.7 - displayValueLength * (0.12 - 0.0015 * displayValueLength)
		}em`,
		// Caret trun red when reach max length :
		caretColor: `${displayValueLength >= MAX_INPUT_LENGTH ? "#f00" : "#aaa"}`,
	};

	const handleInputChange = () => {
		let value = inputRef.current.value;
		if (
			!(
				(
					value.length > MAX_INPUT_LENGTH ||
					/[^\d.,-]/.test(value) || // must have only digit, minus, comma or dot
					/^.+-/.test(value) || // minus must be only on first
					/^[,.]/.test(value) || // must not start by dot or comma
					/[,.].*[,.]/.test(value)
				)
				// must have only one dot or comma
			)
		) {
			value = value.replace(",", "."); // "," doesn't work with JS math
			setCurrent({ ...current, value, display: value });
		}
	};

	return (
		<motion.section className={Styles.container} variants={sectionVariants}>
			<span className={current.operation.length ? Styles.withBorder : ""}>{current.operation}</span>
			<div>
				<motion.input
					ref={inputRef}
					type="text"
					inputMode="decimal"
					value={getDisplayValue}
					onChange={handleInputChange}
					variants={screenVariants}
					style={getInputStyle}
				/>
			</div>
		</motion.section>
	);
};
export default Screen;
