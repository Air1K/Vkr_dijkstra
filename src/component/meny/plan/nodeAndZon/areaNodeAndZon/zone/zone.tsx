import React, {useState, useReducer, useContext, useEffect, useRef} from 'react';
import styles from './stylesZone.module.sass'
import {Context} from "../../../../../../index";
import {SizeZon} from "../../../../../../models/SizeZon";
import {motion, useDragControls} from "framer-motion";

const Zone = ({myModalZone, parentRef, setMyModalZone, draggableEl, setDraggableEl, visibleZon, zon}) => {
    const controls = useDragControls()
    const {store} = useContext(Context);

    const [state, setState] = useState(store.sizeZon)
    // let initialState: SizeZon[] = store.sizeZon;
    useEffect(() => {
        setState(store.sizeZon)
    }, [myModalZone])
    const parent_Ref = useRef<HTMLDivElement>(null)
    const [classStyles_main, setClassStyles_main] = useState(styles.main)
    useEffect(()=>{
        if(zon){
            setClassStyles_main(styles.main)
        }else{
            setClassStyles_main(styles.main + ' ' + styles.main_zonEdit)
        }

    },[zon])

    return (
        <div ref={parent_Ref}
             className={styles.area}>
            {(
                state.map((zone, id) =>
                    <motion.div
                        key={id}
                        drag
                        dragListener={draggableEl && zon}
                        dragMomentum={false}
                        dragElastic={.5}
                        onClick={(e)=>{
                            if(!draggableEl){
                                const obj = {
                                    widtH: e.currentTarget.offsetWidth,
                                    heighT: e.currentTarget.offsetHeight,
                                }
                                store.setRead(obj, id, "size")
                                console.log()
                            }
                            if(draggableEl){
                                const parent = parent_Ref.current.getBoundingClientRect();
                                const element = e.currentTarget.getBoundingClientRect();

                                const x = element.left - parent.left;
                                const y = element.top - parent.top;

                                const obj = {
                                    toP: y,
                                    lefT: x,
                                }
                                store.setRead(obj, id, "position")
                            }

                        }}
                        whileTap={{boxShadow: "0px 0px 15px rgba(0,0,0,0.2)", cursor: "grabbing"}}
                        // onDragEnd={()=>{
                        //     console.log("BBBBBBBBBBB")
                        //     setDraggableEl(false)
                        // }}
                        dragControls={controls}
                        dragConstraints={parent_Ref}


                        className={classStyles_main}
                        style={{width: zone.widtH + "px", height: zone.heighT + "px"}}
                        initial={{y: zone.toP, x: zone.lefT}}
                        // onDragEnd={()=>{setDraggableEl(false)}}
                        // onDoubleClick={()=>{setDraggableEl(true)}}
                    >
                        <div className={styles.content}>Ширина: {zone.widtH} <br/> Высота: {zone.heighT}</div>

                        <div className={styles.main_absolute}
                        style={{backgroundColor: zone.color, opacity: visibleZon / 100}}>

                        </div>
                        {/*<motion.div*/}
                        {/*    drag*/}
                        {/*    className={styles.onClick_bottom_right}*/}
                        {/*    // onClick={(e)=>{e.stopPropagation()}}*/}
                        {/*>*/}

                        {/*</motion.div>*/}
                        {/*<motion.div*/}
                        {/*    drag={prov({pradXY: "y"})}*/}
                        {/*    className={styles.topZon}*/}
                        {/*    onDrag={(event, info) => {console.log("Event");*/}
                        {/*        // dispatch({type: 'top', heighT_: info.offset.y, id: id})*/}
                        {/*    }}*/}
                        {/*    // dispatch({type: 'top', heighT_: info.offset.y, id: id})*/}
                        {/*    onDragStart={() => {*/}
                        {/*        console.log("DragEnter")*/}
                        {/*    }}*/}
                        {/*    // onDragEnd={(event, info) => {console.log("Event"); dispatch({type: 'top', heighT_: info.offset.y, id: id})}}*/}
                        {/*    whileTap={{boxShadow: "0px 0px 15px rgba(0,0,0,0.2)", cursor: "grabbing"}}*/}
                        {/*    dragMomentum={false}*/}
                        {/*    dragElastic={.5}>*/}

                        {/*</motion.div>*/}
                        {/*/!*dispatch({type: 'top', heighT_: 22}*!/*/}
                        {/*<motion.div*/}
                        {/*    drag={prov({pradXY: "x"})}*/}
                        {/*    onDrag={(event, info) => console.log(info.offset)}*/}
                        {/*    onDragStart={() => {*/}
                        {/*        console.log("DragEnter")*/}
                        {/*    }}*/}
                        {/*    // onDragEnd={(event, info) => {*/}
                        {/*    //     dispatch({type: 'left', widtH_: info.offset.x, id: id})*/}
                        {/*    // }}*/}
                        {/*    className={styles.leftZon}*/}
                        {/*    whileTap={{boxShadow: "0px 0px 15px rgba(0,0,0,0.2)", cursor: "grabbing"}}*/}
                        {/*    dragMomentum={false}*/}
                        {/*    dragElastic={.5}>*/}
                        {/*</motion.div>*/}
                        {/*<motion.div*/}
                        {/*    className={styles.rightZon}*/}
                        {/*    drag={prov({pradXY: "x"})}*/}
                        {/*    onDrag={(event, info) => console.log(info.offset)}*/}
                        {/*    onDragStart={() => {*/}
                        {/*        console.log("DragEnter")*/}
                        {/*    }}*/}
                        {/*    onDragEnd={() => {*/}
                        {/*        console.log("DragEnd");*/}
                        {/*    }}*/}
                        {/*    whileTap={{boxShadow: "0px 0px 15px rgba(0,0,0,0.2)", cursor: "grabbing"}}*/}
                        {/*    dragMomentum={false}*/}
                        {/*    dragElastic={.5}>*/}
                        {/*</motion.div>*/}
                        {/*<motion.div*/}
                        {/*    drag={prov({pradXY: "y"})}*/}
                        {/*    onDrag={(event, info) => console.log(info.offset)}*/}
                        {/*    onDragStart={() => {*/}
                        {/*        console.log("DragEnter")*/}
                        {/*    }}*/}
                        {/*    onDragEnd={() => {*/}
                        {/*        console.log("DragEnd");*/}
                        {/*    }}*/}
                        {/*    className={styles.bottomZon}*/}
                        {/*    whileTap={{boxShadow: "0px 0px 15px rgba(0,0,0,0.2)", cursor: "grabbing"}}*/}
                        {/*    dragMomentum={false}*/}
                        {/*    dragElastic={.5}>*/}
                        {/*</motion.div>*/}
                    </motion.div>
                )
            )}
        </div>


    );
};

export default Zone;