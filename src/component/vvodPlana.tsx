import React from 'react';
import Search from "./search/search";
import Area from "./area/area";
import Block from "./inputBlock/block.jsx";
import styles from './vvodPlanaStyle.module.sass'

const VvodPlana = () => {
    return (
        <div className={styles.main}>
            <Search/>
            <Area/>
            <Block/>
        </div>
    );
};

export default VvodPlana;