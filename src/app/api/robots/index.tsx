import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const host = req.headers.host || '';
  if (
    host.includes('.store.w3block.io') ||
    host.includes('.store.weblock.global')
  ) {
    res.send(`User-agent: *
Disallow: /`);
    return;
  }

  res.send(`User-agent: *
Allow: /`); // Send your `robots.txt content here
}
