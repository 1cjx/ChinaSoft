import Cookies from 'js-cookie'

const TokenKey = 'vue_admin_template_token'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

export function getUser() {
  return JSON.parse(Cookies.get("userinfo"));
}
export function setUser(user) {
  return Cookies.set("userinfo", JSON.stringify(user));
}
