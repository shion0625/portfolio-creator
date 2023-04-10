import { DeleteOutline as DeleteOutlineIcon } from '@mui/icons-material'
import { Button, CardActionArea, CardActions, IconButton } from '@mui/material'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import * as React from 'react'
import { Control, useWatch, UseFormGetValues } from 'react-hook-form'
import Modal from '~/components/parts/Modal'
import WorkFormItem from '~/components/screens/WorkFormItem'
import { WorkFormInput } from '~/models/Work'

type Props = {
  workIndex: number
  removeWork: (index: number, id: string) => void
  getValues: UseFormGetValues<WorkFormInput>
  control: Control<WorkFormInput>
}

const ImageCard: React.FC<Props> = ({ workIndex, removeWork, getValues, control }): JSX.Element => {
  //react-hook-formで特定のworkのtitleとsummaryを監視
  const watchFields = useWatch({
    control,
    name: [`works.${workIndex}.title`, `works.${workIndex}.summary`],
  })
  //workのidを取得している
  const getWorkId = getValues(`works.${workIndex}.id`)
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
        <CardMedia component='img' height='140' image='/vercel.svg' alt='image' />
        <CardContent>
          <Typography
            gutterBottom
            variant='h5'
            component='div'
            sx={{
              display: '-webkit-box',
              WebkitBoxOrient: 'vertical',
              WebkitLineClamp: 2, // 行数指定
              overflow: 'hidden',
            }}
          >
            {watchFields[0]}
          </Typography>
          <Typography
            variant='body2'
            color='text.secondary'
            sx={{
              display: '-webkit-box',
              WebkitBoxOrient: 'vertical',
              WebkitLineClamp: 3, // 行数指定
              overflow: 'hidden',
            }}
          >
            {watchFields[1]}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size='small' color='primary'>
          画像の追加
        </Button>
        <Modal buttonText='編集'>
          <WorkFormItem />
        </Modal>
        {/* remove 関数は特定の位置の input を削除、位置を指定しない場合は全てを削除 */}
        <IconButton aria-label='delete' onClick={() => removeWork(workIndex, getWorkId)}>
          <DeleteOutlineIcon />
        </IconButton>
      </CardActions>
    </Card>
  )
}

export default ImageCard
