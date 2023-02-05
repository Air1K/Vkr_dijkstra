import React, {createRef, useContext, useEffect, useMemo, useRef, useState} from 'react';
import styles from "../styleAreaAndZone.module.sass";
import {motion, useDragControls} from "framer-motion";
import {Context} from "../../../../../../index";


const AreaMotion = ({graph, id, parentRef, editNodeS, editNode, editNodeEnd, setEditNodeS, checkDrag, nameVisible, idVisible}) => {
    const {store} = useContext(Context);

    const controls = useDragControls()

    const read_lineDrag = (info, id)=>{

    }

    useEffect(() => {
        setEditNodeS(false);
    }, [editNodeS])
    return (
        <motion.div
            key={id}
            drag
            dragListener={checkDrag}
            dragMomentum={false}
            dragElastic={.5}
            onDrag={(event, info) => {
                editNode(info, id);
            }}
            whileTap={{boxShadow: "0px 0px 15px rgba(0,0,0,0.2)", cursor: "grabbing"}}
            onDragEnd={(event, info) => {
                editNodeEnd(info, id);
            }}
            dragControls={controls}
            dragConstraints={parentRef}
            className={styles.node_main}
            initial={{y: graph.Y, x: graph.X}}
        >
            <motion.div
                whileHover={{
                    scale: 1.1,
                    transition: { duration: 0.1 },
                }}
                className={styles.node}>
                <div className={styles.idVisible}>{idVisible ? (id) : null}</div>
                <div className={styles.numNode}>
                    {nameVisible ? (graph.num) : null}
                </div>
            </motion.div>
        </motion.div>
    );
};

export default AreaMotion;