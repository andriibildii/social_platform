const initialState = {};

export type InitialStateType = typeof initialState;

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
const sidebarReducer = (state = initialState, action: any): InitialStateType => {
	return state;
};

export default sidebarReducer;
