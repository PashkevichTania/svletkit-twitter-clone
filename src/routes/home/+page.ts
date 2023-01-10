import type { PageLoad } from './$types';

import type { TweetType } from 'src/types'

export const load: PageLoad= async ({ fetch }) => {
    const response = await fetch('/home');

    return { tweets: (await response.json()) as TweetType[] };
};
