import React, {useContext, useEffect, useState} from 'react';
import BackIco from "../../../../backIco";
import InputTochek from "../inputBlock/inputTochek";
import Area from "../area/area";
import Block from "../inputBlock/block";
import styles from './stylesNodeAndConnect.module.sass'
import AreaNodeAndZone from "../areaNodeAndZon/areaNodeAndZone";
import {Context} from "../../../../../index";
import MyModal from "../../../myModal/myModal";
import DellBlock from "../inputBlock/dellBlock";


const PlanMain = () => {
    const {store} = useContext(Context);
    const [editNodeS, setEditNodeS] = useState(false);
    const [render_line, setRender_line] = useState(false);
    const [myModal, setMyModal] = useState(false)
    const [myModalDell, setMyModalDell] = useState(false)
    const [name, setName] = useState([])
    const [visibleDell, setVisibleDell] = useState(false)
    store.update();
    let obj = []
    for (let j = 0; j < store.idGraph.length; j++) {
        obj[j] = {
            id: j,
            X: store.idGraph[j].X,
            Y: store.idGraph[j].Y,
            num: store.idGraph[j].num
        }
        console.log("Джопа")
    }

    let objCache = []
    for (let j = 0; j < store.idGraph.length; j++) {
        objCache[j] = {
            id: j,
            X: store.idGraph[j].X,
            Y: store.idGraph[j].Y,
            // rotation: store.idGraph[j].rotation
        }
    }
    async function setFunc(){
        await setMyModal(true);
        await setRender_line(!render_line);
        setMyModal(false)
    }
    async function func_async() {
        if(name.length === 1){
            await store.dellGraph(name?.[0]);
            await setFunc();
        }
        if(name.length === 2){
            await store.matrixSmejUsel(name?.[0], name?.[1], 99999);
            await store.matrixAndZone();
            await setFunc();
        }
    }
    return (
        <div className={styles.mainNodeAndConnect}>
            <BackIco/>
            <div className={styles.componentNodeAndConnect}>
                <InputTochek
                    render_line={render_line}
                    setRender_line={setRender_line}
                    editNodeS={editNodeS}
                    setEditNodeS={setEditNodeS}
                    setMyModal={setMyModal}
                    setName={setName}/>
                <Block
                    render_line={render_line}
                    setRender_line={setRender_line}
                    setName={setMyModalDell}
                    setVisibleDell = {setVisibleDell}/>
                <AreaNodeAndZone
                    obj={obj}
                    objCache={objCache}
                    render_line={render_line}
                    setRender_line={setRender_line}
                    editNodeS={editNodeS}
                    setEditNodeS={setEditNodeS}/>
                <Area/>
                <MyModal visible={visibleDell} setVisible={setVisibleDell}>
                    <DellBlock setVisible={setVisibleDell}  setMyModal = {setMyModal} setName = {setName}/>
                </MyModal>
                <MyModal visible={myModal} setVisible={setMyModal}>
                    <h6>Вы уверенны что хотите удалить {name.length === 1 ? <p>узел {name?.[0]}</p> :
                        <p>связь {name?.[0]} к {name?.[1]}</p>}</h6>
                    <button onClick={ ()=>{ func_async(); setVisibleDell(false);}}>Да</button>
                    <button onClick={()=>{ setMyModal(false); console.log(name)}}>Нет</button>
                </MyModal>
            </div>
        </div>
    );
};

export default PlanMain;