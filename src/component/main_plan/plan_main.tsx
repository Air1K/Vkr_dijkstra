import React from 'react';
import BackIco from "../backIco";
import InputTochek from "../inputBlock/inputTochek";
import Area from "../area/area";
import Block from "../inputBlock/block";
import { motion } from 'framer-motion';
import Buttion1 from "../selector/buttion1/buttion1";


const PlanMain = () => {
    return (
        <div>
            <Buttion1 name = {"Создать план"}/>
            <BackIco/>
            <InputTochek/>
            <Area/>
            <Block/>

        </div>
    );
};

export default PlanMain;