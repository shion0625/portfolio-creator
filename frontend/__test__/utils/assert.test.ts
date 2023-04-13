import { assertIsDefined } from '~/utils/assert'

describe('assertIsDefined', () => {
  it('should throw an error if value is undefined', () => {
    const val: undefined = undefined
    expect(() => assertIsDefined(val)).toThrowError("Expected 'val' to be defined, but received undefined")
  })

  it('should throw an error if value is null', () => {
    const val: null = null
    expect(() => assertIsDefined(val)).toThrowError("Expected 'val' to be defined, but received null")
  })

  it('should not throw an error if value is not undefined or null', () => {
    const val: string = 'test'
    expect(() => assertIsDefined(val)).not.toThrowError()
  })
})
