import React, { useRef, useEffect } from "react";
import Styles from "./Button.module.scss";
import { motion } from "framer-motion";
import { buttonVariants } from "../../../utils/animation";
import { buttons } from "../../../utils/operations";

const Button = props => {
	const ref = useRef();

	useEffect(() => {
		const type = props.buttonStyle ?? "digit";
		buttons[type].forEach(button => {
			if (button[type] === props.children) button.ref = ref;
		});
	}, [props.buttonStyle, props.children]);

	return (
		<motion.div className={`${Styles.container} ${props.isWide ? Styles.wide : ""}`} variants={buttonVariants}>
			<motion.button
				ref={ref}
				className={Styles[props.buttonStyle]}
				onClick={props.onClick}
				style={props.style}
				// Animation
				whileHover={{ scale: 1.1, transition: { duration: 0.15 } }}
				whileTap={{ scale: 0.9, transition: { duration: 0.15 } }}
			>
				{props.children}
			</motion.button>
		</motion.div>
	);
};

export default Button;
