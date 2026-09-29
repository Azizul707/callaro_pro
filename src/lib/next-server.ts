export class NextResponse extends Response {
  static json(data: any, init?: ResponseInit): Response {
    return new Response(JSON.stringify(data), {
      ...init,
      headers: {
        'Content-Type': 'application/json',
        ...(init?.headers || {}),
      },
    });
  }
}
