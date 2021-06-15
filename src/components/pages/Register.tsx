import { useState, useEffect } from "react";
import { useAppSelector } from "../../app/hooks";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { selectUser } from "../../app/store/user/userSlice";
import { register } from "../../app/store/user/userOperation";
import { TextField, Button, Container, Box } from "@material-ui/core";

export const Register = () => {
  const user = useAppSelector(selectUser);
  const history = useHistory();
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const doRegister = () => {
    dispatch(register(email, password));
    history.push("/");
  };

  useEffect(() => {
    if (user.uid) {
      history.push("/");
    }
    return () => {
      setEmail("");
      setPassword("");
    };
  }, []);

  return (
    <Container maxWidth="sm">
      <Box mt={3} textAlign="center">
        <h2>新規登録</h2>
        <Box>
          <TextField
            label="メールアドレス"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Box>
        <Box>
          <TextField
            label="パスワード"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Box>
        <Box mt={5} textAlign="center">
          <Button
            variant="contained"
            color="primary"
            onClick={() => doRegister()}
          >
            登録
          </Button>
        </Box>
      </Box>
    </Container>
  );
};
