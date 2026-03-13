const set = (key: string, value: string) => {
  if (typeof window !== "undefined") {
    window.localStorage.setItem(key, value)
  }
}

const get = (key: string) => {
  if (typeof window !== "undefined") {
    return window.localStorage.getItem(key)
  }
  return null
}

const remove = (key: string) => {
  if (typeof window !== "undefined") {
    window.localStorage.removeItem(key)
  }
}

export const localStore = { set, get, remove }