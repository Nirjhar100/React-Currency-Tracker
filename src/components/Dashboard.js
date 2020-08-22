import React from 'react'
import DefaultCard from './Cards/DefaultCard';
import Visual from './Cards/Visual';



const Dashboard = ()=>{

    return(
 
        <div className="row">
        <div className="col l4 m6 s12">
            <DefaultCard  />
            </div>
            <div className="col l8 s12 m12">
            <Visual/>
            </div>
            
            
         
           
        
            
        </div>
        
    )
}

export default Dashboard