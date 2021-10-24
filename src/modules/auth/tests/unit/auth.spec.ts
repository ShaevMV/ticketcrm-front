import 'reflect-metadata'
import { AuthorizationValue } from '@/modules/auth/values/AuthorizationValue'
import { myContainer } from '@/domain/inject/inversify.config'
import { TYPES } from '@/domain/inject/types'
import { AuthorizationActionGraphql } from '@/modules/auth/actions/AuthorizationActionGraphql'
import { MutationAuthArgs } from '@/graphql/graphql'

describe('Auth', () => {
  it('Создание value правильного', () => {
    const IValue : MutationAuthArgs = {
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
    const IValue: MutationAuthArgs = {
      email: 'test@testcom',
      password: 'password',
      isRememberMe: false
    }

    const authorizationValue = AuthorizationValue.create(IValue)

    expect(authorizationValue.isFailure).toEqual(true)
    expect(authorizationValue.isSuccess).toEqual(false)
  })

  it('Проверка action AuthorizationAction', async () => {
    const IValue: MutationAuthArgs = {
      email: 'test@test.com',
      password: 'password',
      isRememberMe: false
    }

    const action = myContainer.get<AuthorizationActionGraphql>(TYPES.AuthorizationAction)
  })
})
