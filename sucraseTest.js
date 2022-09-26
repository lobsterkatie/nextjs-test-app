// import { transform } from "sucrase";
// import * as fs from "fs";

const sucrase = require("sucrase");
const fs = require("fs");
const path = require("path");

const filepath = path.resolve(__dirname, "_error.tsx");

const code = String(fs.readFileSync(filepath));

const compiledCode = sucrase.transform(code, {
  transforms: ["jsx", "typescript", "imports"],
}).code;

const x = module._compile(compiledCode, "");

console.log(x);

debugger;
