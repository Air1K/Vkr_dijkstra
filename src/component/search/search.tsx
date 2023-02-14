import React, {useContext, useEffect, useState} from 'react';
import {Context} from "../../index";
import styles from './stylesSearch.module.sass'
import BackIco from "../selector/backIco";

const Search = () => {
    const {store} = useContext(Context);
    const [G1, setG1] = useState('')
    const [G2, setG2] = useState('')

    const Strelka = (props) => {
        const index_ = props.ellement;
        console.log(index_, store.mass_putei_exit.length - 1)
        if (index_ < store.mass_putei_exit.length - 1) {
            return (<span>➜</span>)
        }
        return null;
    }
    const [activ, setActiv] = useState(false)
    const Otvet = () => {

        if (store.b != null) {
            console.log(store.mass_putei_exit)
            return (<span> = &nbsp; {store.mass_putei[store.b][0]}</span>)
        }
        return null;
    }

    function updateBlock() {
        setActiv(true)
    }
    function noupdateBlock() {
        setActiv(false)
    }


    return (
        <div>
            <div className={styles.block}>
                <div className={styles.main}>
                    <h5>Найти маршрут</h5>
                    Введите краткое название для маршрута
                    <input type="text" name="" id="" placeholder='Краткое название маршрута'/>
                    Введите начальную точку
                    <input type="text" value={G1} onChange={event => setG1(event.target.value)}
                           placeholder="Введите первый граф"/>
                    Введите конечную точку
                    <input type="text" value={G2} onChange={event => setG2(event.target.value)}
                           placeholder="Введите второй граф"/>
                    Дата формирования
                    <input type="date"/>
                    <button onClick={async () => {
                        await noupdateBlock();
                        await store.search(G1, G2);
                        await updateBlock()
                    }}>Найти
                    </button>
                </div>

                <div className={styles.main}>
                    <h5>Результат поиска</h5>
                    {activ ? (<div><span>Длина найденого маршрута: </span> <Otvet/> <br/>
                        <span>Промежуточные зоны: </span> &nbsp; {(store.mass_putei_exit.map((node_, indexe) => <span
                            className={styles.puti} key={node_}> {store.idGraph[node_].num}&nbsp; <Strelka
                            ellement={indexe}/> &nbsp;</span>))} <br/></div>) : (<div/>)}

                </div>
            </div>
            <BackIco/>
        </div>
    );
};

export default Search;