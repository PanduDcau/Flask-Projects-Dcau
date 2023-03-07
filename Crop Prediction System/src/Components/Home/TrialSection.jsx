import './TrialSection.scss'

import React, {useState, useEffect} from 'react'

import states from './states.json';
import districts from './districts2.json';

function TrialSection() {

    const [data, setData] = useState("");

    // var N_value;
    // var P_value;
    // var K_value;
    // var Ph_value;
    // var state_value;
    // var district_value;

    const [Loading, setLoading] = useState(-1);
    
    const [N_value, setN_value] = useState('');
    const [P_value, setP_value] = useState('');
    const [K_value, setK_value] = useState('');
    const [Ph_value, setPh_value] = useState('');
    const [state_value, setstate_value] = useState('0');
    const [district_value, setdistrict_value] = useState('0');
    const [start_month, setstart_month] = useState('1');
    const [end_month, setend_month] = useState('12');
    
    function getData(){

        setLoading(1);

        var requestOptions = {
            // mode:'no-cors',
            dataType: 'json',
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                N: N_value, 
                P: P_value, 
                K: K_value, 
                Ph: Ph_value,  
                state: state_value,  
                district: district_value,
                start_month: start_month,
                end_month: end_month,
                // N: 10, 
                // P: 10, 
                // K: 10, 
                // Ph: 10,  
                // state: 'ASSAM',  
                // district: 'JORHAT',
                // N: '83', 
                // P: '45', 
                // K: '60', 
                // Ph: '28',  
                // temprature: '70.3',  
                // humidity: '7',  
                // rainfall: '150.9',  
            })
        };
        
        fetch('http://localhost:5000/crop', requestOptions)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                setData(data.crop);
                setLoading(0);
            })
            .catch(error => {
                console.error('There was an error!', error);
            });
    }

    return (
        <div className="section trailSection">
            <div className="trailSectionLeft">
                <h1>
                    Try it out
                </h1>
                <h3>
                    Enter your soil information and get a crop recommendation
                </h3>
            </div>
            <div className="trailSectionRight">
                <form action="http://localhost:5000/crop" method="POST">
                    <h3>Soil Data</h3>
                    <div className="inputRow">
                        <div className="inputDiv">
                            <label htmlFor="nitrogen">Nitrogen value</label>
                            <input name="nitrogen" type="text" placeholder="Enter value" value={N_value}
                                onInput={e => setN_value(e.target.value)} />
                        </div>
                        <div className="inputDiv">
                            <label htmlFor="phosphorus">Phosphorus value</label>
                            <input name="phosphorus" type="text" placeholder="Enter value" value={P_value}
                                onInput={e => setP_value(e.target.value)} />
                        </div>
                    </div>
                    <div className="inputRow">
                        <div className="inputDiv">
                            <label htmlFor="potassium">Potassium value</label>
                            <input name="potassium" type="text" placeholder="Enter value" value={K_value}
                                onInput={e => setK_value(e.target.value)} />
                        </div>
                        <div className="inputDiv">
                            <label htmlFor="ph">Ph value</label>
                            <input name="ph" type="text" placeholder="Enter value" value={Ph_value}
                                onInput={e => setPh_value(e.target.value)}  />
                        </div>
                    </div>
                    <div className="inputRow">
                        <div className="inputDiv">
                            <label htmlFor="state">Start month</label>
                            <select
                            onChange={f => {setstart_month(f.target.value); }} >
                                <option value={1} >January</option>
                                <option value={2} >February</option>
                                <option value={3} >March</option>
                                <option value={4} >April</option>
                                <option value={5} >May</option>
                                <option value={6} >June</option>
                                <option value={7} >July</option>
                                <option value={8} >August</option>
                                <option value={9} >September</option>
                                <option value={10} >October</option>
                                <option value={11} >November</option>
                                <option value={12} >December</option>
                            </select>
                        </div>
                        <div className="inputDiv">
                            <label htmlFor="district">End month</label>
                            <select
                            onChange={f => {setend_month(f.target.value); }} >
                                <option value={1} >January</option>
                                <option value={2} >February</option>
                                <option value={3} >March</option>
                                <option value={4} >April</option>
                                <option value={5} >May</option>
                                <option value={6} >June</option>
                                <option value={7} >July</option>
                                <option value={8} >August</option>
                                <option value={9} >September</option>
                                <option value={10} >October</option>
                                <option value={11} >November</option>
                                <option value={12} >December</option>
                            </select>
                        </div>
                    </div>
                    {/* <h3>Location Data</h3> */}
                    <div className="inputRow">
                        <div className="inputDiv">
                            <label htmlFor="state">State</label>
                            <select
                            onChange={f => {setstate_value(f.target.value); }} >
                                {states.map((e, i)=><option value={i} key={i}>{e}</option>)}
                            </select>
                        </div>
                        <div className="inputDiv">
                            <label htmlFor="district">District</label>
                            <select
                            onChange={f => {setdistrict_value(f.target.value);}} >
                                {districts[state_value].map((e, i)=><option value={i} key={i}>{e}</option>)}
                            </select>
                        </div>
                    </div>
                    <button onClick={ getData } type="button">Submit</button>
                    {
                        Loading == 1 ? 
                        <div className="resultDiv">
                            Loading....
                        </div> : 
                        data !== "" ?
                            <div className="resultDiv">
                                Recommeded Crop: {data}
                            </div> : null
                    }
                </form>
            </div>
        </div>
    )
}

export default TrialSection
