import { NextPageContext } from 'next'
import { setCookie, destroyCookie, parseCookies } from 'nookies'

//クライアントサイドの場合ctxを渡さずに、SSRならctxを渡せば、cookieをオブジェクトに整形して返してくれます。

export function setCookieToken(token: string, ctx?: NextPageContext) {
  setCookie(ctx, 'accessToken', token, {
    maxAge: 30 * 24 * 60 * 60,
  })
}

export function printCookie(ctx?: NextPageContext): any {
  const cookie = parseCookies(ctx)
  // console.log(cookie) // { accessToken: 'test1234' }
  return cookie
}

// ついでにcookie削除
export function destroyCookieToken(ctx?: NextPageContext) {
  destroyCookie(ctx, 'accessToken')
}
