import { auth, sessionPersistance } from "../../../lib/firebase";
import { setUser } from "./userSlice";
import { AppThunk } from "../../store";
import { UserInfoType } from "../userinfo/userinfoSlice";
import { registerUserInfo } from "../userinfo/userinfoOperation";

// //ログイン
export const login = (email: string, password: string) => {
  auth.setPersistence(sessionPersistance).then(() => {
    auth
      .signInWithEmailAndPassword(email, password)
      .then(() => {})
      .catch((e) => {});
  });
};

//ログアウト
export const logout = () => {
  auth
    .signOut()
    .then(() => {})
    .catch((e) => {});
};

//新規登録
export const register =
  (email: string, password: string, userInfo: UserInfoType): AppThunk =>
  (dispatch) => {
    auth.setPersistence(sessionPersistance).then(() => {
      auth
        .createUserWithEmailAndPassword(email, password)
        .then(() => {
          let user = auth.currentUser;
          if (user !== null) {
            let uid = user.uid;
            userInfo.uid = uid;
            let name = user.displayName;
            dispatch(setUser({ uid, name }));
            dispatch(registerUserInfo(userInfo));
          }
        })
        .catch((error) => {
          alert(error);
        });
    });
  };
