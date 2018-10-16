import { get, post } from "got";
import { IncomingMessage, ServerResponse } from "http";
import { send } from "micro";

async function testGotGet() {
  const pokeApiRes = await get(
    "https://pokeapi.co/api/v2/pokemon-form/pikachu/",
    { json: true }
  );

  return pokeApiRes.body;
}

async function testGotPost() {
  const body = { tester: "bla" };

  const testPost = await post("https://postman-echo.com/post", {
    body,
    json: true
  });

  return testPost.body;
}

async function handleRequest(method: string) {
  switch (method) {
    case "GET":
      return testGotGet();
    case "POST":
      return testGotPost();
    default:
      throw new Error(`unknown method: ${method}`);
  }
}

export = async (req: IncomingMessage, res: ServerResponse) => {
  try {
    return await handleRequest(req.method);
  } catch (e) {
    console.error(e);
    return send(res, 500, JSON.stringify(e.message));
  }
};
