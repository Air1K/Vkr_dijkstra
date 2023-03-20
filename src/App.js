import React, {useContext, useEffect, useState} from 'react';
import styles from './style/main/style-main.module.sass'
import Main from './component/main'
import {Context} from "./index";
import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom";
import Authorization from "./component/autorization/autorization";
import VvodPlana from "./component/vvodPlana";
import NewComponentMain from "./component/newComponentMain";
import Search from "./component/meny/search/search";
import Otchet from "./component/meny/otchet/otchet";
import './style/style.sass'
import MyModal from "./component/meny/myModal/myModal";
import SearchRout from "./component/searchRout";
import PlanSklad from "./component/warehouse_manager/plan_stock/plan_sklad";
import Analitics from "./component/warehouse_manager/analytics/analitics";
import List_rout from "./component/warehouse_manager/list_rout/list_rout";
import ListRout from "./component/warehouse_manager/list_rout/list_rout";

function App() {
    const {store} = useContext(Context);
    const [roles, setRoles] = useState(store.user.role);

    useEffect(() => {
        store.update()
        console.log("Обновил !!!!!!!!!!!");

    }, [])
    const Role = () => {
        {
            setRoles(store.user.role)
        }
        if (roles === 'storekeeper') {
            return (
                <Routes>
                    <Route path="" element={<NewComponentMain/>}/>
                    <Route path="authorization" element={<Authorization setRoles={setRoles}/>}/>
                    <Route path="main" element={<Main/>}/>
                    <Route path="main/search" element={<SearchRout/>}/>
                    <Route path="main/plan" element={<VvodPlana/>}/>
                    <Route path="main/otchet" element={<Otchet/>}/>
                </Routes>
            )
        }
        if (roles === 'Warehouse_Manager') {
            return (

                    <Routes>
                        <Route path="" element={<NewComponentMain/>}/>
                        <Route path="authorization" element={<Authorization setRoles={setRoles}/>}/>
                        <Route path="main" element={<Main/>}/>
                        <Route path="main/plan_status" element={<PlanSklad/>}/>
                        <Route path="main/list" element={<ListRout/>}/>
                        <Route path="main/analytics" element={<Analitics/>}/>
                    </Routes>

            )
        }
        if (roles === undefined) {
            return (


                    <Routes>
                        <Route path="" element={<NewComponentMain/>}/>
                        <Route path="authorization" element={<Authorization setRoles={setRoles}/>}/>
                        <Route path="main" element={<Main/>}/>
                    </Routes>

            )
        }
    }
    return (
        <div className={styles.app}>
            <BrowserRouter>
                <Role/>
            </BrowserRouter>

        </div>
    );
}

export default App;
