import asyncio
import pyppeteer
import time

async def main():
    browser = await pyppeteer.launch();
    page = await browser.newPage();
    await page.goto("http://localhost:5500/");
    await browser.close();

start_time = time.time();
asyncio.get_event_loop().run_until_complete(main());
print("--- %s seconds ---" % (time.time() - start_time))
