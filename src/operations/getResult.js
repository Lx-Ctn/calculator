import { getFormattedNumber } from "./getFormattedNumber";

export const getResult = (nextOperation, state) => {
	const { current, result, oldValues } = state;

	const isCurrentValue = current.value !== "";
	const isLastResult = result !== null;
	//const isLastValue = lastCalculation.value !== "";

	// For a new calculation, we just save the current value :
	const isNewCalculation = !isLastResult && current.operation === "";
	if (isNewCalculation) {
		const currentValue = isCurrentValue ? current.value : 0;
		return {
			result: null,
			oldValues: [{ ...getFormattedNumber(currentValue), operation: "", result: null }, ...oldValues],
		};
	}

	// If there is no current value entered, we repeat last operation :
	const lastCalculation = oldValues[0] ?? { value: "", display: 0, operation: "", result: null };

	const prevValue = isLastResult ? +result.value : +lastCalculation.value;
	const currentValue = isCurrentValue ? +current.value : +lastCalculation.value;
	const operation = isCurrentValue ? current.operation : lastCalculation.operation;

	let total;
	const isValidOperation = operation && operation !== "=";
	if (isValidOperation) total = getFormattedNumber(getOperations[operation](prevValue, currentValue));
	else total = null;

	const getFormattedCurrent = () => ({ ...getFormattedNumber(current.value), operation: current.operation }); // Get rid of extra "0" and ending "."
	const dataToSave = isCurrentValue ? getFormattedCurrent() : { ...lastCalculation, operation };

	console.log({ operation, prevValue, currentValue });
	return {
		result: total, // need to keep a separate result to be able to reset without erase history
		oldValues: [{ ...dataToSave, result: total }, ...oldValues],
	};
};

const getOperations = {
	"×": (prev, cur) => prev * cur,
	"÷": (prev, cur) => prev / cur,
	"−": (prev, cur) => prev - cur,
	"+": (prev, cur) => prev + cur,
	//"=": () => null, // ca n'a aucun sens à vérifier
};
