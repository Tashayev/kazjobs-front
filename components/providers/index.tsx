import { store } from "@/store"
import AuthProvider from "../../features/users/hooks/AuthProvider"
import { Provider } from "react-redux"
import RouteGuard from "../../features/users/hooks/RouteGuard"

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <Provider store={store}>
      <AuthProvider>
        <RouteGuard>{children}</RouteGuard>
      </AuthProvider>
    </Provider>
  )
}

export default Providers
