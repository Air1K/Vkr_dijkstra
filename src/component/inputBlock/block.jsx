import React, {useContext, useState} from 'react';
import styles from './stylesBlock.module.sass'
import {Context} from "../../index";
const Block = () => {

    const {store} = useContext(Context);

    async function addGraph(x, y, num){
        await store.addGraph(x, y, num)
        await console.log(store.idGraph[6].num)
        await store.matrixSme()
    }



    const [name_usel, setNameUsel] = useState('')
    const [G1, setG1] = useState('')
    const [G2, setG2] = useState('')
    const [ves, setVes] = useState('')
    return (
        <div className={styles.main}>
            <div>
                Окно ввода
            </div>
            <div>
                {/*<input type="text" placeholder="Введите"/>*/}
                {/*<input type="text" />*/}
                <input type="text" placeholder="Номер узла" value={name_usel} onChange={event => setNameUsel(event.target.value)} />
                <button onClick={()=>{addGraph(1, 2, name_usel)}}>Добавить граф</button>
            </div>
            <div>
                <div>
                    Соединить
                </div>
                <input type="text" value={G1} onChange={event => setG1(event.target.value)} placeholder="Введите первый граф"/>
                <input type="text" value={G2} onChange={event => setG2(event.target.value)} placeholder="Введите второй граф"/>
                <input type="number" value={ves} onChange={event => setVes(event.target.value)} placeholder="Введите вес соединения"/>
                <button onClick={async ()=>{await store.matrixSmejUsel(G1, G2, ves)}}>Соединить</button>
            </div>
        </div>
    );
};

export default Block;