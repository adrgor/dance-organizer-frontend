const baseAddress = 'http://localhost'
const port = '8080'
const baseUrl = `${baseAddress}:${port}`
 
const ApiUrl = {
    LOGIN: `${baseUrl}/api/user/login`,
    REGISTER: `${baseUrl}/api/user/register`,
    EVENT_RESOURCE: `${baseUrl}/api/event`,
    EVENT_LAST_PAGE: `${baseUrl}/api/event/last_page`,
    MY_EVENT_RESOURCE: `${baseUrl}/api/event/my_events`,
    MY_EVENT_LAST_PAGE: `${baseUrl}/api/event/my_events/last_page`,
    CHANGE_STATUS: `${baseUrl}/api/event/change_status`
}

module.exports = ApiUrl