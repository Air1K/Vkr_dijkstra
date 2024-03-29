import {Graph} from "../models/Graph";
import {makeAutoObservable} from "mobx";
import {IUser} from "../models/IUser";
import {Rotation} from "../models/Rotation";
import {SizeZon} from "../models/SizeZon";
import {Route} from "../models/Route";
import {Plan} from "../models/Plan";


export default class Store {
    // idGraph = [{} as Graph];
    left = 0;
    idGraph: Graph[] = [];
    Rotation: Rotation[] = [];
    sizeZon: SizeZon[] = [];
    user = {} as IUser
    a = null;
    b = null;
    isAuth = false;
    messages = '';
    isLoading = false;
    arr: Graph[] = [];
    matrixsmesh = [];
    mass_putei = [];
    mass_putei_exit: Route[] = [];
    plan: Plan[] = [];
    stock_active: number

    constructor() {
        makeAutoObservable(this);
    }


    setAuth(bool: boolean) {
        this.isAuth = bool;
    }

    setStockActive(stock_active: number){
        this.stock_active = stock_active;
        this.upgradePlanActive();
        console.log("Отработал актив")
    }

    setPlanAdd(name){
        const id = this.plan.length;
        const obj = {
            id: id,
            name: name
        }
        this.plan.push(obj);
        this.upgradePlan();
        console.log(this.plan);
    }

    setPlan(obj: Plan[]){
        this.plan = obj;
    }

    setSizeZon(color){
            this.sizeZon.push({
                widtH: 200,
                heighT: 100,
                toP: 0,
                lefT: this.left,
                color: color
            })
            this.left += 205

       this.upgradeSizeZon()
    }

    setRead(zone, id, strinG){
        switch (strinG){
            case 'size':
                const {widtH, heighT} = zone
                this.sizeZon[id].widtH = widtH;
                this.sizeZon[id].heighT = heighT;
                this.upgradeSizeZon()
                return
            case 'position':
                const {toP, lefT} = zone
                this.sizeZon[id].toP = toP;
                this.sizeZon[id].lefT = lefT;
                this.upgradeSizeZon()
                return;
            case 'update':
                this.sizeZon = zone;
                return;
            case Error:
                console.log(Error)
                return;
        }

    }

    setEditEl(id: number, X: number, Y: number) {
        this.idGraph[id].X = X;
        this.idGraph[id].Y = Y;
    }

    upgradeStoreMatrix() {
        let json = JSON.stringify(this.matrixsmesh);
        sessionStorage.setItem("matrixSmej", json);
    }

    upgradeStoreRotation() {
        let Rotation = JSON.stringify(this.Rotation);
        sessionStorage.setItem("Rotation", Rotation);
    }

    upgradeStore() {
        let json = JSON.stringify(this.idGraph);
        sessionStorage.setItem("graph", json);
    }

    upgradeSizeZon() {
        let json = JSON.stringify(this.sizeZon);
        sessionStorage.setItem("sizeZon", json);
    }

    upgradeAuth(state: boolean, obj:{}){
        const Auth = JSON.stringify(state)
        sessionStorage.setItem('Auth', Auth);
        const user = JSON.stringify(obj)
        sessionStorage.setItem('user', user);
    }

    upgradePlan() {
        let json = JSON.stringify(this.plan);
        sessionStorage.setItem("plan", json);
    }
    upgradePlanActive() {
        let json = JSON.stringify(this.stock_active);
        sessionStorage.setItem("stock_active", json);
    }

    setRotation(idA: number, idB: number, long: number, rotade: number, centerX: number, centerY: number) {
        if (this.Rotation.length !== 0) {
            console.log("Объекты есть в сторе, поиск объекта")
            for (let i = 0; i < this.Rotation.length; i++) {
                if (this.Rotation[i].idA === idA && this.Rotation[i].idB === idB) {
                    this.Rotation[i].long = long;
                    this.Rotation[i].rotations = rotade;
                    this.Rotation[i].centerX = centerX;
                    this.Rotation[i].centerY = centerY;
                    console.log(this.Rotation[i])
                    console.log("Найден и изменен")
                    return
                }
                if (this.Rotation.length - 1 === i) {
                    const obj = {
                        idA: idA,
                        idB: idB,
                        centerX: centerX,
                        centerY: centerY,
                        long: long,
                        rotations: rotade
                    }
                    this.Rotation.push(obj)
                    // console.log(this.idGraph[idA].rotation)
                    console.log("не найден и создан")

                    return
                }
            }
        } else {
            console.log("Объекта нет в сторе, будет создан")
            const obj = {
                idA: idA,
                idB: idB,
                centerX: centerX,
                centerY: centerY,
                long: long,
                rotations: rotade
            }
            this.Rotation.push(obj)
            // console.log(this.idGraph);
            // console.log(this.idGraph[idA]);
            return
        }

        console.log("Ошибка в условиях")
        // const obj = {
        //             idB: idB,
        //             long: long,
        //             rotations: rotade
        //         }
        // this.idGraph[idA].rotation.push(obj)
        // this.idGraph[idA].rotation.push(obj)
    }

