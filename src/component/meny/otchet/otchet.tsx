import React from 'react';
import BackIco from "../../tag/backIco";
import styles from '../../vvodPlanaStyle.module.sass'
import styles_1 from "../search/stylesSearch.module.sass";

const Otchet = () => {
    return (
        <div className={styles.main}>
            <BackIco/>
            <div className={styles_1.table}>
                <table>
                    <thead style={{display: "table-row"}}>
                        <th style={{textAlign:'center'}}>Оптимальный маршрут</th>
                    </thead>
                    <tr style={{display: "table"}}>
                        <th>Название маршрута</th>
                        <th>Номер маршрута</th>
                        <th>Начальная точка движения</th>
                        <th>Конечная точка движения</th>
                        <th>Дата создания задачи</th>
                        <th>Дата утверждения</th>
                        <th>Единицы измерения</th>
                        <th>Длина маршрута</th>
                        <th>Промежуточные точки (зоны)</th>
                    </tr>
                </table>
            </div>

        </div>
    );
};

export default Otchet;