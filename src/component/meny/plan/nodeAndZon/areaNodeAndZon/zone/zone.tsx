import React, {useState, useReducer, useContext} from 'react';
import styles from './stylesZone.module.sass'
import {Context} from "../../../../../../index";
import {SizeZon} from "../../../../../../models/SizeZon";
const Zone = () => {
    const {store} = useContext(Context);

    let initialState;
    for(let i = 0; i< store.sizeZon.length; i++){
        initialState = {
            widtH: store.sizeZon[i].widtH,
            heighT: store.sizeZon[i].heighT,
            toP: store.sizeZon[i].toP,
            lefT: store.sizeZon[i].lefT
        };

    }

    function reducer(state, action) {
        switch (action.type) {
            case 'top':
                return [...state, state[action.id] = {heighT: action.heighT_}];
            case 'left':
                return {count: state.count - 1};
            case 'right':
                return {count: state.count - 1};
            case 'bottom':
                return {count: state.count - 1};
            default:
                throw new Error();
        }
    }

    const [state, dispatch] = useReducer(reducer, initialState);

    return (
        <div className={styles.main} style={{width: "200px", height: "100px"}}>
            <div draggable className={styles.topZon} onDrag={(e) => dispatch({type: 'top', heighT_: 22})}></div>
            <div className={styles.leftZon}></div>
            <div className={styles.rightZon}></div>
            <div className={styles.bottomZon}></div>
        </div>
    );
};

export default Zone;