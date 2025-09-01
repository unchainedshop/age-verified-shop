export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  const url = new URL(request.url);

  return fetch(`${process.env.UNCHAINED_ENDPOINT}${url.search || ''}`, {
    body: request.body,
    method: 'GET',
    // @ts-ignore-next-line
    duplex: 'half',
    headers: request.headers,
  });
}

export async function POST(request: Request) {
  const url = new URL(request.url);

  return fetch(`${process.env.UNCHAINED_ENDPOINT}${url.search || ''}`, {
    body: request.body,
    method: 'POST',
    // @ts-ignore-next-line
    duplex: 'half',
    headers: request.headers,
  });
}
