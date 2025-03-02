import Assets from "./Assets";
import Income from "./Income";
import Liabilities from "./Liabilities";
import MonthlyExpenses from "./MonthlyExpenses";

// obj containing all information about a single user
export default interface User {
  name: string;
  profession: string;
  totalIncome: number;
  incomeExplained: Income;
  totalExpenses: number;
  expensesExplained: MonthlyExpenses;
  Assets: Assets;
  Liabilities: Liabilities;
  Children: number;
  ChildCost: number;
  professionIcon: Icon; // this should be the name of the expo/vector icon for the profession and which library its from
}

export interface Icon {
  name: string;
  library:
    | "AntDesign"
    | "FontAwesome6"
    | "MaterialIcons"
    | "Octicons"
    | "Entypo"
    | "FontAwesome5";
}
