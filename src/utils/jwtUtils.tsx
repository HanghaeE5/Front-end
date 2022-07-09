import jwtDecode from 'jwt-decode';
import { TokenList } from '../Types/Interface';

export class jwtUtils {
  static isAuth(token: string) {
    if (!token) {
      return false;
    }
    const decoded: TokenList = jwtDecode(token);
    // console.log(decoded);
    if (decoded.exp > new Date().getTime() / 1000) {
      return true;
    } else {
      return false;
    }
  }
  //
  static getId(token: string) {
    const decoded: TokenList = jwtDecode(token);
    return decoded.sub;
  }

  static nickId(token: string) {
    const decoded: TokenList = jwtDecode(token);
    // console.log(decoded);
    return decoded.nick;
  }
}
