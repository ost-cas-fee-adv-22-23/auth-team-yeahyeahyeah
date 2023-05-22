import { getToken } from 'next-auth/jwt';
import type { NextApiRequest, NextApiResponse } from 'next';

export const getUserInfo = (req: NextApiRequest, res: NextApiResponse, token: any) => {
  const userInfoEndpoint = `${process.env.ZITADEL_ISSUER}/oidc/v1/userinfo`;

  return fetch(userInfoEndpoint, {
    headers: {
      authorization: `Bearer ${token}`,
      'content-type': 'application/json',
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
      return getUserInfo(req, res, token.accessToken);
    default:
      return res.status(405).end();
  }
};

export default handler;
