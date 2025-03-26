export const formatTimestamp = (input: string | Date) => {
  try {
    let date: Date;

    // Check if timestamp is already formatted
    if (typeof input === "string") {
      const parsedDate = new Date(input);

      // If parsing fails, assume it's already formatted and return
      if (isNaN(parsedDate.getTime())) {
        return input;
      }

      // Otherwise, use the parsed Date
      date = parsedDate;
    } else if (input instanceof Date) {
      date = input;
    } else {
      throw new Error("Invalid input type for timestamp. Must be a Date or valid string.");
    }

    // Check if the input has time
    const hasTime = typeof input === "string" && (input.includes(":") || input.includes("T"));

    if (hasTime) {
      // Format date and time
      return date.toLocaleString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
        hour: "numeric",
        minute: "numeric",
        hour12: true,
      });
    } else {
      // Format date only
      return date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      });
    }
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error formatting timestamp:", error.message);
    } else {
      console.error("Unknown error formatting timestamp:", error);
    }

    return "Invalid timestamp";
  }
};

export default formatTimestamp;
