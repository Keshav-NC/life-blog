import conf from "../conf/conf";
import { Client, Storage, ID } from "appwrite";

export class StorageService {
  client = new Client();
  storage;

  constructor() {
    this.client
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId);
    this.storage = new Storage(this.client);
  }

  // upload file --> img
  async uploadFile(file) {
    try {
      return await this.storage.createFile(
        conf.appwriteBucketId,
        ID.unique(), // fileID is generated automatically
        file
      );
    } catch (error) {
      console.log("Appwrite service :: uploadFile :: Error:", error);
      return false;
    }
  }

  // delete file --> img
  async deleteFile(fileId) {
    try {
      await this.storage.deleteFile(conf.appwriteBucketId, fileId);
      return true;
    } catch (error) {
      console.log("Appwrite service :: deleteFile :: Error:", error);
    }
    return false;
  }

  // get file preview (image --> jpeg, png, jpg etc.)
  getFilePreview(fileId) {
    try {
      const file = this.storage.getFileView(conf.appwriteBucketId, fileId);
      return file;
    } catch (error) {
      console.log("Appwrite service :: getFilePreview :: Error:", error);
    }
  }
}

const storageService = new StorageService();

export default storageService;
