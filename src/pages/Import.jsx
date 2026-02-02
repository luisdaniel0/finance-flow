import { useState } from "react";
import Papa from "papaparse";

//Details: Credit/DSLIP = income, DEBIT=Expense
//Split description and grab first 2 words to pass to transaction

//EDGE CASE:
//have to figure out how to parse only 31 days from today's date, maybe ask AI? right now
// its only returning data that matches the current date but what if its the 1st of the month?

/*
how to get Category off the csv data? 
do i need reformat the Date in transactionList? 


*/

const Imports = ({ transactionList, setTransactionList }) => {
  const [previewData, setPreviewData] = useState([]);
  function parseCSV(e) {
    const file = e.target.files[0];
    Papa.parse(file, {
      header: true,
      complete: function (results) {
        setPreviewData(results.data);
      },
    });
  }

  const currentDate = new Date("2026-01-30");
  const currentDateMonth = currentDate.getMonth();
  const currentDateYear = currentDate.getFullYear();

  const parsedImport = previewData.filter((entry) => {
    const entryDate = new Date(entry["Posting Date"]);

    return (
      entryDate.getMonth() === currentDateMonth &&
      entryDate.getFullYear() === currentDateYear
    );
  });

  function transformCSVData(csv) {
    const transformed = csv.map((element, index) => {
      return {
        type: parseFloat(element.Amount) < 0 ? "expense" : "income",
        amount: Math.abs(parseFloat(element.Amount)),
        date: element["Posting Date"],
        description: element.Description,
        id: Date.now() + index,
        category: "Uncategorized",
      };
    });
    console.log("transformed", transformed);
    setTransactionList([...transactionList, ...transformed]);
  }
  console.log("transactionList State:", transactionList);

  return (
    <div className="w-full p-8 m-8">
      <label>
        Upload your CSV file:{" "}
        <input
          type="file"
          accept=".csv"
          onChange={(e) => parseCSV(e)}
          className="border"
        />
      </label>
      {previewData.length > 0 && (
        <div className="grid grid-cols-3 text-center mt-15">
          <div>Name</div>
          <div>Amount</div>
          <div>Date</div>
        </div>
      )}

      <div>
        {previewData.slice(0, 20).map((data, index) => (
          <div className="grid grid-cols-3 text-center" key={index}>
            <div>
              <span>{data.Description}</span>
            </div>
            <div>
              <span>{data.Amount}</span>
            </div>
            <div>
              <span>{data["Posting Date"]}</span>
            </div>
          </div>
        ))}
      </div>
      {previewData.length > 0 && (
        <>
          <div className="flex justify-center mt-10">
            <button
              className="rounded-lg p-3 bg-regal-blue font-bold cursor-pointer mr-10"
              onClick={() => transformCSVData(parsedImport)}
            >
              Import
            </button>
            <button className="rounded-lg p-3 bg-regal-blue font-bold cursor-pointer">
              Cancel
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Imports;
