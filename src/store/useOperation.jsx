import { useReducer } from "react";
import { actions } from "./actions";

const reducer = (state, action) => {
	const thisAction = actions[action.type](state, action);
	if (thisAction) return { ...state, ...thisAction };
	else throw Error("Unknown action: " + action.type);
};

const initialState = {
	current: { value: "", display: "0", operation: "" },
	result: null,
	oldValues: [], // [{value: "", display: "", operation: "", result: null}]
};

const useOperation = () => {
	const [state, dispatch] = useReducer(reducer, initialState);
	return [state, dispatch];
};
export default useOperation;
