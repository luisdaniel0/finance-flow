import { useState } from "react";
import Papa from "papaparse";
import { categorizeImportedTransactions } from "../services/apiCall";
import { Transaction } from "../types";

//EDGE CASE:
//have to figure out how to parse only 31 days from today's date, maybe ask AI? right now
// its only returning data that matches the current date but what if its the 1st of the month?

//TODO: study and make sure to fully understand everything that is happening in this code. there is a lot to digest, and half of it was claude

interface ImportProps {
  transactionList: Transaction[];
  setTransactionList: React.Dispatch<React.SetStateAction<Transaction[]>>;
}

interface CSVRow {
  Description: string;
  Amount: string;
  "Posting Date": string;
}

const Imports = ({ transactionList, setTransactionList }: ImportProps) => {
  const [previewData, setPreviewData] = useState<CSVRow[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const allCategories = [
    "Groceries",
    "Transportation",
    "Dining",
    "Bills",
    "Shopping",
    "Healthcare",
    "Salary",
    "Freelance",
    "Business",
    "Investment",
    "Gift",
    "Bonus",
    "Refund",
    "Other",
  ];

  function parseCSV(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files === null) {
      return;
    }
    const file = e.target.files[0];
    Papa.parse<CSVRow>(file, {
      header: true,
      complete: function (results) {
        console.log(results);
        setPreviewData(results.data);
      },
    });
  }

  const currentDate = new Date();
  const currentDateMonth = currentDate.getMonth();
  const currentDateYear = currentDate.getFullYear();

  const parsedImport = previewData.filter((entry) => {
    const entryDate = new Date(entry["Posting Date"]);

    return (
      entryDate.getMonth() === currentDateMonth &&
      entryDate.getFullYear() === currentDateYear
    );
  });

  async function categorizeTransactions(transaction: {
    type: string;
    amount: number;
    date: string;
    description: string;
    id: number;
    category: string;
  }) {
    try {
      const categorize = await categorizeImportedTransactions(
        transaction,
        allCategories,
      );
      return categorize;
    } catch (error) {
      console.error(error);
      return "Other";
    }
  }
  const delay = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));

  async function transformCSVData(csv: CSVRow[]) {
    setIsLoading(true);
    const transformed = csv.map((element, index) => {
      return {
        type: parseFloat(element.Amount) < 0 ? "expense" : "income",
        amount: Math.abs(parseFloat(element.Amount)),
        date: element["Posting Date"],
        description: element.Description,
        id: Date.now() + index,
        category: "Other",
      };
    });
    const results = [];

    for (const transaction of transformed) {
      const api = await categorizeTransactions(transaction);
      const newObj = { ...transaction, category: api || "Other" };
      results.push(newObj);
      await delay(6000);
    }

    setTransactionList([...transactionList, ...results]);
    setIsLoading(false);
    setPreviewData([]);
  }

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
        <>
          <h1 className="m-7 text-center font-bold text-lg ">
            Transaction Preview<br></br> (Showing 20 of {previewData.length}{" "}
            transactions)
          </h1>
          <div className="grid grid-cols-3 text-center border p-2 font-bold">
            <div>Name</div>
            <div>Amount</div>
            <div>Date</div>
          </div>
        </>
      )}

      <div>
        {previewData.slice(0, 20).map((data, index) => (
          <div className="grid grid-cols-3 text-center border" key={index}>
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
              className={`rounded-lg p-3 font-bold mr-10 ${isLoading ? "bg-gray-500 cursor-not-allowed" : "bg-regal-blue cursor-pointer"}`}
              onClick={() => transformCSVData(parsedImport.slice(0, 4))}
              disabled={isLoading}
            >
              {isLoading ? "Importing..." : "Import"}
            </button>
            <button
              className="rounded-lg p-3 bg-regal-blue font-bold cursor-pointer"
              onClick={() => setPreviewData([])}
            >
              Cancel
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Imports;
