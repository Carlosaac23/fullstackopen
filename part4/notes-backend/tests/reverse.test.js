import assert from 'node:assert'
import { test, describe } from 'node:test'

import { reverse } from '../utils/for_testing.js'

describe('reverse', () => {
  test('reverse of a', () => {
    assert.strictEqual(reverse('a'), 'a')
  })

  test('reverse of react', () => {
    assert.strictEqual(reverse('react'), 'tcaer')
  })

  test('reverse of saippuakauppias', () => {
    assert.strictEqual(reverse('saippuakauppias'), 'saippuakauppias')
  })
})
