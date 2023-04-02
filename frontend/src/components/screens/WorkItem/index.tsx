// React Hook Form でエラーメッセージを表示するための ErrorMessage コンポーネントを import
import { Item } from './style'
import { Box } from '@mui/material'
import Typography from '@mui/material/Typography'
import React, { useContext } from 'react'
import Link from '~/components/parts/Link'
import RandomColorChip from '~/components/parts/RandomColorChip'
import { WorkContext } from '~/stores/WorkView'

const WorkItem: React.FC = () => {
  const { work } = useContext(WorkContext)

  const parseJson = (json?: string | null) => (json ? JSON.parse(json).filter(Boolean) : [])
  const languages = parseJson(work.language)
  const urls = parseJson(work.url)

  const renderUrl = (url: string, i: number) => (
    <Box key={url + i}>
      <Link linkProps={{ href: url }} target='_blank' rel='noopener noreferrer'>
        {url}
      </Link>
    </Box>
  )
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
          {languages.map((language: string, index: number) => (
            <RandomColorChip key={language + ':' + index} content={language} />
          ))}
        </Typography>

        <Typography paragraph>{urls.map(renderUrl)}</Typography>
      </>
    </Item>
  )
}

export default WorkItem
