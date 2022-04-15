import React,{useState} from 'react'
import Modal from 'react-modal' 


export default function AfterPayNow(props) {
    const [isModalShown,setIsModalShown] = useState(props.isOpen)
    
    const modalStyles = { content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
      },
    };
    const loadScript = (src)=>{
        return new Promise((resolve)=>{
            const script = document.createElement("script")
            script.src = src;
            script.onload = ()=>{
                resolve(true)
            };
            script.onerror = ()=>{
                resolve(false)
            };
            document.body.appendChild(script)
        })
    }
    const openRazorpay = async()=>{
        let data;
        data = await fetch('http://localhost:8900/pay',{
                            method:'POST',
                            headers:{'Content-Type':'application/json'},
                            body:JSON.stringify({amount:props.total})
                        }).then((t)=>t.json())
                        //console.log(props.total)

        const options={
            key:'rzp_test_A9qfCBXsRzXJZ6',
            amount:data.amount,
            currency:data.currency,
            name:'Zomato-Food Delivery',
            description:"Online Transaction",
            order_id:data.id,
            handler:function(response){
                var value={
                    razorpay_signature:response.razorpay_signature,
                    razorpay_order_id:response.razorpay_order_id,
                    transactionid:response.razorpay_payment_id,
                    transactionamount:data.amount
                }
                fetch('http://localhost:8900/pay/save',{
                    method:'POST',
                    headers:{'Content-Type':'application/json'},
                    body:JSON.stringify(value)
                }).then(response=>console.log(response)).catch(err=>console.log("Error",err))
            }
        }

        const paymentWindow = new window.Razorpay(options)
        paymentWindow.open()
    }
  return (
    <div>
        <Modal 
            isOpen = {isModalShown}
            style={modalStyles}
            appElement={document.getElementById('root') || undefined}
        >
            <div className='mt-2' style={{margin:'0px',height:'500px',width:'300px',overflow:'auto',position:'relative'}} >
                <div>
                    <div>                                
                        <span className="h4">{props.restName}</span>
                        <button 
                            style={{position:'absolute',right:'25px',top:'20px'}}
                            onClick={()=>{setIsModalShown(false)}}
                            className="btn-danger" 
                        >
                            <i className="fa fa-close"></i>
                        </button> 
                    </div>
                    <form >
                        <div className="form-group mt-4">
                            <label htmlFor="exampleInputEmail1">Name</label>
                            <input type="email" className="form-control" onChange={(e)=>{}} id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter your name"></input>
                        </div>
                        <div className="form-group mt-4">
                            <label htmlFor="exampleInputPassword1">Mobile</label>
                            <input type="password" className="form-control" onChange={(e)=>{}} id="exampleInputPassword1" placeholder="Enter mobile number"></input>
                        </div>
                        <div className="form-group mt-4">
                            <label htmlFor="exampleFormControlTextarea1" >Address</label>
                            <textarea className="form-control" placeholder='Enter your address' id="exampleFormControlTextarea1" rows="3"></textarea>            
                        </div>            
                    </form>

                    <div style={{
                        width:'100%',height:'80px',paddingTop:'25px',bottom:'0px',
                        backgroundColor:'#F5F8FF',position:'absolute'}}>

                            <button className='btn btn-danger' onClick={()=>{openRazorpay()}} style={{position:'absolute',left:'100px'}}>Proceed</button>
                    </div>
                </div>
            </div>
        </Modal> 
    </div>
  )
}
