import Assets from "./assets-temp";
import Income from "./income-temp";
import Liabilities from "./liabilities-temp";
import MonthlyExpenses from "./monthlyexpenses-temp";

// obj containing all information about a single user
export interface User {
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

export default User;
