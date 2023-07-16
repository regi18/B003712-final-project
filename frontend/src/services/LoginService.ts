import { post, get } from "./AjaxService";

export default class LoginService {
  static async login(username: string, password: string) {
    const res = await post('/login', { username, password });
    localStorage.setItem('token', res?.token);

    window.location.href = '/admin';
  }

  static isLoggedIn() {
    return localStorage.getItem('token') !== null;
  }

  static async logout() {
    await get('/logout');
    localStorage.removeItem('token');
    window.location.href = '/';
  }
}
