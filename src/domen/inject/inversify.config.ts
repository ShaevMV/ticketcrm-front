import {Container} from "inversify";
import {TYPES} from "./types";
import {ApolloGraphql} from "@/domen/apiClient/ApolloGraphql";
import {AuthorizationAction} from "@/modules/auth/actions/AuthorizationAction";

const myContainer = new Container();

myContainer.bind(TYPES.AuthorizationAction).to(AuthorizationAction);
myContainer.bind(TYPES.ApiClient).to(ApolloGraphql);

export {myContainer};
