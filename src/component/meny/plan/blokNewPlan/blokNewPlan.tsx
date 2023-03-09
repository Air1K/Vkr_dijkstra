import React, {useState} from 'react';
const BlokNewPlan = ({setVisible}) => {
    const [name_plan, setNamePlan] = useState('')


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
                    <button onClick={()=>{ setVisible(false)}}>Создать план</button>
                </div>
            </div>
        </div>
    );
};

export default BlokNewPlan;