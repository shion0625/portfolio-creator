import { useState, MouseEvent } from 'react'

export const useMobileMenu = (): {
  mobileMoreAnchorEl: HTMLElement | null
  isMobileMenuOpen: boolean
  handleMobileMenuOpen: (event: MouseEvent<HTMLElement>) => void
  handleMobileMenuClose: () => void
} => {
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState<null | HTMLElement>(null) //モバイルメニューの表示ボタンを押した場所を取得
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl) //モバイルメニューの状態を管理

  const handleMobileMenuOpen = (event: MouseEvent<HTMLElement>) => {
    setMobileMoreAnchorEl(event.currentTarget)
  }

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null)
  }

  return {
    mobileMoreAnchorEl,
    isMobileMenuOpen,
    handleMobileMenuOpen,
    handleMobileMenuClose,
  }
}
