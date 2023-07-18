import router from '@/router';
import { post, get } from './AjaxService';


export default class LoginService {
  static async login(username: string, password: string) {
    const res = await post('/login', { username, password });
    localStorage.setItem('token', res?.token);

    await router.push('/admin');
    router.go(0);
  }

  static isLoggedIn() {
    return localStorage.getItem('token') !== null;
  }

  static async logout() {
    await get('/logout');
    localStorage.removeItem('token');
    await router.push('/');
    router.go(0);
  }
}
