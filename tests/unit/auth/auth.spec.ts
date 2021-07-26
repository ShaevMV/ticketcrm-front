import {AuthorizationValue, IAuthorizationForm} from "@/modules/auth/values/AuthorizationValue";

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


})
