/* eslint-disable no-console */
import { writeFileSync } from 'fs';
import { ImagePool } from '@squoosh/lib';

const imagePool = new ImagePool();
const [img] = process.argv.slice(2);

const image = imagePool.ingestImage(img);
const imageFunction = async () => {
	await image.encode({
		mozjpeg: {},
	});
	const { binary } = await image.encodedWith.mozjpeg;
	await writeFileSync(img, binary);
	await imagePool.close();
};

imageFunction().then().catch(console.error);
