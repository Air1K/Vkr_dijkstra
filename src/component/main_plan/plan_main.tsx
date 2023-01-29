import React from 'react';
import BackIco from "../backIco";
import InputTochek from "../inputBlock/inputTochek";
import Area from "../area/area";
import Block from "../inputBlock/block";
import styles from './stylesNodeAndConnect.module.sass'


const PlanMain = () => {
    return (
        <div className={styles.mainNodeAndConnect}>
            <BackIco/>
            <div className={styles.componentNodeAndConnect}>
                <InputTochek/>
                <Block/>
            </div>



            <Area/>


        </div>
    );
};

export default PlanMain;