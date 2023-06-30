import "./styles/App.scss";
import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { StyleSelector, History, Screen, Keypad, AlertIfObsolete } from "./components";

import * as anim from "./utils/animation";
import { getFormattedNumber } from "./utils/getFormattedNumber";
import { handleResponsive } from "./utils/responsive";
import { handleFocus } from "./utils/selectFocus";

/*
TODO:
- factorisation
- useReducer
- useMemo/callback
- typo temps de chargement
- reset history should keep the number on screen.
- last result stay display on screen, but when erase : it should'nt reappear
*/

function App() {
	const screenInputRef = useRef(null);
	useEffect(() => {
		handleFocus(screenInputRef); // Keyboard navigation
		handleResponsive();
		window.addEventListener("resize", handleResponsive);
		return () => window.removeEventListener("resize", handleResponsive);
	}, []);

	const [oldValues, setOldValues] = useState([]);
	const [current, setCurrent] = useState({ value: "", display: "0", operation: "" });
	const [result, setResult] = useState(null);

	console.log("current :", current);
	console.log("result :", result);
	console.table(oldValues);

	const getPrevDisplay = oldValues.length ? oldValues[0].display : "0";

	const getResult = nextOperation => {
		let total = 0;
		const isCurrentValue = current.value !== "" || result === null;

		// If there is no current value entered, we repeat last operation :
		const old = oldValues[0] ?? { value: "", display: 0, result: null, operation: "" };
		const prevValue = result === null ? +old.value : +result.value;
		const oldOperation = nextOperation === "=" ? old.operation : nextOperation;
		const operation = isCurrentValue ? current.operation : oldOperation;
		const currentValue = isCurrentValue ? +current.value : +old.value;

		switch (operation) {
			case "×":
				total = prevValue * currentValue;
				break;
			case "÷":
				total = prevValue / currentValue;
				break;
			case "−":
				total = prevValue - currentValue;
				break;
			case "+":
				total = prevValue + currentValue;
				break;
			default:
				total = null;
				break;
		}
		const formattedTotal = getFormattedNumber(total);
		setResult(formattedTotal);

		const formattedCurrent = { ...current, display: getFormattedNumber(current.value).display }; // Get rid of extra "0" and ending "."
		const dataToSave = isCurrentValue ? formattedCurrent : old;
		setOldValues([{ ...dataToSave, result: formattedTotal }, ...oldValues]);
	};

	//
	return (
		<>
			<AlertIfObsolete />
			<motion.header variants={anim.headerVariants} initial="initial" animate="animate" exit="exit">
				<h1>Calc()</h1>
			</motion.header>

			<motion.main variants={anim.mainVariants} initial="initial" animate="animate" exit="exit">
				<StyleSelector />
				<History historyData={oldValues} setOldValues={setOldValues} />
				<Screen
					current={current}
					setCurrent={setCurrent}
					result={result}
					screenInputRef={screenInputRef}
					prevDisplay={getPrevDisplay}
				/>
				<Keypad
					current={current}
					setCurrent={setCurrent}
					result={result}
					setResult={setResult}
					getResult={getResult}
					screenInputRef={screenInputRef}
				/>
			</motion.main>
		</>
	);
}

export default App;
