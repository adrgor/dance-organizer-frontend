const baseAddress = 'http://localhost'
const port = '8080'
const baseUrl = `${baseAddress}:${port}`
 
const ApiUrl = {
    LOGIN: `${baseUrl}/api/user/login`,
    REGISTER: `${baseUrl}/api/user/register`,
    EVENT_RESOURCE: `${baseUrl}/api/event`
}

module.exports = ApiUrl