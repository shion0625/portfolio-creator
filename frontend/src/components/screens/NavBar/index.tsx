import { useProfileMenu, useMobileMenu } from './hooks'
import {
  AccountCircle,
  Mail as MailIcon,
  Notifications as NotificationsIcon,
  MoreVert as MoreIcon,
  InvertColors as InvertColorsIcon,
} from '@mui/icons-material'
import { AppBar, Box, Toolbar, IconButton, Typography, Badge } from '@mui/material'
import React from 'react'
import Link from '~/components/parts/Link'
import MobileMenu from '~/components/parts/MobileMenu'
import ProfileMenu from '~/components/parts/ProfileMenu'
import Search from '~/components/screens/Search'
import { usePaletteMode } from '~/stores/PaletteMode'

const NavBar: React.FC = () => {
  const { anchorEl, isMenuOpen, handleProfileMenuOpen, handleProfileMenuClose } = useProfileMenu()
  const { mobileMoreAnchorEl, isMobileMenuOpen, handleMobileMenuOpen, handleMobileMenuClose } = useMobileMenu()
  const [, , toggleChangePaletteMode] = usePaletteMode()

  const menuId = 'profile-menu'
  const mobileMenuId = 'menu-mobile'

  const handleMenuClose = () => {
    handleProfileMenuClose()
    handleMobileMenuClose()
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position='static'>
        <Toolbar>
          <Typography variant='h6' noWrap component='div' sx={{ display: { xs: 'none', sm: 'block' } }}>
            <Link linkProps={{ href: '/' }}>portfolio</Link>
          </Typography>
          <Search />
          <IconButton color='inherit' onClick={toggleChangePaletteMode}>
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

export default NavBar
