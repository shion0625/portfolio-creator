const fs = require('fs')
const path = require('path')

const SRC_DIRECTORY = 'src'

export function checkUnitTests(
  srcDirectory: string,
  testDirectory: string,
  targetDirectories: string[],
  choice?: boolean,
) {
  fs.readdir(srcDirectory, (err: NodeJS.ErrnoException | null, files: string[]) => {
    if (err) {
      console.error('ディレクトリの読み込み中にエラーが発生しました:', err)
      return
    }
    files.forEach((file) => {
      const srcFilePath = path.join(srcDirectory, file)
      const testFilePath = getTestFilePath(srcFilePath, testDirectory)

      fs.stat(srcFilePath, (err: NodeJS.ErrnoException | null, stats: any) => {
        if (err) {
          console.error('ファイルの状態を取得中にエラーが発生しました:', err)
          return
        }

        if (stats.isDirectory()) {
          if (isTargetDirectory(srcFilePath, targetDirectories)) {
            checkUnitTests(srcFilePath, testDirectory, targetDirectories, choice)
          }
        } else if (stats.isFile()) {
          fs.access(testFilePath, fs.constants.F_OK, (err: NodeJS.ErrnoException | null) => {
            if (srcFilePath.endsWith('/hooks/index.ts')) {
              return // hooks/index.ts は例外として処理せず、ログを出力しない
            }
            if (!err && choice) {
              console.log(`👍${srcFilePath} の単体テストが見つかりました。`)
            }
            if (err) {
              console.log(`${srcFilePath} の単体テストが見つかりませんでした。`)
            }
          })
        }
      })
    })
  })
}

function getTestFilePath(srcFilePath: string, testDirectory: string): string {
  const relativePath = path.relative(SRC_DIRECTORY, srcFilePath)
  const testFilePath = path.join(testDirectory, relativePath)

  if (srcFilePath.endsWith('.ts')) {
    const testPathWithTS = testFilePath.replace('.ts', '.test.ts')
    const testPathWithTSX = testFilePath.replace('.ts', '.test.tsx')
    if (fs.existsSync(testPathWithTS)) {
      return testPathWithTS
    } else if (fs.existsSync(testPathWithTSX)) {
      return testPathWithTSX
    } else {
      return testFilePath
    }
  } else if (srcFilePath.endsWith('.tsx')) {
    return testFilePath.replace('.tsx', '.test.tsx')
  } else {
    return testFilePath
  }
}

function isTargetDirectory(directoryName: string, targetDirectories: string[]): boolean {
  return targetDirectories.some((target) => directoryName.includes(target))
}

checkUnitTests('./src', './__test__', ['components', 'utils'], false)
