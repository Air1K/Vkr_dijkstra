import React from 'react';
import {createContext} from 'react'
import { render } from "react-dom";
import App from './App';
import Store from "./store/store";
import State from './interfaceIndex'
import Store_show_rout from "./store/store_show_rout";

const store = new Store();
const store_show_rout = new Store_show_rout();

export const Context = createContext<State>({
    store, store_show_rout,
})




const root = document.getElementById("root");
render(
    <Context.Provider value={{
        store, store_show_rout
    }}>
        <App/>
    </Context.Provider>
, root);

