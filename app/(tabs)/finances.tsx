/*
 * expo-router looks for your tab files within the Tabs directory
 * this file gives expo-router something to find
 *  and points to the correct component
 */
import FinancialStatement from "../components/UserFinances/FinancialStatement";

export default function FinancesTab() {
  return <FinancialStatement />;
}
