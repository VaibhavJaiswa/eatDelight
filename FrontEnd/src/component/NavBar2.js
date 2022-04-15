import FacebookLogin  from 'react-facebook-login'
import GoogleLoginComponent from './GoogleLoginComponent'
import React, {useState,useEffect} from 'react'
import Modal from 'react-modal'
import { Link } from 'react-router-dom'
// import Login from '../component/Login'
import CreateAccount from './CreateAccount'
import { useCookies } from 'react-cookie'
import { useNavigate } from 'react-router-dom'
import LogedOn from './LogedOn'

export default function() {
    const [loginStatus,setLoginStatus] = useState("")
    const [fbName,setFbName] = useState("")
    const [userName,setUserName] = useState()
    const [pass,setPass] = useState()
    const [cookies, setCookie] = useCookies(['user']);
    const [isModelShown,setModelShown] = useState(false)
    const [flag,setFlag] = useState("")
    const [user,setUser] = useState(cookies.Name)
    const navigate = useNavigate()
    const responseFacebook = (response) => {
        let n = response.name.split(' ')
        setCookie('LogedIn','true',{path:'/'})
        setCookie('Name',n[0],{path:'/'})
        setFbName(response.name)
        setModelShown(false)
        navigate('/')
        
    }

    const handleUserName = (event)=>{
        setUserName(event.target.value)
    }
    const handlePass = (event)=>{
        setPass(event.target.value)
    }
    const handleLogin = (event)=>{
        
        const authData = {
            "email":userName,
            "password":pass
        }
        fetch(`http://localhost:8900/authUser`,
        {
            method:"POST",
            headers:{'content-type':'application/json'},
            body:JSON.stringify(authData)
        })
      .then(response=>response.json())
      .then(data=>{
            if(data.details.length!=0)
            {
                console.log(data.details.name)
                setCookie('UserName',userName,{path:'/'})
                setCookie('Pass',pass,{path:'/'})
                setCookie('LogedIn','true',{path:'/'})
                setCookie('Name',data.details.name,{path:'/'})
                
            } else{
                setLoginStatus("Username or password is wrong")
                event.preventDefault()
            } 
        }) 
    }
    const customStyles = { content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
      },
    };
    const handle = ()=>{
        console.log("Printeddddddddd")
        isModelShown(false)
    }
    const handleLogIn = ()=>{
        setFlag("login");
        setModelShown(true)
    }
    const handleLogout = (event)=>{
        setCookie('LogedIn','false',{path:'/'})
        navigate('/')

    }
    
  return (

    <div>
        {/* <!-- Navigation Bar --> */}
        <div style={{height: "60px",width: "100%"}}>
            <div >
                {/* <!-- Logo --> */}                
                {/* <!-- Menu Items --> */}

                {cookies.LogedIn=='true'?
                //user name and logout btn
                <div className="menu" style={{paddingTop: "0px",display:"flex",flexWrap: "nowrap"}}>
                    <div className="shape" style={{height:"60px",width:"60px"}}>
                        <span className="e">e!</span>
                    </div>
                    <span style={{marginTop:"0px",marginLeft:"0px",
                                        paddingTop:"16px",paddingBottom:"16px",
                                        paddingLeft:"0px", display:"inline-block"}} className="menuItem" onClick={(event)=>{event.preventDefault();setModelShown(true);setFlag("login")}}>{user}</span>
                    <div className='m-3'><button type="submit"className="btn btn-outline-warning btn-sm" onClick={(e)=>{handleLogout(e)}} >Logout</button></div>
                    
                </div> :
                //login and create account link
                <div className="menu">
                   <a href="#" className="menuItem" onClick={(event)=>{handleLogIn()}}>Login</a>
                   <a href="#" className="menuItem borderAccount" onClick={(e)=>{setFlag("createAccount");setModelShown(true);}}>Create Account</a>
                </div>                
             }

                <Modal 
                   isOpen = {isModelShown}
                   style={customStyles}
                   appElement={document.getElementById('root') || undefined}
                   >
                    <div>
                            
                        {flag=="login"?<span className="h4">Login</span>:flag=="createAccount"?<span className="h4">Sign Up</span>:""}
                        <button style={{marginLeft:"200px"}}onClick={()=>setModelShown(false)} className="btn-danger" ><i className="fa fa-close"></i></button> 
                    </div>
                    {flag=="login"?                    <div>
                        <div className="container">
                        <h5 className='text-danger mt-5'>{loginStatus}</h5>
                        <div style={{marginTop:"30px"}}>
        <form onSubmit={(e)=>handleLogin(e)}>
            <div className="form-group">
                <label htmlFor="exampleInputEmail1">Username</label>
                <input type="email" className="form-control" onChange={(e)=>handleUserName(e)} id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Use email as username"></input>
            </div>
            <div className="form-group">
                <label htmlFor="exampleInputPassword1">Password</label>
                <input type="password" className="form-control" onChange={(e)=>handlePass(e)} id="exampleInputPassword1" placeholder="Password"></input>
            </div>
            <div className="form-check">
                <input type="checkbox" className="form-check-input" id="exampleCheck1"></input>
            </div>
            <button type="submit" className="btn btn-primary">Login</button>
        </form>
        <div className='container'>
            <center>
                <div>
                    <div className="row mt-3">
                        <div className="col-md-12">
                            <FacebookLogin
                                appId="989344638664392"
                                autoLoad={false}
                                size="small"
                                onFailure={()=>{console.log("Lllogin Failed...");alert("Login Failed")}}
                                fields="name,email,picture"
                                textButton='  Continue with Facebook'
                                cssClass='btn btn-outline-primary btn-block fbBtn'
                                icon="fa-facebook"
                                callback={responseFacebook} 
                            />
                        </div>
                    </div>
                    <GoogleLoginComponent/>    
                    <div className='container border-top border-secondary mt-4 p-3'>
                        <p>Don't have an accoun? <span className="text-danger">Sign Up</span></p>
                    </div>
                </div>
            </center>
        </div>
    </div>
                        </div>
                    </div>:flag=="createAccount"?<CreateAccount />:""}
                    </Modal>    

            </div>
        </div>
    </div>
  )
}
