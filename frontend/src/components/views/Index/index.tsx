import Link from 'next/link'
import MuiLink from '~/components/parts/MuiLink'
import NavBar from '~/components/screens/NavBar'
import SignIn from '~/components/templates/Signin'

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
      </div>
    </>
  )
}

export default IndexView
