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
  auth?: Maybe<Token>;
  /** Регистрация нового пользователя */
  registration?: Maybe<UserDataForRegistration>;
  /** Перезапрос токина */
  tokenRefresh?: Maybe<Token>;
};


export type MutationAuthArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
  isRememberMe?: Maybe<Scalars['Boolean']>;
};


export type MutationRegistrationArgs = {
  email: Scalars['String'];
  name: Scalars['String'];
  password: Scalars['String'];
  password_confirmation: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  users?: Maybe<Array<Maybe<UserDataForAuthType>>>;
};


export type QueryUsersArgs = {
  id?: Maybe<Scalars['Int']>;
  email?: Maybe<Scalars['String']>;
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

/** Данные пользователя */
export type UserDataForAuthType = {
  __typename?: 'UserDataForAuthType';
  id?: Maybe<Scalars['String']>;
  /** Email */
  email?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
};

/** Данные пользователя после регистрации */
export type UserDataForRegistration = {
  __typename?: 'UserDataForRegistration';
  token?: Maybe<Token>;
  user?: Maybe<UserDataForAuthType>;
};