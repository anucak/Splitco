import jsPDF from "jspdf";
import "jspdf-autotable";
import { imgData } from "./logoDataURL";
import { calibri, calibrib } from "./calibriBase64";
import { months } from "./months";

// function for generating a PDF file
export const generatePDF = (event, title, tableId, fileName) => {
	const now = new Date();
	const date = `${now.getDate()} ${months[now.getMonth()]}, ${now.getFullYear()}`;
	const doc = new jsPDF();

	doc.addFileToVFS("calibri.ttf", calibri);
	doc.addFont('calibri.ttf', 'calibri', 'normal');

	doc.addFileToVFS("calibrib.ttf", calibrib);
	doc.addFont('calibrib.ttf', 'calibrib', 'bold');

	doc.addImage(imgData, "JPEG", 170, 12, 20, 16);
	doc.setFont("calibri");
	doc.text(`${event}: ${title}`, 20, 32);
	doc.setFontSize(10);
	doc.text(`Created with Splitco (${date})`, 20, 38);

	doc.autoTable({
		html: `#${tableId}`,
		margin: { top: 44, left: 20, right: 20 },
		styles: {
			font: 'calibri',
		},
		headStyles: { fillColor: [80, 0, 80], font: "calibrib" },
		bodyStyles: { fillColor: false },
		footStyles: { textColor: 80, fillColor: [240, 230, 240] },
	});
	doc.save(`${event}_${fileName}.pdf`);
};

// function that checks whether two arrays have the same elements
/*  note: this function is not supposed to be used with arrays that have duplicate items (e.g. it returns true 
	in the following cases: 1. arr1 = [0, 1, 0], arr2 = [1, 0, 1], 2. arr1 = [0, 1, 1], arr2 = [1, 0, 2])  */
export const areArrayElementsEqual = (arr1, arr2) => {
	if (arr1.length !== arr2.length) {
		return false;
	}
	for (let i = 0; i < arr1.length; i++) {
		if (!arr2.includes(arr1[i])) {
			return false;
		}
	}
	return true;
};

// function for comparing items in two arrays
export const compareArrays = (arr1, arr2) => {
	const sameValues = arr1.filter((el) => arr2.includes(el)); // both arrays have these items
	const newValues = arr2.filter((el) => !arr1.includes(el)); // only the second array has these items
	const missingValues = arr1.filter((el) => !arr2.includes(el)); // only the first array has these items
	return {
		sameValues: sameValues,
		newValues: newValues,
		missingValues: missingValues,
	};
};

// function that suggests how to settle expenses
// it takes an object as an argument (with the following properties: name, amountPaid and totalExpense)
export const settleExpenses = (people) => {
	// these arrays will store objects
	let receivePayment = [];
	let givePayment = [];
	let paymentSuggestions = [];

	// set whether a person needs to receive or give payment
	Object.values(people).forEach((person) => {
		const balance = person.amountPaid - person.totalExpenses;
		if (balance > 0) {
			receivePayment.push({ name: person.name, amountToReceive: balance });
		} else if (balance < 0) {
			const amountToPay = Math.abs(balance);
			givePayment.push({ name: person.name, amountToPay: amountToPay });
		}
	});

	// sort the arrays by amountToReceive/amountToPay in descending order
	receivePayment.sort((a, b) => b.amountToReceive - a.amountToReceive);
	givePayment.sort((a, b) => b.amountToPay - a.amountToPay);

	for (let i = 0; i < receivePayment.length; i++) {
		for (let j = 0; j < givePayment.length; j++) {
			// first check whether amountToReceive and amountToPay is not zero
			if (
				receivePayment[i].amountToReceive !== 0 &&
				givePayment[j].amountToPay !== 0
			) {
				const from = givePayment[j].name;
				const to = receivePayment[i].name;
				let amount = 0;

				// when amountToReceive is greater or equal to amountToPay set amount to amountToPay
				if (receivePayment[i].amountToReceive >= givePayment[j].amountToPay) {
					amount = givePayment[j].amountToPay;
					receivePayment[i].amountToReceive -= amount;
					givePayment[j].amountToPay -= amount;
				} else {
					// when amountToReceive is smaller than amountToPay set amount to amountToReceive
					amount = receivePayment[i].amountToReceive;
					receivePayment[i].amountToReceive -= amount;
					givePayment[j].amountToPay -= amount;
				}

				paymentSuggestions.push({ from: from, to: to, amount: amount });
			}
		}
		// before the next iteration sort givePayment array in descending order by amountToPay
		givePayment.sort((a, b) => b.amountToPay - a.amountToPay);
	}

	return paymentSuggestions;
};
