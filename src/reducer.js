// initialState is how the data layer looks
// before you added to it
// Here we are going to start with the "user" not being logged in
export const initialState = {
    user: null,
};

// These are the actions where we can push info into the data layer
// For example when we sign in, we go ahead and push this user into the data layer
// pushes this user into the data layer
export const actionTypes = {
    SET_USER: "SET_USER",
};

// After pushing info into the data layer we switch and listen for what action just got dispatched
// if you dispatched a SET_USER action, 
// ...state "keep the state of the data layer"
// user: action.user; "change the user to be whatever we dispatched"
// default: "return and don't do anything"
const reducer = (state, action) => {
    console.log(action);
    switch (action.type) {
        case actionTypes.SET_USER:
            return {
                ...state,
                user: action.user,
            };
        
        default:
            return state;
    }
};

export default reducer;