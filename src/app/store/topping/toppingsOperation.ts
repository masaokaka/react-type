import { db } from "../../../lib/firebase";
import { setToppings } from "./toppingsSlice";
import { AppThunk } from "../../store";
import { TOPPING_TABLE_ID, TOPPING_TABLE_PATH } from "../../../state/admin";

//アイテムの取得
export const fetchToppings = (): AppThunk => (dispatch) => {
  db.collection(TOPPING_TABLE_PATH)
    .doc(TOPPING_TABLE_ID)
    .get()
    .then((doc) => {
      if (doc.exists) {
        let data = doc.data();
        if (data !== undefined) {
          dispatch(setToppings(data.toppingData));
        }
      }
    })
    .catch((error) => {
      alert(error);
    });
};
