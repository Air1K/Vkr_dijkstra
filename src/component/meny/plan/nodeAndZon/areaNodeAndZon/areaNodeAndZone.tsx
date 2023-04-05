import React, {createRef, useContext, useEffect, useMemo, useRef, useState} from 'react';
import styles from './styleAreaAndZone.module.sass'
import {Context} from "../../../../../index";
import AreaMotion from "./areaMotion/areaMotion";
import {Rotation} from "../../../../../models/Rotation";
import {Graph} from "../../../../../models/Graph";
import Zone from "./zone/zone";
import PanelLeft from "./zone/panelLeft/panelLeft";


const AreaNodeAndZone = ({obj, objCache, render_line, editNodeS, myModalZone, setMyModalZone, edit, activeId, active}) => {
    const {store} = useContext(Context);
    const [obj_Rotation, setObj_Rotation] = useState<Rotation[]>(store.Rotation)
    const [graph, setGraph] = useState<Graph[]>(store.idGraph)
    console.log("Перезапись")
    const parentRef = useRef<HTMLDivElement>(null)
    const [checkDrag, setCheckDrag] = useState(false)
    const [ves, setVes] = useState(true)
    const [zone, setZone] = useState(false)
    const [line, setLine] = useState(true)
    const [nameVisible, setNameVisible] = useState(true)
    const [idVisible, setIdVisible] = useState(true)
    const [imgFon, setImgFon] = useState('');
    const [draggableEl, setDraggableEl] = useState(true)
    const [visibleZon, setVisibleZon] = useState('50')
    let copy = Object.assign([], obj_Rotation)

    let offseteNode = []
    for (let j = 0; j < store.idGraph.length; j++) {
        offseteNode[j] = {
            id: j,
            Xoffs: 0,
            Yoffs: 0,
        }
    }
    let cash_1 = [];
    for (let i = 0; i < store.Rotation.length; i++) {
        cash_1.push({
            idA: store.Rotation[i].idA,
            idB: store.Rotation[i].idB,
            centerX: store.Rotation[i].centerX,
            centerY: store.Rotation[i].centerY,
            long: store.Rotation[i].long,
            rotations: store.Rotation[i].rotations,
        })
    }

    console.log("Рендер areaNodeAndZone")

    function EditLineDrag(id) {

        if (store?.Rotation?.length === 0) {
            return
        } else {

            for (let i = 0; i < store.Rotation?.length; i++) {
                if (store.Rotation[i].idA === id || store.Rotation[i].idB === id) {
                    const A = store.Rotation[i].idA;
                    const B = store.Rotation[i].idB;

                    const x1 = objCache[A].X;
                    const y1 = objCache[A].Y;
                    const x2 = objCache[B].X;
                    const y2 = objCache[B].Y;
                    console.log(obj)
                    console.log(objCache)

                    console.log(A, " - Ax ", objCache[A].X, "/// Ay ", objCache[A].Y)
                    console.log(B, " - Bx ", objCache[B].X, "/// By ", objCache[B].Y)
                    const katet1 = x1 - x2;
                    const katet2 = y1 - y2;

                    const longe = Math.round(Math.sqrt(Math.pow(katet1, 2) + Math.pow(katet2, 2)))
                    const deg = (180 / Math.PI * Math.atan2(katet2, katet1)) + 180;

                    const center_X = ((x1 + x2) / 2) - (longe / 2) + (25 / 2)
                    const center_Y = ((y1 + y2) / 2)


                    console.log(cash_1)
                    cash_1[i].long = longe;
                    cash_1[i].centerY = center_Y;
                    cash_1[i].centerX = center_X;
                    cash_1[i].rotations = deg;
                    // obj2[i].centerX = centerX;
                    // obj2[i].centerY = centerY;
                    // obj2[i].long = long
                    // obj2[i].rotations = deg;
                    // let {centerX, centerY, long, rotations} = obj_Rotation[i];
                    // store.set_Rotation(cash_1);
                    copy[i].long = longe;
                    copy[i].centerY = center_Y;
                    copy[i].centerX = center_X;
                    copy[i].rotations = deg;
                    // console.log(obj2)
                    // setObj_Rotation(cash_1);

                    // console.log(obj_Rotation)
                    // console.log(this.idGraph[i].rotation)
                }
            }
        }
    }


    const editNodeDreag = async (info, id) => {

        offseteNode[id].Xoffs = info.offset.x;
        offseteNode[id].Yoffs = info.offset.y;
        objCache[id].X = obj[id].X + offseteNode[id].Xoffs;
        objCache[id].Y = obj[id].Y + offseteNode[id].Yoffs;
        console.log(objCache[id].X, "info", objCache[id].Y);
        EditLineDrag(id)
        console.log(obj)
        return;
    }

    function editNodeDragF(id) {
        obj[id].X = offseteNode[id].Xoffs + obj[id].X;
        obj[id].Y = offseteNode[id].Yoffs + obj[id].Y;
    }

    async function editObj(id) {
        await setObj_Rotation(copy);
        await setGraph(obj);
    }

    const editNodeDreagEnd = async (info, id) => {

        await editNodeDragF(id)
        await editObj(id);
        await store.editGraph(graph);
        await store.set_Rotation(obj_Rotation);
        console.log(obj, graph);
        // return

    }

    useEffect(() => {
        console.log("ОБЪЕКТ ИЗМЕНИЛСЯ -----------------------")
        setObj_Rotation(store.Rotation);
        setGraph(obj);

        // console.log(store.Rotation)
    }, [render_line, editNodeS]);

    const lineActive = (rotation)=>{
        for(let i =0; i<store.mass_putei_exit[activeId]?.interval_node.length; i++){
            if(((rotation.idA === store.mass_putei_exit[activeId]?.interval_node[i]) && (rotation.idB === store.mass_putei_exit[activeId]?.interval_node[i+1])) || ((rotation.idB === store.mass_putei_exit[activeId]?.interval_node[i]) && (rotation.idA === store.mass_putei_exit[activeId]?.interval_node[i+1]))){
                return {backgroundColor: 'green'}
            }
        }
    }



    return (
        <div className={styles.main_app}>
            <div ref={parentRef} className={styles.mainAreaNodeAndZon}>
                <div className={styles.img_container}>
                    <img className={styles.img} src={imgFon} alt=""/>
                </div>

                <AreaMotion
                    parentRef={parentRef}
                    editNode={editNodeDreag}
                    editNodeEnd={editNodeDreagEnd}
                    checkDrag={checkDrag}
                    nameVisible={nameVisible}
                    idVisible={idVisible}
                    graphEl={graph}
                    activeId={activeId}
                    active={active}
                />

                {
                    store.Rotation.map((rotation, id) =>
                        line ? <div key={id} className={styles.line} style={{
                            width: rotation.long + "px",
                            transform: "translateX(" + rotation.centerX + "px) translateY(" + rotation.centerY + "px) rotate(" + rotation.rotations + "deg)"
                        }}>
                            <div className={styles.lineVisible} style={active?lineActive(rotation):{}}></div>
                            {ves ? <div style={{
                                transform: "rotate(" + -rotation.rotations + "deg)",
                                position: "absolute",
                                zIndex: 9999
                            }}>{store?.matrixsmesh[rotation?.idA][rotation?.idB]}</div> : null}

                        </div> : null
                    )
                }

                <Zone
                    myModalZone={myModalZone}
                    parentRef={parentRef}
                    setMyModalZone={setMyModalZone}
                    draggableEl={draggableEl}
                    setDraggableEl={setDraggableEl}
                    visibleZon={visibleZon}
                    zon={zone}
                />
                <PanelLeft visibleZon={visibleZon}
                           setVisibleZon={setVisibleZon}
                           imgFon={imgFon}
                           setImgFon={setImgFon}
                           draggableEl={draggableEl}
                           setDraggableEl={setDraggableEl}
                           zone={zone}
                           setZone={setZone}
                           checkDrag={checkDrag}
                           setCheckDrag={setCheckDrag}
                           ves={ves}
                           setVes={setVes}
                           line={line}
                           setLine={setLine}
                           idVisible={idVisible}
                           setIdVisible={setIdVisible}
                           nameVisible={nameVisible}
                           setNameVisible={setNameVisible}
                           edit={edit}/>
            </div>

        </div>

    );
};

export default AreaNodeAndZone;