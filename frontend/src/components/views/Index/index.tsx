import Link from '~/components/parts/Link'
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
        <Link linkProps={{ href: '/users' }}>ユーザ一覧</Link>
        <br />
        <Link linkProps={{ href: '/works' }}>ポートフォリオ一覧</Link>
      </div>
    </>
  )
}

export default IndexView
