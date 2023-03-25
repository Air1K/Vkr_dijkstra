import React, {useContext, useState} from 'react';
import {Context} from "../../../../index";
const BlokNewPlan = ({setVisible}) => {
    const [name_plan, setNamePlan] = useState('')
    const {store} = useContext(Context);

    return (
        <div>
            <div>
                <h6>
                    Создание плана
                </h6>
                <div>
                    <br/>
                    Название плана:
                    <input type="text" placeholder="Название плана" value={name_plan} onChange={event => setNamePlan(event.target.value)} />
                    <button onClick={()=>{ store.setPlanAdd(name_plan); setNamePlan(''); setVisible(false)}}>Создать план</button>
                </div>
            </div>
        </div>
    );
};

export default BlokNewPlan;