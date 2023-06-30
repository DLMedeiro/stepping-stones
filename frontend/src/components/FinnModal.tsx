import React from 'react'
import Typography from '@mui/material/Typography'
import Modal from '@mui/material/Modal'
import Avatar from '@mui/material/Avatar'
import Box from '@mui/material/Box'
import FinnImage from '../images/finn-welcome.jpg'

export default function FinnModal() {
  const [open, setOpen] = React.useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const modalStyle = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  }

  return (
    <div>
      <Avatar
        alt="Finn"
        src={FinnImage}
        sx={{
          width: 80,
          height: 80,
          margin: 'auto',
          border: '2px solid transparent',
          '&:hover': { cursor: 'pointer', border: '2px solid rgba(0,0,0,.5)' },
        }}
        onClick={handleOpen}
      />
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Box sx={modalStyle}>
          <Typography id="modal-modal-title" variant="h2" component="h2">
            Hi! I'm Finn.
          </Typography>
          <Typography id="modal-modal-title" variant="h6" component="h6">
            Feel free to browse my Dashboard of goals.
          </Typography>
          <Typography id="modal-modal-title" variant="h6" component="h6">
            You can add or edit them too!
          </Typography>
          <img
            id="modal-description"
            src={FinnImage}
            alt="Finn"
            style={{ width: '100%' }}
          />
        </Box>
      </Modal>
    </div>
  )
}
