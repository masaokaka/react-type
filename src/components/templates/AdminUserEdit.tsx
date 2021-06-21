import { useParams } from "react-router";
import { Btn } from "../atoms/Btn";
import { useEffect, useState } from "react";
import { Container } from "@material-ui/core";
import { UserInfoType } from "../../app/store/userinfo/userinfoSlice";
import { useAppSelector } from "../../app/hooks";
import { selectUsersInfo } from "../../app/store/usersinfo/usersinfoSlice";

export const AdminUserEdit = () => {
  const { userid }: { userid: string } = useParams();
  const [user, setUser] = useState<UserInfoType>();
  const [toggle, setToggle] = useState(false);
  const usersInfo = useAppSelector(selectUsersInfo);
  useEffect(() => {
    let user = usersInfo.filter((userInfo) => userInfo.uid === userid);
    setUser(user[0]);
  }, []);

  return (
    <Container>
      <h2>ユーザー情報詳細 (ID: {userid})</h2>
      {user && (
        <div>
          <div>
            <strong>名前：</strong>
            {user.name}
          </div>
          <div>
            <strong>Email：</strong>
            {user.email}
          </div>
          <div>
            <strong>TEL：</strong>
            {user.tel}
          </div>
          <div>
            <strong>住所情報：</strong>
            <div>〒{user.zipcode}</div>
            <div>{user.address}</div>
          </div>
          <Btn text="注文履歴の操作" onClk={() => setToggle(!toggle)} />
          {/* {toggle && (
            <OrderInfo
              userId={userid}
              items={items}
              toppings={toppings}
              orderInfo={orderInfo}
            />
          )} */}
        </div>
      )}
    </Container>
  );
};
