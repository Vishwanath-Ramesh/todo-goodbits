/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable import/no-unresolved */
import React, { useReducer } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Typography from '@mui/material/Typography'
import DeleteIcon from '@mui/icons-material/Delete'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import Checkbox from '@mui/material/Checkbox'
import IconButton from '@mui/material/IconButton'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import LinearProgress from '@mui/material/LinearProgress'
import Box from '@mui/material/Box'
import Chip from '@mui/material/Chip'
import Stack from '@mui/material/Stack'
import TagFacesIcon from '@mui/icons-material/TagFaces'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import MomentAdapter from '@mui/lab/AdapterMoment'
import LocalizationProvider from '@mui/lab/LocalizationProvider'
import DatePicker from '@mui/lab/DatePicker'
import moment from 'moment'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper'
import { filter } from 'lodash'
import 'swiper/css'
import 'swiper/css/navigation'

import TextField from '@mui/material/TextField'
import styled from 'styled-components'
import { Add, Close } from '@mui/icons-material'
import todoActions from '../../../services/store/actions/todos'
import notificationsActions from '../../../services/store/actions/notification'
import todoSelectors from '../../../services/store/selectors/todos'
import tagsSelectors from '../../../services/store/selectors/tags'

const Container = styled(Stack)`
  .swiper {
    width: 70%;
    height: 100%;
  }

  .swiper-slide {
    text-align: center;
    font-size: 18px;
    background: #fff;

    /* Center slide text vertically */
    display: -webkit-box;
    display: -ms-flexbox;
    display: -webkit-flex;
    display: flex;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    -webkit-justify-content: center;
    justify-content: center;
    -webkit-box-align: center;
    -ms-flex-align: center;
    -webkit-align-items: center;
    align-items: center;
  }

  .swiper-slide img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`

function reducer(state, action) {
  switch (action.type) {
    case 'SHOW_DIALOG':
      return {
        ...state,
        showDialog: action.payload,
      }
    case 'UPDATE_TODODESC':
      return {
        ...state,
        todoDescription: action.payload,
      }
    case 'UPDATE_TODODATE':
      return {
        ...state,
        todoDate: action.payload,
      }
    case 'RESET_INPUTS':
      return {
        ...state,
        ...action.payload,
      }
    default:
      return state
  }
}

