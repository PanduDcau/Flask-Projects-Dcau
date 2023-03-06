import './TrialSection.scss'

import React, {useState, useEffect} from 'react'

// import bg2 from URL('https://images.unsplash.com/photo-1447703693928-9cd89c8d3ac5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1171&q=80');

import states from './states.json';
import districts from './districts2.json';
const soil_type_list = ['Black', 'Clayey', 'Loamy', 'Red', 'Sandy'];
const crop_type_list = ['Barley', 'Cotton', 'Ground Nuts', 'Maize', 'Millets', 'Oil seeds', 'Paddy', 'Pulses', 'Sugarcane', 'Tobacco', 'Wheat'];

function TrialSection() {

    const [data2, setData2] = useState("");

    const [Loading, setLoading] = useState(-1);

    const [N_value, setN_value] = useState('');
    const [P_value, setP_value] = useState('');
    const [K_value, setK_value] = useState('');
    const [Ph_value, setPh_value] = useState('');
    const [state_value, setstate_value] = useState('0');
    const [district_value, setdistrict_value] = useState('0');
    const [Moisture_value, setMoisture_value] = useState('');
    const [CropType_value, setCropType_value] = useState('0');
    const [SoilType_value, setSoilType_value] = useState('0');
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
                // Ph: Ph_value,  
                state: states[state_value],  
                district: districts[state_value][district_value],
                moisture: Moisture_value,
                soil_type: SoilType_value,
                // soil_type: soil_type_list[SoilType_value],
                crop_type: CropType_value,
                // crop_type: crop_type_list[CropType_value]
                start_month: start_month,
                end_month: end_month,
            })
        };

        // console.log(requestOptions)
        
        fetch('http://localhost:5000/fertilizer', requestOptions)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                setData2(data.crop);
                setLoading(0);
            })
            .catch(error => {
                console.error('There was an error!', error);
                setData2("Error")
            });
    }

//    console.log('states: ',states);
//    console.log('districts',districts);

    return (
        <div className="section trailSection">
            
            <div className="trailSectionRight">
                <form action="http://localhost:5000/crop" method="POST">
                    <h3>Soil Data</h3>
                    <div className="inputRow">
                        <div className="inputDiv">
                            <label htmlFor="nitrogen2">Nitrogen value</label>
                            <input name="nitrogen2" type="text" placeholder="Enter value" value={N_value}
                                onInput={e => setN_value(e.target.value)} />
                        </div>
                        <div className="inputDiv">
                            <label htmlFor="phosphorus2">Phosphorus value</label>
                            <input name="phosphorus2" type="text" placeholder="Enter value" value={P_value}
                                onInput={e => setP_value(e.target.value)} />
                        </div>
                    </div>
                    <div className="inputRow">
                        <div className="inputDiv">
                            <label htmlFor="potassium2">Potassium value</label>
                            <input name="potassium2" type="text" placeholder="Enter value" value={K_value}
                                onInput={e => setK_value(e.target.value)} />
                        </div>
                        {/* <div className="inputDiv">
                            <label htmlFor="ph2">Ph value</label>
                            <input name="ph2" type="text" placeholder="Enter value" value={Ph_value}
                                onInput={e => setPh_value(e.target.value)}  />
                        </div> */}
                        <div className="inputDiv">
                            <label htmlFor="moisture2">Moisture value</label>
                            <input name="moisture2" type="text" placeholder="Enter value" value={Moisture_value}
                                onInput={e => setMoisture_value(e.target.value)} />
                        </div>
                    </div>
                    <div className="inputRow">
                        
                        <div className="inputDiv">
                            <label htmlFor="soilType2">Soil type</label>

                            <select
                            onChange={e => {setSoilType_value(e.target.value)}} >
                                <option value="0">Black</option>
                                <option value="1">Clayey</option>
                                <option value="2">Loamy</option>
                                <option value="3">Red</option>
                                <option value="4">Sandy</option>
                            </select>

                            {/* <input name="soilType2" type="text" placeholder="Enter value" value= {SoilType_value}
                                onInput={e => setSoilType_value(e.target.value)} /> */}
                        </div>
                        <div className="inputDiv">
                            <label htmlFor="cropType2">Crop type</label>

                            <select
                            onChange={e => {setCropType_value(e.target.value)}} >
                                <option value="0">Barley</option>
                                <option value="1">Cotton</option>
                                <option value="2">Ground Nuts</option>
                                <option value="3">Maize</option>
                                <option value="4">Millets</option>
                                <option value="5">Oil seeds</option>
                                <option value="6">Paddy</option>
                                <option value="7">Pulses</option>
                                <option value="8">Sugarcane</option>
                                <option value="9">Tobacco</option>
                                <option value="10">Wheat</option>
                            </select>

                            {/* <input name="cropType2" type="text" placeholder="Enter value" value={CropType_value}
                                onInput={e => setCropType_value(e.target.value)}/> */}
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
                            <label htmlFor="state2">State</label>
                            <select
                            onChange={f => {setstate_value(f.target.value); }} >
                                {states.map((e, i)=><option value={i} key={i}>{e}</option>)}
                            </select>
                                
                            {/* <input name="state2" type="text" placeholder="Enter value" value={state_value}
                                onInput={e => setstate_value(e.target.value)} /> */}
                        </div>
                        <div className="inputDiv">
                            <label htmlFor="district2">District</label>

                            <select
                            onChange={f => {setdistrict_value(f.target.value);}} >
                                {districts[state_value].map((e, i)=><option value={i} key={i}>{e}</option>)}
                            </select>

                            {/* <input name="district2" type="text" placeholder="Enter value" value={district_value} 
                                onInput={e => setdistrict_value(e.target.value)} /> */}
                        </div>
                    </div>
                    
                    <button onClick={ getData } type="button">Submit</button>
                    {
                        Loading == 1 ? 
                        <div className="resultDiv">
                            Loading....
                        </div> : 
                        data2 !== "" ?
                            <div className="resultDiv">
                                Recommeded Fertilizer: {data2}
                            </div> : null
                    }
                </form>
            </div>
            <div className="trailSectionLeft" style={{backgroundColor:"black", backgroundImage: `url("https://images.unsplash.com/photo-1559762691-617a33825bc6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80")`}}>
                <h1>
                    Fertilizer 
                </h1>
                <h3>
                    Enter your soil information and get a fertilizer recommendation
                </h3>
            </div>
        </div>
    )
}

export default TrialSection
