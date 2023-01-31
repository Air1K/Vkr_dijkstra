import React, {createRef, useContext, useEffect, useMemo, useRef, useState} from 'react';
import styles from "../styleAreaAndZone.module.sass";
import {motion, useDragControls} from "framer-motion";
import {Context} from "../../../../../../index";



const AreaMotion = ({graph, id, parentRef, editNodeS, editNode, setEditNodeS, checkDrag, nameVisible}) => {
    const {store} = useContext(Context);

    const controls = useDragControls()
    // const stuleClass = (graph, id)=>{
    //     if(otrisovka){
    //         const classStyle = {
    //             y: store.idGraph[id].Y, x: store.idGraph[id].X
    //         } as React.CSSProperties
    //         return classStyle
    //     }
    //     const classStyle = {
    //         // transform:  "translateX(0px) translateY(0px)",
    //         transform: "none"
    //     } as React.CSSProperties
    //     console.log("ASDASDASDASD")
    //     return classStyle
    // }
    //
    useEffect(()=>{
        setEditNodeS(false);
    }, [editNodeS])
    return (
        <motion.div
            key={id}
            drag
            dragListener={checkDrag}
            dragMomentum={false}
            dragElastic={.5}
            whileHover={{scale: 1.1}}
            whileTap={{boxShadow: "0px 0px 15px rgba(0,0,0,0.2)", cursor: "grabbing"}}
            onDragEnd={(event, info) => {
                editNode(info, id);
            }}
            dragControls={controls}
            dragConstraints={parentRef}
            className={styles.node}
            initial={{ y: graph.Y, x: graph.X}}
        >
            {id}

            <div className={styles.numNode}>
                {nameVisible ? (graph.num) : null}
            </div>
        </motion.div>
    );
};

export default AreaMotion;