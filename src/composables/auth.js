import { useCookies } from "@vueuse/integrations/useCookies";

const tokenKey = "admin-token";
const cookies = useCookies();

// get token
export function getToken() {
  return cookies.get(tokenKey);
}

export function setToken(token) {
  cookies.set(tokenKey, token);
}

export function removeToken() {
  cookies.remove(tokenKey);
}