    setGraph(idGraph: Graph[]) {
        this.idGraph = idGraph;
    }

    setMatrix(matrixsmesh: number[][]) {
        this.matrixsmesh = matrixsmesh;
    }

    async set_Rotation(rotation: Rotation[]) {
        this.Rotation = rotation;
        console.log(rotation)
        this.upgradeStoreRotation();
    }

    setUser(user: IUser) {
        this.user = user;
    }

    setA(a: number) {
        this.a = a;
    }

    setB(b: number) {
        this.b = b;
    }

    // setIGraph(arr: Graph[]) {
    //     this.arr.push(arr);
    // }

    setMass_putei(mass_putei: (boolean | number)[][]) {
        this.mass_putei = mass_putei;
    }

    setMass_putei_exit(setMass_putei_exit) {
        this.mass_putei_exit.push(setMass_putei_exit);
    }

    setMessages(message: string) {
        this.messages = message;
    }

    setIsLoading(bool: boolean) {
        this.isLoading = bool;
    }


    async update() {
        if (sessionStorage.getItem("graph")) {
            const mass = JSON.parse(sessionStorage.getItem("graph"))
            this.setGraph(mass)
        }
        if (sessionStorage.getItem("matrixSmej")) {
            const mass_smej = JSON.parse(sessionStorage.getItem("matrixSmej"))
            this.setMatrix(mass_smej)
        }
        if (sessionStorage.getItem("Rotation")) {
            const Rotation = JSON.parse(sessionStorage.getItem("Rotation"))
            this.set_Rotation(Rotation)
        }
        if (sessionStorage.getItem("Auth")) {
            const Auth = JSON.parse(sessionStorage.getItem("Auth"))
            this.setAuth(Auth);
            console.log(Auth)
        }
        if (sessionStorage.getItem("user")) {
            const user = JSON.parse(sessionStorage.getItem("user"))
            this.setUser(user)
        }
        if (sessionStorage.getItem("sizeZon")) {
            const sizeZon = JSON.parse(sessionStorage.getItem("sizeZon"))
            this.setRead(sizeZon, 0, 'update')
        }
        if (sessionStorage.getItem("plan")) {
            const plan = JSON.parse(sessionStorage.getItem("plan"))
            this.setPlan(plan)
        }
        if (sessionStorage.getItem("stock_active")) {
            const stock_active = JSON.parse(sessionStorage.getItem("stock_active"))
            this.setStockActive(stock_active)
        }
    }


    async login(email: string, password: string) {
        try {
            console.log(email)
            let roles;
            if(email === 'veremeenko_2001@bk.ru'){
                roles = 'storekeeper'
            }
            else{
                roles = 'Warehouse_Manager'
            }
            const obj = {
                email: email,
                id: 'default',
                username: 'default',
                name: 'default',
                role: roles
            }
            // const response = await AuthService.login(email, password);
            // console.log(response);
            // localStorage.setItem('token', response.data.accessToken);
            this.setAuth(true);
            this.setUser(obj);
            this.upgradeAuth(true, obj);
            console.log(this)
        } catch (e) {
            console.log(e.response?.data?.message);
            this.setMessages(e.response?.data?.message);
        }
    }

   async logoutE(){
       try {
           this.setAuth(false);
           this.setUser(undefined);
           this.upgradeAuth(false, this.user);

       }
       catch (next){
           console.log(next)
       }
    }

