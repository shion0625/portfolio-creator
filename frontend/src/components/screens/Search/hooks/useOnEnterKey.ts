import { KeyboardEventHandler, KeyboardEvent, useState } from 'react'

export type KeyBoardHandler<T> = KeyboardEventHandler<T>

// useOnEnterKeyフックの定義
export const useOnEnterKey = <T>(
  func: (e?: KeyboardEvent<T>) => void, // キーボードイベントハンドラ
): {
  onEnterKey: KeyBoardHandler<T> // Enterキーが押されたときのイベントハンドラ
  startComposition: () => void // 入力中に呼び出されるイベントハンドラ
  endComposition: () => void // 入力中に呼び出されるイベントハンドラ
} => {
  // 入力中かどうかを追跡するための状態
  const [composing, setComposition] = useState(false)

  // 入力が開始されたときに呼び出されるイベントハンドラ
  const startComposition = () => setComposition(true)

  // 入力が終了したときに呼び出されるイベントハンドラ
  const endComposition = () => setComposition(false)

  // Enterキーが押されたときに呼び出されるイベントハンドラ
  const onEnterKey: KeyboardEventHandler<T> = (event): void => {
    if (event.key === 'Enter' && !composing) {
      // 入力中でなく、Enterキーが押された場合
      func(event) // 渡された関数を呼び出す
    }
  }
  return {
    onEnterKey,
    startComposition,
    endComposition,
  }
}
