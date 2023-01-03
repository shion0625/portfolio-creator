import Grid from '@mui/material/Grid'
import React from 'react'
import { WorkImageCard } from '~/components/WorkImageCard'
import { WorkPagination, Work } from '~/models/types'

type Props = {
  works: WorkPagination
}

export const WorkList: React.FC<Props> = ({ works }): JSX.Element => {
  return (
    <>
      <Grid container spacing={2}>
        {works.nodes.map((work: Work, i) => {
          return (
            <Grid item key={work.id} xs={6} md={4} lg={3}>
              <WorkImageCard work={work} />
            </Grid>
          )
        })}
      </Grid>
    </>
  )
}
