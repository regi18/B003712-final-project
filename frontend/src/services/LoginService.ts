export default class LoginService {
  static login(username: string, password: string) {
    console.log('login');
    localStorage.setItem('token', '1234567890');
    window.location.href = '/user';
  }

  static register(email: string, username: string, password: string) {
    console.log('register');
  }

  static isLoggedIn() {
    return localStorage.getItem('token') !== null;
  }
}
