import React, {useContext, useEffect, useState} from 'react';
import {Link, Navigate} from 'react-router-dom';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTriangleExclamation} from "@fortawesome/free-solid-svg-icons";
import {Context} from "../../index";
import {observer} from "mobx-react-lite";
import styles from './stuleAuth.module.sass'

const Authorization = () => {

    const {store} = useContext(Context);


    const [email, setEmail] = useState(``);
    const [password, setPassword] = useState(``);

    const [emailDirtu, setEmailDirtu] = useState(false)
    const [passwordDirtu, setPasswordDirtu] = useState(false)

    const [emailError, setEmailError] = useState('email не может быть пустым');
    const [passwordError, setPasswordError] = useState('пароль не может быть пустым')

    const emailHandler = (e) => {
        setEmail(e.target.value);
        const result = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        if (!result.test(String(e.target.value).toLowerCase())) {
            setEmailError("Некорректный email");
        } else {
            setEmailError('');
        }
    }

    const passwordHandler = (e) => {
        setPassword(e.target.value);
        console.log(password)

        const result = /^[a-zA-Z0-9!@#$%^&*]{6,16}$/;
        if (!result.test(String(e.target.value).toLowerCase())) {
            setPasswordError("Некорректный пароль");
        } else {
            setPasswordError('');
        }
    }

    const blurHandler = (e) => {

        switch (e.target.name) {
            case 'email':
                setEmailDirtu(true)
                break
            case 'password':
                setPasswordDirtu(true)
                break
        }
    }


    async function server() {



        if (!(emailError || passwordError)) {
            await store.login(email, password);

            console.log(store.isAuth);
        }

    }

    useEffect(() => {
        store.setMessages('');
    }, [])

    return (
        <section className={styles.main}>
            <div className={styles.app}>
                <div className={styles.content}>
                    <h6 className={styles.autorizItem}>Автоматизированная система "Складская логистика"</h6>
                    {/*<div className="logo_dov">*/}
                    {/*    /!*<img className="Logo_fon" src={require("../../../img-2/NO-NLfon.png")} alt=""/>*!/*/}
                    {/*    /!*<img className="Logo_bac" src={require("../../../img-2/NO-NLbac.png")} alt=""/>*!/*/}
                    {/*</div>*/}
                    <div className={styles.input_log_div}>
                        {(emailDirtu && emailError) &&
                            <div
                                style={{
                                    opacity: '0.8',
                                    fontSize: '16px',
                                    color: "red",
                                    position: "absolute",
                                    top: '85%'
                                }}>
                                <FontAwesomeIcon icon={faTriangleExclamation}/> {emailError}</div>}
                        <input onBlur={e => blurHandler(e)} onChange={e => emailHandler(e)} value={email}
                               className='input1'
                               type="text" name="email" id="email" placeholder="Email"/>
                    </div>
                    <div className={styles.input_log_div}>
                        {(passwordDirtu && passwordError) &&
                            <div
                                style={{
                                    opacity: '0.8',
                                    fontSize: '16px',
                                    color: "red",
                                    position: "absolute",
                                    top: '85%'
                                }}>
                                <FontAwesomeIcon icon={faTriangleExclamation}/> {passwordError}</div>}
                        <input onChange={e => passwordHandler(e)} onBlur={e => blurHandler(e)} className='input2'
                               type="Password" name="password" id="password" placeholder="Password"/>
                    </div>
                    <div className="conteiner_Log_reg">
                        <div className={styles.buttom_div}>
                            <Link to="/main" onClick={server} className="button8">Войти</Link>
                            <div className="passwordError" style={{color: 'red'}}>{store.messages}</div>
                        </div>
                        {/*<div className="bottom_registr">*/}
                        {/*    <span>Don’t have an account? </span>*/}
                        {/*    <Link to="Sign_up" className="register_">Sign Up</Link>*/}
                        {/*</div>*/}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default observer(Authorization);