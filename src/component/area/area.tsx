import React, {useContext, useState} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../../index";
import styles from './styleArea.module.sass'

const Area = () => {
    const {store} = useContext(Context);
    console.log(store.idGraph)
    let length_mass_graph = 0;
    if (store.idGraph[0].num){
        length_mass_graph = store.idGraph.length
    }
    console.log(store.matrixsmesh)


    const Strelka = (props) => {
        const index_ = props.ellement;
        console.log(index_, store.mass_putei_exit.length-1)
        if(index_ < store.mass_putei_exit.length-1) {
            return (<div>➜</div>)
        }
        return null;
    }

    const Otvet = () => {


        if(store.b != null) {
            console.log(store.mass_putei_exit)
            return (<div> = &nbsp; {store.mass_putei[store.b][0]}</div>)
        }
        return null;
    }

    return (
        <div className={styles.midle}>
            Окно вывода
            <div>
                <div>
                    Кол-во графов: {length_mass_graph}
                </div>

                Матрица смежности:
                <div className={styles.main}>
                    <table>
                        <tr>
                            <th> / </th>
                            {(store.idGraph.map((graph) =><th key={graph.num}> {graph.num} </th>))
                            }
                        </tr>
                        {(store.idGraph.map((graph, id) =>
                        <tr key={graph.num}>
                            <th> {graph.num} </th>
                            {(store.matrixsmesh.map((matrix, index) =><th> {store.matrixsmesh[id][index]} </th>))
                            }
                        </tr>
                            ))
                    }


                    </table>
                    <div className={styles.puti}>
                        Оптимальный маршрут:  &nbsp; {(store.mass_putei_exit.map((node_, indexe) => <div className={styles.puti} key={node_}> {store.idGraph[node_].num}&nbsp; <Strelka ellement={indexe} /> &nbsp;</div> ))
                    }
                    <Otvet/>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default observer(Area);