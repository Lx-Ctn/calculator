import React, { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import css from "./History.module.scss";

const History = ({ historyData, dispatch }) => {
	const historyRef = useRef();

	// Keep the last result in view :
	useEffect(() => {
		const history = historyRef.current;
		history.scrollTo(0, history.scrollHeight);
	}, [historyData]);

	const clearHistory = () => {
		const lastOperation = historyData[0];
		dispatch({ type: "set_current", current: { ...lastOperation.result, operation: "" } });
		dispatch({ type: "set_old_values", oldValues: [] });
	};

	return (
		<motion.section aria-label="Operations history" className={css._}>
			<div>
				<ul ref={historyRef}>
					{historyData.map((data, index) => <li key={index}>{historyLineFormat(data)}</li>).reverse()}
				</ul>
			</div>
			{historyData.length > 0 && <button onClick={clearHistory}>x</button>}
		</motion.section>
	);
};
export default History;

const historyLineFormat = data => {
	const operation = data.operation === "=" ? "" : data.operation;
	const value = data.display;
	const result = data.result === null ? "" : `= ${data.result.display}`;

	return `${operation} ${value} ${result}`;
};
