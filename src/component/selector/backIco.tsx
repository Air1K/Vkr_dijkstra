import React from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faChevronLeft} from "@fortawesome/free-solid-svg-icons";
import styless from '../../app.module.sass'
import {Link} from "react-router-dom";

const BackIco = () => {
    return (
        <div className={styless.container}>
            <Link className={styless.a_ico} to = "/main">
                <FontAwesomeIcon className={styless.ico} icon={faChevronLeft} />
            </Link>
        </div>
    );
};

export default BackIco;