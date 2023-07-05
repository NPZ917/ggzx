export const SET_TOKEN = (key: string, data: string) => localStorage.setItem(key, data)
export const GET_TOKEN = (key: string) => localStorage.getItem(key)
