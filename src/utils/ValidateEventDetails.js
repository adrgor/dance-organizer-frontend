export default function validateEventDetails(details) {
    if (!details.eventName) {
        return "Event has to have a name!"
    }
    if (details.startDate > details.endDate) {
        return "Invalid event time duration!"
    }
}