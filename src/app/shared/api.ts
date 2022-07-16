import { environment } from "../../environments/environment";
import { Endpoint } from "./endpoints";

export class Api {
  public static PRODUCTION: boolean = environment.production;
  public static DEBUG = false;
  public static Endpoints = Endpoint;

  // Authentication
  public static AUTH = {
    KEYS: {
      token: "token",
      urlBeforExpelling: "urlBeforExpelling",
    },
  };

  public static tokenVerifk =
    "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJjbGllbnRJZCI6IjYyN2YxZjViYmMzNzdmM2ZkOWVjMjM1NiIsImRvY3VtZW50VHlwZSI6IkNDIiwiZG9jdW1lbnROdW1iZXIiOiIxMDQ1NzMzMzcwIiwidiI6MSwicm9sZSI6ImNsaWVudCIsImlhdCI6MTY1Nzg5NTIwM30.UsC3CboDzT0MNso1lSBEGzT0MDsD73mMzyMoQKIiJKM";
}
