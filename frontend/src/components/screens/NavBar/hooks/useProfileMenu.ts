import { useState, MouseEvent } from 'react'

export const useProfileMenu = (): {
  anchorEl: HTMLElement | null
  isMenuOpen: boolean
  handleProfileMenuOpen: (event: MouseEvent<HTMLElement>) => void
  handleProfileMenuClose: () => void
} => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null) //メニューの表示ボタンを押した場所を取得
  const isMenuOpen = Boolean(anchorEl) //メニューの状態を管理

  const handleProfileMenuOpen = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleProfileMenuClose = () => {
    setAnchorEl(null)
  }

  return {
    anchorEl,
    isMenuOpen,
    handleProfileMenuOpen,
    handleProfileMenuClose,
  }
}
