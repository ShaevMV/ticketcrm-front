import 'reflect-metadata'
import { AuthorizationValue } from '@/modules/auth/values/AuthorizationValue'
import { myContainer } from '@/domain/inject/inversify.config'
import { TYPES } from '@/domain/inject/types'
describe('Auth', () => {
  it('Создание value правильного', () => {
    const IValue = {
      email: 'test@test.com',
      password: 'password',
      isRememberMe: false
    }
    const authorizationValue = AuthorizationValue.create(IValue).getResult()
    const value = authorizationValue.args
    expect(authorizationValue).toBeInstanceOf(AuthorizationValue)
    expect(value.email).toEqual('test@test.com')
    expect(value.password).toEqual('password')
  })
  it('Создание value fail', () => {
    const IValue = {
      email: 'test@testcom',
      password: 'password',
      isRememberMe: false
    }
    const authorizationValue = AuthorizationValue.create(IValue)
    expect(authorizationValue.isFailure).toEqual(true)
    expect(authorizationValue.isSuccess).toEqual(false)
  })
  it('Проверка action AuthorizationAction', () => {
    const IValue = {
      email: 'test@test.com',
      password: 'password',
      isRememberMe: false
    }
    const action = myContainer.get(TYPES.AuthorizationAction)
    const token = action.auth(AuthorizationValue.create(IValue).getResult())
    token.then()
    expect().not.toBeNull()
    expect(token.expiresIn).not.toBeNull()
    expect(token.tokenType).not.toBeNull()
  })
})
// # sourceMappingURL=auth.spec.js.map
