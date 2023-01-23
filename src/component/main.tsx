import React, {useContext, useEffect, useState} from 'react';
import {Context} from "../index";
import {Link, Navigate} from "react-router-dom";
import './main_style.sass'
import Fon from '../img/uborka-sklada-form2.jpg'
import styles from './stylesMain_2.module.sass'
import Otchet from "./otchet/otchet";

const Main = () => {
    const {store} = useContext(Context);
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
                        <li><Link to="plan" data-hover="Сформировать план склада">План склада</Link>
                            <ul className="dropdown">
                                <li><a href="#">Web Development</a></li>
                                <li><a href="#">Web Design</a></li>
                                <li><a href="#">Illustration</a></li>
                                <li><a href="#">Iconography</a></li>
                            </ul>
                        </li>
                        <li><Link to="search" data-hover="Найти оптимальный маршрут">Оптимальный маршрут</Link></li>
                        <li><Link to="otchet" data-hover="Сформировать отчет">Формирование отчета</Link></li>
                        <li><Link to="#" data-hover="Exit">Выйти из системы</Link></li>
                        <li style={{height:"64px"}} className={styles.div_li}><div className={'input-field '} style={{ display: "flex", alignItems: "center"}}>
                            <select className="browser-default" style={{backgroundColor:"rgb(255 255 255 / 0%)", border: '1px solid #f2f2f200'}}>
                                <option value="" disabled selected>Выбрать план склада</option>
                                <option value="1">Option 1</option>
                                <option value="2">Option 2</option>
                                <option value="3">Option 3</option>
                            </select>
                        </div></li>
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