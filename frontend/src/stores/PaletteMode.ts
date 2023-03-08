import { PaletteMode, useMediaQuery } from '@mui/material'
import { useEffect } from 'react'
import { atom, AtomEffect, useRecoilState, SetterOrUpdater } from 'recoil'

const PALETTE_MODE_STORAGE_KEY = 'palette_mode'

const localStorageEffect: (key: string) => AtomEffect<PaletteMode | undefined> =
  (key) =>
  ({ onSet }) => {
    onSet((newValue, _, isReset) => {
      if (isReset || newValue === undefined) {
        localStorage.removeItem(key)
        return
      }

      localStorage.setItem(key, newValue)
    })
  }

const paletteModeState = atom<PaletteMode | undefined>({
  key: 'PaletteMode',
  default: undefined,
  effects: [localStorageEffect(PALETTE_MODE_STORAGE_KEY)],
})

export type setPaletteModeType = SetterOrUpdater<PaletteMode | undefined>
export type toggleChangePaletteModeType = () => void

export type usePaletteModeType = () => [PaletteMode, setPaletteModeType, toggleChangePaletteModeType]

export const usePaletteMode: usePaletteModeType = () => {
  const prefersPaletteMode = useMediaQuery('(prefers-color-scheme: dark)') ? 'dark' : 'light'
  const [paletteMode, setPaletteMode] = useRecoilState(paletteModeState)

  useEffect(() => {
    const paletteMode = localStorage.getItem(PALETTE_MODE_STORAGE_KEY)

    if (paletteMode !== null && ['light', 'dark'].includes(paletteMode)) {
      setPaletteMode(paletteMode as PaletteMode)
    }
  })

  const toggleChangePaletteMode = () => {
    setPaletteMode((prevMode) => {
      return prevMode === 'light' ? 'dark' : 'light'
    })
  }

  return [paletteMode ?? prefersPaletteMode, setPaletteMode, toggleChangePaletteMode]
}
