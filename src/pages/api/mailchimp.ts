// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { validateEmail } from '@/utils/generic';
import type { NextApiRequest, NextApiResponse } from 'next';

export type Data = {
  name?: string;
  error?: string;
  success?: boolean;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  if (!req.body || !req.body.email || !validateEmail(req.body.email)) {
    res.status(500).json({ error: `no email` });
    return;
  }

  if (!process.env.MAILCHIMP_API_KEY) {
    res.status(500).json({ error: `no mailchimp API key` });
    return;
  }

  const client = require(`mailchimp-marketing`);

  client.setConfig({
    apiKey: process.env.MAILCHIMP_API_KEY,
    server: `us8`,
  });

  try {
    await client.lists.addListMember(`5c27fa77c4`, {
      email_address: req.body.email,
      status: `subscribed`,
    });

    res.status(200).json({ success: true });
    return;
  } catch (e) {
    res.status(500).json({ error: e as string });
    return;
  }
}
