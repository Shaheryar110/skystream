import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth, db } from "../Firebase/Config";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  query,
  where,
} from "firebase/firestore";

const provider = new GoogleAuthProvider();

export const SignUpFirebase = async (obj) => {
  const { name, email, phone, password, confirmPassword } = obj;

  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;

    if (user) {
      await updateProfile(user, {
        displayName: name,
        phoneNumber: phone,
      });

      await addDoc(collection(db, "users"), {
        name: name,
        phone: phone,
        email: email,
        uid: user.uid,
      });

      return { res: true };
    }
  } catch (error) {
    console.error(error);

    return { res: false };
  }
};

export const LoginFirebase = async (obj) => {
  const { email, password } = obj;

  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    console.log(userCredential);

    return { success: true, user: userCredential.user };
  } catch (error) {
    console.error(error);

    const errorCode = error.code;
    const errorMessage = error.message;

    return { success: false, errorCode, errorMessage };
  }
};

export const AdminLogin = async (form) => {
  const { email, password } = form;
  const docRef = doc(db, "admin", "38PNHfZibn76b9GJ2sbQ");

  try {
    const snap = await getDoc(docRef);
    if (
      snap.exists() &&
      snap.data().email === email &&
      snap.data().password === password
    ) {
      console.log("admin Authentication successful");

      return { res: true };
    } else {
      console.log(" adminAuthentication failed");
      return { res: false };
    }
  } catch (error) {
    console.log(error, "error");
    return { res: false };
  }
};

export const signInGoogle = async () => {
  signInWithPopup(auth, provider)
    .then(async (result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      // The signed-in user info.
      const user = result.user;
      if (user) {
        await updateProfile(user, {
          displayName: user.displayName,
          phoneNumber: user.phoneNumber,
        });

        await addDoc(collection(db, "users"), {
          name: user.displayName,
          phone: user.phoneNumber,
          email: user.email,
          uid: user.uid,
        });

        return { res: true };
      }
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      const email = error.customData.email;
      const credential = GoogleAuthProvider.credentialFromError(error);
      console.log(errorCode, errorMessage, email, credential);
    });
};
