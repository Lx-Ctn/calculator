import { getFormattedNumber } from "./getFormattedNumber";

export const getResult = (nextOperation, state) => {
	const { current, result, oldValues } = state;

	const isCurrentValue = current.value !== "" || result === null; // Last result act as current value if there is none.

	// If there is no current value entered, we repeat last operation :
	const old = oldValues[0] ?? { value: "", display: 0, result: null, operation: "" };
	const prevValue = result === null ? +old.value : +result.value;
	const oldOperation = nextOperation === "=" ? old.operation : nextOperation;
	const operation = isCurrentValue ? current.operation : oldOperation;
	//const operation = current.operation && current.operation !== "=" ? current.operation : oldOperation;
	const currentValue = isCurrentValue ? +current.value : +old.value;

	console.log({
		operation,
		//testOperation,
		oldOperation,
		nextOperation,
		isCurrentValue,
		currentOpe: current.operation,
	});

	const total = operation ? getOperations[operation](prevValue, currentValue) : null;
	const formattedTotal = total ? getFormattedNumber(total) : null;

	const formattedCurrent = { ...current, display: getFormattedNumber(current.value).display }; // Get rid of extra "0" and ending "."
	const dataToSave = isCurrentValue ? formattedCurrent : old;

	return {
		result: formattedTotal,
		oldValues: [{ ...dataToSave, result: formattedTotal }, ...oldValues],
	};
};

const getOperations = {
	"×": (prev, cur) => prev * cur,
	"÷": (prev, cur) => prev / cur,
	"−": (prev, cur) => prev - cur,
	"+": (prev, cur) => prev + cur,
	"=": () => null, // ca n'a aucun sens à vérifier
};
