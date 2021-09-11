/* eslint-disable no-console */
import fs from 'fs';
import path from 'path';
import { execSync, exec } from 'child_process';
import { chromium } from 'playwright';

const blogsContent = './src/routes/blog';
const blogsBannerStorePath = './static/images/blogs';

const snippetsContent = './src/routes/snippets';
const snippetsBannerStorePath = './static/images/snippets';

(async () => {
	const generateBanners = [];
	const posts = fs.readdirSync(blogsContent).filter((elem) => !elem.startsWith('.') && !elem.includes('.'));
	for (const post of posts) {
		const bannerPath = path.join(blogsBannerStorePath, post, 'banner.jpg');
		const bannerExists = fs.existsSync(bannerPath);

		if (!bannerExists) {
			generateBanners.push({ slug: post, bannerPath, isBlog: true });
		}
	}

	const snippets = fs.readdirSync(snippetsContent).filter((elem) => !elem.startsWith('.') && !elem.includes('.'));
	for (const snippet of snippets) {
		const bannerPath = path.join(snippetsBannerStorePath, snippet, 'banner.jpg');
		const bannerExists = fs.existsSync(bannerPath);

		if (!bannerExists) {
			generateBanners.push({ slug: snippet, bannerPath, isBlog: false });
		}
	}

	if (generateBanners.length) {
		execSync('npm run build:static:ssr', { stdio: 'inherit' });
		const serve = exec('npm run preview');

		serve.stderr.on('data', (data) => {
			console.error(data.toString());
		});

		serve.stdout.on('data', async (data) => {
			if (data.toString().includes('http://localhost:3000')) {
				const browser = await chromium.launch({ headless: true });
				const page = await browser.newPage({
					colorScheme: 'dark',
				});
				let first = true;
				for (const { slug, bannerPath, isBlog } of generateBanners) {
					console.log(`[banner] Generating banner for ${isBlog ? 'blog' : 'snippets'} => ${slug}`);

					await page.setViewportSize({
						width: 940,
						height: slug.length > 50 ? 700 : 570,
					});

					await page.goto(`http://localhost:3000/${isBlog ? 'blog' : 'snippets'}/${slug}`);
					if (first) {
						// to hide BMC message
						await page.goto(`http://localhost:3000/${isBlog ? 'blog' : 'snippets'}/${slug}`);
						first = false;
					}

					await page.$eval('html', (el) => {
						el.className = 'dark';
					});

					await page.$eval('nav', (el) => {
						el.style.display = 'none';
					});

					await page.$eval('main', (el) => {
						el.style.marginTop = '6rem';
					});

					await page.$eval('#blog-conent', (el) => {
						el.innerHTML = '';
						el.style.height = '30rem';
						const twitterDiv = document.createElement('div');
						twitterDiv.className = 'flex flex-col mt-10 justify-start items-start md:items-center w-full';
						const twitterProfileHeading = document.createElement('h1');
						twitterProfileHeading.className =
							'font-bold text-2xl tracking-tight text-gray-300 dark:text-gray-300';
						twitterProfileHeading.textContent = '@asnavneetsharma';
						twitterDiv.appendChild(twitterProfileHeading);
						el.prepend(twitterDiv);
					});

					await page.screenshot({
						quality: 100,
						type: 'jpeg',
						path: bannerPath,
					});
				}
				serve.kill('SIGHUP');
				await browser.close();
				process.exit(0);
			}
		});
	}
})();
