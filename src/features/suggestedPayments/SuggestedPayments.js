import { useSelector } from 'react-redux';
import { useParams } from "react-router-dom";
import { selectEvents } from '../events/eventsSlice';
import { currencies } from '../../utils/currencyData';
import { selectSuggestedPayments } from './suggestedPaymentsSlice';
import { generatePDF } from "../../utils/helperFunctions";

export default function SuggestedPayments() {
    const { eventId } = useParams();

    const events = useSelector(selectEvents);
    const event = events[eventId];

    const suggestedPayments = useSelector(selectSuggestedPayments);

    const currencySymbolSide = currencies[event.currency].symbolSide;
	const currencySymbol = currencies[event.currency].symbol;
	let sideLeft = true;
	let sideRight = false;

	if (currencySymbolSide === "R") {
		sideLeft = false;
		sideRight = true;
	}

    const savePDF = () => {
        // arguments: event name, title, tableId, fileName
        generatePDF(event.name, 'How to settle?', 'suggested-payments', 'suggested-payments');
    };

    if (Object.keys(suggestedPayments).length === 0) {
        return (
            <section>
                <div className="row">
                    <div className="col-md-6 offset-md-3">
                        <h2>No suggested payments</h2>
                        <p>Based on the data you've entered your expenses are already settled</p>
                    </div>
                </div>
            </section>
        )
    } else {
        return (
            <section>
                <div className="row justify-content-center">
                    <div className="col-md-10">
                        <h2>How to settle?</h2>
                        <p>Who pays whom how much</p>
                    </div>
                </div>
                <div className="row justify-content-center">
                    <div className="col-md-10">
                        <div className="table-responsive-md">
                            <table id="suggested-payments" className="table table-striped align-top text-nowrap">
                                <thead className="thead-purple align-top">
                                    <tr>
                                        <th scope="col"></th>
                                        <th scope="col">From</th>
                                        <th scope="col">To</th>
                                        <th scope="col">Amount</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {Object.values(suggestedPayments).map((payment, index) => (
                                        <tr key={index}>
                                            <td>{`${index + 1}.`}</td>
                                            <td>{payment.from}</td>
                                            <td>{payment.to}</td>
                                            <td>
                                                {`${
                                                    sideLeft ? currencySymbol : ""
                                                }${payment.amount.toFixed(2)}${
                                                    sideRight ? currencySymbol : ""
                                                }`}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col btn-container">
                        <button className="btn btn-purple" onClick={savePDF}>Save as PDF</button>
                    </div>
                </div>
            </section>
        )
    }
}