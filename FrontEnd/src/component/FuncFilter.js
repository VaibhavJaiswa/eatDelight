import React from 'react'
import Filter from './Filter'
import { useParams } from 'react-router-dom'

export default function FuncFilter() {
    let {mType} = useParams();
    
  return (
    
    <div><Filter mealType={mType}></Filter></div>
  )
}
