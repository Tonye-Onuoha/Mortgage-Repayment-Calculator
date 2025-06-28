import { useState } from "react";
import Calculator from "./Calculator";
import Result from "./Result";

export default function MortgageRepayment() {
    const [mortgageResult, setMortgageResult] = useState(null);
    const [mortgageIsCalculated, setMortgageIsCalculated] = useState(false);

    const handleMortgageResult = (result) => setMortgageResult(result);

    const handleMortgageIsCalculated = (value) => setMortgageIsCalculated(value);

    return (
        <div className="mortgage-calculator">
            <Calculator
                handleMortgageResult={handleMortgageResult}
                handleMortgageIsCalculated={handleMortgageIsCalculated}
            />
            <Result mortgageResult={mortgageResult} mortgageIsCalculated={mortgageIsCalculated} />
        </div>
    );
}
