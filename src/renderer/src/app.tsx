import { RouterProvider } from 'react-router'
import { router } from './router'
import { ToastProvider } from './components/kit/toast/toast-provider'
import { useCallback, useEffect } from 'react'
import { useAuthStore } from './store/auth'
import { Platform, PLATFORM_ATTRIBUTE_NAME } from './constants'

const App = (): React.JSX.Element => {
  const readToken = useAuthStore((state) => state.init)

  const initAuth = useCallback(async () => {
    try {
      await readToken()
    } catch (error) {
      console.error(error)
    }
  }, [readToken])

  useEffect(() => {
    initAuth()
  }, [initAuth])

  const initPlatformAttribute = useCallback(async () => {
    try {
      if (await window.platform.isWindows()) {
        document.documentElement.setAttribute(PLATFORM_ATTRIBUTE_NAME, Platform.WINDOWS)
      }
    } catch (error) {
      console.error(error)
    }
  }, [])

  useEffect(() => {
    initPlatformAttribute()
  }, [initPlatformAttribute])

  return (
    <ToastProvider>
      <RouterProvider router={router} />
    </ToastProvider>
  )
}

export default App
