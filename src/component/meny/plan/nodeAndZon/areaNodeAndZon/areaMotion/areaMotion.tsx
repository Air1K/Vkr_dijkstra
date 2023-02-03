import React, {createRef, useContext, useEffect, useMemo, useRef, useState} from 'react';
import styles from "../styleAreaAndZone.module.sass";
import {motion, useDragControls} from "framer-motion";
import {Context} from "../../../../../../index";


const AreaMotion = ({graph, id, parentRef, editNodeS, editNode, setEditNodeS, checkDrag, nameVisible, idVisible}) => {
    const {store} = useContext(Context);

    const controls = useDragControls()

    const read_lineDrag = ()=>{

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
            whileTap={{boxShadow: "0px 0px 15px rgba(0,0,0,0.2)", cursor: "grabbing"}}
            onDragEnd={(event, info) => {
                editNode(info, id);
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

            {
                store.idGraph[id].rotation.map((rotation, id) =>

                    <div key={id} className={styles.line} style={{width: rotation.long + "px", transform: "rotate("+rotation.rotations+"deg)"}}>
                        <div className={styles.lineVisible}></div>
                    </div>
                )
            }


        </motion.div>
    );
};

export default AreaMotion;