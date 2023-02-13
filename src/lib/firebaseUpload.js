import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import app from "./firebase";
import { publicRequest } from "./requestMethods";

export const uploadFile = (file, values, url, finishTask) => {
  const storage = getStorage(app);
  const filename = Math.random() * 6 + file.name;
  const storageRef = ref(storage, `articles/${filename}`);
  const uploadTask = uploadBytesResumable(storageRef, file);

  uploadTask.on(
    "state_changed",
    (snapshot) => {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log("Upload is " + progress + "% done");
      switch (snapshot.state) {
        case "paused":
          console.log("Upload is paused");
          break;
        case "running":
          console.log("Upload is running");
          break;
      }
    },
    (error) => {},
    () => {
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        finishTask(url, downloadURL, values);
      });
    }
  );
};
