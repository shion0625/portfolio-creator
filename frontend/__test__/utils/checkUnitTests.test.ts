import { checkUnitTests } from '~/utils/checkUnitTests'

const fs = require('fs')

// ファイルシステムモジュールをモック化する
jest.mock('fs')

describe('checkUnitTests', () => {
  afterEach(() => {
    // テストごとにモックのクリア
    jest.resetAllMocks()
  })

  test('should log "単体テストが見つかりました" when test file exists and choice is true', () => {
    const readdirMock = jest.spyOn(fs, 'readdir')
    const statMock = jest.spyOn(fs, 'stat')
    const accessMock = jest.spyOn(fs, 'access')

    readdirMock.mockImplementation((dir, callback: any) => {
      callback(null, ['file.ts'])
    })

    statMock.mockImplementation((file, callback: any) => {
      const stats = {
        isDirectory: jest.fn().mockReturnValue(false),
        isFile: jest.fn().mockReturnValue(true),
      }
      callback(null, stats)
    })

    accessMock.mockImplementation((file, mode, callback: any) => {
      if (file === '__test__/file.test.ts') {
        callback(null) // テストファイルが存在する場合はエラーなしでコールバックを呼び出す
      } else {
        const error = new Error('ファイルが存在しません')
        callback(error) // テストファイルが存在しない場合はエラーを返す
      }
    })

    const logMock = jest.spyOn(console, 'log')
    checkUnitTests('./src', './__test__', ['components', 'utils'], true)

    expect(logMock).toHaveBeenCalledWith('👍src/file.ts の単体テストが見つかりました。')
  })

  test('should log "単体テストが見つかりました" when test file exists and choice is false', () => {
    const readdirMock = jest.spyOn(fs, 'readdir')
    const statMock = jest.spyOn(fs, 'stat')
    const accessMock = jest.spyOn(fs, 'access')

    readdirMock.mockImplementation((dir, callback: any) => {
      callback(null, ['file.ts'])
    })

    statMock.mockImplementation((file, callback: any) => {
      const stats = {
        isDirectory: jest.fn().mockReturnValue(false),
        isFile: jest.fn().mockReturnValue(true),
      }
      callback(null, stats)
    })

    accessMock.mockImplementation((file, mode, callback: any) => {
      if (file === '__test__/file.test.ts') {
        callback(null) // テストファイルが存在する場合はエラーなしでコールバックを呼び出す
      } else {
        const error = new Error('ファイルが存在しません')
        callback(error) // テストファイルが存在しない場合はエラーを返す
      }
    })

    const logMock = jest.spyOn(console, 'log')
    checkUnitTests('./src', './__test__', ['components', 'utils'])

    expect(logMock).not.toHaveBeenCalled()
  })

  test('should not log when test file does not exist', () => {
    const readdirMock = jest.spyOn(fs, 'readdir')
    const statMock = jest.spyOn(fs, 'stat')
    const accessMock = jest.spyOn(fs, 'access')

    readdirMock.mockImplementation((dir, callback: any) => {
      callback(null, ['file.ts'])
    })

    statMock.mockImplementation((file, callback: any) => {
      const stats = {
        isDirectory: jest.fn().mockReturnValue(false),
        isFile: jest.fn().mockReturnValue(true),
      }
      callback(null, stats)
    })

    accessMock.mockImplementation((file, mode, callback: any) => {
      if (file === './__test__/file.test.ts') {
        callback(null) // テストファイルが存在する場合はエラーなしでコールバックを呼び出す
      } else {
        const error = new Error('ファイルが存在しません')
        callback(error) // テストファイルが存在しない場合はエラーを返す
      }
    })

    const logMock = jest.spyOn(console, 'log')

    checkUnitTests('./src', './__test__', ['components', 'utils'])

    expect(logMock).toHaveBeenCalledWith('src/file.ts の単体テストが見つかりませんでした。')
  })

  test('should check targetDirectories', () => {
    const readdirMock = jest.spyOn(fs, 'readdir')
    const statMock = jest.spyOn(fs, 'stat')
    const accessMock = jest.spyOn(fs, 'access')

    readdirMock.mockImplementation((dir, callback: any) => {
      if (dir === './src') {
        callback(null, ['components', 'utils', 'constant'])
      } else if (dir === 'src/components' || dir === 'src/utils' || dir === 'src/constant') {
        callback(null, ['file.tsx'])
      } else {
        callback(new Error('ディレクトリが見つかりません'))
      }
    })

    statMock.mockImplementation((file: any, callback: any) => {
      const stats = {
        isDirectory: jest.fn().mockImplementation(() => !file.endsWith('.ts') && !file.endsWith('.tsx')),
        isFile: jest.fn().mockImplementation(() => file.endsWith('.ts') || file.endsWith('.tsx')),
      }
      callback(null, stats)
    })

    accessMock.mockImplementation((file, mode, callback: any) => {
      if (file === '__test__/components/file.test.tsx' || file === '__test__/utils/file.test.tsx') {
        callback(null) // テストファイルが存在する場合はエラーなしでコールバックを呼び出す
      } else {
        const error = new Error('ファイルが存在しません')
        callback(error) // テストファイルが存在しない場合はエラーを返す
      }
    })

    const logMock = jest.spyOn(console, 'log')

    checkUnitTests('./src', './__test__', ['components', 'utils'], true)

    expect(readdirMock).toHaveBeenCalledWith('./src', expect.any(Function))
    expect(logMock).toHaveBeenCalledWith('👍src/components/file.tsx の単体テストが見つかりました。')
    expect(logMock).toHaveBeenCalledWith('👍src/utils/file.tsx の単体テストが見つかりました。')
  })

  test('Error handling when loading directories.', () => {
    const readdirMock = jest.spyOn(fs, 'readdir')

    readdirMock.mockImplementation((dir, callback: any) => {
      callback('error', [])
    })

    const logMock = jest.spyOn(console, 'error')

    checkUnitTests('./src', './__test__', ['components', 'utils'], true)

    expect(logMock).toHaveBeenCalledWith('ディレクトリの読み込み中にエラーが発生しました:', 'error')
  })

  test('Error handling when acquiring file status.', () => {
    const readdirMock = jest.spyOn(fs, 'readdir')
    const statMock = jest.spyOn(fs, 'stat')

    readdirMock.mockImplementation((dir, callback: any) => {
      callback(null, ['file.ts'])
    })

    statMock.mockImplementation((file, callback: any) => {
      const stats = {
        isDirectory: jest.fn().mockReturnValue(false),
        isFile: jest.fn().mockReturnValue(true),
      }
      callback('error')
    })

    const logMock = jest.spyOn(console, 'error')

    checkUnitTests('./src', './__test__', ['components', 'utils'], true)

    expect(logMock).toHaveBeenCalledWith('ファイルの状態を取得中にエラーが発生しました:', 'error')
  })
})
