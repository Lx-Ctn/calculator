import "./styles/App.scss";
import React, { useRef, useEffect } from "react";
import useOperation from "./store/useOperation";

import { motion } from "framer-motion";
import { StyleSelector, History, Screen, Keypad, AlertIfObsolete } from "./components";

import * as anim from "./utils/animation";
import {
	handleResponsive,
	cleanUpHandleResponsive,
	handleKeyboardNavigation,
	cleanUpKeyboardNavigation,
} from "./utils";

function App() {
	const screenInputRef = useRef(null);
	const [state, dispatch] = useOperation();

	useEffect(() => {
		handleKeyboardNavigation(screenInputRef, dispatch); // Keyboard navigation
		handleResponsive();
		return () => {
			cleanUpKeyboardNavigation();
			cleanUpHandleResponsive();
		};
	}, [dispatch]);

	console.log("current :", state.current);
	console.log("result :", state.result);
	console.table(state.oldValues);

	return (
		<>
			<AlertIfObsolete />
			<motion.header variants={anim.headerVariants} initial="initial" animate="animate" exit="exit">
				<h1>Calc()</h1>
			</motion.header>

			<motion.main variants={anim.mainVariants} initial="initial" animate="animate" exit="exit">
				<StyleSelector />
				<History historyData={state.oldValues} dispatch={dispatch} />
				<Screen state={state} dispatch={dispatch} screenInputRef={screenInputRef} />
				<Keypad state={state} dispatch={dispatch} screenInputRef={screenInputRef} />
			</motion.main>
		</>
	);
}

export default App;
