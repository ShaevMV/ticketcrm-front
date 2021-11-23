import { Token } from '@/graphql/graphql'
import { ITokenAuth } from '@/modules/auth/entitys/AuthTokenEntity'

export class TokenAuthMapper {
  public static map (auth: Token, isRememberMe: boolean): ITokenAuth {
    return {
      accessToken: auth.accessToken ?? '',
      expiresIn: Date.now() + (auth.expiresIn ?? 0),
      isRemember: isRememberMe,
      tokenType: auth.tokenType ?? ''
    }
  }
}
