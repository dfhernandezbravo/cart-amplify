// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import axios from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  _req: NextApiRequest,
  res: NextApiResponse<any>,
) {
  console.info('>>>> HEALTH CART <<<<');
  res.status(200).json({ message: 'healt test cart headless' });
}
