import { useState } from "react";
import Papa from "papaparse";
import { categorizeImportedTransactions } from "../services/apiCall";
import { createTransaction } from "../services/api";
import type { Transaction } from "../types";
import { UploadCloud } from "lucide-react";

//EDGE CASE:
//have to figure out how to parse only 31 days from today's date, maybe ask AI? right now
// its only returning data that matches the current date but what if its the 1st of the month?

//TODO: study and make sure to fully understand everything that is happening in this code.

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
    if (e.target.files === null) return;
    const file = e.target.files[0];
    Papa.parse<CSVRow>(file, {
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
    category: string;
  }): Promise<string> {
    try {
      const categorize = await categorizeImportedTransactions(
        transaction as Transaction,
        allCategories,
      );
      return categorize;
    } catch (error) {
      console.error(error);
      return "Other";
    }
  }

  const delay = (ms: number): Promise<void> =>
    new Promise((resolve) => setTimeout(resolve, ms));

  async function transformCSVData(csv: CSVRow[]) {
    setIsLoading(true);
    const results: Transaction[] = [];

    for (const element of csv) {
      const localData = {
        type: parseFloat(element.Amount) < 0 ? "expense" : "income",
        amount: Math.abs(parseFloat(element.Amount)),
        date: element["Posting Date"],
        description: element.Description,
        category: "Other",
      };

      const category = await categorizeTransactions(localData);

      const created = await createTransaction({
        type: localData.type,
        amount: localData.amount,
        date: localData.date,
        description: localData.description,
        category: category || "Other",
      });

      results.push(created);
      await delay(6000);
    }

    setTransactionList([...transactionList, ...results]);
    setIsLoading(false);
    setPreviewData([]);
  }

  return (
    <div className="flex-1 p-8 overflow-y-auto">
      <h1 className="text-2xl font-bold text-white">Import</h1>
      <p className="text-gray-400 mt-1 text-sm mb-8">
        Upload a CSV file to import your bank transactions.
      </p>

      {previewData.length === 0 && (
        <label className="flex flex-col items-center justify-center w-full max-w-lg h-48 bg-gray-800 border-2 border-dashed border-gray-600 rounded-xl cursor-pointer hover:border-[#646cff] hover:bg-gray-800/80 transition-colors">
          <UploadCloud size={32} className="text-gray-400 mb-3" />
          <p className="text-gray-300 font-medium text-sm">Click to upload a CSV file</p>
          <p className="text-gray-500 text-xs mt-1">Supports bank export format</p>
          <input
            type="file"
            accept=".csv"
            onChange={(e) => parseCSV(e)}
            className="hidden"
          />
        </label>
      )}

      {previewData.length > 0 && (
        <>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base font-semibold text-white">
              Transaction Preview
              <span className="text-gray-400 font-normal text-sm ml-2">
                (showing {Math.min(20, previewData.length)} of {previewData.length})
              </span>
            </h2>
          </div>

          <div className="bg-gray-800 rounded-xl border border-gray-700/50 overflow-hidden mb-6">
            <div className="grid grid-cols-3 px-4 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wide border-b border-gray-700">
              <span>Description</span>
              <span>Amount</span>
              <span>Date</span>
            </div>
            {previewData.slice(0, 20).map((data, index) => (
              <div
                key={index}
                className={`grid grid-cols-3 px-4 py-3 text-sm ${
                  index % 2 === 0 ? "bg-gray-800" : "bg-gray-800/50"
                }`}
              >
                <span className="text-gray-300 truncate pr-4">{data.Description}</span>
                <span
                  className={
                    parseFloat(data.Amount) < 0 ? "text-red-400" : "text-green-400"
                  }
                >
                  {parseFloat(data.Amount) < 0 ? "-" : "+"}$
                  {Math.abs(parseFloat(data.Amount)).toFixed(2)}
                </span>
                <span className="text-gray-400">{data["Posting Date"]}</span>
              </div>
            ))}
          </div>

          <div className="flex gap-3">
            <button
              className={`px-5 py-2 rounded-lg text-sm font-semibold transition-colors ${
                isLoading
                  ? "bg-gray-600 cursor-not-allowed text-gray-400"
                  : "bg-[#646cff] hover:bg-[#535bf2] cursor-pointer text-white"
              }`}
              onClick={() => transformCSVData(parsedImport.slice(0, 4))}
              disabled={isLoading}
            >
              {isLoading ? "Importing..." : "Import"}
            </button>
            <button
              className="px-5 py-2 rounded-lg text-sm font-semibold bg-gray-700 hover:bg-gray-600 cursor-pointer text-white transition-colors"
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
