import React, {useState} from 'react';
import styles from "../../inputBlock/stylesBlock.module.sass";

const BlokNewPlan = ({setVisible}) => {
    const [name_plan, setNamePlan] = useState('')


    return (
        <div className={styles.main}>
            <div className={styles.oknovvoda}>
                <h6>
                    Создание плана
                </h6>
                <div>
                    {/*<input type="text" placeholder="Введите"/>*/}
                    {/*<input type="text" />*/}
                    {/* <input type="number" placeholder='Номер узла' /> */}
                    <br/>
                    Название плана:
                    <input type="text" placeholder="Название плана" value={name_plan} onChange={event => setNamePlan(event.target.value)} />
                    <button onClick={()=>{setVisible(false)}}>Создать план</button>
                </div>
            </div>
        </div>
    );
};

export default BlokNewPlan;