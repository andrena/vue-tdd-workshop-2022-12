import { throwError } from "../../../throwError";

/** Used to store/retrieve custom data that the scenarios remember between different steps. */
export class ScenarioData {
  private _currentUser?: string;
  get currentUser(): string {
    return this._currentUser ?? throwError("currentUser not initialized");
  }
  set currentUser(currentUser: string) {
    this._currentUser = currentUser;
  }
}
