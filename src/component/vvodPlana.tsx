import React, {useState} from 'react';
import Area from "./meny/plan/nodeAndZon/area/area";
import Block from "./meny/plan/nodeAndZon/inputBlock/block.jsx";
import styles from './vvodPlanaStyle.module.sass'
import InputTochek from "./meny/plan/nodeAndZon/inputBlock/inputTochek";
import BackIco from "./tag/backIco";
import PlanMain from "./meny/plan/nodeAndZon/main_plan/plan_main";

const VvodPlana = () => {
    return (
        <div className={styles.main}>
            <BackIco/>
            <PlanMain/>
        </div>
    );
};

export default VvodPlana;