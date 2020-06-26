import resty, { Controller, Get, Inject, Context } from "@restyjs/core";
import { JWTConfiguration, JWTProvider, ValidateJWT } from "../src/index";
import request from "supertest";

describe("resty jwt middleware tests", () => {
  it("test jwt generate and validate", async () => {
    @Controller("/")
    class HelloController {
      @Inject() jwtProvider!: JWTProvider;

      @Get("/generate")
      generate() {
        return {
          token: this.jwtProvider.generate({
            id: 1,
            email: "foo@bar.com",
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

    const generate_response: any = await request(app).get("/generate");

    expect(generate_response).toMatchObject({
      status: 200,
    });

    const validate_response: any = await request(app)
      .get("/validate")
      .set("authorization", `Bearer ${generate_response.body.token}`)
      .set("Accept", "application/json")
      .expect("Content-Type", "application/json; charset=utf-8")
      .expect(200)
      .then((response: any) => {
        expect(response.body.token.id).toBe(1);
        expect(response.body.token.email).toBe("foo@bar.com");
      });
  });
});
