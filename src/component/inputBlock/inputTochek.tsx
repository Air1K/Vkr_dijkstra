import React, {useContext, useState} from 'react';
import styles from "./stylesBlock.module.sass";
import {Context} from "../../index";

const InputTochek = () => {
    const {store} = useContext(Context);
    async function addGraph(x, y, num){
        await store.addGraph(x, y, num)
        // await console.log(store.idGraph[6].num)
        await store.matrixSme()
    }
    const [name_usel, setNameUsel] = useState('')
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
                    <input type="text" placeholder="Название узла" value={name_usel} onChange={event => setNameUsel(event.target.value)} />
                    <button onClick={()=>{addGraph(1, 2, name_usel)}}>Добавить узел</button>
                </div>
            </div>
        </div>
    );
};

export default InputTochek;