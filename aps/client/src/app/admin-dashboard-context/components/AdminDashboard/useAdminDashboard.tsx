import { useLazyFetchAllIkonkaProductsQuery } from "../../services/ikonkaSlice"

export default function useDashboard() {
  const [triggerFetchAllIkonkaProducts, fetchAllIkonkaProductsResult] = useLazyFetchAllIkonkaProductsQuery()

  const handleFetchAllIkonkaProducts = async () => {
    const result = await triggerFetchAllIkonkaProducts({})
  }

  return { handleFetchAllIkonkaProducts, fetchAllIkonkaProductsResult }
}
