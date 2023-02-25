import { useOnEnterKey } from './hooks'
import {
  AccountCircle,
  Mail as MailIcon,
  Notifications as NotificationsIcon,
  MoreVert as MoreIcon,
  InvertColors as InvertColorsIcon,
} from '@mui/icons-material'
import { AppBar, Box, Toolbar, IconButton, Typography, Badge } from '@mui/material'
import Link from 'next/link'
import React, { useContext, useState, MouseEvent, useRef } from 'react'
import MobileMenu from '~/components/parts/MobileMenu'
import MuiLink from '~/components/parts/MuiLink'
import ProfileMenu from '~/components/parts/ProfileMenu'
import SearchArea from '~/components/parts/SearchArea'
import ColorModeContext from '~/context/ColorModeContext'

export default function NavBar() {
  const menuId = 'profile-menu'
  const mobileMenuId = 'menu-mobile'

  const colorMode = useContext(ColorModeContext)

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null) //メニューの表示ボタンを押した場所を取得
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState<null | HTMLElement>(null) //モバイルメニューの表示ボタンを押した場所を取得
  const searchElement = useRef(null) //searchAreaの入力DOM要素を取得

  const isMenuOpen = Boolean(anchorEl) //メニューの状態を管理
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl) //モバイルメニューの状態を管理

  const handleProfileMenuOpen = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleMobileMenuOpen = (event: MouseEvent<HTMLElement>) => {
    setMobileMoreAnchorEl(event.currentTarget)
  }

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
    handleMobileMenuClose()
  }

  const { onEnterKey, startComposition, endComposition } = useOnEnterKey(() => console.log('enter'))

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position='static'>
        <Toolbar>
          <Typography variant='h6' noWrap component='div' sx={{ display: { xs: 'none', sm: 'block' } }}>
            <Link href='/' passHref>
              <MuiLink>portfolio</MuiLink>
            </Link>
          </Typography>
          <SearchArea
            inputElement={searchElement}
            onEnterKey={onEnterKey}
            startComposition={startComposition}
            endComposition={endComposition}
          />
          <IconButton color='inherit' onClick={colorMode.toggleColorMode}>
            <InvertColorsIcon />
          </IconButton>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            <IconButton size='large' aria-label='show 4 new mails' color='inherit'>
              <Badge badgeContent={4} color='error'>
                <MailIcon />
              </Badge>
            </IconButton>
            <IconButton size='large' aria-label='show 17 new notifications' color='inherit'>
              <Badge badgeContent={17} color='error'>
                <NotificationsIcon />
              </Badge>
            </IconButton>
            <IconButton
              size='large'
              edge='end'
              aria-label='account of current user'
              aria-controls={menuId}
              aria-haspopup='true'
              onClick={handleProfileMenuOpen}
              color='inherit'
            >
              <AccountCircle />
            </IconButton>
          </Box>
          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size='large'
              aria-label='show more'
              aria-controls={mobileMenuId}
              aria-haspopup='true'
              onClick={handleMobileMenuOpen}
              color='inherit'
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      <MobileMenu
        mobileMenuId={mobileMenuId}
        mobileMoreAnchorEl={mobileMoreAnchorEl}
        isMobileMenuOpen={isMobileMenuOpen}
        handleMobileMenuClose={handleMobileMenuClose}
        handleProfileMenuOpen={handleProfileMenuOpen}
      />
      <ProfileMenu anchorEl={anchorEl} menuId={menuId} isMenuOpen={isMenuOpen} handleMenuClose={handleMenuClose} />
    </Box>
  )
}
