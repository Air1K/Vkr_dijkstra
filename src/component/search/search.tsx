import React, {useContext, useState} from 'react';
import {Context} from "../../index";
import stules from './stylesSearch.module.sass'
const Search = () => {
    const {store} = useContext(Context);
    const [G1, setG1] = useState('')
    const [G2, setG2] = useState('')

    return (
        <div className={stules.main}>
            Найти маршрут
            Введите начальную точку
            <input type="text" value={G1} onChange={event => setG1(event.target.value)} placeholder="Введите первый граф"/>
            Введите конечную точку
            <input type="text" value={G2} onChange={event => setG2(event.target.value)} placeholder="Введите второй граф"/>
            <button onClick={async ()=>{store.search(G1, G2)}} >Найти</button>
        </div>
    );
};

export default Search;