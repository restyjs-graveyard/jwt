import { Provider, Service, Container, RequestHandler } from "@restyjs/core";
// import jwt from "express-jwt";
import { verify } from "jsonwebtoken";

const getTokenFromHeader = (req: any) => {
  if (
    (req.headers.authorization &&
      req.headers.authorization.split(" ")[0] === "Token") ||
    (req.headers.authorization &&
      req.headers.authorization.split(" ")[0] === "Bearer")
  ) {
    return req.headers.authorization.split(" ")[1];
  }
  return null;
};

@Service()
class JWTProvider implements Provider {
  optional: boolean = false;
  private secret: string;

  constructor(secret: string) {
    this.secret = secret;
  }

  build() {
    process.env.JWTProvider_JWT_SECRET = this.secret;
  }
}

const ValidateJWT = async (req: any, res: any, next: any) => {
  const secret = process.env.JWTProvider_JWT_SECRET as string;
  const token = getTokenFromHeader(req);
  verify(token, secret, (err: any, decoded: any) => {
    if (err) {
      next(err);
    }

    console.log(decoded);
  });

  req["token"] = token;
  return next();
};

function JWTConfiguration(secret: string): JWTProvider {
  const provider = new JWTProvider(secret);
  Container.set(JWTProvider, provider);
  return provider;
}

export { JWTConfiguration, JWTProvider, getTokenFromHeader, ValidateJWT };
