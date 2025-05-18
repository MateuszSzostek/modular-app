import { STATUS_CODE } from '../../../../shared/all'
import { useLazySignOutQuery } from '../../../identify-and-access-context/services/authSlice'
import { useNavigate } from 'react-router-dom'
import { ROUTES } from '../../../routing-context/domain/router-context'
import { BookFilled, ProductFilled } from '@ant-design/icons'
import { MenuProps } from 'antd'
import React from 'react'
import { useTranslation } from 'react-i18next'

export default function useAppLayout() {
  const navigate = useNavigate()
  const [logoutTrigger] = useLazySignOutQuery()

  const { t } = useTranslation()

  const handleLogout = async () => {
    const logoutResponse = await logoutTrigger({})

    if ('error' in logoutResponse) {
    } else if (logoutResponse?.data?.status !== STATUS_CODE._200) {
      navigate(`/${ROUTES.auth}/${ROUTES.login}`)
    }
  }

  const sideBarItems: MenuProps['items'] = [
    {
      key: `navigation.finance-select`,
      icon: React.createElement(BookFilled),
      label: t('navigation.finance-select'),

      children: [
        {
          key: 1,
          label: t(`navigation.invoices-link`),
        },
        {
          key: 2,
          label: t(`navigation.costs-link`),
        },
        {
          key: 3,
          label: t(`navigation.reports-link`),
        },
      ],
    },
    {
      key: `navigation.projects-management-select`,
      icon: React.createElement(ProductFilled),
      label: t('navigation.projects-management-select'),

      children: [
        {
          key: 1,
          label: t(`navigation.projects-link`),
        },
      ],
    },

    {
      key: `navigation.hr-select`,
      icon: React.createElement(ProductFilled),
      label: t('navigation.hr-select'),

      children: [
        {
          key: 1,
          label: t(`test`),
        },
      ],
    },
    {
      key: `navigation.crm-select`,
      icon: React.createElement(ProductFilled),
      label: t('navigation.crm-select'),

      children: [
        {
          key: 1,
          label: t(`test`),
        },
      ],
    },
  ]
  return { sideBarItems, handleLogout }
}
