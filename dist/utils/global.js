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
