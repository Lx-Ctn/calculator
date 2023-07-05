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
	set_current_value: (state, action) => ({
		current: {
			...state.current,
			value: action.value,
			display: action.value,
		},
	}),

	// Secondary actions :
	reset: (state, action) => ({
		current: { value: "", display: "0", operation: "" },
		result: null,
	}),
	toggle_minus: (state, action) => {
		const newValues = getFormattedNumber(
			(isLastResultAsCurrentValue(state) ? state.result.value : state.current.value) * -1
		);
		return { current: { ...state.current, ...newValues } };
	},
	percentage: (state, action) => {
		const newValues = getFormattedNumber(
			(isLastResultAsCurrentValue(state) ? state.result.value : state.current.value) / 100
		);
		return { current: { ...state.current, ...newValues } };
	},
	clear_history: (state, action) => {
		// keep current value, else get last result as new current :
		const lastValue = state.current.value ? state.current : state.result;
		// If no last result (juste launch app or after reset "AC" button), back to default values.
		return {
			current: { value: "", display: 0, ...lastValue, operation: "" },
			result: null,
			oldValues: [],
		};
	},
};

const isLastResultAsCurrentValue = state => state.result !== null && state.current.value === "";
