import React, { createContext, useContext, useReducer } from "react";

// Preparing the data layer where everything actually lives in the createContext
export const StateContext = createContext();

// Data Layer is the StateProvider
// Higher Order Component ({ reducer, initialState, children })
// children is actually the App child in index.js
export const StateProvider = ({ reducer, initialState, children }) => (
    <StateContext.Provider value ={useReducer (reducer, initialState)}>
        {children}
    </StateContext.Provider>
);

// This line here allows us to pull information from the data layer
// This falls under something we call 'hooks'
export const useStateValue = () => useContext (StateContext);