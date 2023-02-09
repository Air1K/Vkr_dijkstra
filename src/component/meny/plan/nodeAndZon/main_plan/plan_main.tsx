import React, {useContext, useEffect, useState} from 'react';
import BackIco from "../../../../backIco";
import InputTochek from "../inputBlock/inputTochek";
import Area from "../area/area";
import Block from "../inputBlock/block";
import styles from './stylesNodeAndConnect.module.sass'
import AreaNodeAndZone from "../areaNodeAndZon/areaNodeAndZone";
import {Context} from "../../../../../index";
import {Rotation} from "../../../../../models/Rotation";


const PlanMain = () => {
    const {store} = useContext(Context);
    const [editNodeS, setEditNodeS] = useState(true);
    const [render_line, setRender_line] = useState(false)
    useEffect(()=>{
        setEditNodeS(false)
        store.update();
        console.log("Идет рендер в маин")
    },[])
    let obj = []
    for (let j = 0; j < store.idGraph.length; j++) {
        obj[j] = {
            id: j,
            X: store.idGraph[j].X,
            Y: store.idGraph[j].Y,
            // rotation: store.idGraph[j].rotation
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

    return (
        <div className={styles.mainNodeAndConnect}>
            <BackIco/>
            <div className={styles.componentNodeAndConnect}>
                <InputTochek editNodeS = {editNodeS} setEditNodeS = {setEditNodeS}/>
                <Block render_line ={render_line} setRender_line = {setRender_line}/>
                <AreaNodeAndZone obj = {obj} objCache = {objCache} render_line ={render_line} setRender_line = {setRender_line} editNodeS = {editNodeS} setEditNodeS = {setEditNodeS}/>
                <Area/>
            </div>
        </div>
    );
};

export default PlanMain;