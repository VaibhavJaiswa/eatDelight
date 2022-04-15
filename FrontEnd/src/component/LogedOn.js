import React,{useState} from 'react'
import { useCookies } from 'react-cookie'

export default function LogedOn() {
    const [cookies, setCookie] = useCookies(['user']);
    const [user,setUser] = useState("")
    const handleLogout = (event)=>{
         setUser("Logout")
         console.log("Xyzz",user)
    }
  return (
    <div>
       <div className="menu">
        <a href="#" className="menuItem" >{user}</a>
        <form>
        <button className="btn btn-primary" onClick={(e)=>{handleLogout(e)}} >Logout</button>
        </form>
        
      </div>
    </div>
  )
}
