// Modified from Material UI Docs: https://github.com/mui/material-ui/blob/v5.12.1/docs/data/material/getting-started/templates/sign-up/SignUp.tsx
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import CssBaseline from '@mui/material/CssBaseline'
import TextField from '@mui/material/TextField'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'

import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import Divider from '@mui/material/Divider'

// const theme = createTheme()

const theme = createTheme({
  palette: {
    primary: {
      main: '#114ea1',
      light: '#6189c2',
      dark: '#00003c',
    },
  },
})

export default function SignUp() {
  const [values, setValues] = useState({
    username: '',
    email: '',
    password: '',
  })

  useEffect(() => {
    if (
      values.username.length > 0 &&
      values.email.length > 0 &&
      values.password.length > 0
    )
      axios
        .post('http://localhost:3001/createAccount', values)
        .then((res) => console.log(res))
        .catch((err) => console.log(err))
  }, [values])

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    let username = data.get('username')
    let email = data.get('email')
    let password = data.get('password')
    console.log(username, email, password)

    if (username !== null && email !== null && password !== null) {
      setValues({
        username: username.toString(),
        email: email.toString(),
        password: password.toString(),
      })
    }
  }
  // Add error handling within the signup form
  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3, marginBottom: '12px' }}
          >
            <Grid
              container
              spacing={0}
              sx={{
                marginBottom: '16px',
                paddingLeft: 0,
                paddingRight: 0,
                minWidth: '250px',
              }}
            >
              <Grid item xs={12} sx={{ marginBottom: '26px' }}>
                <TextField
                  required
                  fullWidth
                  id="username"
                  label="Username"
                  name="username"
                  autoComplete="Username"
                />
              </Grid>
              <Grid item xs={12} sx={{ marginBottom: '26px' }}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12} sx={{ marginBottom: '26px' }}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                sx={{
                  mt: 3,
                  mb: 2,
                  borderRadius: '40px',
                  margin: '0 auto',
                  display: 'flex',
                }}
              >
                Log in
              </Button>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  )
}
