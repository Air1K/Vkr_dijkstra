import React from 'react';
import styles from "../styleAreaAndZone.module.sass";
import {motion, useDragControls} from "framer-motion";


const AreaMotion = ({ parentRef, editNode, editNodeEnd, checkDrag, nameVisible, idVisible, graphEl}) => {
    const controls = useDragControls()
    return (

            graphEl.map((graph, ids) =>

                <motion.div
            key={graph.num}
            drag
            dragListener={checkDrag}
            dragMomentum={false}
            dragElastic={.5}
            onDrag={(event, info) => {
                editNode(info, ids);
            }}
            whileTap={{boxShadow: "0px 0px 15px rgba(0,0,0,0.2)", cursor: "grabbing"}}
            onDragEnd={(event, info) => {
                editNodeEnd(info, ids);
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
                <div className={styles.idVisible}>{idVisible ? (ids) : null}</div>
                <div className={styles.numNode}>
                    {nameVisible ? (graph.num) : null}
                </div>
            </motion.div>
        </motion.div>
            )
    );
};

export default AreaMotion;