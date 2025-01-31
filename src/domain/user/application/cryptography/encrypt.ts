export abstract class Encryption {
  abstract encrypt(
    payload: Record<string, unknown>,
    options: Record<string, unknown>,
  ): Promise<string>
}
