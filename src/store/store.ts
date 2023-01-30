import {Graph} from "../models/Graph";
import {makeAutoObservable} from "mobx";
import {IdGraph} from "../models/IdFraph";
import {Session} from "inspector";
// let arr: Graph[] = [];
import {IUser} from "../models/IUser";


export default class Store {
    idGraph = [{} as Graph];
    user = {} as IUser
    a = null;
    b = null;
    isAuth = false;
    messages = '';
    isLoading = false;
    arr: Graph[] = [];
    matrixsmesh = [];
    mass_putei = [];
    mass_putei_exit = [];
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

    setUser(user: IUser) {
        this.user = user;
    }

    setA(a: number){
        this.a = a;
    }
    setB(b: number){
        this.b = b;
    }
    // setIGraph(arr: Graph[]) {
    //     this.arr.push(arr);
    // }

    setMass_putei(mass_putei: (boolean | number)[][]) {
        this.mass_putei = mass_putei;
    }

    setMass_putei_exit(setMass_putei_exit){
        this.mass_putei_exit = setMass_putei_exit;
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

    async login(email: string, password: string) {
        try {
            const obj = {
                email: email,
                id: 'default',
                username: 'default',
                name: 'default',
                role: 'storekeeper'
            }
            // const response = await AuthService.login(email, password);
            // console.log(response);
            // localStorage.setItem('token', response.data.accessToken);
            this.setAuth(true);
            this.setUser(obj);


        } catch (e) {
            console.log(e.response?.data?.message);
            this.setMessages(e.response?.data?.message);
        }
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
    editGraph(id:number, OX: number, OY: number, num: string) {
        try {
            let obj = []
            if(sessionStorage.getItem("graph")){
                obj = this.idGraph
            }
            if(num !== ""){
                obj[id].num = num
            }

            if(OX !== null){
                obj[id].X = OX
            }

            if(OY !== null){
                obj[id].Y = OY
            }

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
        let ass = true;
        let ass2 = true;
        if(!this.idGraph[0]?.num){
            alert("Массив точек пуст");
            return
        }

        for(let i = 0; i < this.idGraph?.length; i++){

            console.log(this.idGraph[i]?.num, "--", G1, "--", G2)
            if(this.idGraph[i]?.num === (G1)){
                ass = false
            }
            if(this.idGraph[i]?.num === (G2)){
                ass2 = false
            }
        }

        if(ass){
            alert("Введено имя не существующего узла 1");
            return
        }
        if(ass2){
            alert("Введено имя не существующего узла 2");
            return
        }

        console.log(ves)
        if(!ves) {
            alert("Введено некорректное значение");
            return
        }

        if(ves < 0) {
            alert("Введено некорректное значение");
            return
        }

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
                            if(PutNaiden){
                                let i = b;
                                let search: (number | boolean) = mass[b][1];
                                let arr_mass_exit = [b];

                                while(arr_mass_exit[arr_mass_exit.length-1] !== a) {
                                    arr_mass_exit.push(search);

                                    const ass =  Number(search)
                                    search = Number(mass[ass][1]);
                                }
                                this.setMass_putei_exit(arr_mass_exit.reverse())

                                this.setA(a);
                                this.setB(b);
                            }
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
        // if(mass[3][0] == 24){
        //     console.log("AAAAAAAAAAAAAAAA")
        // }
        this.setMass_putei(mass);
        // console.log(mass[3][0]);
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