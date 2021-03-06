import 'reflect-metadata'
import { inject, injectable } from 'inversify'
import { AuthorizationValue } from '@/modules/auth/values/login/AuthorizationValue'
import { AuthorizationActionGraphql } from '@/modules/auth/actions/login/AuthorizationActionGraphql'
import { ITokenAuth } from '@/modules/auth/entitys/AuthTokenEntity'
import { AuthorizationLocalRepository } from '@/modules/auth/repositories/login/AuthorizationLocalRepository'
import { VuexTokenRepository } from '@/modules/auth/repositories/token/VuexTokenRepository'
import { AUTH_TYPES } from '@/modules/auth/inject/types'
import { LoginUnauthorizedException } from '@/modules/auth/exeptions/login/LoginUnauthorizedException'
import { ExceptionAggregate } from '@/modules/exception/aggregates/ExceptionAggregate'
import { IUserData } from '@/modules/profile/entitys/UserDataEntity'

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
  public async auth (authorizationValue: AuthorizationValue): Promise<{ user: IUserData; token: ITokenAuth } | null> {
    const tokenAuth = await this.authorizationAction.authSend(authorizationValue).then((r) => {
      return r
    })

    if (tokenAuth === null || tokenAuth.token === null) {
      ExceptionAggregate.create(new LoginUnauthorizedException('Не получен токен'))
    }

    return tokenAuth
  }

  /**
   * Получить токен
   */
  public findToken (): ITokenAuth | null {
    return this.localTokenRepository.getToken()
  }

  /**
   * Очистить токен локального хранилища
   */
  public clearToken (): void {
    this.vuexTokenRepository.clearToken()
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
   * (Страница быть перегружена, не отмечен "запомни меня" при авторизации, в хранилище нет токена)
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

  /**
   * Отправить запрос на выход пользователя из системы
   */
  public signLogout (): void {
    this.authorizationAction.submitLogout().then(() => {
      this.localTokenRepository.clearToken()
      window.location.reload()
    })
  }
}
