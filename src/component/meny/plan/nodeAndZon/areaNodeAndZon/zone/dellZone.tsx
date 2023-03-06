import React, {useContext, useState} from 'react';
import {Context} from "../../../../../../index";

const DellZone = ({setMyModalZone}) => {
    const {store} = useContext(Context);
    const [name, setName] = useState('')
    const [color, setColor] = useState('')
    return (
        <div>
            <div>
                <h6>
                    Создание зоны
                </h6>
                <div>
                    <br/>
                    Название зоны:
                    <input type="text" placeholder="Название зоны" value={name} onChange={event => setName(event.target.value)}/>
                    Вид зоны
                    <select style={{display: 'flex'}}>
                        <option>Зона перевозки</option>
                        <option>Зона погрузки</option>
                        <option>Зона хранения</option>
                    </select>
                    Цвет зоны: <br/>
                    <input type="color" placeholder="Название зоны" value={color} onChange={event => setColor(event.target.value)}/><br/><br/>
                    <button onClick={async ()=>{
                        await store.setSizeZon(color)
                        await setMyModalZone(false);
                        }}>Создать зону</button>
                    <button onClick={()=>{setMyModalZone(false);}}>Отменить создание</button>
                </div>
            </div>
        </div>
    );
};

export default DellZone;