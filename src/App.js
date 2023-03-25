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
import {observer} from "mobx-react-lite";

const App = observer(()=> {
    const {store} = useContext(Context);
    // const [roles, setRoles] = useState(store.user.role);

    useEffect(() => {
        store.update()
        console.log("Обновил !!!!!!!!!!!");
        // setRoles(store.user.role)

    }, [store.stock_active])
    const Role = () => {
        {

        }
        if (store.user?.role === 'storekeeper') {
            return (
                <Routes>
                    <Route path="" element={<NewComponentMain/>}/>
                    <Route path="authorization" element={<Authorization/>}/>
                    <Route path="main" element={<Main/>}/>
                    <Route path={store.stock_active ? "main/plan/" + store.plan[store.stock_active]?.name + "/search" : "main/search"} element={<SearchRout/>}/>
                    <Route path={store.stock_active ? "main/plan/" + store.plan[store.stock_active]?.name + "/plan" : "main/plan"} element={<VvodPlana/>}/>
                    <Route path={store.stock_active ? "main/plan/" + store.plan[store.stock_active]?.name + "/otchet" : "main/otchet" } element={<Otchet/>}/>
                </Routes>
            )
        }
        if (store.user?.role === 'Warehouse_Manager') {
            return (

                    <Routes>
                        <Route path="" element={<NewComponentMain/>}/>
                        <Route path="authorization" element={<Authorization/>}/>
                        <Route path="main" element={<Main/>}/>
                        <Route path={store.stock_active ? "main/plan/" + store.plan[store.stock_active]?.name + "/plan_status" : "main/plan_status"} element={<PlanSklad/>}/>
                        <Route path={store.stock_active ? "main/plan/" + store.plan[store.stock_active]?.name + "/list" : "main/list"} element={<ListRout/>}/>
                        <Route path={store.stock_active ? "main/plan/" + store.plan[store.stock_active]?.name + "/analytics" : "main/analytics"} element={<Analitics/>}/>
                    </Routes>

            )
        }
        if (store.user?.role === undefined) {
            return (


                    <Routes>
                        <Route path="" element={<NewComponentMain/>}/>
                        <Route path="authorization" element={<Authorization/>}/>
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
})

export default App;
