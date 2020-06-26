import { Provider, Service } from "@restyjs/core";

@Service()
class JWTProvider implements Provider {
  optional: boolean = false;

  constructor() {}

  build() {}
}

function JWTConfiguration(): JWTProvider {
  return new JWTProvider();
}

export { JWTConfiguration, JWTProvider };
