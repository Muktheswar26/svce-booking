import React from 'react'
import { getAuth, signOut } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";

function Home(props) {
    const navigate = useNavigate();

    const handleSignOut = () => {
        const auth = getAuth();
        signOut(auth).then(() => {
            console.log("Logout Done!!!")
            navigate("/");
        }).catch((error) => {
            console.error("Unable to logout")
        });
       


    }
    console.log(props.name)
    return (
        <>
            <div>
                <h2>{props.name ? `Welcome - ${props.name}` : "Login please"}</h2>
            </div>
            <h1>
                <Link onClick={handleSignOut}>SignOut</Link>
            </h1>

        </>
    )
}

export default Home