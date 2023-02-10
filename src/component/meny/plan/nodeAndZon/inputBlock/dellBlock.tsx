import React, {useState} from 'react';

const DellBlock = ({setVisible, setMyModal, setName}) => {
    const [dellA, setDellA] = useState('')
    const [dellB, setDellB] = useState('')
    return (
        <div>
            <div>
                <h6>
                    Удаление зоны
                </h6>
                <div>
                    <br/>
                    Название первой точки зоны:
                    <input type="text" placeholder="Название первой точки зоны" value={dellA} onChange={event => setDellA(event.target.value)} />
                    <br/>
                    Название второй точки зоны:
                    <input type="text" placeholder="Название второй точки зоны" value={dellB} onChange={event => setDellB(event.target.value)} />
                    <button onClick={()=>{setMyModal(true);
                        setDellA('');
                        setDellB('');
                        const mass = []
                        mass.push(dellA, dellB)
                        setName(mass)}}>Удалить зону</button>
                    <button onClick={()=>{setVisible(false); setDellA(''); setDellB('')}}>Отменить удаление</button>
                </div>
            </div>
        </div>
    );
};

export default DellBlock;