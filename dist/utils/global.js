"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLocalTime = getLocalTime;
const date_fns_tz_1 = require("date-fns-tz");
function getLocalTime() {
    try {
        const utcDate = new Date().getUTCDate(); // Current date in UTC
        const localDate = (0, date_fns_tz_1.toZonedTime)(utcDate, "Africa/Nairobi"); // Convert to local date
        const formattedDate = (0, date_fns_tz_1.format)(localDate, 'yyyy-MM-dd HH:mm:ssXXX', { timeZone: "Africa/Nairobi" });
        return { localDate, formattedDate };
    }
    catch (error) {
        console.error(error);
        return null;
    }
}
// TODO: Move to backend
function calculateError(value) {
    const marginOfError = 0.01000 + Math.random() * (0.05000 - 0.01000); // 1% - 5%
    const randomError = value * marginOfError;
    const randomSign = Math.random() < 0.5 ? -1 : 1; // -1 here means underestimation error, and 1 means overestimation error
    return {
        errorValue: (randomSign * randomError),
        marginOfError
    };
}
// TODO: Move to backend
function calculateScore(value) {
    const error = calculateError(1); // Total probability (1), probability of error = total probability of all action * margin of error
    switch (value) {
        case 0:
            const marginOfError = 0.01000 + Math.random() * (0.10000 - 0.01000); // 1% - 10%
            return Object.assign({ score: (value + marginOfError) }, error);
        case 1:
            const marginOfError2 = 0.01000 + Math.random() * (0.10000 - 0.01000); // 1% - 10%
            const randomError = value * marginOfError2;
            return Object.assign({ score: (value - randomError) }, error);
        default:
            return Object.assign({ score: (value + error.errorValue) }, error);
    }
}
