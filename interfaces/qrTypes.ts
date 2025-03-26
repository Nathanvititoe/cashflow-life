import Profession from "./Profession";
import Transaction from "./Transaction";

// obj containing all scannable types
export default interface QRType {
  type: string;
  data: QRData;
  scanType?: "Profession" | "Transaction" | "RealEstateTransaction";
}

// Define a union type for scanned QR data
export type QRData = Profession | Transaction;
