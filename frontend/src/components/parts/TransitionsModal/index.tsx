import { style } from './style'
import Backdrop from '@mui/material/Backdrop'
import Box from '@mui/material/Box'
import Fade from '@mui/material/Fade'
import Modal from '@mui/material/Modal'
import * as React from 'react'

type Props = {
  handleOpen: () => void
  handleClose: () => void
  open: boolean
  children: React.ReactNode
}

const TransitionsModal: React.FC<Props> = ({ handleOpen, handleClose, open, children }) => {
  return (
    <div>
      <Modal
        aria-labelledby='transition-modal-title'
        aria-describedby='transition-modal-description'
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box sx={style}>{children}</Box>
        </Fade>
      </Modal>
    </div>
  )
}

export default TransitionsModal
