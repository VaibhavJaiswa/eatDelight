import React,{useEffect} from 'react'
import '../css/Nav.css'
import '../css/Add.css'
import {useState} from 'react'
import { useParams } from 'react-router-dom'
import NavBar from './NavBar'
import { useCookies } from 'react-cookie'
import Modal from 'react-modal'
import AfterPayNow from './AfterPayNow'



export default function RestaurantOverview() {
    const [cookies, setCookie] = useCookies(['user']);
    const {rName} = useParams()
    const [restaurant,setRestaurant] = useState({})
    const [myVar, setState] = useState(true)
    const [isModalShown,setIsModalShown] = useState(false)
    const [menu, setmenu] = useState([])
    const [total, setTotal] = useState(0)
    const [afterPayNow, setAfterPayNow] = useState(false)
    const modalStyles = { content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
      },
    };

    const openModal =(val)=>{
        setAfterPayNow(val);
        setIsModalShown(false);
    }
    const addItem = (r)=>{
        let price = total+r
        setTotal(price)
    }
    useEffect(
        ()=>{
            fetch(`http://localhost:8900/restaurantFilter/${rName}`,{method:'GET'})
            .then(response=>response.json())
            .then(data=>{
                console.log(data);
                setRestaurant(data.restaurantDetail);
                console.log(cookies.Pass,"Cookie-",cookies.Abc)})
        },[]
    )
        
    const fetchMenu = ()=>{
        fetch(`http://localhost:8900/menu`,{method:'GET'})
        .then(response=>response.json())
        .then(data=>{
            setmenu(data.details)
            console.log(data)
        })
    }
    const {thumb,name,address,cost,Cuisine} =restaurant
    const cuisineList = (Cuisine!=undefined) && Cuisine.length && Cuisine.map((item)=><li key={item.name}>{item.name} </li>)
    const [styleOverview,setStyleOverview] = useState({borderBottom: "5px solid rgb(199, 180, 9)",fontWeight: "bold"})
    const [styleContact,setStyleContact] = useState({})
    
  return (
    <div>
        {/* NavBar */}
        <NavBar />
        <div className="recBox shadow">
            {/* Restaurant Image */}
            <div className="wallpaperImg">
                <img src={thumb} alt="" />
                <button className="btn btn-light btn-sm galleryBtn" >Click to see Image Gallery</button>
            </div>
            <div style={{position:"relative",marginLeft:"10px",marginRight:"10px"}}>
                {/* Restaurant Name */}
                <h2 style={{marginTop: "20px"}}>{name}</h2>
                <div className="detailsTab">
                    {/* Overview Tab */}
                    <span className="detailsSpan" style={styleOverview} onClick={()=>{
                        setState(<div>
                            <h4 style={{marginTop: "20px"}}>About this place</h4>
                            <h5 style={{marginTop: "30px"}}>Cuisine</h5>
                            <ul>{cuisineList}</ul>
                            <h5 style={{marginTop: "10px"}}>Average Cost</h5>
                            <p>&#8377;{cost} for two people (approx.)</p>        
                        </div>)
                        setStyleOverview({borderBottom: "5px solid rgb(199, 180, 9)",fontWeight: "bold"})
                        setStyleContact({})
                    }}>Overview</span>
                    {/* Contact Tab */}
                    <span className="detailsSpan" style={styleContact} onClick={()=>{
                        setState(<div>
                            <h4 style={{marginTop: "20px"}}>Contact</h4>
                            <h5 style={{marginTop: "30px"}}>Phone Number</h5>
                            <p>+91 1234567890</p>
                            <h5 style={{marginTop: "10px"}}>Address</h5>
                            <p>{address}</p>        
                        </div>)
                        setStyleOverview({})
                        setStyleContact({borderBottom: "5px solid rgb(199, 180, 9)",fontWeight: "bold"})
                    }}>Contacts</span>

                    {/* Place Online Order Button */}
                    <button 
                        className='btn btn-danger btn-sm ' 
                        style={{position:'absolute',top:'50px',right:'20px'}}
                        onClick={()=>{fetchMenu();setAfterPayNow(false);setIsModalShown(true);}}>Place Online Order</button>
                    
                </div>
                
                {/* Overview and Contacts Data shown here */}
                <div id="data">                   
                    {myVar===true ? <div>
                        <h4 style={{marginTop: "20px"}}>About this place</h4>
                        <h5 style={{marginTop: "30px"}}>Cuisine</h5>
                        <ul>{cuisineList}</ul>
                        <h5 style={{marginTop: "10px"}}>Average Cost</h5>
                        <p>&#8377;{restaurant.cost} for two people (approx.)</p>        
                    </div> : myVar                    }
                </div>
            </div>      
        </div>
        {afterPayNow==false?<Modal 
            isOpen = {isModalShown}
            style={modalStyles}
            appElement={document.getElementById('root') || undefined}
        >
            <div>
                <div>                                
                    <span className="h4">{name}</span>
                    <button 
                        style={{position:'absolute',right:'25px',top:'20px'}}
                        onClick={()=>{setIsModalShown(false)}}
                        className="btn-danger" ><i className="fa fa-close"></i></button> 
                </div>
                <div className='mt-2' style={{margin:'0px',height:'500px',width:'300px',overflow:'auto'}} >
                    {/* Menu Items */}
                {menu.length && menu.map((item)=>
                <div className='border-bottom' key={item._id}>
                       { item.vegStatus==true ? <div className="m-2 border border-success" style={{display:'block',height:'20px',width:'20px'}}>
                        <div style={{display:'block',height:'10px',width:'10px'}} className="border bg-success rounded-circle m-1 "></div>
                    </div> : <div className="m-2 border border-danger" style={{display:'block',height:'20px',width:'20px'}}>
                        <div style={{display:'block',height:'10px',width:'10px'}} className="border bg-danger rounded-circle m-1 "></div>
                    </div>    }
    
                    <div >
                        <div style={{display:'inline-block', width:'70%', position:'relative'}}>
                            <h6>{item.itemName}</h6>
                            <h6>&#8377; {item.rate}</h6>
                            <p style={{fontSize:'14px', lineHeight:'normal'}}
                               className='text-justify'>{item.desc}</p>
                        </div>
                        <div id={item._id} style={
                            {
                                height:'100px',width:'30%',display:'inline-block',backgroundColor:'#192F60',
                                position:'relative'
                                
                            }}
                            className="rounded-2">
                            {/* Add menu Btn */}
                            <button className="rounded-2 add" onClick={(e)=>{
                                addItem(item.rate)}}>ADD</button>
                            
                            
                        </div>
                        
                    </div>
                </div>
                )}    
                    
                </div>
                <div style={{
                    width:'100%',height:'80px',paddingTop:'25px',bottom:'0px',
                    backgroundColor:'#F5F8FF',position:'relative'}}>
                        <h5 style={{display:'inline-block'}}>Total Price : &#8377;{total}</h5>
                        <button className='btn btn-danger' onClick={()=>{openModal(true)}} style={{position:'absolute',right:'0px'}}>Pay Now</button>
                    </div>
            </div>
        </Modal>:<AfterPayNow isOpen={true} restName={name} total={total}></AfterPayNow>}
        
    </div>
  )
}