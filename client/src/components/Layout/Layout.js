import React from 'react'
import { Outlet } from 'react-router-dom'

const Layout = (props) => {
  return (
    <div>
         <div>
                <h2>{props.name ? <Outlet/> : "Login please"}</h2>
            </div>
    </div>
  )
}

export default Layout