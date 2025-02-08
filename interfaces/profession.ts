import Assets from "./assets";
import Income from "./income";
import Liabilities from "./liabilities";
import MonthlyExpenses from "./monthlyExpenses";

export default interface profession {
  name: string;
  income: Income;
  expenses: MonthlyExpenses;
  assets: Assets;
  liabilities: Liabilities;
  image: string;
}