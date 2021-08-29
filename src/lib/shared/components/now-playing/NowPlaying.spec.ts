/**
 * @jest-environment jsdom
 */

import NowPlaing from './NowPlaing.svelte';
import { render } from '@testing-library/svelte';

describe('NowPlaing Component', () => {
	it('Should create', () => {
		const { container } = render(NowPlaing);

		expect(container).toBeTruthy();
	});
});
