import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import { useForm, SubmitHandler } from 'react-hook-form'

import SignUp from '../components/forms/SignUp'
import { Grid, Paper } from '@mui/material'
import Link from '@mui/material/Link'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'

export default function CreateAccount(): JSX.Element {
  return (
    <Grid
      container
      spacing={3}
      // sx={{ padding: '78px 0' }}
    >
      <Grid item xs={4}></Grid>
      <Grid
        item
        xs={2.5}
        // sx={{ minWidth: '350px' }}
      >
        <Paper
          elevation={14}
          // sx={{ padding: ' 2em', borderRadius: '30px' }}
        >
          <Typography
            component="p"
            align="center"
            // sx={{ marginBottom: '20px' }}
          >
            New Account
          </Typography>
          <SignUp />
          <Grid
            container
            justifyContent="center"
            // sx={{ marginBottom: '12px' }}
          ></Grid>
        </Paper>
      </Grid>
      <Grid item xs={4}></Grid>
    </Grid>
  )
}
