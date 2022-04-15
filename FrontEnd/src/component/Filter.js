import React, { Component } from 'react'
import '../css/Filter.css'
import breakfast from '../assets/breakfast.png'
import NavBar from './NavBar'
import { Link } from 'react-router-dom'




export default class Filter extends Component {

    constructor(props){
        
        super(props);
        this.state = {
            "restaurant":[],
            "city_name":"",
            "mealType":[],
            "cuisine":[],
            "lcost":'',
            "hcost":'',
            "sort":1,
            "pageCount":0,
            "pagination":[],
            "loc":[],
            "setAClass":'pageNo',
            "setClass":(event)=>{
                for(let i=0;i<this.state.pagination.length;i++) {
                    document.getElementById(i+1).className='pageNo';
                }
                event.target.className = 'currentPageNo'
                this.fetchData(this.state,event.target.id)
                
            }
        }               
    }

    fetchMealType = (mealType)=>{
        this.state.mealType.push(mealType.toLowerCase())
        this.setState({...this.state})
        this.fetchData(this.state,1)
    }

    fetchData = (s,pg)=>{
        fetch(`http://localhost:8900/filter/${pg}`,
        {
            method:"POST",
            headers:{'content-type':'application/json'},
            body:JSON.stringify(s)
        })
        .then(response=>response.json())
        .then(data=>{this.setState({restaurant:data.restaurant,pageCount:data.pageCount});}) 
    }
    
    handleLocationChange = (event)=>{
            this.state.city_name = event.target.value
            console.log(event.target);
            this.setState({...this.state})
            this.fetchData(this.state,1)
        
    }
    handleCuisineChange = (event)=>{
        if(event.target.checked){
            this.state.cuisine.push(event.target.name)
            
        }
        else{
            let index = this.state.cuisine.indexOf(event.target.name)
            if(index > -1)
                this.state.cuisine.splice(index,1)
        }
        this.setState({...this.state})
        this.fetchData(this.state,1)
       
    }
    handleCostChange = (lcost,hcost)=>{
        this.state.lcost = lcost
        this.state.hcost = hcost
        this.setState({...this.state})
        this.fetchData(this.state,1)
        
    }
    handleSort = (sort)=>{
        this.state.sort = sort
        this.setState({...this.state})
        this.fetchData(this.state,1)
    }
    handleNext=()=>{
        let x = document.getElementsByClassName('currentPageNo')
        let arr = [...x]
        let id = parseInt(arr[0].id)+1
        if(document.getElementById(String(id))!==null)
            document.getElementById(String(id)).click()        
    }
    handlePrevious=()=>{
        let x = document.getElementsByClassName('currentPageNo')
        let arr = [...x]
        let id = parseInt(arr[0].id)-1
        if(document.getElementById(String(id))!==null)
            document.getElementById(String(id)).click()        
    }


    static getDerivedStateFromProps(props,state){
        let pageCount = state.pageCount
        let page = [];
        if(pageCount > 0){
            for(let i=0;i<pageCount;i++)
                page.push(<a href="#" id = {i+1} className={i+1==1?"currentPageNo":state.setAClass} key={i+1} onClick={(e)=>{state.setClass(e)}}>{i+1}</a>)
            return{
                pagination : page
            }
        }
        return {
            pagination:[]
        }

    }

    componentDidMount(){
        fetch("http://localhost:8900/city",{method:"GET"})
        .then(response=>response.json())
        .then(data=>{
            let s = new Set(data.city.map((item)=>item.city_name))
            let city = []
            s.forEach((item)=>city.push(item))
            this.setState({loc:city})
        })
        this.fetchMealType(this.props.mealType);
    }
    





