import React, {useState, useReducer, useContext, useEffect, useRef} from 'react';
import styles from './stylesZone.module.sass'
import {Context} from "../../../../../../index";
import {SizeZon} from "../../../../../../models/SizeZon";
import {motion, useDragControls} from "framer-motion";
import {Resizable} from 'react-resizable';

const Zone = ({myModalZone, parentRef, setMyModalZone, draggableEl, setDraggableEl}) => {
    const controls = useDragControls()
    const {store} = useContext(Context);

    const [state, setState] = useState(store.sizeZon)
    // let initialState: SizeZon[] = store.sizeZon;
    useEffect(() => {
        // dispatch({type: 'dell'})
        // dispatch({type: 'add'});
        // console.log(store.sizeZon);
        // console.log(state);
        setState(store.sizeZon)
    }, [myModalZone])
    const parent_Ref = useRef<HTMLDivElement>(null)

    // function reducer(state, action) {
    //     console.log("reducer: ", action)
    //     console.log(state)
    //     if(state.length !== 0 && state[action?.id]?.widtH ===action?.widtH_) {
    //         return state;
    //     }
    //     if(state.length !== 0 && state[action.id]?.heighT === action?.heighT_) {
    //         return state;
    //     }
    //     switch (action.type) {
    //         case 'top':
    //             state[action.id].heighT = action.heighT_;
    //             return [...state];
    //         case 'left':
    //             state[action.id].widtH = action.widtH_
    //             return [...state];
    //         case 'right':
    //             state[action.id].widtH = action.widtH_
    //             return [...state];
    //         case 'bottom':
    //             state[action.id].heighT = action.heighT_;
    //             return [...state];
    //         case 'add':
    //             return store.sizeZon
    //         case 'dell':
    //             return []
    //         default:
    //             throw new Error();
    //     }
    // }

    // const [state, dispatch] = useReducer(reducer, initialState);

    // const prov = (action) => {
    //     switch (action.pradXY) {
    //         case 'y':
    //             return 'y';
    //         case 'x':
    //             return 'x';
    //         default:
    //             throw new Error();
    //     }
    // }


    return (
        <div ref={parent_Ref}
             className={styles.area}>
            {(
                state.map((zone, id) =>
                    <motion.div
                        key={id}
                        drag
                        dragListener={draggableEl}
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


                        className={styles.main}
                        style={{width: zone.widtH + "px", height: zone.heighT + "px", backgroundColor: zone.color}}
                        initial={{y: zone.toP, x: zone.lefT}}
                        // onDragEnd={()=>{setDraggableEl(false)}}
                        // onDoubleClick={()=>{setDraggableEl(true)}}
                    >
                        Ширина: {zone.widtH} <br/> Высота: {zone.heighT}

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