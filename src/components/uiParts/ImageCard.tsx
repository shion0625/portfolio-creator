import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import BasicModal from './modal'

type Props = {
  workIndex: number
  watch: any
}

const MultiActionAreaCard: React.FC<Props> = ({ workIndex, watch}) => {
  const watchFields = watch([`works.${workIndex}.title`, `works.${workIndex}.summary`]);

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image="/static/images/cards/contemplative-reptile.jpg"
          alt="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {watchFields[0]}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {watchFields[1]}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary">
          画像の追加
        </Button>
        <BasicModal buttonText='編集' />
      </CardActions>
    </Card>
  );
}

export default MultiActionAreaCard
