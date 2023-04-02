import dotenv from 'dotenv'
import * as fs from 'fs'
import path from 'path'

// Load all defined environment variables
const environmentFiles = fs.readdirSync(__dirname).filter((fileName) => fileName.startsWith('.env'))

describe('environmentFiles', () => {
  it('environmentFilesが存在する', () => {
    expect(environmentFiles).toHaveLength(5)
  })
})

environmentFiles.forEach((envFileName) => {
  describe(`${envFileName}`, () => {
    let env
    const extension = envFileName.split('.').pop()
    if (extension === 'json') {
      env = {
        ...require(`./${envFileName}`),
      }
    } else {
      const envPath = path.join(__dirname, `./${envFileName}`)
      env = dotenv.parse(fs.readFileSync(envPath))
    }

    it('APP_ENV が必ずセットされている。', () => {
      expect(env['APP_ENV']).toBeDefined()
    })

    it('NEXT_PUBLIC_API_URL が必ずセットされている。', () => {
      expect(env['NEXT_PUBLIC_API_URL']).toBeDefined()
    })

    it('NEXTAUTH_URL が必ずセットされている。', () => {
      expect(env['NEXTAUTH_URL']).toBeDefined()
    })
    it('NEXTAUTH_SECRET が必ずセットされている。', () => {
      expect(env['NEXTAUTH_SECRET']).toBeDefined()
    })
    it('GOOGLE_ID が必ずセットされている。', () => {
      expect(env['GOOGLE_ID']).toBeDefined()
    })
    it('GOOGLE_SECRET が必ずセットされている。', () => {
      expect(env['GOOGLE_SECRET']).toBeDefined()
    })
    it('SECRET_TOKEN が必ずセットされている。', () => {
      expect(env['SECRET_TOKEN']).toBeDefined()
    })
    it('DATABASE_URL が必ずセットされている。', () => {
      expect(env['DATABASE_URL']).toBeDefined()
    })
    it('NEXT_PUBLIC_DEFAULT_VOLUMES が必ずセットされている。', () => {
      expect(env['NEXT_PUBLIC_DEFAULT_VOLUMES']).toBeDefined()
    })
    it('NEXT_PUBLIC_DEFAULT_LIMIT が必ずセットされている。', () => {
      expect(env['NEXT_PUBLIC_DEFAULT_LIMIT']).toBeDefined()
    })
  })
})
