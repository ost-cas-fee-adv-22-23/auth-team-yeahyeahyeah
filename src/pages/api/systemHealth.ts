import { getToken } from 'next-auth/jwt';
import type { NextApiRequest, NextApiResponse } from 'next';

export const getSystemHealth = (req: NextApiRequest, res: NextApiResponse, token: any) => {
  const userInfoEndpoint = `${process.env.ZITADEL_ISSUER}/auth/v1/healthz`;

  return fetch(userInfoEndpoint, {
    headers: {
      'content-type': 'application/json',
      authorization: `Bearer ${token}`,
    },
    method: 'GET',
  })
    .then((response) => {
      return response.json();
    })
    .then((response) => {
      return res.status(200).send(response);
    })
    .catch((error) => {
      return res.status(500).send(error);
    });
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const token = await getToken({ req });

  if (!token?.accessToken) {
    return res.status(401).end();
  }

  switch (req.method) {
    case 'GET':
      return getSystemHealth(req, res, token.accessToken);
    default:
      return res.status(405).end();
  }
};

export default handler;
