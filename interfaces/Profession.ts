import Assets from "./Assets";
import Income from "./Income";
import Liabilities from "./Liabilities";
import MonthlyExpenses from "./MonthlyExpenses";

export default interface Profession {
  name: string;
  scanType: "Profession";
  income: Income;
  expenses: MonthlyExpenses;
  assets: Assets;
  liabilities: Liabilities;
}
