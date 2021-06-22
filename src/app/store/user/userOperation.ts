import {
  auth,
  db,
  sessionPersistance,
  fieldValue,
} from "../../../lib/firebase";
import { setUser } from "./userSlice";
import { AppThunk } from "../../store";
import { UserInfoType } from "../userinfo/userinfoSlice";
import { registerUserInfo } from "../userinfo/userinfoOperation";
import { USER_TABLE_PATH, USER_TABLE_ID } from "../../../state/admin";
import { useHistory } from "react-router";

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
  (password: string, userInfo: UserInfoType): AppThunk =>
  (dispatch) => {
    auth.setPersistence(sessionPersistance).then(() => {
      auth
        .createUserWithEmailAndPassword(userInfo.email!, password)
        .then(() => {
          let user = auth.currentUser;
          if (user !== null) {
            let uid = user.uid;
            let name: string = userInfo.username!;
            userInfo.uid = uid;
            dispatch(setUser({ uid, name }));
            dispatch(registerUserInfo(userInfo));
            db.collection(USER_TABLE_PATH)
              .doc(USER_TABLE_ID)
              .update({ userData: fieldValue.arrayUnion(userInfo) })
              .then(() => {
                console.log("管理者への登録成功");
              })
              .catch((e) => {
                alert(e);
              });
          }
        })
        .catch((error) => {
          alert(error);
        });
    });
  };
