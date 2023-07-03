export const actions = {
	set_current: (state, action) => ({ current: action.current }),
	set_result: (state, action) => ({ result: action.result }),
	set_old_values: (state, action) => ({ oldValues: action.oldValues }),
};
