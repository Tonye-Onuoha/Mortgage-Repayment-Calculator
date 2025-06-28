import emptyResultImage from "../assets/images/illustration-empty.svg";

export default function Result({ mortgageResult, mortgageIsCalculated }) {
    let monthlyPayments = mortgageResult?.monthly_payments.toFixed(2);
    monthlyPayments = Number(monthlyPayments);
    let termPayments = mortgageResult?.term_payments.toFixed(2);
    termPayments = Number(termPayments);

    const calculatedResult = (
        <div className="result-container">
            <h1 className="result__heading">Your results</h1>
            <p className="result__title">
                Your results are shown below based on the information you provided. To adjust the results, edit the form
                and click “calculate repayments” again.
            </p>
            <div className="result">
                <div className="result__group">
                    <p className="result__text">Your monthly repayments</p>
                    {mortgageIsCalculated && (
                        <h1 className="result__monthly">&#xa3;{monthlyPayments.toLocaleString()}</h1>
                    )}
                </div>
                <div className="line"></div>
                <div className="result__group">
                    <p className="result__text">Total you'll repay over the term</p>
                    {mortgageIsCalculated && <h2 className="result__term">&#xa3;{termPayments.toLocaleString()}</h2>}
                </div>
            </div>
        </div>
    );

    const emptyResult = (
        <div className="empty-result">
            <img src={emptyResultImage} alt="empty result illustration" />
            <h1 className="empty-result__heading">Results shown here</h1>
            <p className="empty-result__title">
                Complete the form and click “calculate repayments” to see what your monthly repayments would be.
            </p>
        </div>
    );

    if (mortgageIsCalculated) {
        return calculatedResult;
    } else {
        return emptyResult;
    }
}
