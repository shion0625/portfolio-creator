import Grid from '@mui/material/Grid'
import React from 'react'
import { WorkPagination, Work } from '~/models/types'
import { WorkImageCard } from '~/components/WorkImageCard'

type Props = {
  works: WorkPagination
}

export const WorkList: React.FC<Props> = ({ works }): JSX.Element => {
  console.log(works)
  return (
    <>
      <Grid container spacing={2}>
        {works.nodes.map((work: Work) => {
          return (
            <Grid item xs={6} md={4} lg={3}>
              <WorkImageCard key={work.id} work={ work }/>
            </Grid>
          )
        })}
      </Grid>
    </>
  )
}
