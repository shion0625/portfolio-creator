import Link from 'next/link'
import MuiLink from '~/components/parts/MuiLink'
import NavBar from '~/components/templates/NavBar'
import SignIn from '~/components/templates/SignIn'

const IndexView: React.FC = () => {
  return (
    <>
      <NavBar />
      <SignIn />
      <div style={{ margin: '0 auto', width: '1000px' }}>
        {/* {data?.user.id} */}
        <br />
        <Link href='/users' passHref>
          <MuiLink>ユーザ一覧</MuiLink>
        </Link>
        <br />
        <Link href='/works' passHref>
          <MuiLink>ポートフォリオ一覧</MuiLink>
        </Link>
        <Link href='/works' passHref>
          <a href='/works'> works</a>
        </Link>
      </div>
    </>
  )
}

export default IndexView
