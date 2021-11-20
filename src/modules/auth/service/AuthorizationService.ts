import 'reflect-metadata'
import { inject, injectable } from 'inversify'
import { AuthorizationValue } from '@/modules/auth/values/AuthorizationValue'
import { AuthorizationActionGraphql } from '@/modules/auth/actions/AuthorizationActionGraphql'
import { ITokenAuth } from '@/modules/auth/entitys/AuthTokenEntity'
import { AuthorizationLocalRepository } from '@/modules/auth/repositories/AuthorizationLocalRepository'
import { VuexTokenRepository } from '@/modules/auth/repositories/VuexTokenRepository'
import { AUTH_TYPES } from '@/modules/auth/inject/types'

@injectable()
export class AuthorizationService {
  private authorizationAction: AuthorizationActionGraphql
  private vuexTokenRepository: VuexTokenRepository
  private localTokenRepository: AuthorizationLocalRepository

  public constructor (
    @inject(AUTH_TYPES.AuthorizationActionGraphql) authorizationAction: AuthorizationActionGraphql,
    @inject(AUTH_TYPES.AuthorizationLocalRepository) localTokenRepository: AuthorizationLocalRepository,
    @inject(AUTH_TYPES.VuexTokenRepository) vuexTokenRepository: VuexTokenRepository
  ) {
    this.vuexTokenRepository = vuexTokenRepository
    this.localTokenRepository = localTokenRepository
    this.authorizationAction = authorizationAction
  }

  /**
   * Авторизоваться
   *
   * @param authorizationValue данные для авторизации пользователя
   */
  public async auth (authorizationValue: AuthorizationValue): Promise<void> {
    const tokenAuth = await this.authorizationAction.authSend(authorizationValue).then((r) => {
      return r
    })

    if (tokenAuth !== null) {
      this.setLocalToken(tokenAuth)
    }
  }

  /**
   * Получить токен
   */
  public getToken (isLoadPage: boolean): ITokenAuth | null {
    const token = this.localTokenRepository.getToken()
    if (this.isClearToken(isLoadPage, token?.isRemember ?? false)) {
      this.localTokenRepository.clearToken()
      return null
    }

    return token
  }

  /**
   * Очистить токен локального хранилища
   */
  public clearLocalToken (): void {
    this.localTokenRepository.clearToken()
  }

  /**
   * Записать токен в store
   *
   * @param token
   */
  public setVuexToken (token: ITokenAuth): void {
    this.vuexTokenRepository.setToken(token)
  }

  public setLocalToken (token: ITokenAuth): void {
    this.localTokenRepository.setToken(token)
  }

  /**
   * проверить того что нужно удалить в хранилище
   * (Страница была перегружена, не отмечен "запомни меня" при авторизации, в хранилище нет токена)
   *
   * @param isLoadPage флаг того что страница была загружена
   * @param isRemember флаг того что стоит отметка "запомни меня"
   * @private
   */
  public isClearToken (isLoadPage: boolean, isRemember: boolean): boolean {
    return isLoadPage && !isRemember && !this.isAuth()
  }

  /**
   * Проверка на наличие токена в хранилище
   */
  public isAuth (): boolean {
    return this.vuexTokenRepository.isAuth()
  }
}
