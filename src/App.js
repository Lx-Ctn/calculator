import "./styles/App.scss";
import React, { useRef, useEffect } from "react";
import useOperation from "./store/useOperation";

import { motion } from "framer-motion";
import { StyleSelector, History, Screen, Keypad, AlertIfObsolete } from "./components";

import * as anim from "./utils/animation";
import { handleResponsive, handleFocus } from "./utils";

/*
TODO:
- refactoring
- useReducer
- useMemo/callback
- check loading time of the font 
*/

function App() {
	const screenInputRef = useRef(null);
	useEffect(() => {
		handleFocus(screenInputRef); // Keyboard navigation
		handleResponsive();
		window.addEventListener("resize", handleResponsive);
		return () => window.removeEventListener("resize", handleResponsive);
	}, []);

	const [state, dispatch] = useOperation();

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
