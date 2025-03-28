import { useContext, useState } from "react";
import { AuthContext } from "../../context/Auth/AuthContext";
import { Button, Container, TextField, Typography } from "@mui/material";

const LoginPage = () => {
  const [name, setName] = useState("test");
  const [email, setEmail] = useState("test@gmail.com");
  const { handleLogin } = useContext(AuthContext);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await handleLogin(name, email);
  };

  return (
<Container maxWidth="sm" sx={{ mt: 4, textAlign: "center" }}>
<Typography variant="h4" gutterBottom>Login</Typography>

<TextField
  label="name"
  variant="outlined"
  fullWidth
  margin="normal"
  value={name}
  onChange={(e) => setName(e.target.value)}
/>

<TextField
  label="email"
  variant="outlined"
  fullWidth
  margin="normal"
  type="email"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
/>

<Button
  variant="contained"
  color="primary"
  fullWidth
  onClick={handleSubmit}
  sx={{ mt: 2 }}
>
  Login
</Button>

</Container>
  );
};

export default LoginPage;
