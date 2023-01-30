import React, {createRef, useContext, useEffect, useRef, useState} from 'react';
import styles from './styleAreaAndZone.module.sass'
import {motion, useDragControls} from "framer-motion"
import {Context} from "../../../../../index";


const AreaNodeAndZone = () => {
    const {store} = useContext(Context);

    const controls = useDragControls()
    const parentRef = useRef<HTMLDivElement>(null)

    const [obj, setObj] = useState(store.idGraph);

    const [height, setHeight] = useState<number>();
    const [width, setWidth] = useState<number>();
    const [xParent, setXParent] = useState<number>();
    const [yParent, setYParent] = useState<number>();
    let parent
    useEffect(() => {
        parent = parentRef.current.getBoundingClientRect();
        const height = parent.height - 37;
        const width = parent.width - 37;
        setYParent(parentRef.current.offsetTop)
        setXParent(parentRef.current.offsetLeft)
        console.log(xParent)
        setHeight(height);
        setWidth(width)
        console.log(height, "height", " /// ", width, "width",);
    }, [parentRef]);
    // useEffect(()=>{
    //     if()
    // },[controls])



    const schetc = (id) => {
        let otstup = id * 25 + 5
        return otstup
    }


    const editNode = (info, id)=>{
        // store.idGraph[id].X =
        const x = info.point.x - (xParent+8);
        const y = info.point.y - (yParent+12.5);


        store.editGraph(id, x, y, '')
    }

    const [checkDrag, setCheckDrag] = useState(false)

    return (
        <div>
            <div ref={parentRef} className={styles.mainAreaNodeAndZon}>
                {/*<div className={styles.node}>*/}
                {/*</div>*/}
                {(store.idGraph.map((graph, id) =>
                    <motion.div
                                key={id}
                                drag
                                dragMomentum={false}
                                dragElastic={.5}
                                // whileHover={{scale: 1.1}}
                                // whileTap={{boxShadow: "0px 0px 15px rgba(0,0,0,0.2)"}}
                                // onDragEnd={(event, info) => { editNode(info, id); console.log(info.point.x - (xParent + 18), info.point.y - (yParent + 18))}}
                                dragControls={controls}
                                dragConstraints={parentRef}
                                className={styles.node}
                                // style={{top: graph.Y+"px", left: graph.X + 'px', transformOrigin:"50% 50%"}}
                                dragListener={checkDrag}
                    >
                        {id}
                        <div className={styles.numNode}>
                            {graph.num}
                        </div>
                    </motion.div>
                ))
                }
                <div className={styles.checkboxAndButton}>
                    <p>
                        <label>
                            <input type="checkbox" defaultChecked={checkDrag}
                                   onChange={() => setCheckDrag(!checkDrag)}/>
                            <span>Edit</span>
                        </label>
                    </p>
                    <p>
                        <button disabled={true} onClick={() => { store.update();
                        }}>Включено <br/> автосохранение
                        </button>
                    </p>
                </div>

            </div>

        </div>

    );
};

export default AreaNodeAndZone;