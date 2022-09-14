import * as dataFetchers from "./dataFetchers";

export const otherScriptFunc = (callback, args = []) => {
  callback(...args);
};

// dataFetchers.cat = "cat";
// dataFetchers.newThing = "something";

export * from "./dataFetchers";
