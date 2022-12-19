import React, {useContext, useEffect, useState} from 'react';
import {Context} from "../index";
import {Link, Navigate} from "react-router-dom";
import './main_style.sass'
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
        if(role === 'storekeeper'){
            return (<div>
                <ul className="snip1143">
                    <li><Link to ="plan" data-hover="Сформировать план склада">Ввод плана склада</Link></li>
                    <li><Link to ="#" data-hover="Найти оптимальный маршрут">Поиск оптимального маршрута</Link></li>
                    <li><Link to ="#" data-hover="Сформировать отчет">Формирование отчета</Link></li>
                    <li><Link to ="#" data-hover="Exit">Выйти из системы</Link></li>
                </ul>
                {/*<a href="#">Ввод плана склада</a>*/}
                {/*<a href="#">Поиск оптимального маршрута</a>*/}
                {/*<a href="#">Формирование отчета</a>*/}
                {/*<a href="#">Выйти из системы</a>*/}
            </div>)
        }
        if(role === 'Chief'){
            return (<div>
                <a href="#">Просмотр отчетов для утверждения</a>
                <a href="#">Выйти из системы</a>
                <ul className="snip1143">
                    <li><a href="#" data-hover="Утвержение сформированного маршрута">Просмотр отчетов для утверждения</a></li>
                    <li><a href="#" data-hover="Exit">Выйти из системы</a></li>
                </ul>
            </div>)
        }
        return <div/>
    }

    return (
        <div>
            <h2>Главное окно АС"Складская логистика"</h2>
            {auth ? (
                <RoleFunck/>
            ) : (
                <div>
                    <Navigate to={'/authorization'} />
                </div>
            )}


        </div>
    );
};

export default Main;