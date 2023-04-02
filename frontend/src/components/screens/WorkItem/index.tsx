// React Hook Form でエラーメッセージを表示するための ErrorMessage コンポーネントを import
import { Item } from './style'
import { Box, Chip } from '@mui/material'
import Typography from '@mui/material/Typography'
import React, { useContext } from 'react'
import Link from '~/components/parts/Link'
import { Color } from '~/constant/constant'
import { WorkContext } from '~/stores/WorkView'

const WorkItem: React.FC = () => {
  const { work } = useContext(WorkContext)
  const color = Color

  const parseJson = (json?: string | null) => json ? JSON.parse(json).filter(Boolean) : [];
  const languages = parseJson(work.language);
  const urls = parseJson(work.url);

  const renderLanguageChip = (language: string, i: number) => {
    const num = Math.floor(Math.random() * color.length);
    return <Chip key={language + ':' + i} label={language} variant='outlined' color={color[num]} />;
  };

    const renderUrl = (url: string, i: number) => (
    <Box key={url + i}>
      <Link linkProps={{ href: url }} target='_blank' rel='noopener noreferrer'>
        {url}
      </Link>
    </Box>
  );
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
          {languages.map(renderLanguageChip)}
        </Typography>

        <Typography paragraph>
          {urls.map(renderUrl)}
        </Typography>
      </>
    </Item>
  )
}

export default WorkItem
