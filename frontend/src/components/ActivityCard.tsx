import React, { useState, useEffect } from 'react'
import Item from '../models/Item'
import { Grid } from '@mui/material'
import dayjs, { Dayjs } from 'dayjs'
import Paper from '@mui/material/Paper'
import '../styles/App.css'
import Button from '@mui/material/Button'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import { deleteGoal, updateProgress } from '../features/goals/goalSlice'
// import AddSubtract from './AddSubtract' -> Bring back after removing local state dependency
import { useNavigate } from 'react-router-dom'
import RemoveIcon from '@mui/icons-material/Remove'
import AddIcon from '@mui/icons-material/Add'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'

interface Props {
  items: Item
  onRemoveItem: (id: string) => void
}
// Refactor

export default function Activity({ goal }: any) {
  const [edit, setEdit] = useState(false)
  const [completed, setCompleted] = useState(false)
  // const [activity, setActivity] = useState(props.items.activity)
  // const [timeTarget, setTimeTarget] = useState(props.items.target)
  const [progress, setProgress] = useState(goal.progress)
  // const [start, setStart] = useState(props.items.start)
  // const [end, setEnd] = useState(props.items.end)
  const [duration, setDuration] = React.useState<number>()
  const [percentComplete, setPercentComplete] = React.useState<number>(0)

  // const handleRemove = (id: string): void => {
  //   props.onRemoveItem(id)
  // }
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const setEditFunction = (): void => {
    if (edit === true) {
      setEdit(false)
    } else {
      setEdit(true)
    }
  }

  useEffect(() => {
    let today = dayjs().format('LL')

    let hours = dayjs(goal.end).diff(today, 'hours')
    const days = Math.floor(hours / 24)
    setDuration(days)
  }, [])

  useEffect(() => {
    {
      progress === 0 && progress < goal.target
        ? setPercentComplete(0)
        : setPercentComplete(Math.round((progress / goal.target) * 100))
      // Rounding not exact but works for current need
    }
  }, [progress, goal.target])

  // Edit local storage
  // const editLocalStorage = (id: string, action: string): void => {
  //   let savedTasks = JSON.parse(localStorage.getItem('savedTasks') || '')
  //   for (let i = 0; i < savedTasks.length; i++) {
  //     if (savedTasks[i].id == id) {
  //       // retrieve the task and convert to JS
  //       // modify the object, convert it to a string and replace the existing item
  //       if (action == 'add') {
  //         savedTasks[i].progress += 1
  //       } else {
  //         savedTasks[i].progress -= 1
  //       }
  //     }
  //     localStorage.setItem('savedTasks', JSON.stringify(savedTasks))
  //   }
  // }

  useEffect(() => {
    if (goal.progress >= goal.target) {
      setCompleted(true)
    } else {
      setCompleted(false)
    }
  }, [goal.progress])

  const addProgress = () => {
    dispatch(updateProgress({ id: goal._id, change: 'add' }))
    setProgress(progress + 1)
  }
  const subtractProgress = () => {
    dispatch(updateProgress({ id: goal._id, change: 'subtract' }))
    setProgress(progress - 1)
  }
  const editActivity = () => {
    localStorage.setItem('goal', JSON.stringify(goal))
    navigate('/ActivityEditForm')
  }
  const deleteItem = () => {
    dispatch(deleteGoal(goal._id))
    window.location.reload()
    // Refactor / solve issue of component no reloading when item is deleted or addedd
  }
  return (
    <Paper
      elevation={14}
      sx={{ padding: ' 2em', borderRadius: '30px', margin: '1rem' }}
      key={goal.id}
    >
      <Grid
        container
        spacing={0}
        sx={{
          // padding: '78px 0',
          // height: '90vh',
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Grid
          item
          xs={11}
          sx={{
            fontSize: '2rem',
            borderBottom: '2px solid black',
            marginBottom: '5px',
            '&:hover': {
              color: '#cb99d5',
              borderBottom: '2px solid #cb99d5',
              cursor: 'pointer',
            },
          }}
          onClick={editActivity}
        >
          {goal.activity}
        </Grid>
        <Grid
          item
          xs={1}
          sx={{
            fontSize: '2rem',
            justifyContent: 'flex-start',
          }}
        >
          <DeleteForeverIcon
            sx={{
              fontSize: '2rem',
              marginBottom: '5%',
              marginLeft: 'auto',
              width: '100%',
            }}
            onClick={deleteItem}
          />
        </Grid>
      </Grid>
      <Grid
        container
        spacing={0}
        direction="row"
        alignItems="center"
        justifyContent="center"
      >
        <Grid item xs={12} sx={{ fontSize: '1rem' }}>
          <div>
            {duration} {duration == 1 ? 'Day Remaining' : 'Days Remaining'}
          </div>
        </Grid>
        <Grid item xs={6} sx={{ fontSize: '1rem' }}>
          <div>
            Start:{' '}
            {new Date(goal.start).toLocaleString('en-US', {
              year: 'numeric',
              month: 'short',
              day: 'numeric',
            })}
          </div>
        </Grid>
        <Grid item xs={6} sx={{ fontSize: '1rem' }}>
          <div>
            End:{' '}
            {new Date(goal.end).toLocaleString('en-US', {
              year: 'numeric',
              month: 'short',
              day: 'numeric',
            })}
          </div>
        </Grid>

        <Grid item xs={12} sx={{ fontSize: '2rem' }}>
          {completed ? <h4>Goal Achieved!</h4> : ''}{' '}
        </Grid>
      </Grid>
      <Grid
        container
        spacing={0}
        sx={{
          // padding: '78px 0',
          // height: '90vh',
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Grid item xs={2} sx={{ fontSize: '2rem' }}>
          <Button
            onClick={addProgress}
            variant="contained"
            color="secondary"
            sx={{
              my: 2,
              borderRadius: '40px',
              width: '100%',
              minWidth: '10px',
              marginLeft: '5px',
              maxWidth: '35px',
            }}
          >
            <AddIcon />
          </Button>
        </Grid>
        <Grid item xs={2} sx={{ fontSize: '2rem' }}>
          <Button
            onClick={subtractProgress}
            variant="contained"
            color="secondary"
            sx={{
              my: 2,
              borderRadius: '40px',
              width: '100%',
              minWidth: '10px',
              maxWidth: '35px',
            }}
          >
            <RemoveIcon />
          </Button>
        </Grid>

        <Grid item xs={8} sx={{ fontSize: '1rem' }}>
          <div className="progress">
            <div
              className="progress-done"
              style={{ width: `${percentComplete}%` }}
            >
              {percentComplete == 0 ? (
                <p style={{ marginLeft: '50px' }}>{percentComplete}%</p>
              ) : (
                <p>{percentComplete}%</p>
              )}
            </div>
          </div>
        </Grid>
      </Grid>
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
      >
        <Grid item xs={12} sx={{ fontSize: '1rem' }}>
          Time Completed:{' '}
          {progress > 1 ? `${progress} Hours` : `${progress} Hour`}
        </Grid>
        <Grid item xs={12} sx={{ fontSize: '1rem' }}>
          Target: {goal.target} Hours
        </Grid>
      </Grid>
    </Paper>
  )
}
