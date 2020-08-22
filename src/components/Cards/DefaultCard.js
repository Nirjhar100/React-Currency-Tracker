import React,{useState} from 'react'
import { useQuery } from 'react-query'


const DefaultCard = ()=>{

    const [baseCurrency,  setBaseCurrency] = useState("")
    const [targetCurrency, setTargetCurrency] = useState("")
    
    const [baseValue, setBaseValue] = useState(0);
    const [targetValue, setTargetValue] = useState(0);
    const countries=[
        "CAD", "HKD", "ISK", "PHP", "DKK", "HUF", "CZK", "AUD", "RON", "SEK", "IDR", "INR", "BRL", "RUB", "HRK", "JPY", "THB", "CHF", "SGD", "PLN", "BGN", "TRY", "CNY", "NOK", "NZD", "ZAR", "USD", "MXN", "ILS", "GBP", "KRW", "MYR"
      ]
    
    const fetchExchangeRates = async () => {
        const res = await fetch(`https://api.exchangeratesapi.io/latest?base=${baseCurrency}`);
        return res.json();
    }

    const {data:data2, status:status2, refetch:refetch2} = useQuery('latest', fetchExchangeRates);

    React.useEffect(() => {
      refetch2()
    }, [baseCurrency])
   // console.log(data&&data.rates)

    const handleBaseValueChange = (e)=>{
        setBaseValue(e.target.value)
        setTargetValue(data2&&data2.rates[targetCurrency]*e.target.value)
        //console.log(e.target.value)
    }

    const handleBaseChange = (e)=>{
        setBaseCurrency(e.target.value)
        setBaseValue(0)
        setTargetValue(0)
        //console.log(e.target.value)
        //setTargetValue(data&&data.rates[targetCurrency]*baseValue)
        //console.log(data)
    }

    const handleTargetValueChange=(e)=>{
        setTargetValue(e.target.value)
        setBaseValue(((data2&&data2.rates[baseCurrency])/( data2&& data2.rates[targetCurrency] ))*e.target.value)
        
    }

    const handleTargetChange = (e)=>{
        setTargetCurrency(e.target.value)
        //console.log(targetCurrency)
        setBaseValue(0)
        setTargetValue(0)
       
    }


   
    return(
     
            <div className=" teal">
                <div className="card-panel teal lighten-4 center" >
                    <span className="black-text flow-text">
                       
                        <p className="flow-text"><b>Exchage rate calculator</b></p>
                       {/* <p>{new Date().toJSON()}</p>*/}
                    </span>
                    
                    <div className=" "  style={{paddingLeft:"20px"}}>
                    <select className="browser-default teal lighten-2 col s7 " onChange={handleBaseChange}>
                        <option value="" disabled selected >Base Currency</option>
                        {countries&&countries.map(country=>{
                                return  <option value={country}>{country}</option>
                            })}
                    </select>
                    
                    <input className="col s4" type="number" min="0" value={baseValue} onChange={handleBaseValueChange} style={{border:"1px solid grey", marginLeft:"10px",borderRadius:"10px"}}/>
                       
                
                    
                    </div>
                    <br/>
                    <div style={{paddingLeft:"20px"}}>
                    <select class="browser-default teal lighten-2 col s7" onChange={handleTargetChange}>
                        <option value="" disabled selected  >Target Currency</option>
                        {countries&&countries.map(country=>{
                                return  <option value={country}>{country}</option>
                            })}
                    </select>
                    <input className="col s4" type="number" min="0" value={targetValue} onChange={handleTargetValueChange} style={{border:"1px solid grey", marginLeft:"10px", borderRadius:"10px"}}/>
                    </div>
                    
                    <p className="flow-text"><b>{data2&&data2.rates[baseCurrency]} {baseCurrency} </b> equals to <b>{data2&&data2.rates[targetCurrency]} {targetCurrency} </b></p>
                </div>
                
            </div>

    )
}

export default DefaultCard