import React, {useContext, useEffect, useState} from 'react';
import {Context} from "../../../index";
import styles from './stylesSearch.module.sass'
import AreaNodeAndZone from "../plan/nodeAndZon/areaNodeAndZon/areaNodeAndZone";
import Selected from "../../tag/select/select";
const Search = () => {
    const {store} = useContext(Context);
    const [G1, setG1] = useState('')
    const [G2, setG2] = useState('')

    const edit = false
    const [render_line, setRender_line] = useState(false);
    const [editNodeS, setEditNodeS] = useState(false);
    const [myModalZone, setMyModalZone] = useState(false)

    let obj = []

    let objCache = []

    useEffect(() => {
        for (let j = 0; j < store.idGraph.length; j++) {
            objCache[j] = {
                id: j,
                X: store.idGraph[j].X,
                Y: store.idGraph[j].Y,
                // rotation: store.idGraph[j].rotation
            }
        }
        for (let j = 0; j < store.idGraph.length; j++) {
            obj[j] = {
                id: j,
                X: store.idGraph[j].X,
                Y: store.idGraph[j].Y,
                num: store.idGraph[j].num
            }
            console.log("Джопа")

        }
        setRender_line(true)
        setMyModalZone(true)
    })

    const Strelka = (props) => {
        const index_ = props.ellement;
        console.log(index_, store.mass_putei_exit.length - 1)
        if (index_ < store.mass_putei_exit[0].interval_node.length - 1) {
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
        <div className={styles.block}>
            <div className={styles.main}>
                <h5>Поиск маршрута</h5>
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
                <h5>Сводка о маршруте</h5>
                <div className={styles.stringLable}>
                    <div>
                    <span>Выберите кротчайший маршрут: &nbsp; &nbsp;</span>
                        <Selected/>
                    </div>
                    <span>Длина найденого маршрута: </span>
                    <Otvet/>
                    <br/>
                    <span>Маршрут: </span> &nbsp;
                    {(store.mass_putei_exit[0]?.interval_node.map((node_, indexe) => <span
                    className={styles.puti} key={indexe}> {store.idGraph[node_].num}&nbsp; <Strelka
                    ellement={indexe}/> &nbsp;</span>))}
                    <br/>
                </div>
            </div>

            <AreaNodeAndZone
                obj={obj}
                objCache={objCache}
                render_line={render_line}
                editNodeS={editNodeS}
                myModalZone={myModalZone}
                setMyModalZone={setMyModalZone}
                edit={edit}
            />
        </div>
    );
};

export default Search;