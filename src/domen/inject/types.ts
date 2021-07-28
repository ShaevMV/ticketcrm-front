
import {ApolloGraphql} from "@/domen/apiClient/ApolloGraphql";
import {AuthorizationAction} from "@/modules/auth/actions/AuthorizationAction";

const TYPES = {
  ApiClient: Symbol.for("ApolloGraphql"),
  AuthorizationAction: Symbol.for("AuthorizationAction")
};

export { TYPES };
