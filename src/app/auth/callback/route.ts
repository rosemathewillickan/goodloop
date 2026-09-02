import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

// Google (and any future OAuth provider) redirects here with a `code` after
// the user approves on Google's own consent screen. We exchange it for a
// session, then send a fresh sign-up to pick a real role (Google doesn't
// carry our custom role field) before /dashboard routes them to their home.
export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");

  if (code) {
    const supabase = await createClient();
    const { data } = await supabase.auth.exchangeCodeForSession(code);
    if (data.user) {
      const { data: profile } = await supabase
        .from("profiles")
        .select("needs_role_selection")
        .eq("id", data.user.id)
        .single();
      if (profile?.needs_role_selection) {
        return NextResponse.redirect(`${origin}/onboarding/role`);
      }
    }
  }

  return NextResponse.redirect(`${origin}/dashboard`);
}
