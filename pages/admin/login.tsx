import Head from 'next/head'
import { useRouter } from 'next/router'
import { setCookie } from 'nookies'
import { FormEvent, useState } from 'react'
import { BASE_URL } from '../../utils/requests'

const Login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(false)

  const router = useRouter()

  const submitHandler = async (event: FormEvent) => {
    event.preventDefault()

    try {
      setError(false)
      const res = await fetch(`${BASE_URL}/auth/login`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify({
          username,
          password
        })
      })
      if (!res.ok) {
        throw new Error()
      } else {
        setCookie(null, 'token', process.env.NEXT_PUBLIC_TOKEN || '', {
          maxAge: 30 * 24 * 60 * 60,
          path: '/'
        })
        router.push('/admin')
      }
    } catch (err) {
      setError(true)
    }
  }

  return (
    <>
      <Head>
        <title>Login</title>
      </Head>
      <section className="py-[10rem] px-[2rem]">
        <form
          onSubmit={submitHandler}
          className="max-w-[350px] mx-auto text-center"
        >
          <h1 className="text-[2.5rem]">Admin Dashboard</h1>
          <input
            type="text"
            placeholder="username"
            className="w-full px-[0.5rem] py-[0.8rem] border-[2px] mt-[2rem] mb-[1rem]"
            onChange={e => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="password"
            className="w-full px-[0.5rem] py-[0.8rem] border-[2px] mb-[1rem]"
            onChange={e => setPassword(e.target.value)}
          />
          <button className="bg-[green] text-white w-full py-[0.8rem] font-bold">
            Sign In
          </button>
          {error && <p className="text-[red] text-left">Wrong Credentials!</p>}
        </form>
      </section>
    </>
  )
}

export default Login
