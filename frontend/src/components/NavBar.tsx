import {
  AccountCircle,
  Mail as MailIcon,
  Notifications as NotificationsIcon,
  MoreVert as MoreIcon,
} from '@mui/icons-material'
import { AppBar, Box, Toolbar, IconButton, Typography, Badge } from '@mui/material'
import * as React from 'react'
import ProfileMenu from '~/components/uiParts/ProfileMenu'
import SearchArea from '~/components/uiParts/SearchArea'
import MobileMenu from '~/components/uiParts/mobile/MobileMenu'

export default function PrimarySearchAppBar() {
  const menuId = 'profile-menu'
  const mobileMenuId = 'menu-mobile'

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null) //メニューの表示ボタンを押した場所を取得
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState<null | HTMLElement>(null) //モバイルメニューの表示ボタンを押した場所を取得

  const isMenuOpen = Boolean(anchorEl) //メニューの状態を管理
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl) //モバイルメニューの状態を管理

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMobileMoreAnchorEl(event.currentTarget)
  }

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
    handleMobileMenuClose()
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position='static'>
        <Toolbar>
          {/* <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton> */}
          <Typography variant='h6' noWrap component='div' sx={{ display: { xs: 'none', sm: 'block' } }}>
            portfolio
          </Typography>
          <SearchArea />
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
