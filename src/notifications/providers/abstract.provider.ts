export interface AbstractProvider {
  send(
    body: string,
    subject: string | undefined,
    payload: any,
    credentials: any,
  ): Promise<void>;
}
