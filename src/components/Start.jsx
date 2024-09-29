import React, { useState } from 'react'
import { useMediaQuery } from 'react-responsive';
import './Start.css'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Start() {
    const [requestStatus, setRequestStatus] = useState(false);
    const [bill, setBill] = useState(0.0);
    const [currentMedicine, setCurrentMedicine] = useState('');
    const [ignored, setIgnored] = useState([]); // Ignored medicines
    const [expected, setExpected] = useState([]);
    const isMobile = useMediaQuery({ query: '(max-width: 700px)' });
    const [fields, setFields] = useState([
        { 'medicine': '', 'dose': '' }
    ]);

    const handleAdd = () => {
        setFields([...fields, { medicine: '', dose: '' }]);
    }

    const handleInputChange = (e, index, fieldname) => {
        const values = [...fields];
        values[index][fieldname] = e.target.value;
        setFields(values);
    }

    const makeApiCall = async (values) => {
        setRequestStatus(true);
        let totalBill = 0; 
    
        let ignoredMedicines = []; // Temporary array to hold ignored medicines
        let expected = [];
        for (let i = 0; i < values.length; i++) {
            try {
                setCurrentMedicine(fields[i]['medicine'])
                const response = await axios.post('https://medicost-production.up.railway.app/scrape', {
                    medicine: fields[i]['medicine'].toLowerCase(),
                });

                let names = response.data['name'].split(' ');
                let name = names[0].toLowerCase(); 
                
                
                // If the name is empty or null, it's a wrong name, so add to ignored
                if (!name || name.trim() !== fields[i]['medicine'].toLowerCase()) {
                    expected.push(name);
                    ignoredMedicines.push(fields[i]['medicine']); // Append the ignored medicine
                } else {
                    let price = response.data['totalPrice'];
                    let cleanedPrice = price.replace("Rs. ", "").trim();
                    let convertedPrice = parseFloat(cleanedPrice);
                    totalBill += convertedPrice;
                }
                
            } catch (error) {
                console.error("Error fetching price for prescription ", fields[i]['medicine'].toLowerCase());
            }
        }

        setBill(totalBill);
        setIgnored(ignoredMedicines); // Update the ignored medicines in state after all calls
        setExpected(expected);
        setRequestStatus(false);
       
    }

    return (
        isMobile ? (
            <div className='start-main-mobile'>
                <h2>Start adding prescription</h2>
                <small style={{ 'color': 'grey' }}>Click on add button to add more</small> <br /> <br />
                {
                    fields.map((field, index) => (
                        <div key={index} className="field-group">
                            <input
                                onChange={(e) => handleInputChange(e, index, 'medicine')}
                                type="text"
                                value={field.medicine}
                                placeholder={`Prescription ${index + 1} Name`}
                                className='prescription-input'
                            />
                            <input
                                onChange={(e) => handleInputChange(e, index, 'dose')}
                                type="number"
                                value={field.dose}
                                placeholder='No. of tablets'
                                className='prescription-input'
                            />
                        </div>
                    ))
                }
                <br /> <br />
                <button onClick={handleAdd} className='add-mobile'> Add </button> <br /><br />
                <button className='back-mobile'> Back </button> <br /> <br />
                {!requestStatus ? <button onClick={() => makeApiCall(fields)} className='submit-mobile'> Submit request </button> : <p>Processing for {currentMedicine}</p>}
                
                {/* Display ignored medicines */}
                {ignored.length > 0 && (
                    <div>
                        <h3>Ignored Medicines</h3>
                        <ul>
                            {ignored.map((med, idx) => (
                                <li key={idx}>{med}</li>
                            ))}
                        </ul>
                    </div>
                )}

                {/* Display total bill */}
                <div>
                    <h3>Total Bill: Rs. {bill.toFixed(2)}</h3>
                </div>
            </div>
        ) : (
            <div>
                <h2>Start adding prescription</h2>
                <small style={{ 'color': 'grey' }}>Click on add button to add more</small> <br /> <br />
                {
                    fields.map((field, index) => (
                        <div key={index} className="field-group">
                            <input
                                onChange={(e) => handleInputChange(e, index, 'medicine')}
                                type="text"
                                value={field.medicine}
                                placeholder={`Prescription ${index + 1} Name`}
                                className='prescription-input'
                            />
                            <input
                                onChange={(e) => handleInputChange(e, index, 'dose')}
                                type="number"
                                value={field.dose}
                                placeholder='No. of tablets'
                                className='prescription-input'
                            />
                        </div>
                    ))
                }
                <br /> <br />
                <button onClick={handleAdd} className='add-mobile'> Add </button> <br /><br />
                <button className='submit-mobile'> Submit request </button>

                {/* Display ignored medicines */}
                {ignored.length > 0 && (
                    <div>
                        <h4>Ignored Medicines</h4>
                        <ol>
                            {ignored.map((med, idx) => (
                                <li key={idx}>{med}</li>
                            ))}
                        </ol>
                    </div>
                )}

                {/* Display total bill */}
                <div>
                    <h3>Total Bill: Rs. {bill.toFixed(2)}</h3>
                </div>
            </div>
        )
    )
}
