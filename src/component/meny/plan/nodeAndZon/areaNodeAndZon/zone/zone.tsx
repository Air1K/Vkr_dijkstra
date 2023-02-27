import React, {useState, useReducer, useContext, useEffect} from 'react';
import styles from './stylesZone.module.sass'
import {Context} from "../../../../../../index";
import {SizeZon} from "../../../../../../models/SizeZon";
import {motion, useDragControls} from "framer-motion";
import { Resizable } from 'react-resizable';

const Zone = ({myModalZone, parentRef}) => {
    const controls = useDragControls()
    const {store} = useContext(Context);
    const [draggableEl, setDraggableEl] = useState(true)
    let initialState: SizeZon[] = store.sizeZon;
    useEffect(() => {

        dispatch({type: 'add'});
        console.log(store.sizeZon);
        console.log(state);
    }, [myModalZone])

    const onResize = (event, {element, size, handle}) => {
        dispatch({widtH_: size.width, heighT_: size.height, type: });
    };

    function reducer(state, action) {
        console.log("reducer: ", state.length)
        switch (action.type) {
            case 'top':
                return [...state, state[action.id] = {heighT: 100}];
            case 'left':
                return [...state, state[action.id] = {widtH: action.widtH_}];
            case 'right':
                return [...state, state[action.id] = {widtH: action.widtH_}];
            case 'bottom':
                return [...state, state[action.id] = {heighT: action.heighT_}];
            case 'add':
                return store.sizeZon
            default:
                throw new Error();
        }
    }

    const [state, dispatch] = useReducer(reducer, initialState);

    const prov = (action) => {
        switch (action.pradXY) {
            case 'y':
                return 'y';
            case 'x':
                return 'x';
            default:
                throw new Error();
        }
    }

    // function changeHandler(){
    //     console.log("Change");
    // }
    //
    // React.useEffect(() => {
    //     window.addEventListener("resize", changeHandler);
    //     changeHandler();
    //     return () => {
    //         window.removeEventListener("resize", changeHandler);
    //     };
    // }, []);
    return (
        <div>
            {(
                state.map((zone, id) =>
                    <Resizable height={zone.heighT} width={zone.widtH} onResize = {onResize}>
                    <motion.div
                        drag
                        dragControls={controls}
                        dragConstraints={parentRef}
                        dragListener={draggableEl}
                        key={id}
                        className={styles.main}
                        style={{width: zone.widtH + "px", height: zone.heighT + "px"}}
                        initial={{x: zone.lefT, y: zone.toP}}
                        // onDragEnd={()=>{setDraggableEl(false)}}
                        // onDoubleClick={()=>{setDraggableEl(true)}}
                        whileTap={{boxShadow: "0px 0px 15px rgba(0,0,0,0.2)", cursor: "grabbing"}}
                        dragMomentum={false}
                        dragElastic={.5}>
                        <motion.div
                            drag={prov({pradXY: "y"})}
                            className={styles.topZon}
                            onDrag={(event, info) => console.log("Event")}
                            // dispatch({type: 'top', heighT_: info.offset.y, id: id})
                            onDragStart={() => {
                                console.log("DragEnter")
                            }}
                            onDragEnd={() => {
                                console.log("DragEnd");
                            }}
                            whileTap={{boxShadow: "0px 0px 15px rgba(0,0,0,0.2)", cursor: "grabbing"}}
                            dragMomentum={false}
                            dragElastic={.5}>

                        </motion.div>
                        {/*dispatch({type: 'top', heighT_: 22}*/}
                        <motion.div
                            drag={prov({pradXY: "x"})}
                            onDrag={(event, info) => console.log(info.offset)}
                            onDragStart={() => {
                                console.log("DragEnter")
                            }}
                            onDragEnd={() => {
                                console.log("DragEnd");
                            }}
                            className={styles.leftZon}
                            whileTap={{boxShadow: "0px 0px 15px rgba(0,0,0,0.2)", cursor: "grabbing"}}
                            dragMomentum={false}
                            dragElastic={.5}>
                        </motion.div>
                        <motion.div
                            className={styles.rightZon}
                            drag={prov({pradXY: "x"})}
                            onDrag={(event, info) => console.log(info.offset)}
                            onDragStart={() => {
                                console.log("DragEnter")
                            }}
                            onDragEnd={() => {
                                console.log("DragEnd");
                            }}
                            whileTap={{boxShadow: "0px 0px 15px rgba(0,0,0,0.2)", cursor: "grabbing"}}
                            dragMomentum={false}
                            dragElastic={.5}>
                        </motion.div>
                        <motion.div
                            drag={prov({pradXY: "y"})}
                            onDrag={(event, info) => console.log(info.offset)}
                            onDragStart={() => {
                                console.log("DragEnter")
                            }}
                            onDragEnd={() => {
                                console.log("DragEnd");
                            }}
                            className={styles.bottomZon}
                            whileTap={{boxShadow: "0px 0px 15px rgba(0,0,0,0.2)", cursor: "grabbing"}}
                            dragMomentum={false}
                            dragElastic={.5}>
                        </motion.div>
                    </motion.div>
                    </Resizable>
                )
            )}
        </div>


    );
};

export default Zone;