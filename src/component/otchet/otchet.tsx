import React from 'react';
import BackIco from "../backIco";
import styles from './otchet.module.sass'
import styles_1 from "../search/stylesSearch.module.sass";

const Otchet = () => {
    return (
        <div className={styles.main}>
            <div className={`box-block ${styles.block}`}>
                <h6>Формирование отчета</h6>
                <input type="text" placeholder="Введите название созданного маршрута"/>
                <div className={styles.button}><button>Сформировать отчет</button></div>

            </div>
            <div className={styles_1.table}>
                <table>
                    <tr style={{display: "table-row"}}>
                        <th style={{textAlign:'center'}}>Оптимальный маршрут</th>
                    </tr>
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
            <BackIco/>
        </div>
    );
};

export default Otchet;