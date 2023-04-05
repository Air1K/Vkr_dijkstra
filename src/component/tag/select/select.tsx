import React, {useContext} from 'react';

import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import NativeSelect from '@mui/material/NativeSelect';
import {Context} from "../../../index";
const Selected = ({activeId, setActiveID, setActive}) => {
    const {store} = useContext(Context);



    return (
        <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
            <InputLabel id="demo-simple-select-standard-label">Маршрут</InputLabel>
            <Select
                labelId="demo-simple-select-standard-label"
                id="demo-simple-select-standard"
                onChange={(e)=>{if(e.target.value !== "none"){setActiveID(e.target.value); setActive(true)} else {setActive(false)}}}
                label="Имя пути"
            >
                <MenuItem value={"none"}>
                    <em>None</em>
                </MenuItem>
                {store.mass_putei_exit.map((route, index)=>
                    <MenuItem key={index} value={route.id}>{route.id}.&nbsp;{route.name}</MenuItem>
                )}
                {/*<MenuItem value={10}>Ten</MenuItem>*/}
                {/*<MenuItem value={20}>Twenty</MenuItem>*/}
                {/*<MenuItem value={30}>Thirty</MenuItem>*/}
            </Select>
        </FormControl>
    );
};

export default Selected;