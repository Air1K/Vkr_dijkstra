import React from 'react';
import styles from "./stylesMyModal.module.sass"
const MyModal = ({children, visible, setVisible}) => {
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

export default MyModal;