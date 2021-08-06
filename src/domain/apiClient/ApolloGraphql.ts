import {injectable} from "inversify";

@injectable()
export class ApolloGraphql {
  connect(): boolean {
    return true;
  }
}
