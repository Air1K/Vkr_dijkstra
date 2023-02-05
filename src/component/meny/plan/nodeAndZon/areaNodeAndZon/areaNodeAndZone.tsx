import React, {createRef, useContext, useEffect, useMemo, useRef, useState} from 'react';
import styles from './styleAreaAndZone.module.sass'
import {motion, useDragControls} from "framer-motion"
import {Context} from "../../../../../index";
import {createUseStyles} from "react-jss";
import AreaMotion from "./areaMotion/areaMotion";
import {Rotation} from "../../../../../models/Rotation";

const AreaNodeAndZone = ({editNodeS, setEditNodeS}) => {
    const {store} = useContext(Context);


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
    const bool = true

    const [otrisovka, setOtrisovka] = useState(false)


    let obj = []
    for (let j = 0; j < store.idGraph.length; j++) {
        obj[j] = {
            id: j,
            X: store.idGraph[j].X,
            Y: store.idGraph[j].Y,
            // rotation: store.idGraph[j].rotation
        }
    }

    const [obj_Rotation, setObj_Rotation] = useState<Rotation[]>(store.Rotation)
    useEffect( ()=>{
    //     // let RotationOBJ = []
    //     // for (let j = 0; j < store.Rotation.length; j++) {
    //     //     RotationOBJ[j] = {
    //     //         idA: store.Rotation[j].idA,
    //     //         idB: store.Rotation[j].idB,
    //     //         centerX: store.Rotation[j].centerX,
    //     //         centerY: store.Rotation[j].centerY,
    //     //         long: store.Rotation[j].long,
    //     //         rotations: store.Rotation[j].rotations
    //     //     }
    //     // }
    //     //
    //     // setObj_Rotation([...obj_Rotation, RotationOBJ])
        store.update();
        setObj_Rotation(store.Rotation);

        console.log(store.Rotation)
    },[])

    let offseteNode = []
    for (let j = 0; j < store.idGraph.length; j++) {
        offseteNode[j] = {
            id: j,
            Xoffs: 0,
            Yoffs: 0,
        }
    }

    // function EditLineDrag(x, y, id){
    //     let aSearc, bSearc;
    //
    //     const x1 = this.idGraph[aSearc].X;
    //     const y1 = this.idGraph[aSearc].Y;
    //     const x2 = this.idGraph[bSearc].X;
    //     const y2 = this.idGraph[bSearc].Y;
    //
    //     const katet1 = x1 - x2;
    //     const katet2 = y1 - y2;
    //
    //     const long = Math.round(Math.sqrt(Math.pow(katet1, 2) + Math.pow(katet2, 2)))
    //     const deg  = (180 / Math.PI * Math.atan2(katet2, katet1)) + 180;
    // }

    const editNode = (info, id) => {
        try {

            offseteNode[id].Xoffs = offseteNode[id].Xoffs + info.offset.x
            offseteNode[id].Yoffs = offseteNode[id].Yoffs + info.offset.y
            const x = offseteNode[id].Xoffs + store.idGraph[id].X;
            console.log(x, " = ", info.offset.x, "+", store.idGraph[id].X)
            const y = offseteNode[id].Yoffs + store.idGraph[id].Y;

            obj[id].X = x;
            obj[id].Y = y;

            // EditLineDrag(x, y, id)


            console.log(obj)
        } catch (e) {
            console.log("JJJJJ")
        }
    }

    return (
        <div className={styles.main_app}>
            <div ref={parentRef} className={styles.mainAreaNodeAndZon}>

                {
                    store.idGraph.map((graph, id) =>

                        <AreaMotion graph={graph}
                                    id={id}
                                    parentRef={parentRef}
                                    editNodeS={editNodeS}
                                    editNode={editNode}
                                    checkDrag = {checkDrag}
                                    setEditNodeS = {setEditNodeS}
                                    nameVisible = {nameVisible}
                                    idVisible = {idVisible}
                        />

                    )
                }
                {
                    obj_Rotation.map((rotation, id) =>

                        <div key={id} className={styles.line} style={{width: rotation.long + "px", transform: "translateX(" + rotation.centerX + "px) translateY(" + rotation.centerY + "px) rotate("+rotation.rotations+"deg)"}}>
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
                    <button disabled={!checkDrag} onClick={() => {
                        store.editGraph(obj);
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