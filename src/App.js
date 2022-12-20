import React, {useContext, useEffect} from 'react';
import styles from './style/main/style-main.module.sass'
import Main from './component/main'
import {Context} from "./index";
import {BrowserRouter, Routes, Route,  Navigate} from "react-router-dom";
import Authorization from "./component/autorization/autorization";
import VvodPlana from "./component/vvodPlana";
import NewComponentMain from "./component/newComponentMain";

function App() {
    const {store} = useContext(Context);
    useEffect(async ()=>{
        await store.update()
    })
    return (
        <div className={styles.app}>
            <BrowserRouter>
                <Routes>
                    <Route path="" element={<NewComponentMain/>}/>
                    <Route path="authorization" element={<Authorization/>}/>
                    <Route path="main" element={<Main/>}/>
                    <Route path="main/plan" element={<VvodPlana/>}/>
                </Routes>
            </BrowserRouter>

        </div>
    );
}

export default App;
