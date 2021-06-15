import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { auth, sessionPersistance, db } from "../../lib/firebase/index";
import { Link } from "react-router-dom";
import { TextField, Button, Container, Box } from "@material-ui/core";

export const Login = () => {
  const doLogin = () => {
    
  }
  return (
    <Container maxWidth="sm">
      <Box mt={3} textAlign="center">
        <h2>ログイン</h2>
        <Box>
          <TextField label="メールアドレス" type="email" />
        </Box>
        <Box>
          <TextField label="パスワード" type="password" />
        </Box>
      </Box>
      <Box mt={5} textAlign="center">
        <Button variant="contained" color="primary" onClick={doLogin}>
          ログイン
        </Button>
      </Box>
      <Box textAlign="center">
        <Link to="/register">ユーザー登録はこちら</Link>
      </Box>
    </Container>
  );
};
