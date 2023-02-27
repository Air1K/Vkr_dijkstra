import React, {useContext, useState} from 'react';
import {Context} from "../../../../../../index";

const DellZone = ({setMyModalZone}) => {
    const {store} = useContext(Context);
    const [quantity, setQuantity] = useState('')
    return (
        <div>
            <div>
                <h6>
                    Создание зоны
                </h6>
                <div>
                    <br/>
                    Укажите кол-во зон:
                    <input type="number" placeholder="кол-во зон" value={quantity} onChange={event => setQuantity(event.target.value)}/>
                    <button onClick={()=>{
                        let number: number = Number(quantity)
                        store.setSizeZon(number)
                        setMyModalZone(false);
                        }}>Создать зону</button>
                    <button onClick={()=>{setMyModalZone(false);}}>Отменить создание</button>
                </div>
            </div>
        </div>
    );
};

export default DellZone;