# @restyjs/jwt
JWT middleware for resty.js.

```ts
import resty, { Controller, Get, Inject, Context } from "@restyjs/core";
import { JWTConfiguration, JWTProvider, ValidateJWT } from "@restyjs/jwt";


@Controller("/")
class HelloController {
  @Inject() jwtProvider!: JWTProvider;

  @Get("/generate")
  async generate() {
    const token = await this.jwtProvider.generate({
      id: 1,
      email: "foo@bar.com",
    });

    return {
      token,
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

```
