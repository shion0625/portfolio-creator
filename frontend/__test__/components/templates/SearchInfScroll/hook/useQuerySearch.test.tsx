import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client'
import { SchemaLink } from '@apollo/client/link/schema'
import { addMocksToSchema } from '@graphql-tools/mock'
import { makeExecutableSchema } from '@graphql-tools/schema'
import { render, waitFor, fireEvent } from '@testing-library/react'
import { MutableRefObject } from 'react'
import useQuerySearch, { Variables } from '~/components/templates/SearchInfScroll/hook/useQuerySearch'
import { typeDefs } from '~/libs/graphql/typeDefs'
import { Model, SortBy } from '~/models/types'

const variables: Variables<Model.User> = {
  target: Model.User,
  limit: 10,
  sortBy: SortBy.Create,
  keyword: 'test',
  searchedAt: '2023-04-01T00:00:00Z',
  num: 0,
}

const refetchVariables: Variables<Model.User> = {
  target: Model.User,
  limit: 10,
  sortBy: SortBy.Create,
  keyword: 'refetch',
  searchedAt: '2023-04-10T00:00:00Z',
  num: 0,
}

const mocks = {
  DateTime: () => '2022-04-10T10:00:00.000Z',
}

const schema = makeExecutableSchema({ typeDefs })
const schemaWithMocks = addMocksToSchema({
  schema,
  mocks,
})

const client = new ApolloClient({
  link: new SchemaLink({ schema: schemaWithMocks }),
  cache: new InMemoryCache(),
})

describe('useQuerySearch', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    client.clearStore()
  })

  it('should fetch data with correct variables and call setSearchData when data is returned', async () => {
    const lastDataRef: MutableRefObject<any> = { current: undefined }

    const { findByTestId, getByTestId } = render(
      <ApolloProvider client={client}>
        <TestComponent lastDataRef={lastDataRef} variables={variables} />
      </ApolloProvider>,
    )

    expect(await findByTestId('loading')).toBeInTheDocument()

    waitFor(() => {
      expect(getByTestId('result-user')?.childElementCount).toBeGreaterThan(0)
    })
  })

  it('should fetch data with hasNextPage is false', async () => {
    const lastDataRef: MutableRefObject<any> = { current: undefined }

    const { findByTestId, getByTestId } = render(
      <ApolloProvider client={client}>
        <TestComponent lastDataRef={lastDataRef} variables={variables} />
      </ApolloProvider>,
    )

    expect(await findByTestId('loading')).toBeInTheDocument()

    waitFor(() => {
      expect(getByTestId('result-user')?.childElementCount).toBeGreaterThan(0)
    })
  })

  it('should refetch data when refetch is called', async () => {
    const lastDataRef: MutableRefObject<any> = { current: undefined }

    const { findByTestId, getByTestId, getByText } = render(
      <ApolloProvider client={client}>
        <TestComponent lastDataRef={lastDataRef} variables={variables} />
      </ApolloProvider>,
    )

    expect(await findByTestId('loading')).toBeInTheDocument()

    waitFor(() => {
      expect(getByTestId('result-user')?.childElementCount).toBeGreaterThan(0)
      fireEvent.click(getByText('Refetch'))
      expect(findByTestId('loading')).toBeInTheDocument()
    })

    waitFor(() => {
      expect(getByTestId('result-user')?.childElementCount).toBeGreaterThan(0)
    })
  })
})

interface TestComponentProps<T extends Model> {
  lastDataRef: React.MutableRefObject<undefined>
  variables: Variables<T>
}

const TestComponent = <T extends Model>({ lastDataRef, variables }: TestComponentProps<T>): JSX.Element => {
  const { searchResult, loading, refetch, error } = useQuerySearch(variables)

  if (!searchResult || loading) {
    return <div data-testid='loading'>Loading</div>
  }

  return (
    <div data-testid='search-result'>
      <div data-testid='result-user'>
        {searchResult.nodes.map((user: any) => {
          return <p key={user?.id}>{user?.name}</p>
        })}
      </div>
      <button onClick={() => refetch(refetchVariables)}>Refetch</button>
    </div>
  )
}
