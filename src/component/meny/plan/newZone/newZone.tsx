import React, {useState} from 'react';
const NewZone = ({setVisible}) => {
    const [name_zon, setNameZon] = useState('')
    const [color, setColor] = useState('')
    return (
        <div>
            <div>
                <h6>
                    Добавление типа зоны
                </h6>
                <div>
                    <br/>
                    Название типа зоны:
                    <input type="text" placeholder="Название типа зоны" value={name_zon} onChange={event => setNameZon(event.target.value)} />
                    <br/>
                    Цвет зоны: &nbsp;
                    <input type="color" placeholder="Название типа зоны" value={color} onChange={event => setColor(event.target.value)} /><br/><br/>
                    <button onClick={()=>{setVisible(false)}}>Создать новый тип</button>
                </div>
            </div>
        </div>
    );
};

export default NewZone;