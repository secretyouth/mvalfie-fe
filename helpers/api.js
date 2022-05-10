import axios from 'axios'
import { addDays } from 'date-fns'

export function getCookie(name) {
    const matches = document.cookie.match(new RegExp('(?:^|; )' + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + '=([^;]*)'))

    return matches ? decodeURIComponent(matches[1]) : undefined
}
// export const baseURL = process.env.API_URL || 'https://api.mvalfieandco.com.au'
// //export const baseURL = 'http://localhost:1337'

export const baseURL = process.env.API_URL || 'https://api.mvalfieandco.com.au'
// export const baseURL = 'https://api.mvalfieandco.com.au'

const api = axios.create({
    baseURL,
})

export const getUser = async (fresh) => {
    try {
        if (fresh) {
            const jwt = getCookie('jwt')
            api.defaults.headers.common['Authorization'] = `Bearer ${jwt}`

            const response = await api.get('users/me')

            storeUser(response.data)
            return response.data
        }

        const user = getCookie('user')
        if (user) return JSON.parse(atob(user))
        return false
    } catch (err) {
        if (err.response && err.response.data.statusCode === 401) logout()
    }
}

export const storeToken = (payload, callback) => {
    // store token & user into cookie (SAFER)
    document.cookie = `jwt=${payload.jwt}; SameSite=Strict; expires=${addDays(new Date(), 28)};`
    document.cookie = `user=${window.btoa(JSON.stringify(unescape(payload.user)))}; expires=${addDays(new Date(), 28)}; SameSite=Strict;`

    api.defaults.headers.common['Authorization'] = `Bearer ${payload.jwt}`

    if (callback) callback()
}
export const storeUser = (user) => {
    // store token & user into cookie (SAFER)
    document.cookie = `user=${window.btoa(JSON.stringify(user))}; expires=${addDays(new Date(), 28)}; SameSite=Strict;`
}

export const logout = () => {
    delete api.defaults.headers.common['Authorization']

    // store token & user into local
    document.cookie = 'jwt=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'
    document.cookie = 'user=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'
}

export default api
