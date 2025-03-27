import React, { useEffect, useState } from "react";
import { Alert } from "react-native";
import blankUser from "../../../data/testData/blankUser";
import QRType, { QRTransaction } from "../../../interfaces/QrScan";
import { Icon } from "../../../interfaces/User";
import formatUSD from "../../../utils/currencyUtil";
import ConfirmationModal from "../features/ConfirmationModal";

interface ScannerPopupProps {
    scanData: QRType | null;
    onConfirm: (scan: QRType) => void;
    onCancel: () => void;
}

const ScannerPopup: React.FC<ScannerPopupProps> = ({ scanData, onConfirm, onCancel }) => {
    const [popupVisible, setPopupVisible] = useState(false);

    useEffect(() => {
        if (scanData) setPopupVisible(true);
    }, [scanData])

    // get top level changed fields from the data prop on scans
    const getChangedFields = (data: Record<string, any>): string[] => {
        if (!data || typeof data !== "object") return [];
        return Object.keys(data);  
    };

    // verify the passed object has matching fields from User
    const isFieldInUser = (field: string): boolean => {
        return field in blankUser;
    };

    // format popup message depending on transaction type
    const getPopupMessage = (transaction: QRTransaction): {
        title: string;
        professionIcon?: Icon;
        message: string;
        confirmText?: string;
        cancelText?: string;
    } | undefined => {
        if (!transaction || !transaction.data) return undefined;
        const type = transaction.type.toLowerCase();
        const data = transaction.data;
        const formattedAmount = formatUSD(transaction.amount);
        const changedFields = data ? getChangedFields(data).join(", ") || "Unknown" : "Unknown";

        let title = "";
        let message = "";
        let confirmText: string | undefined;
        let cancelText: string | undefined;
        let professionIcon: Icon | undefined = data.professionIcon && isFieldInUser("professionIcon")
            ? data.professionIcon
            : undefined;

        switch (type.toLowerCase()) {
            case "Salary":
                title = "Salary Change";
                message = `Your salary has changed.\nNew Salary: ${formattedAmount}`;
                confirmText = "Accept";
                cancelText = "Decline";
                break;

            case "Passive Income":
                title = "New Passive Income!";
                message = `You've received passive income: ${formattedAmount}\nSources: **${changedFields}**`;
                confirmText = "Claim";
                cancelText = "Ignore";
                break;

            case "Expense":
                title = "New Expenses Recorded";
                message = `New **${changedFields}**\nTotal: ${formattedAmount}`;
                break;

            case "Asset":
                title = "New Asset";
                message = `New **${changedFields}**\nValue: ${formattedAmount}`;
                confirmText = "Accept";
                break;

            case "Liability":
                title = "New Liabilities";
                message = `New **${changedFields}**\nTotal: ${formattedAmount}`;
                confirmText = "Accept";
                break;

            case "Career":
                title = "You're Hired!";
                message = `You're now a **${data?.profession || "Unknown"}**.\nCongratulations on the new job!`;
                confirmText = "Thanks!";
                professionIcon = data.professionIcon ?? undefined;
                break;

            default:
                title = "Standard Transaction";
                message = `A change has been made to your finances.\n Changes to: **${changedFields}**\nAmount: ${formattedAmount}`;
                break;
        }

        return {
            title,
            message,
            confirmText,
            cancelText,
            professionIcon,
        };
    };

    // Runs when confirm is pressed
    const handleConfirm = () => {
        if (!scanData) {
            Alert.alert("Error", "No transaction data found.");
            return;
        }
        setPopupVisible(false);
        onConfirm(scanData);
    };

    // Runs when cancel is pressed
    const handleCancel = () => {
        setPopupVisible(false);
        onCancel();
    };

    const popupInfo = scanData ? getPopupMessage(scanData.data) : undefined;

    return (
        <>
            {popupVisible && popupInfo && (
                <ConfirmationModal
                    isVisible={popupVisible}
                    title={popupInfo.title}
                    professionIcon={popupInfo.professionIcon}
                    message={popupInfo.message}
                    confirmText={popupInfo.confirmText}
                    cancelText={popupInfo.cancelText}
                    onConfirm={handleConfirm}
                    onCancel={handleCancel}
                />
            )}
        </>
    );
};

export default ScannerPopup;
