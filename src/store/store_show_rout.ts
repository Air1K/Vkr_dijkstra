import {makeAutoObservable} from "mobx";
import Store from "./store";


const store = new Store();


export default class Store_show_rout {
    test = 1

    constructor() {
        makeAutoObservable(this);
    }
    add(){
        console.log(store.idGraph)
    }
    show_route(){

    }
}