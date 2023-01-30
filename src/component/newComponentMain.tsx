import React, {useContext} from 'react';
import {Navigate} from "react-router-dom";
import {Context} from "../index";

const NewComponentMain = () => {
    const {store} = useContext(Context);
    return (
        <div>
            {store.isAuth ? (<Navigate to={'/main'} />):(<Navigate to={'/authorization'} />)}
        </div>

    );
};

export default NewComponentMain;