    addMatrixEl() {
        const matrixSmej = this.matrixsmesh

        let i = this.matrixsmesh.length;
        matrixSmej[i] = []
        for (let j = 0; j < this.idGraph.length; j++) {
            if (i === j) {
                matrixSmej[i][j] = 0
            } else {
                matrixSmej[i][j] = 99999
                matrixSmej[j][i] = 99999
            }
        }

        this.setMatrix(matrixSmej);
        this.upgradeStoreMatrix()
    }

    addGraph(OX: number, OY: number, num: number) {
        try {
            let obj = []
            if (sessionStorage.getItem("graph")) {
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

    editGraph(obj) {
        try {
            console.log(obj, +"SSSSSSSSSSSSSSSSSS")
            // arr.push(obj)

            for (let i = 0; i < obj.length; i++) {
                this.setEditEl(obj[i].id, obj[i].X, obj[i].Y)
            }
            // this.setIGraph([obj])
            let json = JSON.stringify(this.idGraph);
            sessionStorage.setItem("graph", json);
        } catch (e) {
            console.log("!!!!!!!!!!!");

        }
        console.log(this.matrixsmesh.length)
    }

    matrixSme() {
        if (this.matrixsmesh.length === 0) {
            console.log(this.idGraph.length)
            const matrixSmej = []
            for (let i = 0; i < this.idGraph.length; i++) {
                matrixSmej[i] = []
                for (let j = 0; j < this.idGraph.length; j++) {
                    if (i === j) {
                        matrixSmej[i][j] = 0
                    } else {
                        matrixSmej[i][j] = 99999
                    }
                }
            }
            this.setMatrix(matrixSmej);

            console.log(this.matrixsmesh)
        }

    }

    async matrixSmejUsel(G1, G2, ves) {
        let a, b;
        let ass = true;
        let ass2 = true;
        if (!this.idGraph[0]?.num) {
            alert("Массив точек пуст");
            return
        }

        for (let i = 0; i < this.idGraph?.length; i++) {

            console.log(this.idGraph[i]?.num, "--", G1, "--", G2)
            if (this.idGraph[i]?.num === (G1)) {
                ass = false
            }
            if (this.idGraph[i]?.num === (G2)) {
                ass2 = false
            }
        }

        if (ass) {
            alert("Введено имя не существующего узла 1");
            return
        }
        if (ass2) {
            alert("Введено имя не существующего узла 2");
            return
        }

        console.log(ves)
        if (!ves) {
            alert("Введено некорректное значение");
            return
        }

        if (ves < 0) {
            alert("Введено некорректное значение");
            return
        }

        if (this.idGraph.length !== this.matrixsmesh.length) {
            await this.matrixSme();
        }

        for (let i = 0; i < this.idGraph.length; i++) {
            if (this.idGraph[i].num === G1) {
                a = i;
            }
            if (this.idGraph[i].num === G2) {
                b = i;
            }
        }

        const matrixSmej = []
        for (let i = 0; i < this.idGraph.length; i++) {
            matrixSmej[i] = []
            for (let j = 0; j < this.idGraph.length; j++) {
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


    search(A1, A2, name_route) {
        let mass: (boolean | number) [][] = []
        let a, b;
        let PutNaiden = false;


        //ПОИСК ID A1 и A2
        for (let i = 0; i < this.idGraph.length; i++) {
            if (this.idGraph[i].num === A1) {
                a = i;
            }
            if (this.idGraph[i].num === A2) {
                b = i;
            }
        }

        let search_flag = a;
        let mass_arr = []

        //Заполнение массива для расчетов
        for (let i = 0; i < this.idGraph.length; i++) {

            if (i === a) {
                mass.push([0, null, true])

            } else {
                mass.push([9999, null, false])


            }

        }
        console.log(mass)
        console.log(this.matrixsmesh)
        //Поиск наименьших значений

        while (!PutNaiden) {
            if (!PutNaiden) {
                for (let j = 0; j < this.idGraph.length; j++) {

                    if (mass[j][0] >= this.matrixsmesh[search_flag][j] + mass[search_flag][0] && this.matrixsmesh[search_flag][j] !== 0 && !mass[j][2]) {

                        mass[j][0] = this.matrixsmesh[search_flag][j] + mass[search_flag][0];
                        mass[j][1] = search_flag;

                    }
                    if (j === this.idGraph.length - 1) {
                        const min_el = this.minEl(mass)
                        mass[min_el][2] = true;
                        search_flag = min_el;


                        if (min_el === b) {

                            console.log(mass);
                            // this.setMass_putei(mass_arr);

                            PutNaiden = true;
                            if (PutNaiden) {
                                let search: (number | boolean) = mass[b][1];
                                let arr_mass_exit = [b];

                                while (arr_mass_exit[arr_mass_exit.length - 1] !== a) {
                                    arr_mass_exit.push(search);
                                    const ass = Number(search)
                                    console.log(ass)
                                    search = Number(mass[ass][1]);
                                }
                                let id
                                if(this.mass_putei_exit.length===0){
                                    id = 0;
                                }
                                else {
                                    id = this.mass_putei_exit[this.mass_putei_exit.length - 1].id + 1;
                                }

                                const route = {
                                    id: id,
                                    name: name_route,
                                    A: a,
                                    B: b,
                                    interval_node: arr_mass_exit.reverse(),
                                    long: this.mass_putei[b][0]
                                }
                                this.setMass_putei_exit(route)

                                // this.setMass_putei_exit(arr_mass_exit.reverse())

                                this.setA(a);
                                this.setB(b);
                                console.log(arr_mass_exit)
                                console.log(this.mass_putei_exit)
                            }
                        }
                    }
                }
            }
        }
        console.log(mass)
    }

    // Поиск наименьшего значения
    minEl(mass: (boolean | number) [][]) {

        var min: number | boolean = 999999999
        var X = 0
        // if(mass[3][0] == 24){
        //     console.log("AAAAAAAAAAAAAAAA")
        // }
        this.setMass_putei(mass);
        // console.log(mass[3][0]);
        for (let i = 0; i < this.idGraph.length; i++) {
            if (mass[i][0] < min && !mass[i][2]) {
                min = mass[i][0]
                X = i;
            }
        }

        console.log(this.mass_putei);
        return X
    }


    solutions(G1, G2) {

        let aSearc = G1, bSearc = G2;

        // for (let i = 0; i < this.idGraph.length; i++) {
        //     if (this.idGraph[i].num == G1) {
        //         aSearc = i;
        //     }
        //     if (this.idGraph[i].num == G2) {
        //         bSearc = i;
        //     }
        // }
        const x1 = this.idGraph[aSearc].X;
        const y1 = this.idGraph[aSearc].Y;
        const x2 = this.idGraph[bSearc].X;
        const y2 = this.idGraph[bSearc].Y;

        const katet1 = x1 - x2;
        const katet2 = y1 - y2;

        const long = Math.round(Math.sqrt(Math.pow(katet1, 2) + Math.pow(katet2, 2)))
        const deg = (180 / Math.PI * Math.atan2(katet2, katet1)) + 180;
        const centerX = ((x1 + x2) / 2) - (long / 2) + (25 / 2)
        const centerY = ((y1 + y2) / 2)
        this.setRotation(aSearc, bSearc, long, deg, centerX, centerY)
        console.log(this.Rotation)


        // console.log(this.idGraph[aSearc].rotation.length)
    }

    matrixAndZone() {
        console.log("J<")
        this.Rotation = [];
        for (let i = 0; i < this.matrixsmesh.length; i++) {
            for (let j = 0; j < i; j++) {
                if (this.matrixsmesh[i][j] < 9999) {
                    console.log(this.matrixsmesh[i][j], "AAAAAAAAAAAA")
                    this.solutions(i, j);
                }
            }
        }
        console.log(this.Rotation)
        this.upgradeStoreRotation();
    }

    dellGraph(G) {
        for (let i = 0; i < this.idGraph.length; i++) {
            if (this.idGraph[i].num === G) {
                G = i;
                break;
            }
        }
        // const Rotation = Object.assign([], this.Rotation);
        // for(let i = 0; i < Rotation.length; i++){
        //     if(Rotation[i].idA === G || Rotation[i].idB === G){
        //         this.Rotation.splice(i)
        //         console.log("EEE")
        //     }
        //
        // }
        // this.upgradeStoreRotation();

        this.idGraph.splice(G, 1);
        this.matrixsmesh.splice(G, 1);
        for(let i = 0; i < this.matrixsmesh.length; i++){
            this.matrixsmesh[i].splice(G, 1)
        }

        console.log(this.Rotation)

        this.upgradeStore();
        this.upgradeStoreMatrix();
        this.matrixAndZone();

        console.log("store END DELL - ", this.idGraph, this.Rotation)

    }

}