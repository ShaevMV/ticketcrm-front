import "reflect-metadata";
import {AuthorizationValue, IAuthorizationForm} from "@/modules/auth/values/AuthorizationValue";
import {myContainer} from "@/domain/inject/inversify.config";
import {TYPES} from "@/domain/inject/types";
import {AuthorizationAction} from "@/modules/auth/actions/AuthorizationAction";


describe('Auth', () => {
  it('Создание value правильного', () => {
    let IValue : IAuthorizationForm = {
      email: "test@test.com",
      password: "password"
    }

    let authorizationValue =  AuthorizationValue.create(IValue).getResult();
    let value = authorizationValue.form;

    expect(authorizationValue).toBeInstanceOf(AuthorizationValue);
    expect(value.email).toEqual("test@test.com");
    expect(value.password).toEqual("password");
  });
  it('Создание value fail', () => {
    let IValue : IAuthorizationForm = {
      email: "test@testcom",
      password: "password"
    }

    let authorizationValue =  AuthorizationValue.create(IValue);

    expect(authorizationValue.isFailure).toEqual(true);
    expect(authorizationValue.isSuccess).toEqual(false);
  });


  /*it('Проверка ApolloGraphql', () => {

  });*/

  it('Проверка action AuthorizationAction', () => {
    let IValue : IAuthorizationForm = {
      email: "test@test.com",
      password: "password"
    }

    let action = myContainer.get<AuthorizationAction>(TYPES.AuthorizationAction);
    let token = action.getToken(AuthorizationValue.create(IValue).getResult())

    expect(token.accessToken).not.toBeNull();
    expect(token.expiresIn).not.toBeNull();
    expect(token.tokenType).not.toBeNull();
  });
})
