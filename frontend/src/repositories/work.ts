import { GetWorksQuery } from '~/models/client'
import { fetcherSSG } from '~/repositories/server'

export async function GetWorksServer(): Promise<GetWorksQuery> {
  const sdk = await fetcherSSG()
  const works = await sdk.GetWorks({ limit: 10, offset: 0 })
  return works
}
