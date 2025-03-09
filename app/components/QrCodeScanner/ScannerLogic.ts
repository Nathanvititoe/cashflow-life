import Profession from "../../../interfaces/Profession";
import User, { Icon } from "../../../interfaces/User";

/**
 * Get the icon name that matches the profession name,
 * and the library the icon comes from within expo/vector icons
 *
 * @param professionName - name of newly scanned profession
 * @returns a string for the expo/vector AntDesign icon name
 */
export const getIcon = (professionName: string): Icon => {
  const iconMapping: { [key: string]: Icon } = {
    Airline_Pilot: { name: "plane-departure", library: "FontAwesome6" },
    Business_Manager: { name: "user-tie", library: "FontAwesome6" },
    Doctor: { name: "user-doctor", library: "FontAwesome6" },
    Engineer: { name: "user-gear", library: "FontAwesome6" },
    Janitor: { name: "cleaning-services", library: "MaterialIcons" },
    Lawyer: { name: "law", library: "Octicons" },
    Nurse: { name: "user-nurse", library: "FontAwesome6" },
    Police_Officer: { name: "handcuffs", library: "FontAwesome6" },
    Secretary: { name: "old-phone", library: "Entypo" },
    Teacher: { name: "chalkboard-teacher", library: "FontAwesome5" },
    Truck_Driver: { name: "truck", library: "FontAwesome5" },
  };

  return (
    iconMapping[professionName] || {
      name: "questioncircle",
      library: "AntDesign",
    }
  );
};

/**
 *  populate fields on the user object from the incoming profession (for user defaults)
 * @param scannedProfession - scanned in profession object
 * @param currentUser - copy of current user object state
 * @returns a new User object with the scanned fields updated
 */
export const populateFirstProfession = (
  scannedProfession: Profession,
  currentUser: User
): User => {
  const userInitialValues: User = {
    ...currentUser,
    profession: scannedProfession.name,
    incomeExplained: scannedProfession.income,
    expensesExplained: scannedProfession.expenses,
    Assets: scannedProfession.assets,
    Liabilities: scannedProfession.liabilities,
    professionIcon: getIcon(scannedProfession.name),
  };
  return userInitialValues;
};

/* only populate profession name, icon and salary for all professions after the first */
export const populateLaterProfession = (
  scannedProfession: Profession,
  currentUser: User
): User => {
  const userInitialValues = {
    ...currentUser,
    profession: scannedProfession.name,
    incomeExplained: {
      ...currentUser.incomeExplained,
      salary: scannedProfession.income.Salary,
    },
    professionIcon: getIcon(scannedProfession.name),
  };
  return userInitialValues;
};
export default populateFirstProfession;
