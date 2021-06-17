import { useState } from "react";
import { Link } from "react-router-dom";
import { TextField, Button, Container, Box } from "@material-ui/core";
import { login } from "../../app/store/user/userOperation";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  return (
    <Container maxWidth="sm">
      <Box mt={3} textAlign="center">
        <h2>ログイン</h2>
        <Box>
          <TextField
            label="メールアドレス"
            type="email"
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
      </Box>
      <Box mt={5} textAlign="center">
        <Button
          variant="contained"
          color="primary"
          onClick={() => login(email, password)}
        >
          ログイン
        </Button>
      </Box>
      <Box textAlign="center">
        <Link to="/register">ユーザー登録はこちら</Link>
      </Box>
    </Container>
  );
};
