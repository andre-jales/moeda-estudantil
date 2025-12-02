import type { ILoginRequest } from "./ILoginRequest";
import type { ILoginResponse } from "./ILoginResponse";

export interface ILoginRepository {
  login: (request: ILoginRequest) => Promise<ILoginResponse | null>;
}
