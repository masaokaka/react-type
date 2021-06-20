import { IconButton } from "@material-ui/core";
import { useHistory } from "react-router";
import { Btn } from "../atoms/Btn";
import { useDispatch } from "react-redux";
import { UserInfoType } from "../../app/store/userinfo/userinfoSlice";
import { OrderInfoType } from "../../app/store/order/ordersSlice";
import { SearchOutlined } from "@material-ui/icons";
import { searchAddress, validateOrderDate } from "../../utils/functions";
import {
  TextField,
  Radio,
  FormControlLabel,
  RadioGroup,
} from "@material-ui/core";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { order } from "../../app/store/order/ordersOperation";
interface Props {
  cartId: string;
  userInfo: UserInfoType;
  uid: string;
  totalPrice: number;
}

export const OrderForm = ({ cartId, userInfo, uid, totalPrice }: Props) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    getValues,
    setError,
    clearErrors,
  } = useForm<OrderInfoType>({
    mode: "onBlur",
    defaultValues: {
      name: userInfo.name,
      email: userInfo.email,
      zipcode: userInfo.zipcode,
      address: userInfo.address,
      tel: userInfo.tel,
      status: 1,
      orderDatetime: "",
      payType: 1,
      cardNo: "",
      timestamp: 0,
      totalPrice: 0,
    },
  });
  //Payment Method hange watcher
  const watchPayType = watch("payType", 1);

  //住所検索処理
  const getAddress = () => {
    const zipcode = getValues("zipcode");
    searchAddress(zipcode!)
      .then((address) => {
        setValue("address", address);
      })
      .catch((e) => {
        setError("address", {
          type: "getAddress",
          message: e,
        });
      });
  };

  //配達日時のバリデーション
  const checkdate = (selected: string) => {
    let check = validateOrderDate(selected);
    if (check) {
      setValue("orderDatetime", selected);
      clearErrors("orderDatetime");
    } else {
      setValue("orderDatetime", "");
      setError("orderDatetime", {
        type: "wrongDateError",
        message: "今から3時間後の日時をご入力ください",
      });
    }
  };

  const doOrder: SubmitHandler<OrderInfoType> = (data) => {
    let timestamp = new Date();
    data.timestamp = Math.floor(timestamp.getTime() / 1000);
    data.totalPrice = totalPrice;
    if (watchPayType === 2) {
      data.status = 2;
    } else {
      data.status = 1;
      data.cardNo = "";
    }
    dispatch(order(cartId, uid, data));
    history.push("/ordercomp");
  };
  return (
    <form onSubmit={handleSubmit(doOrder)}>
      <h2>配送先情報</h2>
      {/* 名前 */}
      <div>
        <Controller
          name="name"
          control={control}
          rules={{ required: true }}
          render={({ field }) => <TextField {...field} />}
        />
        <p style={{ color: "red" }}>
          {errors.name?.type === "required" && "名前を入力してください"}
        </p>
      </div>
      {/* メールアドレス */}
      <div>
        <Controller
          name="email"
          control={control}
          rules={{ required: true, pattern: /.+@.+/ }}
          render={({ field }) => <TextField {...field} />}
        />
        <p style={{ color: "red" }}>
          {errors.email?.type === "required" &&
            "メールアドレスを入力してください"}
          {errors.email?.type === "pattern" && "形式が違います"}
        </p>
      </div>
      {/* 電話番号 */}
      <div>
        <Controller
          name="tel"
          control={control}
          rules={{ required: true, pattern: /\d{2,5}[-(]\d{1,4}[-)]\d{4}$/ }}
          render={({ field }) => <TextField {...field} />}
        />
        <p style={{ color: "red" }}>
          {errors.tel?.type === "required" && "電話番号を入力してください"}
          {errors.tel?.type === "pattern" &&
            "XXX-XXXX-XXXXの形式で入力して下さい"}
        </p>
      </div>
      {/* 郵便番号 */}
      <div>
        <Controller
          name="zipcode"
          control={control}
          rules={{ required: true, pattern: /^\d{3}[-]\d{4}$/ }}
          render={({ field }) => (
            <div>
              <TextField {...field} />
              <IconButton onClick={() => getAddress()}>
                <SearchOutlined />
              </IconButton>
            </div>
          )}
        />
        <p style={{ color: "red" }}>
          {errors.zipcode?.type === "required" && "郵便番号を入力してください"}
          {errors.zipcode?.type === "pattern" &&
            "XXX-XXXXの形式で入力して下さい"}
        </p>
      </div>
      {/* 住所 */}
      <div>
        <Controller
          name="address"
          control={control}
          rules={{ required: true }}
          render={({ field }) => <TextField {...field} />}
        />
        <p style={{ color: "red" }}>
          {errors.address?.type === "required" && "住所を入力してください"}
          {errors.address?.type === "getAddress" && errors.address?.message}
        </p>
      </div>
      {/* カレンダー */}
      <div>
        <Controller
          name="orderDatetime"
          control={control}
          defaultValue={""}
          rules={{ required: true }}
          render={({ field: { value } }) => (
            <TextField
              type="datetime-local"
              onChange={(e) => {
                checkdate(e.target.value);
              }}
              value={value}
            />
          )}
        />
        <p style={{ color: "red" }}>
          {errors.orderDatetime?.type === "required" &&
            "日付を入力してください"}
          {errors.orderDatetime?.type === "wrongDateError" &&
            errors.orderDatetime.message}
        </p>
      </div>
      {/* 支払い方法 */}
      <div>
        <Controller
          name="payType"
          control={control}
          defaultValue={watchPayType}
          render={({ field: { value, onChange } }) => (
            <RadioGroup
              aria-label="PaymentType"
              onChange={(e) => onChange(Number(e.target.value))}
              value={value}
            >
              <FormControlLabel
                value={1}
                control={<Radio />}
                label="代金引換"
              />
              <FormControlLabel
                value={2}
                control={<Radio />}
                label="クレジットカード支払"
              />
            </RadioGroup>
          )}
        />
        <p style={{ color: "red" }}>
          {errors.payType?.type === "required" && "支払い方法を選択して下さい"}
        </p>
      </div>
      {/* カード番号 */}
      {watchPayType === 2 && (
        <div>
          <Controller
            name="cardNo"
            control={control}
            defaultValue={""}
            rules={{ required: true, pattern: /\d[0-9]{13}/g }}
            render={({ field }) => <TextField {...field} />}
          />
          <p style={{ color: "red" }}>
            {errors.cardNo?.type === "required" &&
              "カード番号を入力してください"}
            {errors.cardNo?.type === "pattern" && "形式が違います"}
          </p>
        </div>
      )}
      <Btn text="注文を確定する" onClk={handleSubmit(doOrder)} />
    </form>
  );
};
