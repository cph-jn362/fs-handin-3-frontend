import { ProblemEntity } from "./ProblemEntity";
import axios from "axios";

export class ProblemAPI {
  static ip: string = "192.168.1.94";

  static async create(problem: ProblemEntity) {
    try {
      console.log("sending data", problem);
      const result = await axios.post("http://" + this.ip + ":3003/problem", {
        data: problem,
        headers: { "Content-Type": "multipart/form-data" },
      });
      return result.data;
    } catch (error) {}
  }
  
  static async fetchAllProblems() {
    try {
      const result = await axios.get("http://" + this.ip + ":3003/problem");
      console.log(result);
      return result.data;
    } catch (error) {
      console.log("error", error);
    }
  }
}
