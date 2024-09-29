import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import './Policy.css'; // Import your CSS file for styles

export default function Policy() {
    const navigate = useNavigate(); // Create a navigate function

    return (
        <div className="policy-det-container">
            <h2>Policy Guidelines</h2>
            <ul className="policy-list">
                <li>
                    <strong>Nearest Pricing:</strong> The calculated price will be the nearest possible, as it may vary geographically.
                </li>
                <li>
                    <strong>No Misleading Use:</strong> Do not use this app for any misleading purpose.
                </li>
                <li>
                    <strong>Concentration Matters:</strong> If a medicine has different concentrations (e.g., 5mg, 2mg, 1mg), the price will be calculated based on the highest concentration to ensure you are not short of your bill at the pharmacy.
                </li>
                <li>
                    <strong>Discount Variations:</strong> Some medicines offer discounts; the app will take care of them. However, slight variations in prices may occur due to discounts not accounted for by the app.
                </li>
                <li>
                    <strong>Suggested Amount:</strong> It is advised to take a slightly higher amount than the predicted amount by the app, as prices can change based on geographical factors.
                </li>
                <li>
                    <strong>Feedback:</strong> You can recommend any changes if you encounter UI/UX issues at <a href="mailto:codewithsaadzafar@gmail.com">codewithsaadzafar@gmail.com</a>.
                </li>
                <li>
                    <strong>Patience with Results:</strong> Sometimes the app may take a bit of time to generate results due to network traffic; we appreciate your patience.
                </li>
            </ul>
            <button className="back-button" onClick={() => navigate(-1)}>Back</button> {/* Back button */}
        </div>
    );
}
