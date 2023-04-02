import { ChildrenBox } from './style'
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
        slotProps={{
          backdrop: {
            timeout: 500,
            'aria-label': 'modal',
          },
        }}
      >
        <Fade in={open}>
          <ChildrenBox>{children}</ChildrenBox>
        </Fade>
      </Modal>
    </div>
  )
}

export default TransitionsModal
