import React, { useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import './Start.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Start() {
    const [requestStatus, setRequestStatus] = useState(false);
    const [bill, setBill] = useState(0.0);
    const [currentMedicine, setCurrentMedicine] = useState('');
    const [ignored, setIgnored] = useState([]); // Ignored medicines
    const [expected, setExpected] = useState([]);
    const isMobile = useMediaQuery({ query: '(max-width: 700px)' });
    const [fields, setFields] = useState([{ 'medicine': '', 'dose': '' }]);
    const [errorMessage, setErrorMessage] = useState(''); // State for error messages
    const navigate = useNavigate();
    const [medicinesDetails, setMedicinesDetails] = useState([]); // To store medicines and their details

    const handleAdd = () => {
        setFields([...fields, { medicine: '', dose: '' }]);
    }

    const handleInputChange = (e, index, fieldname) => {
        const values = [...fields];
        values[index][fieldname] = e.target.value;
        setFields(values);
    }

    const validateFields = () => {
        for (let field of fields) {
            if (!field.medicine.trim() || !field.dose.trim()) {
                return false; // At least one field is empty
            }
        }
        return true; // All fields are valid
    }

    const makeApiCall = async (values) => {
        // Validate fields before making the API call
        if (!validateFields()) {
            setErrorMessage('Invalid input caught: fill all fields');
            return; // Exit the function if validation fails
        }

        setErrorMessage(''); // Clear any previous error messages
        setRequestStatus(true);
        let totalBill = 0;
        let discount = 0;
        let increase_price_by = 0;
        let ignoredMedicines = []; // Temporary array to hold ignored medicines
        let expected = [];
        let medicines = []; // To store medicines details for the table

        for (let i = 0; i < values.length; i++) {
            try {
                setCurrentMedicine(fields[i]['medicine']);
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
                    let strip_size = response.data['stripSize'];
                    let number_of_tablets_per_strip = parseInt(strip_size.match(/\d+/)[0]);
                    let price = response.data['totalPrice'];
                    let cleanedPrice = price.replace("Rs. ", "").trim();
                    let convertedPrice = ((parseFloat(cleanedPrice)) / (number_of_tablets_per_strip)) * parseInt(fields[i]['dose']);

                    if (response.data['discount'] !== '') {
                        discount = parseInt(response.data['discount']);
                        increase_price_by = (discount / 100) * (convertedPrice);
                        convertedPrice = convertedPrice + increase_price_by;
                    }
                    totalBill += convertedPrice;

                    // Store medicine details
                    medicines.push({
                        name: fields[i]['medicine'],
                        dose: fields[i]['dose'],
                        price: convertedPrice.toFixed(2),
                    });
                }

            } catch (error) {
                console.error("Error fetching price for prescription ", fields[i]['medicine'].toLowerCase());
            }
        }

        setBill(totalBill);
        setMedicinesDetails(medicines); // Update medicines details in state
        setIgnored(ignoredMedicines); // Update the ignored medicines in state after all calls
        setExpected(expected);
        setRequestStatus(false);
    }

    return (
        isMobile ? (
            <div className='start-main-mobile'>
                <h2>Start adding prescription</h2>
                <small style={{ 'color': 'grey' }}>Click on add button to add more</small> <br /> <br />
                {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>} {/* Display error message */}
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
                <button onClick={() => navigate('/', { replace: true })} className='back-mobile'> Back </button> <br /> <br />
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

                {/* Display medicines in a table */}
                {medicinesDetails.length > 0 && (
                    <table className="medicines-table">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Dose</th>
                                <th>Price (Rs.)</th>
                            </tr>
                        </thead>
                        <tbody>
                            {medicinesDetails.map((med, idx) => (
                                <tr key={idx}>
                                    <td>{med.name}</td>
                                    <td>{med.dose}</td>
                                    <td>{med.price}</td>
                                </tr>
                            ))}
                            <tr>
                                <td colSpan="2"><strong>Total Price:</strong></td>
                                <td><strong>Rs. {bill.toFixed(2)}</strong></td>
                            </tr>
                        </tbody>
                    </table>
                )}
            </div>
        ) : 
        // web design
        (
            <div>
                <h2>Start adding prescription</h2>
                <small style={{ 'color': 'grey' }}>Click on add button to add more</small> <br /> <br />
                {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>} {/* Display error message */}
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
                <button className='submit-mobile' onClick={() => makeApiCall(fields)}> Submit request </button>

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

                {/* Display medicines in a table */}
                {medicinesDetails.length > 0 && (
                    <table className="medicines-table">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Dose</th>
                                <th>Price (Rs.)</th>
                            </tr>
                        </thead>
                        <tbody>
                            {medicinesDetails.map((med, idx) => (
                                <tr key={idx}>
                                    <td>{med.name}</td>
                                    <td>{med.dose}</td>
                                    <td>{med.price}</td>
                                </tr>
                            ))}
                            <tr>
                                <td colSpan="2"><strong>Total Price:</strong></td>
                                <td><strong>Rs. {bill.toFixed(2)}</strong></td>
                            </tr>
                        </tbody>
                    </table>
                )}
            </div>
        )
    )
}
