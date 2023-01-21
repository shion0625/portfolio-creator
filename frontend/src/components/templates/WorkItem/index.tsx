// React Hook Form でエラーメッセージを表示するための ErrorMessage コンポーネントを import
import { Item } from './style'
import { Box, Chip } from '@mui/material'
import Typography from '@mui/material/Typography'
import React, { useContext } from 'react'
import { Color } from '~/constant/constant'
import { WorkContext } from '~/context/WorkView'

const WorkItem: React.FC = () => {
  const { work } = useContext(WorkContext)
  const color = Color

  let languages: string[] = []
  let urls: string[] = []

  if (work.language) {
    languages = JSON.parse(work.language).filter(Boolean)
  }
  if (work.url) {
    urls = JSON.parse(work.url).filter(Boolean)
  }

  return (
    <Item key={'workItem' + work.id}>
      <>
        <Typography paragraph>{work.title}</Typography>
        <Typography paragraph>{work.summary}</Typography>
        <Typography paragraph>開発期間: {work.duration}ヶ月</Typography>
        <Typography paragraph>開発人数: {work.number_of_people}人</Typography>
        <Typography paragraph>{work.role}</Typography>
        <Typography paragraph>{work.brief_story}</Typography>

        <Typography paragraph>
          {languages.length != 0 &&
            languages.map((language, i) => {
              var num = Math.floor(Math.random() * color.length)
              return <Chip key={language + ':' + i} label={language} variant='outlined' color={color[num]} />
            })}
        </Typography>

        <Typography paragraph>
          {urls.length != 0 &&
            urls.map((url, i) => (
              <Box key={url + i}>
                <a href={url} target='_blank' rel='noopener noreferrer'>
                  {url}
                </a>
              </Box>
            ))}
        </Typography>
      </>
    </Item>
  )
}

export default WorkItem
