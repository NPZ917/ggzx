export const SET_TOKEN = (key: string, data: string) => localStorage.setItem(key, data)
export const GET_TOKEN = (key: string) => localStorage.getItem(key)
export const REMOVE_TOKEN = (key: string) => localStorage.removeItem(key)
