import React, { useState, useEffect, useRef } from "react";
import styles from "./Locker.module.css";

const Locker = ({ pinCode, onUnlock }) => {
    const [secretCode, setSecretCode] = useState('');
    const secretCodeElementRef = useRef();

    useEffect(() => {
        initilizeSecretCode();
    }, []);

    useEffect(() => {
        if (secretCode.length === pinCode.toString().length) {
            if(secretCode === pinCode.toString()) {
                onUnlock();
                setSecretCode('');
                initilizeSecretCode();
            } else {
                setSecretCode('');
                initilizeSecretCode();
            }
        }
    }, [secretCode]);

    const initilizeSecretCode = () => {
        secretCodeElementRef.current.innerHTML = '';
        let i = 0;
        while (i < pinCode.toString().length) {
            let node = document.createElement('DIV');
            node.className = styles.secretCodeDisplayEmpty;
            secretCodeElementRef.current.appendChild(node);
            i++;
        }
    }

    const keypadNumPressed = (e) => {
        setSecretCode(secretCode + e.target.value);

        let node = document.createElement('DIV');
        node.className = styles.secretCodeDisplayFill;
        secretCodeElementRef.current.replaceChild(node, secretCodeElementRef.current.childNodes[secretCode.length]);
    }

    const keypadDelPressed = () => {
        if (secretCode.length > 0) {
            let node = document.createElement('DIV');
            node.className = styles.secretCodeDisplayEmpty;
            secretCodeElementRef.current.replaceChild(node, secretCodeElementRef.current.childNodes[secretCode.length - 1]);

            setSecretCode(secretCode.slice(0, -1));
        }
    }

    return (
        <div className={styles.locker}>
            <div ref={secretCodeElementRef} className={styles.secretCode}/>
            <div className={styles.keypadRaw}>
                <button value="1" onClick={e => keypadNumPressed(e)} className={styles.keypad}>1</button>
                <button value="2" onClick={e => keypadNumPressed(e)} className={styles.keypad}>2</button>
                <button value="3" onClick={e => keypadNumPressed(e)} className={styles.keypad}>3</button>
            </div>
            <div className={styles.keypadRaw}>
                <button value="4" onClick={e => keypadNumPressed(e)} className={styles.keypad}>4</button>
                <button value="5" onClick={e => keypadNumPressed(e)} className={styles.keypad}>5</button>
                <button value="6" onClick={e => keypadNumPressed(e)} className={styles.keypad}>6</button>
            </div>
            <div className={styles.keypadRaw}>
                <button value="7" onClick={e => keypadNumPressed(e)} className={styles.keypad}>7</button>
                <button value="8" onClick={e => keypadNumPressed(e)} className={styles.keypad}>8</button>
                <button value="9" onClick={e => keypadNumPressed(e)} className={styles.keypad}>9</button>
            </div>
            <div className={styles.keypadRaw}>
                <button onClick={e => keypadDelPressed()} className={styles.keypad}>Del</button>
                <button value="0" onClick={e => keypadNumPressed(e)} className={styles.keypad}>0</button>
                <button className={styles.keypad}></button>
            </div>
        </div>
    )
};

export default Locker;
