import { rest, setupWorker } from "msw";
import { createApi } from "unsplash-js";

const unsplash = createApi({
  accessKey: "O4K--tEV7RMiE3dkao1d0CeiiQ6q9KCbOPzvHozbBB8",
});

const ORIGIN = window.location.origin;

const handlers = [
  rest.get(`${ORIGIN}/api/search`, async (req, res, ctx) => {
    const pictures = (
      await unsplash.search.getPhotos({
        query: req.url.searchParams.get("query") || "cat",
        page: 1,
        perPage: 20,
      })
    ).response?.results;
    console.log(pictures);
    return res(ctx.status(200), ctx.delay(500), ctx.json(pictures));
  }),
];

const worker = setupWorker(...handlers);

worker.printHandlers();

export default worker;
