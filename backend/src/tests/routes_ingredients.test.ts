import app from "../app";
import supertest from "supertest";

const api = supertest(app);

test("ingredients are returned", async () => {
  await api
    .get("/api/ingredients")
    .expect(200)
    .expect("Content-Type", /application\/json/);
});
