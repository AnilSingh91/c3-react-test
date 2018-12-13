import httpRequest from '../apiServices'

const getUsers = (url) => {
    return httpRequest(url)
}

export default {
    getUsers
} 