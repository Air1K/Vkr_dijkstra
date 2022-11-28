import React from 'react';
import {createContext} from 'react'
import { render } from "react-dom";
import App from './App';
import Store from "./store/store";
import State from './interfaceIndex'

const store = new Store();

export const Context = createContext<State>({
    store,
})




const root = document.getElementById("root");
render(
    <Context.Provider value={{
        store
    }}>
        <App/>
    </Context.Provider>
, root);

