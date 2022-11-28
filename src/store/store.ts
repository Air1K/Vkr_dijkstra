import {Graph} from "../models/Graph";
import {makeAutoObservable} from "mobx";
import {IdGraph} from "../models/IdFraph";
import {Session} from "inspector";

// let arr: Graph[] = [];



export default class Store {
    idGraph = [{} as Graph];
    //
    isAuth = false;
    messages = '';
    isLoading = false;
    arr: Graph[] = [];
    matrixsmesh = [];
    constructor() {
        makeAutoObservable(this);
    }

    setAuth(bool: boolean) {
        this.isAuth = bool;
    }

    setGraph(idGraph: Graph[]) {
        this.idGraph = idGraph;
    }

    setMatrix(matrixsmesh: number[][]) {
        this.matrixsmesh = matrixsmesh;
    }

    // setIGraph(arr: Graph[]) {
    //     this.arr.push(arr);
    // }
    setMessages(message: string) {
        this.messages = message;
    }

    setIsLoading(bool: boolean) {
        this.isLoading = bool;
    }


    update(){
        if(sessionStorage.getItem("graph")){
            const mass = JSON.parse(sessionStorage.getItem("graph"))
            this.setGraph(mass)
        }
        if(sessionStorage.getItem("matrixSmej")){
            const mass_smej = JSON.parse(sessionStorage.getItem("matrixSmej"))
            this.setMatrix(mass_smej)
        }
    }

    addGraph(OX: number, OY: number, num: number) {
        try {
            let obj = []
            if(sessionStorage.getItem("graph")){
                obj = this.idGraph
            }

            obj.push({
                X: OX,
                Y: OY,
                num: num
            })
            // arr.push(obj)
            this.setGraph(obj)
            // this.setIGraph([obj])


            let json = JSON.stringify(this.idGraph);
            sessionStorage.setItem("graph", json);

        } catch (e) {
            console.log("!!!!!!!!!!!");

        }
        console.log(this.matrixsmesh.length)
    }


     matrixSme(){
         if(this.matrixsmesh.length == 0){
             console.log(this.idGraph.length)
             const matrixSmej = []
             for(let i = 0; i<this.idGraph.length; i++){
                 matrixSmej[i] = []
                 for(let j = 0; j<this.idGraph.length; j++){
                     if(i == j){
                         matrixSmej[i][j] = 0
                     }else {
                         matrixSmej[i][j] = 999999999
                     }
                 }
             }
             this.setMatrix(matrixSmej);

             console.log(this.matrixsmesh)
         }

    }

    async matrixSmejUsel(G1, G2, ves){
        let a, b;

        if(this.idGraph.length!=this.matrixsmesh.length){
            await this.matrixSme();
        }

        for(let i = 0; i < this.idGraph.length; i++){
            if(this.idGraph[i].num == G1){
                a = i;
            }
            if(this.idGraph[i].num == G2){
                b = i;
            }
        }

        const matrixSmej = []
        for(let i = 0; i<this.idGraph.length; i++){
            matrixSmej[i] = []
            for(let j = 0; j<this.idGraph.length; j++){
                matrixSmej[i][j] = this.matrixsmesh[i][j]
            }
        }



        matrixSmej[a][b] = ves;
        matrixSmej[b][a] = ves;
        this.setMatrix(matrixSmej)
        console.log(this.matrixsmesh);
        let json = JSON.stringify(this.matrixsmesh);
        sessionStorage.setItem("matrixSmej", json);
    }


}