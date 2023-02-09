import React, {createRef, useContext, useEffect, useMemo, useRef, useState} from 'react';
import styles from './styleAreaAndZone.module.sass'
import {motion, useDragControls} from "framer-motion"
import {Context} from "../../../../../index";
import {createUseStyles} from "react-jss";
import AreaMotion from "./areaMotion/areaMotion";
import {Rotation} from "../../../../../models/Rotation";




const AreaNodeAndZone = ({obj, objCache, render_line, setRender_line, editNodeS, setEditNodeS}) => {
    const {store} = useContext(Context);

    const [obj_Rotation, setObj_Rotation] = useState<Rotation[]>(store.Rotation)
    const parentRef = useRef<HTMLDivElement>(null)

    // const [obj, setObj] = useState(store.idGraph);
    //
    // const [height, setHeight] = useState<number>();
    // const [width, setWidth] = useState<number>();
    // const [xParent, setXParent] = useState<number>();
    // const [yParent, setYParent] = useState<number>();
    // let parent
    // let parentElement
    const [checkDrag, setCheckDrag] = useState(false)

    const [nameVisible, setNameVisible] = useState(true)
    const [idVisible, setIdVisible] = useState(true)
    const [classeStyles, setClasseStyles] = useState({})

    const [otrisovka, setOtrisovka] = useState(false)










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
                    store.set_Rotation(cash_1);
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
    function editNodeDragF(id){
        obj[id].X = offseteNode[id].Xoffs + obj[id].X;
        obj[id].Y = offseteNode[id].Yoffs + obj[id].Y;

    }

    function editObj(id){
        setObj_Rotation(copy);
    }

    const editNodeDreagEnd = async (info, id) => {

        await editNodeDragF(id)
        await editObj(id);
        console.log(obj[id])
        await store.editGraph(obj);
        await store.set_Rotation(obj_Rotation);
        // return

    }

    useEffect( () => {
        console.log("ОБЪЕКТ ИЗМЕНИЛСЯ")
        store.update()
        setObj_Rotation(store.Rotation);

    }, [render_line]);

    return (
        <div className={styles.main_app}>
            <div ref={parentRef} className={styles.mainAreaNodeAndZon}>

                {
                    store.idGraph.map((graph, id) =>

                        <AreaMotion key ={id}
                                    graph={graph}
                                    id={id}
                                    parentRef={parentRef}
                                    editNodeS={editNodeS}
                                    editNode={editNodeDreag}
                                    editNodeEnd={editNodeDreagEnd}
                                    checkDrag={checkDrag}
                                    setEditNodeS={setEditNodeS}
                                    nameVisible={nameVisible}
                                    idVisible={idVisible}
                        />
                    )
                }
                {
                    obj_Rotation.map((rotation, id) =>

                        <div key={id} className={styles.line} style={{
                            width: rotation.long + "px",
                            transform: "translateX(" + rotation.centerX + "px) translateY(" + rotation.centerY + "px) rotate(" + rotation.rotations + "deg)"
                        }}>
                            <div className={styles.lineVisible}></div>
                        </div>
                    )
                }
            </div>
            <div className={styles.checkboxAndButton}>
                <p>
                    <label>
                        <input type="checkbox" defaultChecked={checkDrag}
                               onChange={() => {
                                   setCheckDrag(!checkDrag);
                               }}/>
                        <span>edit</span>
                    </label>
                </p>
                <p>
                    <label>
                        <input type="checkbox" disabled={checkDrag} defaultChecked={nameVisible}
                               onChange={() => {
                                   setNameVisible(!nameVisible);
                               }}/>
                        <span>name</span>
                    </label>
                </p>
                <p>
                    <label>
                        <input type="checkbox" disabled={checkDrag} defaultChecked={idVisible}
                               onChange={() => {
                                   setIdVisible(!idVisible);
                               }}/>
                        <span>id</span>
                    </label>
                </p>
                <p>
                    <button disabled={!checkDrag} onClick={async () => {


                        console.log(obj)
                        console.log(objCache)

                    }}>Сохранить
                    </button>
                    {/*<button onClick={() => {*/}
                    {/*    setOtrisovka(true);*/}
                    {/*    setEditNodeS(true)*/}
                    {/*}}>Отрисовать*/}
                    {/*</button>*/}
                </p>
            </div>
        </div>

    );
};

export default AreaNodeAndZone;