import conf from "../conf/conf.js";
import { Client, Account, ID } from "appwrite";

export class AuthService {
  client = new Client();
  account;

  constructor() {
    this.client
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId);
    this.account = new Account(this.client);
  }

  // sign up
  async createAccount({ email, password, name }) {
    try {
      const userAccount = await this.account.create(
        ID.unique(),
        email,
        password,
        name
      );
      if (userAccount) {
        // call login method
        return this.login({ email, password });
      } else {
        return userAccount;
      }
    } catch (error) {
      console.log("Appwrite service :: createAccount :: Error:", error.message);
    }
  }

  // login
  async login({ email, password }) {
    try {
      return await this.account.createEmailPasswordSession(email, password);
    } catch (error) {
      console.log("Appwrite service :: login :: Error:", error.message);
    }
  }

  // get current user
  async getCurrentUser() {
    try {
      const userData = await this.account.get();
      if (userData) return userData;
    } catch (error) {
      console.log(
        "Appwrite service :: getCurrentUser :: Error:",
        error.message
      );
    }
    console.log("get current user");
  }

  // logout
  async logout() {
    try {
      await this.account.deleteSessions();
      return true;
    } catch (error) {
      console.log("Appwrite service :: logout :: Error:", error.message);
    }
    return false;
  }
}

const authService = new AuthService();
export default authService;
