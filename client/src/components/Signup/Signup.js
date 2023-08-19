import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";


import InputControl from "../InputControl/InputControl";
import { auth} from "../../firebase";
import styles from "./Signup.module.css";

function Signup() {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    usn:"",
    name: "",
    email: "",
    pass: "",
  });
  const [errorMsg, setErrorMsg] = useState("");
  const [submitButtonDisabled, setSubmitButtonDisabled] = useState(false);

  const addUserToData = async (userEmail,userName,userUsn)=>{
    const response = fetch(`https://svce-booking-default-rtdb.firebaseio.com/users/${userUsn}.json`,{
      method:"PUT",
      headers:{"Content-Type":"application/json"},
      body:JSON.stringify({userEmail:userEmail,userName:userName,booking:false,date:"not booked",slot:"not selected"})
    })  
    if(response){
      console.log("data added")
    }else{
      console.log("gone case")
    }
  };

  const handleSubmission = () => {
    if (!values.name || !values.email || !values.pass || !values.usn) {
      setErrorMsg("Fill all fields");
      return;
    }
    setErrorMsg("");

    setSubmitButtonDisabled(true);
    createUserWithEmailAndPassword(auth, values.email, values.pass)
      .then(async (res) => {
        setSubmitButtonDisabled(false);
        const user = res.user;
        await updateProfile(user, {
          photoURL:values.usn,
          displayName: values.name
          
        });
        addUserToData(values.email,values.name,values.usn)
        navigate("/");
      })
      .catch((err) => {
        setSubmitButtonDisabled(false);
        setErrorMsg(err.message);
      });
  };

  return (
    <div className={styles.container}>
      <div className={styles.innerBox}>
        <h1 className={styles.heading}>Signup</h1>

        <InputControl
          label="USN"
          placeholder="Enter your USN"
          onChange={(event) =>
            setValues((prev) => ({ ...prev, usn: event.target.value }))
          }
        />

        <InputControl
          label="Name"
          placeholder="Enter your name"
          onChange={(event) =>
            setValues((prev) => ({ ...prev, name: event.target.value }))
          }
        />
        <InputControl
          label="Email"
          placeholder="Enter email address"
          onChange={(event) =>
            setValues((prev) => ({ ...prev, email: event.target.value }))
          }
        />
        <InputControl
          label="Password"
          placeholder="Enter password"
          onChange={(event) =>
            setValues((prev) => ({ ...prev, pass: event.target.value }))
          }
        />

        <div className={styles.footer}>
          <b className={styles.error}>{errorMsg}</b>
          <button onClick={handleSubmission} disabled={submitButtonDisabled}>
            Signup
          </button>
          <p>
            Already have an account?{" "}
            <span>
              <Link to="/login">Login</Link>
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Signup;
