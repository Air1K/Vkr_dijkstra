import React, {useContext, useEffect, useState} from 'react';
import {Context} from "../index";
import {Link, Navigate} from "react-router-dom";
import './main_style.sass'
import Fon from '../img/uborka-sklada-form2.jpg'
import styles from './stylesMain_2.module.sass'
import Otchet from "./otchet/otchet";
import NewPlan from "./newPlan/newPlan";
import BlokNewPlan from "./newPlan/blokNewPlan/blokNewPlan";

const Main = () => {
    const {store} = useContext(Context);
    const [visible, setVisible] = useState(false)
    const [auth, setAuth] = useState(store.isAuth)
    const [role, setRole] = useState('')
    useEffect(() => {
        setAuth(store.isAuth);
        setRole(store.user.role)
    }, [])
    console.log(store.isAuth);

    const RoleFunck = () => {
        if (role === 'storekeeper') {

            return (<div className={styles.div_main}>

                <nav role="navigation" className="primary-navigation">

                    <ul>
                        <li><a href="#" data-hover="Сформировать план склада">План склада</a>
                            <ul className="dropdown">
                                <li><a href="#" onClick={() => {
                                    setVisible(true)
                                }}>Создать план</a></li>
                                <li><Link to="plan">Создать точки и зоны</Link></li>
                                <li><a href="#">Добавить тип зоны</a></li>
                                <li><a href="#">Единицы измерения</a></li>
                                <li><a href="#">Отобразить план</a></li>
                            </ul>
                        </li>
                        <li><Link to="search" data-hover="Найти оптимальный маршрут">Оптимальный маршрут</Link></li>
                        <li><Link to="otchet" data-hover="Сформировать отчет">Формирование отчета</Link></li>
                        <li><Link to="#" data-hover="Exit">Выйти из системы</Link></li>
                        <li style={{height: "64px"}} className={styles.div_li}>
                            <div className={'input-field '} style={{display: "flex", alignItems: "center"}}>
                                <select className="browser-default" style={{
                                    backgroundColor: "rgb(255 255 255 / 0%)",
                                    border: '1px solid #f2f2f200'
                                }}>
                                    <option value="" disabled selected>Выбрать план склада</option>
                                    <option value="1">Option 1</option>
                                    <option value="2">Option 2</option>
                                    <option value="3">Option 3</option>
                                </select>
                            </div>
                        </li>
                    </ul>

                </nav>

                {/*<a href="#">Ввод плана склада</a>*/}
                {/*<a href="#">Поиск оптимального маршрута</a>*/}
                {/*<a href="#">Формирование отчета</a>*/}
                {/*<a href="#">Выйти из системы</a>*/}

            </div>)
        }
        if (role === 'Chief') {
            return (<div>
                <a href="#">Просмотр отчетов для утверждения</a>
                <a href="#">Выйти из системы</a>
                <ul className="snip1143">
                    <li><a href="#" data-hover="Утвержение сформированного маршрута">Просмотр отчетов для
                        утверждения</a></li>
                    <li><a href="#" data-hover="Exit">Выйти из системы</a></li>
                </ul>
            </div>)
        }
        return <div/>
    }

    return (
        <div className={styles.main}>
            <NewPlan visible={visible} setVisible={setVisible}>
                <BlokNewPlan setVisible={setVisible}/>
            </NewPlan>
            <img className={styles.img} src={Fon} alt=""/>
            <div className={styles.fon}>
                <h2 style={{textAlign: "center", margin: 0}}>Главное окно АС"Складская логистика"</h2>
                {auth ? (
                    <RoleFunck/>
                ) : (
                    <div>
                        <Navigate to={'/authorization'}/>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Main;