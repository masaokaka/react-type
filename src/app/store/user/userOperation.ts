import { auth, sessionPersistance } from "../../../lib/firebase";
import { setUser } from "./userSlice";
import { AppThunk } from "../../store";

// //ログイン
export const login = async (email: string, password: string) => {
  auth.setPersistence(sessionPersistance).then(() => {
    auth
      .signInWithEmailAndPassword(email, password)
      .then(() => {})
      .catch((e) => {});
  });
};

//ログアウト
export const logout = async () => {
  auth
    .signOut()
    .then(() => {})
    .catch((e) => {});
};

//新規登録
export const register =
  (email: string, password: string): AppThunk =>
  (dispatch) => {
    auth.setPersistence(sessionPersistance).then(() => {
      auth
        .createUserWithEmailAndPassword(email, password)
        .then(() => {
          let user = auth.currentUser;
          if (user !== null) {
            let uid = user.uid;
            let name = user.displayName;
            dispatch(setUser({ uid, name }));
          }
        })
        .catch((error) => {
          alert(error);
        });
    });
  };
