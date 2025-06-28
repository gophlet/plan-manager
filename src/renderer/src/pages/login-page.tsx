import * as React from 'react'
import { useNavigate } from 'react-router'
import { useAuthStore } from '@renderer/store/auth'
import { RouteName } from '@renderer/constants'
import { api } from '@renderer/api'
import Card from '../components/kit/card'
import AppIcon from '../components/kit/app-icon'
import { useToast } from '../components/kit/toast/toast-context'
import { Input } from '../components/kit/input'
import { Button } from '../components/kit/button'
import { Alert } from '../components/kit/alert'
import { Spinner } from '../components/kit/spinner'

const LoginPage = (): React.JSX.Element => {
  // throw new Error('Test error boundary')

  const { notify } = useToast()
  const [account, setAccount] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [loading, setLoading] = React.useState(false)
  const [error, setError] = React.useState('')
  const navigate = useNavigate()
  const token = useAuthStore((state) => state.token)

  React.useEffect(() => {
    if (token) {
      navigate(RouteName.DASHBOARD, { replace: true })
    }
  }, [navigate, token])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault()
    if (!account.trim() || !password.trim()) {
      setError('用户名和密码不能为空！')
      return
    }
    setError('')
    setLoading(true)
    try {
      await api.login({ account, password })
      notify({ title: '登录成功', description: '欢迎回来！', variant: 'success' })
    } catch (error) {
      notify({
        title: '登录失败',
        description: error instanceof Error ? error.message : '请重试',
        variant: 'destructive'
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="w-full max-w-md flex flex-col items-center px-4">
      <Card className="w-full py-12 px-8">
        <div className="flex flex-col items-center gap-8">
          <div className="flex flex-col items-center gap-3 mb-2">
            <AppIcon size={64} className="shadow-lg rounded-2xl" />
            <div className="text-3xl font-extrabold text-gray-900 tracking-tight">Plan Manager</div>
            <div className="text-base text-gray-500 font-medium">账户登录</div>
          </div>
          <form className="w-full flex flex-col gap-6" onSubmit={handleSubmit}>
            {error && <Alert variant="destructive">{error}</Alert>}
            <Input
              type="text"
              placeholder="用户名"
              value={account}
              onChange={(e) => setAccount(e.target.value)}
              disabled={loading}
              autoComplete="username"
            />
            <Input
              type="password"
              placeholder="密码"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading}
              autoComplete="current-password"
            />
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? (
                <>
                  <Spinner size={20} className="mr-2" /> 登录中...
                </>
              ) : (
                '登录'
              )}
            </Button>
          </form>
        </div>
      </Card>
    </main>
  )
}

export default LoginPage
