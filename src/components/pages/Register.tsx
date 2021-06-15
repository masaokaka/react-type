import { useHistory } from "react-router-dom";
import { auth, db } from "../../lib/firebase/index";
import { useState } from "react";

import {
  TextField,
  Button,
  Container,
  makeStyles,
  Box,
} from "@material-ui/core";

export const Register = () => {
  const history = useHistory();
  const handleLink = (path: string) => history.push(path);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const doRegister = () => {
    auth.createUserWithEmailAndPassword(email, password).then(() => {
      let user = auth.currentUser;
      // if (user != null) {
      //   uid = user.uid;
      //   valueList.userId = user.uid;
      // }
    });
  };
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
