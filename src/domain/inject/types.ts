import {AuthorizationAction} from "@/modules/auth/actions/AuthorizationAction";
import {ApolloGraphql} from "@/domain/apiClient/ApolloGraphql";

const TYPES = {
  ApiClient: Symbol.for("ApolloGraphql"),
  AuthorizationAction: Symbol.for("AuthorizationAction")
};

export {TYPES};
