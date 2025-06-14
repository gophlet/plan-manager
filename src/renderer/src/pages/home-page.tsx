import * as React from 'react'

const HomePage = (): React.JSX.Element => {
  return (
    <main className="flex-1 flex flex-col items-center justify-center p-8">
      <div className="bg-white rounded-xl shadow-md border border-gray-200 p-10 max-w-lg w-full flex flex-col items-center gap-6">
        <div className="text-5xl mb-2">👋</div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">欢迎使用 Plan Manager</h1>
        <div className="text-gray-600 text-center">
          请在左侧侧栏的 <span className="font-semibold text-blue-600">钱包列表</span>
          <br />
          中选择一个钱包以开始管理计划。
        </div>
      </div>
    </main>
  )
}

export default HomePage
