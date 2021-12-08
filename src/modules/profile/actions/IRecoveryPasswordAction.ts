export interface IRecoveryPasswordAction<T> {
  recoveryPassword (email: string): Promise<T>
}
