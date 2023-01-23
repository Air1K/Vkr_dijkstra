import { motion } from 'framer-motion';
import {Link} from "react-router-dom";
import React from 'react';


const Buttion1 = (props) => {
    return (
        <motion.div
            style = {{
                height: "50px",
                borderRadius: "30px",
                backgroundColor: "#6de0a3",
                cursor: "pointer"
            }}
            className="box"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
            {/*<Link to={}/>*/}
            <div>{props.name}</div>
        </motion.div>
    );
};

export default Buttion1;