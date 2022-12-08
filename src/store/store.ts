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
    mass_putei = [];
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

    setMass_putei(mass_putei: (boolean | number)[][]) {
        this.mass_putei = mass_putei;
    }

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

    updatepro(){

    }

    addMatrixEl(){
        const matrixSmej = this.matrixsmesh

        let i = this.matrixsmesh.length;
            matrixSmej[i] = []
            for(let j = 0; j<this.idGraph.length; j++){
                if(i == j){
                    matrixSmej[i][j] = 0
                }else {
                    matrixSmej[i][j] = 99999
                    matrixSmej[j][i] = 99999
                }
            }

        this.setMatrix(matrixSmej);
        let json = JSON.stringify(this.matrixsmesh);
        sessionStorage.setItem("matrixSmej", json);
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
            this.addMatrixEl();
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
                         matrixSmej[i][j] = 99999
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


        var _ves: number = +ves
        matrixSmej[a][b] = _ves;
        matrixSmej[b][a] = _ves;
        this.setMatrix(matrixSmej)
        console.log(this.matrixsmesh);
        let json = JSON.stringify(this.matrixsmesh);
        sessionStorage.setItem("matrixSmej", json);
    }

    search(A1, A2){
        let mass: (boolean | number) [][] = []
        let a, b;
        let PutNaiden = false;


        //ПОИСК ID A1 и A2
        for(let i = 0; i < this.idGraph.length; i++){
            if(this.idGraph[i].num == A1){
                a = i;
            }
            if(this.idGraph[i].num == A2){
                b = i;
            }
        }

        let search_flag = a;
        let mass_arr = []

        //Заполнение массива для расчетов
        for(let i = 0; i < this.idGraph.length; i++){

            if(i === a){
                mass.push([0, null, true])

            }else {
                mass.push([9999, null, false])


            }

        }
        console.log(mass)
        console.log(this.matrixsmesh)
        //Поиск наименьших значений

        let index_el = 0;
        while (!PutNaiden){
            if(!PutNaiden){
                for(let j = 0; j < this.idGraph.length; j++){

                    if(mass[j][0] >= this.matrixsmesh[search_flag][j] + mass[search_flag][0] && this.matrixsmesh[search_flag][j]!=0 && !mass[j][2]){

                        mass[j][0] = this.matrixsmesh[search_flag][j] + mass[search_flag][0];
                        mass[j][1] = search_flag;

                    }
                    if(j === this.idGraph.length -1 ){
                        const min_el = this.minEl(mass)
                        mass[min_el][2] = true;
                        search_flag = min_el;


                        if(min_el == b){

                            console.log(mass_arr);
                            // this.setMass_putei(mass_arr);
                            PutNaiden = true;
                        }
                    }
                }
            }
        }
        console.log(mass)
    }

    // Поиск наименьшего значения
    minEl(mass: (boolean | number) [][]){

        var min: number | boolean = 999999999
        var X = 0
        if(mass[3][0] == 24){
            console.log("AAAAAAAAAAAAAAAA")
        }
        this.setMass_putei(mass);
        console.log(mass[3][0]);
        for (let i = 0; i < this.idGraph.length; i++){
            if(mass[i][0] < min && !mass[i][2] ){
                min = mass[i][0]
                X = i;
            }
        }
        console.log(this.mass_putei);
        return X
    }

}