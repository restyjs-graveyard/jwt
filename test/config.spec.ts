import resty from "@restyjs/core";
import { JWTConfiguration } from "../src";

describe("resty config", () => {
  it("test config provider", async () => {
    resty({
      controllers: [],
      providers: [JWTConfiguration("secret")],
    });
  });
});
