import { loginService } from '../services/login'
import { setToken } from '../services/notes'
import LoginForm from './login-form'

export default function Home({ user, setUser }) {
  const login = async credentials => {
    try {
      const user = await loginService(credentials)

      window.localStorage.setItem('loggedNoteAppUser', JSON.stringify(user))
      setToken(user.token)
      setUser(user)
    } catch (error) {
      console.log('error', error)
    }
  }

  return (
    <div>
      {!user && <LoginForm login={login} />}

      <p>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Hic pariatur
        sunt maxime quia amet neque ut dolore esse beatae molestias iste unde
        possimus laborum aperiam totam quam modi, sint nostrum consequuntur sed
        veritatis. Obcaecati blanditiis modi perferendis corrupti vero
        dignissimos mollitia rem nulla rerum quidem illo error et numquam, quia
        deleniti eveniet omnis nam iusto tempora a. Corporis rem debitis itaque
        deserunt qui obcaecati, harum similique quibusdam ullam animi sit?
      </p>
    </div>
  )
}
