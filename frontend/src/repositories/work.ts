import { GetWorksQuery } from '~/models/client'
import { fetcherSSG } from '~/repositories/server'

export async function GetWorksServer(): Promise<GetWorksQuery> {
  const defaultLimit = Number(process.env.NEXT_PUBLIC_DEFAULT_VOLUMES)
  const sdk = await fetcherSSG()
  const works = await sdk.GetWorks({ limit: defaultLimit, offset: 0 })
  return works
}
