import { db } from "../../../lib/firebase";
import { setItems } from "./itemsSlice";
import { AppThunk } from "../../store";
import { ITEM_TABLE_ID, ITEM_TABLE_PATH } from "../../../state/admin";

//アイテムの取得
export const fetchItems = (): AppThunk => (dispatch) => {
  db.collection(ITEM_TABLE_PATH)
    .doc(ITEM_TABLE_ID)
    .get()
    .then((doc) => {
      if (doc.exists) {
        let data = doc.data();
        dispatch(setItems(data!.itemData));
      }
    })
    .catch((error) => {
      alert(error);
    });
};
