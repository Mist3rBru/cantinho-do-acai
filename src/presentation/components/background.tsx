import { Outlet } from 'react-router-dom'

export function Background(): React.JSX.Element {
  return (
    <div className="block min-h-screen overflow-hidden bg-gradient-to-br from-black to-purple-700 py-16">
      <div className="relative mx-auto w-11/12 max-w-6xl">
        <Outlet />
      </div>
    </div>
  )
}
