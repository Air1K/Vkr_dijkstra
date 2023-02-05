import React, {useContext, useEffect} from 'react';
import styles from './style/main/style-main.module.sass'
import Main from './component/main'
import {Context} from "./index";
import {BrowserRouter, Routes, Route,  Navigate} from "react-router-dom";
import Authorization from "./component/autorization/autorization";
import VvodPlana from "./component/vvodPlana";
import NewComponentMain from "./component/newComponentMain";
import Search from "./component/search/search";
import Otchet from "./component/otchet/otchet";
import './style/style.sass'
import MyModal from "./component/meny/myModal/myModal";

function App() {
    const {store} = useContext(Context);
    useEffect(async ()=>{
        await store.update()
        console.log("Обновил");
        console.log(store.Rotation);
    })
    return (
        <div className={styles.app}>
            <BrowserRouter>
                <Routes>
                    <Route path="" element={<NewComponentMain/>}/>
                    <Route path="authorization" element={<Authorization/>}/>
                    <Route path="main" element={<Main/>}/>
                    <Route path="main/search" element={<Search/>}/>
                    <Route path="main/plan" element={<VvodPlana/>}/>
                    <Route path="main/otchet" element={<Otchet/>}/>
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
