import React, {useEffect,useState} from 'react'
import axios from 'axios'

const CrossTable = ()=>{

    const [baseCurrency,  setBaseCurrency] = useState("CAD")
    const [targetCurrency, setTargetCurrency] = useState("")
    
    const [baseValue, setBaseValue] = useState(0);
    const [targetValue, setTargetValue] = useState(0);
    const [data, setData] = useState()
    useEffect(()=>{
        axios.get(`https://api.exchangeratesapi.io/latest?base=${baseCurrency}`)
        .then(res=>{
            setData(res.data)
        })
    },[baseCurrency])

    console.log(data)

   

    const countries=[
        "CAD", "HKD", "ISK", "PHP", "DKK", "HUF", "CZK", "AUD", "RON", "SEK", "IDR", "INR", "BRL", "RUB", "HRK", "JPY", "THB", "CHF", "SGD", "PLN", "BGN", "TRY", "CNY", "NOK", "NZD", "ZAR", "USD", "MXN", "ILS", "GBP", "KRW", "MYR"
    ]
    const countries2=[
        "CAD", "HKD", "ISK", "PHP", "DKK", "HUF", "CZK", "AUD", "RON", "SEK", "IDR", "INR", "BRL", "RUB", "HRK", "JPY", "THB", "CHF", "SGD", "PLN", "BGN", "TRY", "CNY", "NOK", "NZD", "ZAR", "USD", "MXN", "ILS", "GBP", "KRW", "MYR"
    ]
    return(
            <div>

                <div className="card-panel lime lighten-4 center" style={{overflowX:"auto",overflowY:"auto",maxHeight:"400px"}}>
                <span className="flow-text"><b>All Rates</b></span>
                <table style={{overflowX:"scrollX",position:"static"}}>
                <tr>
                    <th></th>
                {countries&&countries.map(country=>{
                    return <><th>{country}</th></>
                })}
                </tr>
               
           
                {countries&&countries.map(country=>{
             
                 
                    return(<><tr><th>{country}</th>{countries2.map(country2=>{return<th>{(data&&data.rates[country2])/ (data&&data.rates[country])}</th>})}</tr></>
                 
                    ) 
           
                })}
             
               
                </table>
                </div>
            </div>
    )
}

export default CrossTable