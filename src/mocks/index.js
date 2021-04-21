import worker from "./browser";

worker.start({
  onUnhandledRequest: "bypass",
});
