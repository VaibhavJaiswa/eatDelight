import React,{useState} from 'react'
import { useCookies } from 'react-cookie'

export default function CreateAccount() {

  const [cookies, setCookie] = useCookies(['user']);
  let [name,setName] = useState("")
  let [email,setEmail] = useState("")
  let [password,setPassword] = useState("")
  const signUpStyle = {
    content: {
      width:"500px",
      height:"600px"
    },
  };
  const handleName = (event)=>{
    setName(event.target.value)
  }
  const handlePassword = (event)=>{
    setPassword(event.target.value)
  }
  const handleEmail = (event)=>{
    setEmail(event.target.value)
  }
  const handleSubmit = ()=>{
    const userData = {
        "name":name,
        "email":email,
        "password":password,
        "mob":"",
        "deliveryAddress":"",
        "loginThrough":"SELF",
        "profile":"SELF",
        "orders":[]   
    }
      fetch(`http://localhost:8900/userInfo`,
      {
          method:"POST",
          headers:{'content-type':'application/json'},
          body:JSON.stringify(userData)
      })
      .then(response=>response.json())
      .then(data=>{console.log("UserData",data)})
    setCookie('UserName',email,{path:'/'})
    setCookie('Pass',password,{path:'/'})
    setCookie('LogedIn','true',{path:'/'})
    setCookie('Name',name,{path:'/'})
  
  }

  return (
    <div style={signUpStyle} >
        <div className='m-5'>
        <div className="container">
      <div style={{marginTop:"30px"}}>
        <form name="signUp" onSubmit={()=>{handleSubmit()}}>
            <div className="form-group p-1">
                <label htmlFor="inputName">Name</label>
                <input type="text" className="form-control" id="inputName" onChange={(e)=>{handleName(e)}} placeholder="Name"></input>
            </div>
            <div className="form-group p-1">
                <label htmlFor="inputEmail">Email</label>
                <input type="email" className="form-control" id="inputEmail" onChange={(e)=>{handleEmail(e)}} placeholder="Email"></input>
            </div>
            <div className="form-group p-1">
                <label htmlFor="inputPassword">Password</label>
                <input type="password" className="form-control" id="inputPassword" onChange={(e)=>{handlePassword(e)}} placeholder="Password"></input>
            </div>
            <button type="submit" className="btn btn-primary mt-3">Sign Up</button>
        </form>

        </div>
    </div>
    </div>
    </div>
  )
}