function Home() {
  const initialState = {
    showDialog: false,
    todoDescription: '',
    todoDate: null,
  }
  const [state, setState] = useReducer(reducer, initialState)
  const dispatch = useDispatch()
  const todosGrouped = useSelector(todoSelectors.selectGroupedTodos)
  const tags = useSelector(tagsSelectors.selectTags)

  function handleOpen() {
    setState({ type: 'SHOW_DIALOG', payload: true })
  }

  function handleClose() {
    setState({ type: 'SHOW_DIALOG', payload: false })
  }

  function handleDescriptionChange({ target }) {
    setState({ type: 'UPDATE_TODODESC', payload: target.value })
  }

  function handleTodoDateChange(newValue) {
    setState({ type: 'UPDATE_TODODATE', payload: newValue })
  }

  function resetInputFiels() {
    setState({ type: 'RESET_INPUTS', payload: initialState })
  }

  function handleTodoDelete(todo) {
    dispatch(todoActions.deleteTodo(todo.id))
    dispatch(
      notificationsActions.showNotification({
        message: 'Todo deleted successfully',
        type: 'success',
      })
    )
  }

  function handleSave() {
    dispatch(
      todoActions.addTodo({
        description: state.todoDescription,
        dateAdded: moment(state.todoDate).format('MM/DD/YYYY'),
      })
    )
    dispatch(
      notificationsActions.showNotification({
        message: 'Todo added successfully',
        type: 'success',
      })
    )
    resetInputFiels()
  }

  const { showDialog, todoDescription, todoDate } = state

  return (
    <Container direction="column" alignItems="center" rowGap={2}>
      {/* <TextField id="outlined-basic" label="Search" variant="outlined" /> */}
      <Swiper modules={[Navigation]} navigation>
        {Object.keys(todosGrouped).map((dateAdded) => {
          const todos = todosGrouped[dateAdded] || []
          const completed =
            filter(todos, {
              status: 'completed',
            })?.length || 0

          return (
            <SwiperSlide key={dateAdded}>
              <Card
                sx={{ minWidth: 400 }}
                className="todos__card"
                variant="outlined"
              >
                <CardContent>
                  <Stack direction="row" alignItems="center" columnGap={2}>
                    <Typography variant="h5" component="h5">
                      {moment(dateAdded, 'MM-DD-YYYY').format('dddd')}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {moment(dateAdded, 'MM-DD-YYYY').format('MMM DD, yyyy')}
                    </Typography>
                  </Stack>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Box sx={{ minWidth: 35 }}>
                      <Typography variant="body2" color="text.secondary">
                        {`${completed} / ${todos.length}`}
                      </Typography>
                    </Box>
                    <Box sx={{ width: '100%', mr: 1 }}>
                      <LinearProgress
                        variant="determinate"
                        value={(completed / todos.length) * 100}
                      />
                    </Box>
                  </Box>
                  <List
                    sx={{
                      width: '100%',
                      position: 'relative',
                      overflow: 'auto',
                      minHeight: 400,
                      maxHeight: 400,
                    }}
                  >
                    {todos.map((todo) => {
                      const labelId = `checkbox-list-label-${todo}`
                      const mappedTags = tags.filter(
                        (tag) => todo?.tags?.indexOf(tag.id) >= 0
                      )

                      return (
                        <ListItem
                          key={todo.id}
                          secondaryAction={
                            <IconButton
                              edge="end"
                              aria-label="delete"
                              onClick={() => handleTodoDelete(todo)}
                            >
                              <DeleteIcon />
                            </IconButton>
                          }
                          disablePadding
                        >
                          <ListItemButton
                            role="button"
                            onClick={() => null}
                            dense
                          >
                            <ListItemIcon>
                              <Checkbox
                                edge="start"
                                checked={todo.status === 'completed'}
                                tabIndex={-1}
                                disableRipple
                                inputProps={{ 'aria-labelledby': labelId }}
                                onChange={({ target }) =>
                                  dispatch(
                                    todoActions.updateStatus(
                                      target.checked,
                                      todo.id
                                    )
                                  )
                                }
                              />
                            </ListItemIcon>
                            <ListItemText
                              id={labelId}
                              primary={todo.description}
                              secondary={
                                mappedTags.length > 0 ? (
                                  <Stack direction="row" spacing={1}>
                                    {mappedTags.map((tag) => (
                                      <Chip
                                        key={tag.id}
                                        size="small"
                                        variant="outlined"
                                        icon={<TagFacesIcon />}
                                        label={tag.label}
                                        onDelete={() => null}
                                      />
                                    ))}
                                  </Stack>
                                ) : null
                              }
                            />
                          </ListItemButton>
                        </ListItem>
                      )
                    })}
                  </List>
                </CardContent>
              </Card>
            </SwiperSlide>
          )
        })}
      </Swiper>
      <Button
        variant="contained"
        size="large"
        disableElevation
        startIcon={<Add />}
        onClick={handleOpen}
      >
        Add
      </Button>
      <Dialog open={showDialog} onClose={handleClose}>
        <DialogTitle sx={{ m: 0, p: 2 }}>
          New
          <IconButton
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
            aria-label="close"
            onClick={handleClose}
          >
            <Close />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <Stack direction="column" rowGap={2}>
            <DialogContentText>Have something on your mind?</DialogContentText>
            <TextField
              autoFocus
              multiline
              margin="dense"
              id="name"
              label="Description"
              type="text"
              fullWidth
              variant="standard"
              value={todoDescription}
              onChange={handleDescriptionChange}
            />
            <LocalizationProvider dateAdapter={MomentAdapter}>
              <DatePicker
                label="Date"
                value={todoDate}
                onChange={handleTodoDateChange}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSave}>Save</Button>
        </DialogActions>
      </Dialog>
    </Container>
  )
}

export default Home
