import React, {useState} from 'react'
import { useQuery } from 'react-query'
import '../../../node_modules/react-vis/dist/style.css';
import {XYPlot, makeWidthFlexible, LineMarkSeries, VerticalGridLines, HorizontalGridLines, XAxis,YAxis} from 'react-vis';
import moment from 'moment'

const Visual =()=>{
    
    const [baseCurrency,  setBaseCurrency] = useState("USD")
    const [targetCurrency, setTargetCurrency] = useState("INR")

    const [baseDate, setBaseDate] = useState(moment(new Date()).format('YYYY-MM-DD'))
    const [targetDate, setTargetDate] = useState(moment(new Date(new Date().getTime()-(7*24*60*60*1000))).format('YYYY-MM-DD'))

    const FlexibleXYPlot = makeWidthFlexible(XYPlot); 

    var plotData = [{x:new Date(),y:0}];



      const countries=[
        "CAD", "HKD", "ISK", "PHP", "DKK", "HUF", "CZK", "AUD", "RON", "SEK", "IDR", "INR", "BRL", "RUB", "HRK", "JPY", "THB", "CHF", "SGD", "PLN", "BGN", "TRY", "CNY", "NOK", "NZD", "ZAR", "USD", "MXN", "ILS", "GBP", "KRW", "MYR"
      ]
    
    React.useEffect(() => {
        refetch()
       
      
      }, [baseCurrency,targetCurrency,targetDate])

    const fetchHistoricalRates = async () => {
        const res = await fetch(`https://api.exchangeratesapi.io/history?start_at=${targetDate||moment(new Date(new Date().getTime()-(7*24*60*60*1000))).format('YYYY-MM-DD')}&end_at=${baseDate}&symbols=${baseCurrency},${targetCurrency}&base=${baseCurrency}`);
        return res.json();
    }

    const {data, status, refetch} = useQuery('latest', fetchHistoricalRates);

   // console.log(data2&&data2.rates)
    //console.log(data2&&Object.values(data2.rates))
   
   
    console.log(data&&Object.keys(data.rates)[0])
    if(data&&Object.keys(data.rates)[0]!="CAD"){
        plotData=[]
        data&&Object.entries(data.rates).map(day=>{
      
            console.log(day[0])
            plotData.push({x:new Date(day[0]),y:day[1][targetCurrency]})
    
        })
    }
    plotData.sort(function(a, b) {
        var dateA = new Date(a.x), dateB = new Date(b.x);
        return dateA - dateB;
    });

    console.log(baseDate,targetDate)

    const handleBaseChange=(e)=>{
        
        setBaseCurrency(e.target.value)
        console.log(e.target.value)
    }

    const handleTargetChange=(e)=>{
        setTargetCurrency(e.target.value)
    }

    const handleRangeChange=(e)=>{
        if(e.target.value==="1"){
            setTargetDate(moment(new Date(new Date().getTime()-(7*24*60*60*1000))).format('YYYY-MM-DD'))
        }
        else if(e.target.value==="2"){
            setTargetDate(moment(new Date(new Date().getTime()-(14*24*60*60*1000))).format('YYYY-MM-DD'))
        }
        else if(e.target.value==="3"){
            setTargetDate(moment(new Date(new Date().getTime()-(21*24*60*60*1000))).format('YYYY-MM-DD'))
        }
        else if(e.target.value==="4"){
            setTargetDate(moment(new Date(new Date().getTime()-(28*24*60*60*1000))).format('YYYY-MM-DD'))
        }
    }


    return(
        <div >
            <div className="card-panel center ">
                <p className="flow-text center"><b>Historic Rates Chart</b></p>

                <div >
                    <FlexibleXYPlot height={420}  xType="time" >
                      
                        <VerticalGridLines />
                        <HorizontalGridLines />
                        <XAxis title="timeline"/>
                        <YAxis title={targetCurrency}/>
                        <LineMarkSeries data={plotData} color="red"  stroke="teal" />
                    </FlexibleXYPlot>
                </div>

                <div className="container">
                    
                    <div className="container ">
                    <h6><b>Customize Chart</b></h6>
                        <select className="browser-default  container" onChange={handleBaseChange}>
                            <option value="" disabled selected >Select Base Currency</option>
                            {countries&&countries.map(country=>{
                                return  <option value={country}>{country}</option>
                            })}
                        </select>
                    </div>
                    <br/>
                    <div className="container ">
                        <select class="browser-default   container " onChange={handleTargetChange}>
                            <option value="" disabled selected  >Select Target Currency</option>
                            {countries&&countries.map(country=>{
                                return  <option value={country}>{country}</option>
                            })}
                        </select>
                    </div>
                    <br/>
                    <div className="container ">
                        <select class="browser-default container" onChange={handleRangeChange}>
                            <option value="" disabled >Select Time Period</option>
                            <option value="1" selected>1-7 days</option>
                            <option value="2">2 weeks</option>
                            <option value="3">3 weeks</option>
                            <option value="4">4 weeks</option>
                        </select>
                    </div>
                    </div>
            </div>


        </div>
    )
}

export default Visual