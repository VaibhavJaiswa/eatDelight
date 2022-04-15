import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class QuickSearchItem extends Component {
    
  render() {
    const {name,content,image} = this.props.item
    return (
        <Link to={`/filter/${name}`}>
            <div className="g-col-6 g-col-lg-4 mt-4 m-2 d-inline-block ">
                <div className="card shadow">
                    <div className="imgBox">
                        <img src={require('../'+image)} alt="" className="imgBox" />
                    </div>
                    <div className="title pt-3">
                        <div className="fs-3">
                            <span className="fColor">{name}</span>
                            <p className="fs-6 tColor">
                            {content}</p>
                        </div>
                    </div>
                </div>
            </div>
        </Link>
        
    )
  }
}
