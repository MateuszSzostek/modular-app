import type { MenuProps } from "antd"
import { Layout, Menu, Row, theme } from "antd"
import "./AdminDashboard.styles.scss"
import { useTranslation } from "react-i18next"
import { Button } from "../../../../common/components"
import useDashboard from "./useAdminDashboard"

export default function Dashboard() {
  const { handleFetchAllIkonkaProducts, fetchAllIkonkaProductsResult } = useDashboard()
  const { t } = useTranslation()

  return (
    <Row className="bring-in-anim">
      <Button onClick={handleFetchAllIkonkaProducts} loading={fetchAllIkonkaProductsResult.isLoading}>
        {t("dashboard.fetch-all-ikonka-products-button")}
      </Button>
    </Row>
  )
}
