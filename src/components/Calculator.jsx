import { useState } from "react";
import isDataValid from "../utils";

export default function Calculator({ handleMortgageResult, handleMortgageIsCalculated }) {
    const [amount, setAmount] = useState({ value: "", error: null });
    const [term, setTerm] = useState({ value: "", error: null });
    const [rate, setRate] = useState({ value: "", error: null });
    const [type, setType] = useState({ value: "", error: null });
    const [focusedInput, setFocusedInput] = useState("");
    const [formSubmitted, setFormSubmitted] = useState(false);

    const handleAmountChange = (e) => {
        setAmount({ value: e.currentTarget.value, error: null });
    };

    const handleTermChange = (e) => {
        setTerm({ value: e.currentTarget.value, error: null });
    };

    const handleRateChange = (e) => {
        setRate({ value: e.currentTarget.value, error: null });
    };

    const handleTypeChange = (e) => {
        setType({ value: e.currentTarget.value, error: null });
    };

    const handleFocusedInput = (e) => setFocusedInput(e.currentTarget.name);

    const handleBlurredInput = (e) => setFocusedInput("");

    const calculateMortgage = ({ amount, term, rate, type }) => {
        if (type === "repayment") {
            const principal = amount;
            const interestRate = rate / 100;
            const r = interestRate / 12;
            const n = term * 12;
            const dividend = principal * (r * (1 + r) ** n);
            const divisor = (1 + r) ** n - 1;
            const monthlyRepayments = dividend / divisor;
            const termRepayments = monthlyRepayments * 12 * term;
            return { monthly_payments: monthlyRepayments, term_payments: termRepayments };
        } else if (type === "interest-only") {
            // (principal * annual interest-rate) / payments per year (typically 12 for monthly payments).
            const principal = amount;
            const interestRate = rate / 100;
            const payments = 12;
            const interestOnlyPayments = (principal * interestRate) / payments;
            const termRepayments = interestOnlyPayments * 12 * term;
            return { monthly_payments: interestOnlyPayments, term_payments: termRepayments };
        }
    };

    const clearForm = () => {
        setAmount({ value: "", error: null });
        setRate({ value: "", error: null });
        setTerm({ value: "", error: null });
        setType({ value: "", error: null });
        handleMortgageResult(null);
        handleMortgageIsCalculated(false);
        setFormSubmitted(false);
    };

    const handleFormErrors = (errorObject) => {
        if ("amount" in errorObject) setAmount({ ...amount, error: errorObject.amount });
        if ("term" in errorObject) setTerm({ ...term, error: errorObject.term });
        if ("rate" in errorObject) setRate({ ...rate, error: errorObject.rate });
        if ("type" in errorObject) setType({ ...amount, error: errorObject.type });
    };

    const handleSubmit = (e) => {
        e.preventDefault(); // prevent default form behaviour (page reload)
        setFormSubmitted(true);
        const errors = {};
        const formData = { amount: amount.value, term: term.value, rate: rate.value, type: type.value };
        const dataIsValid = isDataValid(formData, errors);
        if (!dataIsValid) handleFormErrors(errors);
        else {
            const mortgageResult = calculateMortgage(formData);
            handleMortgageResult(mortgageResult);
            handleMortgageIsCalculated(true);
        }
    };

    return (
        <div className="calculator">
            <div className="calculator__heading-container">
                <h1 className="calculator__heading">Mortgage Calculator</h1>
                <button className="calculator__clear-button" onClick={clearForm}>
                    Clear All
                </button>
            </div>
            <form onSubmit={handleSubmit} noValidate>
                <div className="mortgage-amount-container">
                    <label className="form-label__mortgage-amount">Mortgage Amount</label>
                    <div className="text-input-container">
                        <input
                            type="text"
                            value={amount.value}
                            name="amount"
                            className={
                                formSubmitted && amount.error
                                    ? "input-error"
                                    : focusedInput === "amount"
                                      ? "input-focused"
                                      : ""
                            }
                            onChange={handleAmountChange}
                            onFocus={handleFocusedInput}
                            onBlur={handleBlurredInput}
                        />
                        <span
                            className={
                                formSubmitted && amount.error
                                    ? "input-pounds input-logo-error"
                                    : focusedInput === "amount"
                                      ? "input-pounds input-logo-focused"
                                      : "input-pounds"
                            }>
                            &#xa3;
                        </span>
                    </div>
                    {formSubmitted && amount.error && <p className="error-text">{amount.error}</p>}
                </div>
                <div className="form-options-container">
                    <div className="mortgage-term-container">
                        <label className="form-label__mortgage-term">Mortgage Term</label>
                        <div className="text-input-container">
                            <input
                                type="text"
                                value={term.value}
                                name="term"
                                className={
                                    formSubmitted && term.error
                                        ? "input-error"
                                        : focusedInput === "term"
                                          ? "input-focused"
                                          : ""
                                }
                                onChange={handleTermChange}
                                onFocus={handleFocusedInput}
                                onBlur={handleBlurredInput}
                            />
                            <span
                                className={
                                    formSubmitted && term.error
                                        ? "input-years input-logo-error"
                                        : focusedInput === "term"
                                          ? "input-years input-logo-focused"
                                          : "input-years"
                                }>
                                years
                            </span>
                        </div>
                        {formSubmitted && term.error && <p className="error-text">{term.error}</p>}
                    </div>
                    <div className="mortgage-interest-container">
                        <label className="form-label__mortgage-interest">Interest Rate</label>
                        <div className="text-input-container">
                            <input
                                type="text"
                                value={rate.value}
                                name="rate"
                                className={
                                    formSubmitted && rate.error
                                        ? "input-error"
                                        : focusedInput === "rate"
                                          ? "input-focused"
                                          : ""
                                }
                                onChange={handleRateChange}
                                onFocus={handleFocusedInput}
                                onBlur={handleBlurredInput}
                            />
                            <span
                                className={
                                    formSubmitted && rate.error
                                        ? "input-percent input-logo-error"
                                        : focusedInput === "rate"
                                          ? "input-percent input-logo-focused"
                                          : "input-percent"
                                }>
                                %
                            </span>
                        </div>
                        {formSubmitted && rate.error && <p className="error-text">{rate.error}</p>}
                    </div>
                </div>
                <div className="mortgage-type-container">
                    <label className="form-label__mortgage-type">Mortgage Type</label>
                    <div className="mortgage-type-options-container">
                        <div
                            className={
                                type.value === "repayment" ? "mortgage-option highlighted-option" : "mortgage-option"
                            }>
                            <input
                                type="radio"
                                name="mortgage-type"
                                value="repayment"
                                id="repayment"
                                onChange={handleTypeChange}
                                checked={type.value === "repayment"}
                            />
                            <label htmlFor="repayment">Repayment</label>
                        </div>
                        <div
                            className={
                                type.value === "interest-only"
                                    ? "mortgage-option highlighted-option"
                                    : "mortgage-option"
                            }>
                            <input
                                type="radio"
                                name="mortgage-type"
                                value="interest-only"
                                id="interest-only"
                                onChange={handleTypeChange}
                                checked={type.value === "interest-only"}
                            />
                            <label htmlFor="interest-only">Interest Only</label>
                        </div>
                    </div>
                    {formSubmitted && type.error && <p className="error-text">{type.error}</p>}
                </div>
                <button type="submit">
                    <span>Calculate Repayments</span>
                </button>
            </form>
        </div>
    );
}
