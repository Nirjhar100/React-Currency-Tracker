import React, {useEffect} from 'react'
import axios from 'axios'

const CrossTable = ()=>{

    useEffect(()=>{

    },[])

    const countries=[
        "CAD", "HKD", "ISK", "PHP", "DKK", "HUF", "CZK", "AUD", "RON", "SEK", "IDR", "INR", "BRL", "RUB", "HRK", "JPY", "THB", "CHF", "SGD", "PLN", "BGN", "TRY", "CNY", "NOK", "NZD", "ZAR", "USD", "MXN", "ILS", "GBP", "KRW", "MYR"
    ]
    return(
            <div>

                <div className="card-panel lime lighten-4 center" style={{overflowX:"auto",overflowY:"auto",maxHeight:"400px"}}>
                <span className="flow-text"><b>All Rates</b></span>
                <table style={{overflowX:"scrollX",position:"static"}}>
                <tr>
                {countries&&countries.map(country=>{
                    return <th>{country}</th>
                })}
                </tr>
        
              
                {countries.shift()&&countries.map(country=>{
                    return <tr><th>{country}</th></tr>
                })}
               
               
                </table>
                </div>
            </div>
    )
}

export default CrossTable