import resty, { Controller, Get, Inject } from "@restyjs/core";
import { JWTConfiguration, JWTProvider, ValidateJWT } from "../src/index";

@Controller("/")
class HelloController {
  constructor(@Inject() private readonly jwtProvider: JWTProvider) {}

  @Get("/generate")
  generate() {
    return "Hello World";
  }

  @Get("/validate", [ValidateJWT])
  validate() {
    return "Hello World";
  }
}

const app = resty({
  controllers: [HelloController],
  providers: [JWTConfiguration("secret")],
});

app.listen(8080);
