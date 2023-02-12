import Grid from '@mui/material/Grid'
import React from 'react'
import { WorkImageCard } from '~/components/parts/WorkImageCard'
import { Work } from '~/models/types'

type Props = {
  works: Work[]
}

export const WorkNodesList: React.FC<Props> = ({ works }): JSX.Element => {
  return (
    <>
      <Grid container spacing={2}>
        {works.map((work: Work, i) => {
          return (
            <Grid item key={`work.id${i}`} xs={6} md={4} lg={3}>
              <WorkImageCard work={work} />
            </Grid>
          )
        })}
      </Grid>
    </>
  )
}
