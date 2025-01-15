import {format, toZonedTime} from "date-fns-tz";

export function getLocalTime(): { localDate: Date, formattedDate: string } | null {
    try {
        const utcDate = new Date().getUTCDate(); // Current date in UTC
        const localDate = toZonedTime(utcDate, "Africa/Nairobi"); // Convert to local date
        const formattedDate = format(localDate, 'yyyy-MM-dd HH:mm:ssXXX', { timeZone: "Africa/Nairobi" });

        return { localDate, formattedDate };
    } catch (error) {
        console.error(error);
        return null;
    }
}

// TODO: Move to backend
function calculateError(value: number): { errorValue: number, marginOfError: number } {
    const marginOfError = 0.01000 + Math.random() * (0.05000 - 0.01000); // 1% - 5%
    const randomError = value * marginOfError;
    const randomSign = Math.random() < 0.5 ? -1 : 1; // -1 here means underestimation error, and 1 means overestimation error

    return {
        errorValue: (randomSign * randomError),
        marginOfError
    };
}

// TODO: Move to backend
function calculateScore(value: number): { score: number, errorValue: number, marginOfError: number } {
    const error = calculateError(1); // Total probability (1), probability of error = total probability of all action * margin of error

    switch (value) {
        case 0:
            const marginOfError = 0.01000 + Math.random() * (0.10000 - 0.01000); // 1% - 10%
            return {
                score: (value + marginOfError), // Add the probability of error value to the probability of selected value to get the total score
                ...error
            };
        case 1:
            const marginOfError2 = 0.01000 + Math.random() * (0.10000 - 0.01000); // 1% - 10%
            const randomError = value * marginOfError2;
            return {
                score: (value - randomError), // Add the probability of error value to the probability of selected value to get the total score
                ...error
            };

        default:
            return {
                score: (value + error.errorValue), // Add the probability of error value to the probability of selected value to get the total score
                ...error
            };
    }
}
