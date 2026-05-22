/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run `npm run dev` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `npm run deploy` to publish your worker
 *
 * Bind resources to your worker in `wrangler.jsonc`. After adding bindings, a type definition for the
 * `Env` object can be regenerated with `npm run cf-typegen`.
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */

export default {
	async fetch(request: any, env: any) {
		const url = new URL(request.url);
		const db = env.DB ?? env.day1_db;
		const corsHeaders = {
			'Access-Control-Allow-Origin': '*',
			'Access-Control-Allow-Methods': 'GET,OPTIONS',
			'Access-Control-Allow-Headers': '*',
		};
		if (url.pathname === '/api/notes') {
			if (request.method === 'OPTIONS') {
				return new Response(null, {
					status: 204,
					headers: corsHeaders,
				});
			}
			throw new Error("oops");
		}

		if (url.pathname === '/api/config') {
			if (request.method === 'OPTIONS') {
				return new Response(null, { status: 204, headers: corsHeaders });
			}
			return Response.json(
				{
					greeting: env.GREETING,
					hasKey: !!env.API_KEY,
				},
				{ headers: corsHeaders }
			);
		}
		if (url.pathname === '/api/hello') {
			if (request.method === 'OPTIONS') {
				return new Response(null, {
					status: 204,
					headers: corsHeaders,
				});
			}
			return Response.json({ ok: true, msg: 'Hello API' }, { headers: corsHeaders });
		}
		if (url.pathname === '/api/config') {
			return Response.json({
				greeting: env.GREETING,
				hasKey: !!env.API_KEY,
			});
		}
		return env.ASSETS.fetch(request);
	},
};
