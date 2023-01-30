import React, {useContext, useState} from 'react';
import styles from './stylesBlock.module.sass'
import {Context} from "../../../../../index";

const Block = () => {

    const {store} = useContext(Context);

    // async function addGraph(x, y, num){
    //     await store.addGraph(x, y, num)
    //     // await console.log(store.idGraph[6].num)
    //     await store.matrixSme()
    // }


    const [G1, setG1] = useState('')
    const [G2, setG2] = useState('')
    const [ves, setVes] = useState('')

    const [nameS, setNameS] = useState('')

    const valid = () => {
        if (nameS == '') {
            alert("Имя не может быть пустым")
        }
    }

    return (
        <div className={styles.main}>
            <div className={styles.oknovvoda}>
                <h6>
                    Создание зон склада
                </h6>
                <div className={styles.box}>

                    <div className={styles.box1}>
                        Название зоны:
                        <input type="text" value={nameS} onChange={(e) => {
                            setNameS(e.target.value)
                        }} placeholder='Название'/>
                        Краткое название зоны (необязательно):
                        <input type="text" placeholder='Краткое название (необязательно)'/>
                        Введите первый узел:
                        <input type="text" value={G1} onChange={event => setG1(event.target.value)}
                               placeholder="Введите первый узел"/>
                    </div>
                    <div className={styles.box1}>
                        Введите второй узел:
                        <input type="text" value={G2} onChange={event => setG2(event.target.value)}
                               placeholder="Введите второй узел"/>
                        Введите расстояние между узлами:
                        <input type="number" value={ves} onChange={event => setVes(event.target.value)}
                               placeholder="Введите расстояние между узлами"/>
                        Ед. измерения
                        <select value="Ед. измерения" style={{display: 'flex'}}>
                            <option>м.</option>
                            <option>мм.</option>
                            <option>см.</option>
                            <option>дм.</option>
                        </select>
                        Вид зоны
                        <select style={{display: 'flex'}}>
                            <option>Зона перевозки</option>
                            <option>Зона погрузки</option>
                            <option>Зона хранения</option>
                        </select>
                    </div>
                </div>
                <br/>
                <button onClick={async () => {
                    await store.matrixSmejUsel(G1, G2, ves);
                    valid()
                }}>Создать зону
                </button>
            </div>
        </div>
    );
};

export default Block;