  render() {
    let { mealType } = this.props;
    return (
      <div>
            <NavBar />

                {/* <!-- Heading --> */}
            <div className="heading">
                <h1>{`${mealType} Places in Delhi`}</h1>
            </div>

            {/* <!-- Filter Section --> */}
            <div className="filterBox">
                <div className="filterSort">

                    {/* <!-- Heading --> */}
                    <span>Filters</span>

                    {/* <!-- 1st Sub Heading --> */}
                    <span className="optionHead">Select Location</span>

                    {/* <!-- Select Location --> */}
                    <span className="optionHead">
                        <select  onChange={(e)=>this.handleLocationChange(e)}>
                            {this.state.loc.length && this.state.loc.map((item)=>
                                        <option key={item} value={item}>{item}</option>
                                    
                                        )
                            }
                        </select>
                    </span>

                    {/* <!-- 2nd Sub Heading --> */}
                    <span className="optionHead">Cuisine</span>

                    {/* <!-- Cuisine Options Custom CheckBoxes --> */}
                    <label className="main">
                        <input type="checkbox" name="North Indian" onChange={(e)=>this.handleCuisineChange(e)} />North Indian
                        <span className="geekmark"></span>
                    </label>
                    <label className="main">
                        <input type="checkbox" name="South Indian" onChange={(e)=>this.handleCuisineChange(e)}/>South Indian
                        <span className="geekmark"></span>
                    </label>
                    <label className="main">
                        <input type="checkbox" name="Chinese" onChange={(e)=>this.handleCuisineChange(e)} />Chinese
                        <span className="geekmark"></span>
                    </label>
                    <label className="main">
                        <input type="checkbox" name="Fast Food" onChange={(e)=>this.handleCuisineChange(e)} />Fast Food
                        <span className="geekmark"></span>
                    </label>
                    <label className="main">
                        <input type="checkbox" name="Street Food" onChange={(e)=>this.handleCuisineChange(e)} />Street Food
                        <span className="geekmark"></span>
                    </label>

                    {/* <!-- 3rd Sub Heading --> */}
                    <span className="optionHead">Cost For Two</span>

                    {/* <!-- Custom Radio Buttons --> */}
                    <label className="mainR">
                        <input type="radio" name="price"  onChange={()=>this.handleCostChange(1,500)} />Less than ₹ 500
                        <span className="geekmarkR"></span>
                    </label>
                    <label className="mainR">
                        <input type="radio" name="price" onChange={()=>this.handleCostChange(500,1000)}/>₹ 500 to ₹ 1000
                        <span className="geekmarkR"></span>
                    </label>
                    <label className="mainR">
                        <input type="radio" name="price" onChange={()=>this.handleCostChange(1000,1500)}/>₹ 1000 to ₹1500
                        <span className="geekmarkR"></span>
                    </label>
                    <label className="mainR">
                        <input type="radio" name="price" onChange={()=>this.handleCostChange(1500,2000)}/>₹ 1500 to ₹ 2000
                        <span className="geekmarkR"></span>
                    </label>
                    <label className="mainR">
                        <input type="radio" name="price" onChange={()=>this.handleCostChange(2000,10000)}/>₹ 2000+
                        <span className="geekmarkR"></span>
                    </label>

                </div>

                <div className="filterSort">
                    <span>Sort</span>
                    <label className="mainR">
                        <input type="radio" name="sort" onChange={()=>this.handleSort(1)} />Price low to high
                        <span className="geekmarkR"></span>
                    </label>
                    <label className="mainR" >
                        <input type="radio" name="sort" onChange={()=>this.handleSort(-1)}/>Price high to low
                        <span className="geekmarkR"></span>
                    </label>
                </div>
            </div>
    
            {/* <!-- Item info Card --> */}
            {
                this.state.restaurant.length>0 ? this.state.restaurant.map((item)=> <Link to={`/details/${item.name}`} key={item.name}>
                                    <div className="itemCard" >
                <div style={{marginBottom: "30px"}}>
                    <span className="cardImage">
                        <img className="roundSqImg" src={item.thumb} alt="Idlee Sambhar" />
                    </span>
                    <span className="itemInfo">
                        {item.name} <br />
                        <span className="itemInfoSmall">{item.city_name}</span> <br />
                        <span className="address">
                            {item.locality}
                        </span>
                    </span>   
                    <br /> 
                </div>
                <hr style={{color: "gray"}} />
                <div style={{margin: "20px"}}>
                    <span className="cuisine">
                        CUISINE : <br /> <br /> 
                        COST FOR TWO :
                    </span>
                    <span className="cuisineInfo">
                        {item.Cuisine.map((item)=><span key={item.name}>&#9679; {item.name} </span>)} <br /> <br />
                        ₹ {item.cost}
                    </span>
                </div>
            </div>
                </Link>
                
                ):<div>No Data Found</div>
            }

            {/* Page Count */}
            <div className="pages">
                <center>
                    <a href="#" className="pageNo" onClick={()=>{this.handlePrevious()}}>&#8249;</a>
                    {/* <a href="#" className="currentPageNo">1</a> */}
                    {this.state.pagination}
                    <a href="#" className="pageNo" onClick={()=>{this.handleNext()}}>&#8250;</a>
                </center>    
            </div>
      </div>
    )
  }
}
