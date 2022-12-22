import React from 'react';
import Area from "./area/area";
import Block from "./inputBlock/block.jsx";
import styles from './vvodPlanaStyle.module.sass'
import InputTochek from "./inputBlock/inputTochek";
import BackIco from "./backIco";

const VvodPlana = () => {
    return (
        <div className={styles.main}>
            <BackIco/>
            <InputTochek/>
            <Area/>
            <Block/>
        </div>
    );
};

export default VvodPlana;