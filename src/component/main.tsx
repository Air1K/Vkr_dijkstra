import React, {useContext, useEffect, useState} from 'react';
import {Context} from "../index";
import {Link} from "react-router-dom";
import './main_style.sass'
import Fon from '../img/uborka-sklada-form2.jpg'
import styles from './stylesMain_2.module.sass'
import MyModal from "./meny/myModal/myModal";
import BlokNewPlan from "./meny/plan/blokNewPlan/blokNewPlan";
import NewZone from "./meny/plan/newZone/newZone";
import {observer} from "mobx-react-lite";


const Main = observer(() => {
    const {store} = useContext(Context);
    const [visible, setVisible] = useState(false)
    const [visibleZon, setVisibleZon] = useState(false)
    // const [auth, setAuth] = useState(store.isAuth)
    // const [role, setRole] = useState(store.user.role)
    // const [activeUrl, setUrl] = useState(undefined);
    useEffect(() => {
        store.update()
        // setAuth(store.isAuth);
        // setRole(store.user.role);
    }, [])
    // console.log(role);
console.log(store.stock_active)
    const RenderLog = () => {
        if (!store.isAuth) {
            return (<div className={styles.autorisation}>
                Вы не прошли авторизацию
                <Link to="/authorization">Авторизироваться</Link>
                {/*<Navigate to={'/authorization'}/>*/}
            </div>)
        }
    }


    const planStock = (event)=>{

        store.setStockActive(event.target.value);
        // setUrl(store.stock_active);

    }



    const RoleFunck = () => {

        if (store.user.role === 'storekeeper') {

            return (
                <div className={styles.div_main}>
                    {/*{store.stock_active}*/}
                    <nav role="navigation" className="primary-navigation">

                        <ul>
                            <li><a href="#" data-hover="Сформировать план склада">План склада</a>
                                <ul className="dropdown">
                                    <li><a href="#" onClick={() => {
                                        setVisible(true)
                                    }}>Создать план</a></li>
                                    <li><Link to={"plan/" + store.plan[store.stock_active]?.name + "/plan"}>Создать точки и зоны</Link></li>
                                    <li><a href="#" onClick={() => {
                                        setVisibleZon(true)
                                    }}>Добавить тип зоны</a></li>
                                    <li><a href="#">Единицы измерения</a></li>
                                    <li><a href="#">Отобразить план</a></li>
                                </ul>
                            </li>
                            <li><Link to={"plan/" + store.plan[store.stock_active]?.name + "/search"} data-hover="Найти оптимальный маршрут">Оптимальный маршрут</Link></li>
                            <li><Link to={"plan/" + store.plan[store.stock_active]?.name + "/otchet"} data-hover="Сформировать отчет">Отчеты о маршрутах</Link></li>
                            <li><Link to="/authorization" data-hover="Exit" onClick={()=>{store.logoutE()}}>Выйти из системы</Link></li>
                            <li style={{height: "64px"}} className={styles.div_li}>
                                <div className={'input-field '} style={{display: "flex", alignItems: "center"}}>
                                    <select className="browser-default" style={{
                                        backgroundColor: "rgb(255 255 255 / 0%)",
                                        border: '1px solid #f2f2f200',
                                        minWidth: "200px"
                                    }}
                                    onChange={(event)=>{planStock(event)}}
                                    >
                                        {store.stock_active ?<option value={store.stock_active} disabled selected>{store.stock_active}.&nbsp;{store.plan[store.stock_active].name}</option> :<option value="" disabled selected>Выбрать план склада</option>}
                                        {store.plan.map((plan, index) =>
                                            <option key={index} value={plan.id}>{plan.id}.&nbsp;{plan.name}</option>
                                        )}
                                    </select>
                                </div>
                            </li>
                        </ul>

                    </nav>

                </div>)
        }
        if (store.user.role === 'Warehouse_Manager') {
            return (

                <div className={styles.div_main}>

                    <nav role="navigation" className="primary-navigation">

                        <ul>
                            <li><Link to={"plan/" + store.plan[store.stock_active]?.name + "/plan_status"} data-hover="Show">Показать план склада</Link></li>
                            <li><Link to={"plan/" + store.plan[store.stock_active]?.name + "/main/list"} data-hover="List">Журнал перевозок</Link></li>
                            <li><Link to={"plan/" + store.plan[store.stock_active]?.name + "/main/analytics"} data-hover="Form">Аналитика перевозок</Link></li>
                            <li><Link to="/authorization" data-hover="Exit" onClick={()=>{store.logoutE()}}>Выйти из системы</Link></li>
                            <li style={{height: "64px"}} className={styles.div_li}>
                                <div className={'input-field '} style={{display: "flex", alignItems: "center"}}>
                                    <select className="browser-default" style={{
                                        backgroundColor: "rgb(255 255 255 / 0%)",
                                        border: '1px solid #f2f2f200',
                                        minWidth: "200px"
                                    }}
                                            onChange={(event)=>{planStock(event)}}
                                    >
                                        {store.stock_active ?<option value={store.stock_active} disabled selected>{store.stock_active}.&nbsp;{store.plan[store.stock_active].name}</option> :<option value="" disabled selected>Выбрать план склада</option>}
                                        {store.plan.map((plan, index) =>
                                            <option key={index} value={plan.id}>{plan.id}.&nbsp;{plan.name}</option>
                                        )}
                                    </select>
                                </div>
                            </li>
                        </ul>

                    </nav>

                </div>
            )
        }
        return (<div></div>)
    }

    return (
        <div className={styles.main}>
            <MyModal visible={visible} setVisible={setVisible}>
                <BlokNewPlan setVisible={setVisible}/>
            </MyModal>
            <MyModal visible={visibleZon} setVisible={setVisibleZon}>
                <NewZone setVisible={setVisibleZon}/>
            </MyModal>
           <div className={styles.img}></div>
            <div className={styles.fon}>
                <h2 style={{textAlign: "center", margin: 0}}>Главное окно АС"Складская логистика"</h2>
                {store.isAuth ?
                    (<RoleFunck/>) : (<RenderLog/>)}

            </div>
        </div>

    );
});

export default Main;