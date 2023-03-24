import React from 'react';
import styles from "../../vvodPlanaStyle.module.sass";
import BackIco from "../../tag/backIco";
import PlanStock from "./plan_stock";


const PlanSklad = () => {
    return (
        <div className={styles.main}>
            <BackIco/>
            <PlanStock/>
        </div>
    );
};

export default PlanSklad;