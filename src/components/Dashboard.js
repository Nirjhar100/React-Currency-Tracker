import React from 'react'
import CrossTable from './Cards/CrossTable';
import DefaultCard from './Cards/DefaultCard';
import Visual from './Cards/Visual';



const Dashboard = ()=>{

    return(
 
        <div className="row">
        <div className="col l4 m12 s12">
            <DefaultCard  />
            <div style={{paddingTop:"20px"}}>
            <CrossTable  />
            </div>
            
            </div>
            <div className="col l8 s12 m12">
            <Visual/>
            </div>
            
            
         
           
        
            
        </div>
        
    )
}

export default Dashboard