import { createHashRouter, createRoutesFromElements, Navigate, Outlet, Route } from 'react-router'
import { RouteName } from '@renderer/constants'
import Protected from './protected'
import Public from './public'
import ErrorBoundary from '@renderer/pages/error-boundary'
import UnauthLayout from '@renderer/layouts/unauth-layout'
import MainLayout from '@renderer/layouts/main-layout'
import LoginPage from '@renderer/pages/login-page'
import HomePage from '@renderer/pages/home-page'
import PlanPageWrapper from '@renderer/pages/plan-page-wrapper'
import ErrorLayout from '@renderer/layouts/error-layout'

const routes = createRoutesFromElements(
  <Route
    element={<Outlet />}
    errorElement={
      <ErrorLayout>
        <ErrorBoundary />
      </ErrorLayout>
    }
  >
    <Route element={<Protected />}>
      <Route element={<MainLayout />}>
        <Route index element={<Navigate to={RouteName.DASHBOARD} replace />} />
        <Route path={RouteName.DASHBOARD} element={<HomePage />} />
        <Route path={`${RouteName.WALLET}/:walletId`} element={<PlanPageWrapper />} />
      </Route>
    </Route>
    <Route element={<Public />}>
      <Route element={<UnauthLayout />}>
        <Route path={RouteName.LOGIN} element={<LoginPage />} />
      </Route>
    </Route>
  </Route>
)

export const router = createHashRouter(routes)
