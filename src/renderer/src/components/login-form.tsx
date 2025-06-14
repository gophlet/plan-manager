import { Alert } from './kit/alert'
import { Input } from './kit/input'
import { Button } from './kit/button'
import { useState, ReactElement } from 'react'

export function LoginForm({
  onSubmit
}: {
  onSubmit: (data: { username: string; password: string }) => void
}): ReactElement {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault()
    if (!username || !password) {
      setError('请输入用户名和密码')
      return
    }
    setError('')
    onSubmit({ username, password })
  }

  return (
    <form className="w-full max-w-sm mx-auto flex flex-col gap-6" onSubmit={handleSubmit}>
      <h2 className="text-2xl font-bold text-center">登录</h2>
      {error && <Alert variant="destructive">{error}</Alert>}
      <div className="flex flex-col gap-4">
        <Input
          placeholder="请输入用户名"
          autoComplete="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <Input
          type="password"
          placeholder="请输入密码"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <Button type="submit" className="w-full">
        登录
      </Button>
    </form>
  )
}
