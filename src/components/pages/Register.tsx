import { useState, useEffect } from "react";
import { useAppSelector } from "../../app/hooks";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { selectUser } from "../../app/store/user/userSlice";
import { register } from "../../app/store/user/userOperation";
import { TextField, Container, Box, IconButton } from "@material-ui/core";
import { Btn } from "../atoms/Btn";
import { SearchOutlined } from "@material-ui/icons";
import { searchAddress } from "../../utils/functions";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { UserInfoType } from "../../app/store/userinfo/userinfoSlice";

interface RegisterInfoType extends UserInfoType {
  password: string;
}

export const Register = () => {
  const user = useAppSelector(selectUser);
  const history = useHistory();
  const dispatch = useDispatch();

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    getValues,
    setError,
    clearErrors,
  } = useForm<RegisterInfoType>({
    mode: "onBlur",
    defaultValues: {
      name: "",
      email: "",
      zipcode: "",
      address: "",
      tel: "",
      username: "",
      password: "",
    },
  });
  const doRegister: SubmitHandler<RegisterInfoType> = (data) => {
    let userInfo: UserInfoType = {
      name: data.name,
      email: data.email,
      zipcode: data.zipcode,
      address: data.address,
      tel: data.tel,
      username: data.username,
    };
    console.log(userInfo);
    console.log(data.password);
    dispatch(register(data.email!, data.password!, userInfo));
    history.push("/");
  };

  useEffect(() => {
    if (user.uid) {
      history.push("/");
    }
  }, []);

  //住所検索処理
  const getAddress = () => {
    const zipcode = getValues("zipcode");
    searchAddress(zipcode!)
      .then((result) => {
        if (result === "取得に失敗しました。") {
          setError("zipcode", {
            type: "getAddress",
            message: result,
          });
        } else {
          setValue("address", result);
          clearErrors("address");
        }
      })
      .catch(() => {
        setError("zipcode", {
          type: "getAddress",
          message: "取得に失敗しました。",
        });
      });
  };

  return (
    <Container maxWidth="sm">
      <Box mt={3} textAlign="center">
        <h2>新規登録</h2>
        <form onSubmit={handleSubmit(doRegister)}>
          <Box mt={3}>
            <Controller
              name="name"
              control={control}
              rules={{ required: true }}
              render={({ field }) => <TextField label="名前" {...field} />}
            />
            <p style={{ color: "red" }}>
              {errors.name?.type === "required" && "名前を入力してください"}
            </p>
          </Box>
          <Box mt={3}>
            <Controller
              name="tel"
              control={control}
              rules={{
                required: true,
                pattern: /\d{2,5}[-(]\d{1,4}[-)]\d{4}$/,
              }}
              render={({ field }) => <TextField label="電話番号" {...field} />}
            />
            <p style={{ color: "red" }}>
              {errors.tel?.type === "required" && "電話番号を入力してください"}
              {errors.tel?.type === "pattern" &&
                "XXX-XXXX-XXXXの形式で入力して下さい"}
            </p>
          </Box>
          <Box mt={3}>
            <Controller
              name="zipcode"
              control={control}
              rules={{ required: true, pattern: /^\d{3}[-]\d{4}$/ }}
              render={({ field }) => <TextField label="郵便番号" {...field} />}
            />
            <IconButton onClick={() => getAddress()}>
              <SearchOutlined />
            </IconButton>
            <p style={{ color: "red" }}>
              {errors.zipcode?.type === "required" &&
                "郵便番号を入力してください"}
              {errors.zipcode?.type === "pattern" &&
                "XXX-XXXXの形式で入力して下さい"}
              {errors.zipcode?.type === "getAddress" && errors.zipcode?.message}
            </p>
          </Box>
          <Box mt={3}>
            <Controller
              name="address"
              control={control}
              rules={{ required: true }}
              render={({ field }) => <TextField label="住所" {...field} />}
            />
            <p style={{ color: "red" }}>
              {errors.address?.type === "required" && "住所を入力してください"}
            </p>
          </Box>
          <Box mt={3}>
            <Controller
              name="username"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <TextField label="ユーザー名" {...field} />
              )}
            />
            <p style={{ color: "red" }}>
              {errors.email?.type === "required" &&
                "ユーザー名を入力してください"}
            </p>
          </Box>
          <Box mt={3}>
            <Controller
              name="email"
              control={control}
              rules={{ required: true, pattern: /.+@.+/ }}
              render={({ field }) => (
                <TextField label="メールアドレス" {...field} />
              )}
            />
            <p style={{ color: "red" }}>
              {errors.email?.type === "required" &&
                "メールアドレスを入力してください"}
              {errors.email?.type === "pattern" && "形式が違います"}
            </p>
          </Box>
          <Box mt={3}>
            <Controller
              name="password"
              control={control}
              rules={{
                required: true,
                minLength: 8,
                maxLength: 10,
                // pattern: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])$/,
              }}
              render={({ field }) => (
                <TextField label="パスワード" {...field} />
              )}
            />
            <p style={{ color: "red" }}>
              {errors.password?.type === "required" &&
                "パスワードを入力してください"}
              {errors.password?.type === "minLength" &&
                "パスワードは8文字以上10文字以内で登録して下さい"}
              {errors.password?.type === "maxLength" &&
                "パスワードは8文字以上10文字以内で登録して下さい"}
              {/* {errors.password?.type === "pattern" &&
                "大文字小文字半角英数字のみ使用可能です"} */}
            </p>
          </Box>
          <Box mt={5} textAlign="center">
            <Btn text="登録" onClk={handleSubmit(doRegister)} />
          </Box>
        </form>
      </Box>
    </Container>
  );
};
