import React, { useState } from "react";
import "./App.css";
import { CodeInput, EnterButton, ConfirmationPage, invalidCodeMessage } from "./code-input";

function Header () {
        return (
                <div>
                        <h1 className="logo">PatientAId</h1>
                </div>
        );
}

function App() {
        // Create a state variable to hold the user's code
        const [code, setCode] = useState(Array(6).fill(null));
        const [showConfirmationPage, setShowConfirmationPage] = useState(false);
        const [errorMessage, setErrorMessage] = useState(null);

        // Create a function to update the code state variable
        const changeCode = (index, value) => {
                const newCode = [...code];
                newCode[index] = value;
                setCode(newCode);
        };

        // Create a function to run when the user clicks the submit button
        const submitCode = () => {
            const patientId = code.join(""); 
            // PUT ACTUAL VALIDATION HERE
            if (patientId.length != 6) {
                setErrorMessage("Invalid code entered.");
            } else {
                setErrorMessage(null);
                setShowConfirmationPage(true);
            }
        };

        // Create a function to run when the user clicks the next patient button
        const nextPatient = () => {
                setShowConfirmationPage(false);
                setCode(Array(6).fill(null));
        };

        // Render the components with the state and functions we created
        return (
            <div>
                <Header />
                {showConfirmationPage ? (
                    <>
                        <ConfirmationPage /> <br />
                        <button onClick={nextPatient}>Next Patient</button>
                    </>
                ) : (
                    <>
                        <CodeInput
                            onCodeChange={changeCode}
                            code={code} />
                        <EnterButton onSubmit={submitCode} />
                        {errorMessage && <p>{errorMessage}</p>}
                    </>
                )}
            </div>
        );
}

export default App;
