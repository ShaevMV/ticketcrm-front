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
  auth?: Maybe<Token>;
  createUser?: Maybe<Token>;
  tokenRefresh?: Maybe<Token>;
};


export type MutationAuthArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
};


export type MutationCreateUserArgs = {
  email: Scalars['String'];
  name: Scalars['String'];
  password: Scalars['String'];
  password_confirmation: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  users?: Maybe<Array<Maybe<User>>>;
};


export type QueryUsersArgs = {
  id?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
};

/** Token for auth user */
export type Token = {
  __typename?: 'Token';
  /** Token for auth user */
  accessToken?: Maybe<Scalars['String']>;
  /** Type token */
  tokenType?: Maybe<Scalars['String']>;
  /** Time live token */
  expiresIn?: Maybe<Scalars['Int']>;
};

/** A user */
export type User = {
  __typename?: 'User';
  id?: Maybe<Scalars['String']>;
  /** The email of user */
  email?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  /** True, if the queried user is the current user */
  isMe?: Maybe<Scalars['Boolean']>;
};
