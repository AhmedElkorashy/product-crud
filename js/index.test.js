import { JSDOM } from "jsdom";

const dom = new JSDOM("<!DOCTYPE html><html><body></body></html>");
global.window = dom.window;
global.document = dom.window.document;

const mockInputs = {
  productName: { value: "Test Product" },
  productPrice: { value: "9.99" },
  productCategory: { value: "Test Category" },
  productDescription: { value: "Test Description" },
  productImage: { value: "" },
};

global.document.getElementById = (id) => mockInputs[id] || null;
global.localStorage = {
  getItem: () => {},
  setItem: () => {},
};

import { adding_Card } from "./index.js";

describe("adding_Card function", () => {});
