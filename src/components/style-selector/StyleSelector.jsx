import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Styles from "./StyleSelector.module.scss";
import { DEFAULT_MAIN_COLOR, setColors } from "./defineColors";

const appStyle = document.body.style;
const StyleSelector = props => {
	const [isOpen, setOpen] = useState(false);
	useEffect(() => {
		setColors(DEFAULT_MAIN_COLOR);
	}, []);

	const changeStyleTo = (style, color = DEFAULT_MAIN_COLOR) => {
		switch (style) {
			case "square":
				appStyle.setProperty("--border-radius", 0);
				break;
			case "round":
				appStyle.setProperty("--border-radius", "1em");
				break;
			case "color":
				setColors(color);
				break;
			default:
				appStyle.setProperty("--border-radius", "1em");
				appStyle.setProperty("--main-color", DEFAULT_MAIN_COLOR);
				appStyle.setProperty("--background-color", "#d3b0e8");
				break;
		}
	};

	const toggleStyleDisplay = () => {
		setOpen(!isOpen);
	};

	return (
		<motion.aside
			className={Styles.container}
			variants={variants.container}
			initial={false}
			animate={isOpen ? "open" : "close"}
		>
			<motion.button onClick={toggleStyleDisplay} whileHover={{ scale: 1.1, transition: { type: "spring" } }}>
				Style
			</motion.button>

			<motion.div variants={variants.style}>
				<span>:</span>
				<motion.input
					name="style"
					type="radio"
					value="round"
					className={Styles.round}
					onClick={() => changeStyleTo("round")}
					defaultChecked
				></motion.input>
				<motion.input
					name="style"
					type="radio"
					value="square"
					className={Styles.square}
					onClick={() => changeStyleTo("square")}
				></motion.input>
			</motion.div>

			<motion.div variants={variants.color}>
				<span>Color :</span>
				<motion.input
					name="color"
					type="color"
					defaultValue={DEFAULT_MAIN_COLOR}
					onChange={e => changeStyleTo("color", e.target.value)}
				></motion.input>
			</motion.div>
		</motion.aside>
	);
};
export default StyleSelector;

// Animations :
const variants = {
	container: {
		open: { x: 0, transition: { type: "spring", staggerChildren: 0.2 } },
		close: {
			x: "3.4em",
			transition: { type: "spring", staggerChildren: 0.3, staggerDirection: -1 },
		},
	},
	style: {
		open: { visibility: "visible", opacity: 1, x: 0 },
		close: { opacity: 0, x: "3.4em", transitionEnd: { visibility: "hidden" } },
	},
	color: {
		open: { visibility: "visible", opacity: 1, y: 0, scale: 1 },
		close: { opacity: 0, y: -13, scale: 0.7, transitionEnd: { visibility: "hidden" } },
	},
};
