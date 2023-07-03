import { getFormattedNumber, getResult } from "../operations";

export const actions = {
	// Operations :
	operation: (state, action) => {
		const isCompleteOperation =
			action.operation === "=" || state.current.value !== "" || state.current.operation === "";
		return {
			...(isCompleteOperation && getResult(action.operation, state)),
			current: { value: "", display: "0", operation: action.operation },
		};
	},

	// Secondary actions :
	reset: (state, action) => ({
		current: { value: "", display: "0", operation: "" },
		result: null,
	}),
	toggle_minus: (state, action) => {
		const newValues = isLastResultAsCurrentValue(state)
			? getFormattedNumber(state.result.value * -1)
			: getFormattedNumber(state.current.value * -1);
		return { current: { ...state.current, ...newValues } };
	},
	percentage: (state, action) => {
		const newValues = isLastResultAsCurrentValue(state)
			? getFormattedNumber(state.result.value / 100)
			: getFormattedNumber(state.current.value / 100);
		return { current: { ...state.current, ...newValues } };
	},
	clear_history: (state, action) => {
		const lastOperation = state.oldValues[0];
		return {
			current: { ...lastOperation.result, operation: "" },
			oldValues: [],
		};
	},

	// Basic actions :
	set_current_value: (state, action) => ({
		current: {
			...state.current,
			value: action.value,
			display: action.value,
		},
	}),
	set_current: (state, action) => ({ current: action.current }),
	set_result: (state, action) => ({ result: action.result }),
	set_old_values: (state, action) => ({ oldValues: action.oldValues }),
};

const isLastResultAsCurrentValue = state => state.result !== null && state.current.value === "";
