import { beforeAll, afterEach, afterAll, test, expect } from "vitest";
import supertest, { SuperTest, Test } from "supertest";
import { Server } from "http";
import createExpressServer from "src/server";
import TestAgent from "supertest/lib/agent";

const app = createExpressServer();

let server: Server;
let request: TestAgent;

beforeAll(async () => {
  server = app.listen(0);
  request = supertest(app);
});

afterAll(async () => {
  server.close();
});

test("demo test", async () => {
  const res = await request.get("/");
  expect(res.text).toBe("OK");
});
export { request };
