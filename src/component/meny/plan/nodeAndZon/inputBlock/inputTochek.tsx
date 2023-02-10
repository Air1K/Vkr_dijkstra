import React, {useContext, useEffect, useState} from 'react';
import styles from "./stylesBlock.module.sass";
import {Context} from "../../../../../index";

const InputTochek = ({render_line, setRender_line, editNodeS, setEditNodeS, setMyModal, setName}) => {
    const {store} = useContext(Context);

    const [lengthidGraph, setLengthidGraph] = useState(store.idGraph.length)
    useEffect(()=>{
        setLengthidGraph(store.idGraph.length)
    },[store.idGraph.length])
    async function addGraph(x, y, num){
        await store.addGraph(x, y, num)
        // await console.log(store.idGraph[6].num)
        await store.matrixSme()
    }
    const [name_usel, setNameUsel] = useState('')

    const group = ()=>{
            const all = store.matrixsmesh.length;
            let xOffset = all*25 + 5;
            return xOffset

    }



    return (
        <div className={styles.main}>
            <div className={styles.oknovvoda}>
                <h6>
                    Создание узлов
                </h6>
                <div>
                    {/*<input type="text" placeholder="Введите"/>*/}
                    {/*<input type="text" />*/}
                    {/* <input type="number" placeholder='Номер узла' /> */}
                    <br/>
                    Название узла:
                    <input type="text" placeholder="Название узла" value={name_usel} onChange={event => setNameUsel(event.target.value)} />
                    <button onClick={async ()=>{await addGraph(await group(), 5, name_usel); await setEditNodeS(!editNodeS); setNameUsel('')}}>Добавить узел</button>
                    <button onClick={ ()=>{ setMyModal(true); const mass = []; mass.push(name_usel); setName(mass); setNameUsel('')}}>Удалить узел</button>
                </div>
            </div>
        </div>
    );
};

export default InputTochek;