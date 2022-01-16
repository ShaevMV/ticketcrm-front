import gql from 'graphql-tag';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Mutation = {
  __typename?: 'Mutation';
  /** Авторизация пользователя */
  auth?: Maybe<UserData>;
  /** Выход пользователя из системы */
  logout?: Maybe<Scalars['Boolean']>;
  /** Регистрация нового пользователя */
  registration?: Maybe<UserData>;
  /** Перезапрос токина */
  tokenRefresh?: Maybe<Token>;
  /** Восстановление пароля пользователя */
  recoveryPassword?: Maybe<RecoveryPasswordResponse>;
  /** Заменить пароль у пользователя */
  passwordReset?: Maybe<RecoveryPasswordResponse>;
};


export type MutationAuthArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
  isRememberMe?: Maybe<Scalars['Boolean']>;
};


export type MutationRegistrationArgs = {
  name: Scalars['String'];
  email: Scalars['String'];
  password: Scalars['String'];
  password_confirmation: Scalars['String'];
};


export type MutationRecoveryPasswordArgs = {
  email: Scalars['String'];
};


export type MutationPasswordResetArgs = {
  token: Scalars['String'];
  email: Scalars['String'];
  password: Scalars['String'];
  password_confirmation: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  users?: Maybe<UserDataForAuthType>;
};

/** Токен для авторизации */
export type Token = {
  __typename?: 'Token';
  /** Токен для авторизации */
  accessToken?: Maybe<Scalars['String']>;
  /** Тип авторизации */
  tokenType?: Maybe<Scalars['String']>;
  /** Время жизни токена */
  expiresIn?: Maybe<Scalars['Int']>;
};

/** Данные пользователя после регистрации */
export type UserData = {
  __typename?: 'UserData';
  token?: Maybe<Token>;
  user?: Maybe<UserDataForAuthType>;
};

/** Данные пользователя */
export type UserDataForAuthType = {
  __typename?: 'UserDataForAuthType';
  id?: Maybe<Scalars['String']>;
  /** Email */
  email?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
};

/** Ответ после запроса восстановления пароля пользователя */
export type RecoveryPasswordResponse = {
  __typename?: 'recoveryPasswordResponse';
  /** Успех отправки письма на почту */
  success?: Maybe<Scalars['Boolean']>;
  /** Пользовательское сообщение */
  userMessage?: Maybe<Scalars['String']>;
};
