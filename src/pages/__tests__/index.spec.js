import "@testing-library/jest-dom";
import puppeteer from "puppeteer";

const { toMatchImageSnapshot } = require("jest-image-snapshot");

expect.extend({ toMatchImageSnapshot });

describe("Homepage", () => {
  let browser;

  beforeAll(async () => {
    browser = await puppeteer.launch();
  });

  it.skip("renders correct", async () => {
    const page = await browser.newPage();
    await page.goto("http://localhost:8000");
    const image = await page.screenshot();

    expect(image).toMatchImageSnapshot();
  });

  afterAll(async () => {
    await browser.close();
  });
});
