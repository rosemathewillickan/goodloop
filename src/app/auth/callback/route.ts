import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

// Google (and any future OAuth provider) redirects here with a `code` after
// the user approves on Google's own consent screen. We exchange it for a
// session, then let /dashboard route them to the right role home.
export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");

  if (code) {
    const supabase = await createClient();
    await supabase.auth.exchangeCodeForSession(code);
  }

  return NextResponse.redirect(`${origin}/dashboard`);
}
