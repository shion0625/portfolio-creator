import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Modal from '@mui/material/Modal'
import * as React from 'react'
import WorkFormItem from '~/components/parts/WorkFormItem'

type Props = {
  buttonText: string
}

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'red',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
}

const BasicModal: React.FC<Props> = ({ buttonText }) => {
  const [open, setOpen] = React.useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  return (
    <div>
      <Button size='small' color='primary' onClick={handleOpen}>
        {buttonText}
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <Box sx={style}>
          <WorkFormItem />
        </Box>
      </Modal>
    </div>
  )
}

export default BasicModal
