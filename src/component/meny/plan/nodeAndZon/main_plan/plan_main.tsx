import React, {useEffect, useState} from 'react';
import BackIco from "../../../../backIco";
import InputTochek from "../inputBlock/inputTochek";
import Area from "../area/area";
import Block from "../inputBlock/block";
import styles from './stylesNodeAndConnect.module.sass'
import AreaNodeAndZone from "../areaNodeAndZon/areaNodeAndZone";


const PlanMain = () => {
    const [editNodeS, setEditNodeS] = useState(true);
    const [render_line, setRender_line] = useState(false)
    useEffect(()=>{
        setEditNodeS(false)
    },[])

    return (
        <div className={styles.mainNodeAndConnect}>
            <BackIco/>
            <div className={styles.componentNodeAndConnect}>
                <InputTochek editNodeS = {editNodeS} setEditNodeS = {setEditNodeS}/>
                <Block render_line ={render_line} setRender_line = {setRender_line}/>
                <AreaNodeAndZone render_line ={render_line} setRender_line = {setRender_line} editNodeS = {editNodeS} setEditNodeS = {setEditNodeS}/>
                <Area/>
            </div>
        </div>
    );
};

export default PlanMain;