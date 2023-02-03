import React, {useContext, useState} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../../../../../index";
import styles from './styleArea.module.sass'

const Area = () => {
    const {store} = useContext(Context);
    console.log(store.idGraph)
    let length_mass_graph = 0;
    if (store.idGraph[0]?.num){
        length_mass_graph = store.idGraph.length
    }
    console.log(store.matrixsmesh)






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
                            {(store.matrixsmesh.map((matrix, index) =><th key={index}> {store.matrixsmesh[id][index]} </th>))
                            }
                        </tr>
                            ))
                    }


                    </table>


                </div>
            </div>
        </div>
    );
};

export default observer(Area);