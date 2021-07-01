import { NextApiRequest, NextApiResponse } from 'next';
import { getPrismicClient, linkResolver } from '../../services/prismic';

export default async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  const { token: ref, documentId } = req.query;

  const client = getPrismicClient(req);

  const redirectUrl = await client
    .getPreviewResolver(String(ref), String(documentId))
    .resolve(linkResolver, '/');

  if (!redirectUrl) {
    return res.status(401).json({ message: 'Invalid token' });
  }

  res.setPreviewData({ ref });

  res.write(
    `<!DOCTYPE html><html><head><meta http-equiv="Refresh" content="0; url=${redirectUrl}" />
    <script>window.location.href = '${redirectUrl}'</script>
    </head>`
  );

  return res.end();
};
