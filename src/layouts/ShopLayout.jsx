import { Outlet } from "react-router-dom"
import Header from "./header/Header"

export default function ShopLayout() {
  return (
    <div className="shop-layout">
      <Header />
      <main className="py-5">
        <Outlet />
      </main>
    </div>
  )
}
