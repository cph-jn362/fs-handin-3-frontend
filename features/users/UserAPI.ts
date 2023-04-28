import { UserEntity } from "./UserEntity";
import axios from "axios";

export class UserAPI {
  static ip: string = "192.168.1.94";

  static async signup(user: UserEntity) {
    try {
      const result = await axios.post(
        "http://" + this.ip + ":3003/auth/signup",
        user
      );
      console.log("back from server", result.data);

      return result.data;
    } catch (error) {}
  }

  static async login(user: UserEntity) {
    try {
      const result = await axios.post(
        "http://" + this.ip + ":3003/auth/login",
        user
      );

      return result.data;
    } catch (error) {}
  }
}
