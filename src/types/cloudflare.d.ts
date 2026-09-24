import type { KVNamespace, D1Database } from "@cloudflare/workers-types";

declare global {
  interface CloudflareEnv {
    LUMISA_WAITLIST?: KVNamespace;
    lumisa_db?: D1Database;
    ASSETS?: Fetcher;
  }
}

export {};
