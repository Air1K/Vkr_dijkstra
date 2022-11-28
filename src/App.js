import React, {useContext, useEffect} from 'react';
import styles from './style/main/style-main.module.sass'
import Block from "./component/inputBlock/block";
import Area from "./component/area/area";
import Search from "./component/search/search";
import {Context} from "./index";

function App() {
    const {store} = useContext(Context);
    useEffect(async ()=>{
        await store.update()
    })
    return (
        <div className={styles.app}>
            <Search/>
            <Area/>
            <Block/>
        </div>
    );
}

export default App;
