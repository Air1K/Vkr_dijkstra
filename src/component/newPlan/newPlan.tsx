import React from 'react';
import BackIco from "../backIco";
import BlokNewPlan from "./blokNewPlan/blokNewPlan";
import styles from "./stylesMyModal.module.sass"
const NewPlan = ({children, visible, setVisible}) => {
    // const visible = props.visible
    const rootClasses = [styles.myModal]
    if(visible){
        rootClasses.push(styles.active)
    }

    return (
        <div className={rootClasses.join(' ')}  onClick={()=>setVisible(false)}>
            <div className={styles.myModalContent} onClick={(e)=>{e.stopPropagation()}}>
                {children}
            </div>
        </div>
    );
};

export default NewPlan;