import { KeyboardEventHandler, KeyboardEvent, useState } from 'react'

export type KeyBoardHandler<T> = KeyboardEventHandler<T>

export const useOnEnterKey = <T>(
  func: (e?: KeyboardEvent<T>) => void,
): {
  onEnterKey: KeyBoardHandler<T>
  startComposition: () => void
  endComposition: () => void
} => {
  const [composing, setComposition] = useState(false)
  const startComposition = () => setComposition(true)
  const endComposition = () => setComposition(false)

  const onEnterKey: KeyboardEventHandler<T> = (event): void => {
    if (event.key === 'Enter' && !composing) {
      func(event)
    }
  }
  return {
    onEnterKey,
    startComposition,
    endComposition,
  }
}
