import { setupServer } from "msw/node";
import { rest } from "msw";
import mockWords from './mockWords.json'

const server = setupServer(
  rest.get(
    "https://api.dictionaryapi.dev/api/v2/entries/en/hello",
    (_req, res, ctx) => res(ctx.json({ word: mockWords }))
  )
  
);



export { server };