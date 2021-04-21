import { createApi } from "unsplash-js";
import fetch from "node-fetch";

const unsplash = createApi({
  accessKey: "O4K--tEV7RMiE3dkao1d0CeiiQ6q9KCbOPzvHozbBB8",
  fetch: fetch,
});

module.exports = async (req, res) => {
  const pictures = (
    await unsplash.search.getPhotos({
      query: req.query.query || "cat",
      page: 1,
      perPage: 20,
    })
  ).response.results;
  console.log(pictures);
  res.json(pictures);
};
