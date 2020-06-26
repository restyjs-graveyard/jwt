import resty, { Controller, Get, Inject, Context } from "@restyjs/core";
import { JWTConfiguration, JWTProvider, ValidateJWT } from "../src/index";

@Controller("/")
class HelloController {
  @Inject() jwtProvider!: JWTProvider;

  @Get("/generate")
  generate() {
    return {
      token: this.jwtProvider.generate({
        id: 1,
      }),
    };
  }

  @Get("/validate", [ValidateJWT])
  validate(ctx: Context) {
    return {
      token: ctx.req.token,
    };
  }
}

const app = resty({
  controllers: [HelloController],
  providers: [JWTConfiguration("secret")],
});

app.listen(8080);
