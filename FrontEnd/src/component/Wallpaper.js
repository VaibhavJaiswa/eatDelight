import React, { Component } from 'react'
import bg from '../assets/background.png'
import QuickSearchItem from './QuickSearchItem'
import { Link } from 'react-router-dom';
import NavBar2 from './NavBar2';

export default class Wallpaper extends Component {

    constructor(){
        super();
        
        this.state = {
            location:[],
            mealtype:[],
            restaurants:[]
        }
    }

    componentDidMount(){
        //calling API 
        fetch('http://localhost:8900/location/',{method:'GET'})
        .then(response=>response.json())
        .then(data=>this.setState({location:data.Location}))

        fetch('http://localhost:8900/mealtype/',{method:'GET'})
        .then(response=>response.json())
        .then(data=>this.setState({mealtype:data.mealtype}))
    }
    fetchRestaurants = (event)=>{
        
        fetch(`http://localhost:8900/location/byCityId/${event.target.value}`,{method:'GET'})
        .then(response=>response.json())
        .then(data=>this.setState({restaurants:data.city}))
    }

  render() {

    const quickSearchList = this.state.mealtype.length && this.state.mealtype.map((item)=><QuickSearchItem key={item.name} item={item}></QuickSearchItem>)
    let restaurantList = this.state.restaurants.length && <ul>
                        {this.state.restaurants.map((item)=>
                            <li key={item.name}><Link to={`details/${item.name}`}>{item.name}</Link></li>
                        )}
                        </ul>
    let locationOptions = this.state.location.length && this.state.location.map((item)=><option value={item.city_id} key={item.name}>{item.name}</option>)
    return (
        <div>  

            {/** Wallpaper code */}
            <div style={{position: "relative", display: "block"}}>
                <img src={bg} alt="" className = "bigimg" style={{display: "block"}} />
                <div className="container-fluid p-10 m-10 " 
                    style={{display: "inline-block", width: "100%", height: "400px", zIndex: "1"}}>
                    <center>
                    <NavBar2></NavBar2>          
                        <div className="logo mt-10 "style={{}}>e!</div>
                        <div className="heading1">
                            <h1>Find the best restaurants, cafés, and bars</h1>
                        </div>
                        <div className="row-1">
                            <div className="col-10 form-group">
                                <span style={{marginRight:"5px"}}>
                                    {/* <input type="text" placeholder="Please type a location" className="input1 form-control" /> */}
                                    <select  className="input1 form-control" onChange={this.fetchRestaurants}>
                                        <option value="0">Select Location</option>
                                        {locationOptions}
                                    </select>
                                </span>
                                <span className="input-group-addon " id="notebooks">
                                    <span className="add-on"><i className ="fa fa-search"></i></span>
                                    <input type="text" placeholder="Search for restaurants" className="input2 form-control" />
                                    {restaurantList=="0"?"":restaurantList}
                                </span>
                                
                            </div>
                        </div>
                    </center>
                </div>
            </div>
            {/** Quick Heading and Card code */}
            <div className="container-sm searches">
                <h2 className="fColor">Quick Searches</h2>
                <p className="tColor">Discover restaurants by type of meal</p>
                {/* Cards */}
                
                <div className="grid ">
                    {quickSearchList}
                </div>

            </div>
        </div>    
    )
  }
}
