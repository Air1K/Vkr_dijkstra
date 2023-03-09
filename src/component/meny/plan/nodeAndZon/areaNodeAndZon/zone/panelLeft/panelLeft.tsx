import React, {useState} from 'react';
import styles from "./stylePanelLeft.module.sass";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faAnglesLeft} from "@fortawesome/free-solid-svg-icons";
// <FontAwesomeIcon icon="fa-light fa-pipe" />
//<FontAwesomeIcon icon="fa-solid fa-grip-lines-vertical" />
//<FontAwesomeIcon icon="fa-solid fa-caret-left" />
//<FontAwesomeIcon icon="fa-solid fa-angles-left" />
const PanelLeft = ({
                       visibleZon, setVisibleZon, imgFon, setImgFon,
                       draggableEl, setDraggableEl, zone, setZone,
                       checkDrag, setCheckDrag, ves, setVes, line,
                       setLine, idVisible, setIdVisible, nameVisible,
                       setNameVisible, edit
                   }) => {

    const [onClocChek, setOnClocChek] = useState(true)
    const [classStyle_leftBlokAnim, setClassStyle_leftBlokAnim] = useState(styles.main_left)
    const [classStyle_icoAnim, setClassStyle_icoAnim] = useState(styles.a_ico)

    function effects() {
        setOnClocChek(!onClocChek)
        if (onClocChek) {
            setClassStyle_leftBlokAnim(classStyle_leftBlokAnim + ' ' + styles.main_left_onClik)
            setClassStyle_icoAnim(classStyle_icoAnim + ' ' + styles.a_ico_onClick)
        } else {
            setClassStyle_leftBlokAnim(styles.main_left)
            setClassStyle_icoAnim(styles.a_ico)
        }
    }

    return (
        <div className={classStyle_leftBlokAnim}>
            <div>
                <p>
                    <label>
                        <input accept="image/*"
                               type='file'
                               id="imgInp"
                               onChange={(e) => {
                                   setImgFon(URL.createObjectURL(e.target.files[0]))
                               }}
                               disabled={!edit}/>
                    </label>
                </p>
                <p className="switch">
                    <label>
                        Размер зоны
                        <input type="checkbox"
                               disabled={!edit}
                               defaultChecked={draggableEl}
                               onChange={() => {
                                   setDraggableEl(!draggableEl);
                               }}/>
                        <span className="lever"></span>
                        Перемещение
                    </label>
                </p>
                <p>
                    <label>
                        <input type="checkbox"
                               defaultChecked={zone}
                               disabled={!edit}
                               onChange={() => {
                                   setZone(!zone);
                               }}/>
                        <span>Режим изменения зоны</span>
                    </label>
                </p>
                <p>
                    <label>
                        <input type="checkbox"
                               defaultChecked={checkDrag}
                               disabled={!edit}
                               onChange={() => {
                                   setCheckDrag(!checkDrag);
                               }}/>
                        <span>Режим изменения положения точек</span>
                    </label>
                </p>
                <p>
                    <label>
                        <input type="checkbox"
                               defaultChecked={ves}
                               onChange={() => {
                                   setVes(!ves);
                               }}/>
                        <span>Показать расстояние</span>
                    </label>
                </p>
                <p>
                    <label>
                        <input type="checkbox"
                               defaultChecked={line}
                               onChange={() => {
                                   setLine(!line);
                               }}/>
                        <span>Показать пути</span>
                    </label>
                </p>
                <p>
                    <label>
                        <input type="checkbox"
                               defaultChecked={idVisible}
                               onChange={() => {
                                   setIdVisible(!idVisible);
                               }}/>
                        <span>Показать id каждой точки</span>
                    </label>
                </p>
                <p>
                    <label>
                        <input type="checkbox"
                               defaultChecked={nameVisible}
                               onChange={() => {
                                   setNameVisible(!nameVisible);
                               }}/>
                        <span>Показать название точек</span>
                    </label>
                </p>

                <p title="Прозрачность зон" className="range-field">
                    <input type="range"
                           id="test5"
                           min="0"
                           max="100"
                           value={visibleZon}
                           onChange={(e) => {
                        setVisibleZon(e.target.value);
                    }}
                    />
                </p>
            </div>
            <div className={classStyle_icoAnim}
                 onClick={effects}>
                {/*<div className={styles.ico}></div>*/}
                <FontAwesomeIcon className={styles.ico} icon={faAnglesLeft}/>
            </div>
        </div>

    );
};

export default PanelLeft;