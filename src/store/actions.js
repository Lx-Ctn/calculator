import { getFormattedNumber } from "../operations";

export const actions = {
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

	//
	set_current: (state, action) => ({ current: action.current }),
	set_result: (state, action) => ({ result: action.result }),
	set_old_values: (state, action) => ({ oldValues: action.oldValues }),
};

const isLastResultAsCurrentValue = state => state.result !== null && state.current.value === "";
