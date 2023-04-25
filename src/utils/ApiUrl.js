const baseAddress = 'http://localhost'
const port = '8080'
const baseUrl = `${baseAddress}:${port}`
 
const ApiUrl = {
    // User
    LOGIN: `${baseUrl}/api/user/login`,
    REGISTER: `${baseUrl}/api/user/register`,

    // Event
    EVENT_RESOURCE: `${baseUrl}/api/event`,
    EVENT_LAST_PAGE: `${baseUrl}/api/event/last_page`,
    MY_EVENT_RESOURCE: `${baseUrl}/api/event/my_events`,
    MY_EVENT_LAST_PAGE: `${baseUrl}/api/event/my_events/last_page`,
    CHANGE_STATUS: `${baseUrl}/api/event/change_status`,
    EDIT_EVENT: `${baseUrl}/api/event/edit`,

    // Registration dashboard
    TICKET: `${baseUrl}/api/registration-dashboard/ticket`,
    PRODUCT: `${baseUrl}/api/registration-dashboard/product`,
}

module.exports = ApiUrl