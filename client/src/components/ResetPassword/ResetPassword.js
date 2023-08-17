
import React, { useState } from "react";

import styles from "./ResetPassword.module.css"

import InputControl from "../InputControl/InputControl";

import {  sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../firebase";
import { useNavigate } from 'react-router-dom';

function ResetPassword() {

    const navigate = useNavigate()

    const [values, setValues] = useState({
        email: ""
    });

    const [errorMsg, setErrorMsg] = useState("");
    const [submitButtonDisabled, setSubmitButtonDisabled] = useState(false);

    const handleSubmission = () => {
        if (!values.email) {
            setErrorMsg("Fill all fields");
            return;
        }
        setErrorMsg("");
        setSubmitButtonDisabled(true);
        sendPasswordResetEmail(auth, values.email)
            .then(async(res) => {
                alert("Check your gmail")
                navigate("/login")
            })
            .catch((err) => {
                setSubmitButtonDisabled(false);
                setErrorMsg(err.message+" this block coming");
            });

    };

    return (
        <div className={styles.container}>
            <div className={styles.innerBox}>
                <h1 className={styles.heading}>Login</h1>

                <InputControl
                    label="Email"
                    onChange={(event) =>
                        setValues((prev) => ({ ...prev, email: event.target.value }))
                    }
                    placeholder="Enter email address"
                />
                <div className={styles.footer}>
                    <b className={styles.error}>{errorMsg}</b>
                    <button disabled={submitButtonDisabled} onClick={handleSubmission}>
                        ResetPassword
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ResetPassword