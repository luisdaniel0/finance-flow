import { useState } from "react";
import Papa from "papaparse";

const Imports = () => {
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
  const currentDate = new Date();
  const currentDateMonth = currentDate.getMonth();
  const currentDateYear = currentDate.getFullYear();

  const parsedImport = previewData.filter((entry) => {
    //get today's current date
    const entryDate = new Date(entry["Posting Date"]);
    console.log(entryDate);

    return (
      entryDate.getMonth() === currentDateMonth &&
      entryDate.getFullYear() === currentDateYear
    );
  });
  console.log(parsedImport);
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
        <div className="grid grid-cols-3 text-center">
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
      <div className="flex justify-center mt-10">
        <button className="rounded-lg p-3 bg-regal-blue font-bold cursor-pointer mr-10">
          Import
        </button>
        <button className="rounded-lg p-3 bg-regal-blue font-bold cursor-pointer">
          Cancel
        </button>
      </div>
    </div>
  );
};

//do we want to import all of the data? or only for the past month? how do we only import bank transactions from the last month?
//transform imported data into transactionList format and then pass that transformed data into transactionList

export default Imports;
