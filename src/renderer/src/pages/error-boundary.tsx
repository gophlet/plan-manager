import * as React from 'react'
import { useNavigate } from 'react-router'
import Card from '../components/kit/card'
import { Button } from '../components/kit/button'
import { RouteName } from '../constants'
import { Home, LogIn } from 'lucide-react'
import { useAuthStore } from '@renderer/store/auth'

const ErrorBoundary = (): React.JSX.Element => {
  const navigate = useNavigate()
  const clearToken = useAuthStore((state) => state.clearToken)

  const handleBackHome = (): void => {
    navigate(RouteName.DASHBOARD, { replace: true })
  }

  const handleLogout = async (): Promise<void> => {
    await clearToken()
    navigate(RouteName.LOGIN, { replace: true })
  }

  return (
    <div className="flex items-center justify-center min-h-[60vh] bg-gray-50">
      <Card className="w-[90vw] max-w-2xl flex flex-col items-center gap-6 py-16 shadow-xl border border-gray-200">
        <div className="text-7xl">😢</div>
        <div className="text-2xl font-bold text-gray-900">出错啦！</div>
        <div className="text-gray-500 text-center text-lg">
          发生未知错误，您可以尝试返回主页或重新登录。
        </div>
        <div className="flex flex-col gap-3 w-full max-w-xs mt-4">
          <Button
            variant="default"
            onClick={handleBackHome}
            className="w-full flex items-center justify-center gap-1"
          >
            <Home size={20} className="mr-1" />
            返回主页
          </Button>
          <Button
            variant="outline"
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-1"
          >
            <LogIn size={20} className="mr-1" />
            重新登录
          </Button>
        </div>
      </Card>
    </div>
  )
}

export default ErrorBoundary
