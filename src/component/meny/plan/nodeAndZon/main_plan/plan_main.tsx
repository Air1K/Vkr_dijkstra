import React, {useState} from 'react';
import BackIco from "../../../../backIco";
import InputTochek from "../inputBlock/inputTochek";
import Area from "../area/area";
import Block from "../inputBlock/block";
import styles from './stylesNodeAndConnect.module.sass'
import AreaNodeAndZone from "../areaNodeAndZon/areaNodeAndZone";


const PlanMain = () => {
    const [editNodeS, setEditNodeS] = useState(true);


    return (
        <div className={styles.mainNodeAndConnect}>
            <BackIco/>
            <div className={styles.componentNodeAndConnect}>
                <InputTochek editNodeS = {editNodeS} setEditNodeS = {setEditNodeS}/>
                <Block/>
                <AreaNodeAndZone editNodeS = {editNodeS} setEditNodeS = {setEditNodeS}/>
                <Area/>
            </div>
        </div>
    );
};

export default PlanMain;