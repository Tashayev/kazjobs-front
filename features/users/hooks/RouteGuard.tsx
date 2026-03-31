import useUser from "@/features/users"
import { usePathname, useRouter } from "next/navigation"
import { useEffect } from "react"

const protectedRoutes = [
  "/profile",
  "/dashboard",
  "/",
  "/categories",
]
const authRoutes = [
  "/auth",
]
const RouteGuard = ({ children }: { children: React.ReactNode }) => {
  
    const { isLoading, isAuthenticated } = useUser();
    const route = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        if (isLoading) return;
        const isProtected = protectedRoutes.some((r) => r === pathname)
        const isAuth = authRoutes.some((r) => pathname.startsWith(r))
        if (isProtected && !isAuthenticated) route.replace("/auth");
        if ( isAuth && isAuthenticated) route.replace("/");
    }, [isAuthenticated, isLoading, pathname, route]);

    if (isLoading) return null
    
  return <>{children}</>;
}

export default RouteGuard