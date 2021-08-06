import "reflect-metadata";
import {AuthorizationValue} from "@/modules/auth/values/AuthorizationValue";
import {myContainer} from "@/domain/inject/inversify.config";
import {TYPES} from "@/domain/inject/types";
import {AuthorizationAction} from "@/modules/auth/actions/AuthorizationAction";
import {MutationAuthArgs} from "@/graphql/graphql";


describe('Auth', () => {
  it('Создание value правильного', () => {
    let IValue : MutationAuthArgs = {
      email: "test@test.com",
      password: "password",
      isRememberMe: false,
    }

    let authorizationValue =  AuthorizationValue.create(IValue).getResult();
    let value = authorizationValue.args;

    expect(authorizationValue).toBeInstanceOf(AuthorizationValue);
    expect(value.email).toEqual("test@test.com");
    expect(value.password).toEqual("password");
  });
  it('Создание value fail', () => {
    let IValue : MutationAuthArgs = {
      email: "test@testcom",
      password: "password",
      isRememberMe: false,
    }

    let authorizationValue =  AuthorizationValue.create(IValue);

    expect(authorizationValue.isFailure).toEqual(true);
    expect(authorizationValue.isSuccess).toEqual(false);
  });


  /*it('Проверка ApolloGraphql', () => {

  });*/

  it('Проверка action AuthorizationAction', () => {
    let IValue : MutationAuthArgs = {
      email: "test@test.com",
      password: "password",
      isRememberMe: false,
    }

    let action = myContainer.get<AuthorizationAction>(TYPES.AuthorizationAction);
    let token = action.auth(AuthorizationValue.create(IValue).getResult())

    expect(token.accessToken).not.toBeNull();
    expect(token.expiresIn).not.toBeNull();
    expect(token.tokenType).not.toBeNull();
  });
})
