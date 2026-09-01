"use client";

import { useActionState } from "react";
import { setVerification, type FormState } from "@/app/admin/actions";

const initial: FormState = { error: null };

export function VerifyButtons({ profileId }: { profileId: string }) {
  const [state, formAction, pending] = useActionState(setVerification, initial);

  return (
    <div>
      <div className="flex gap-2">
        <form action={formAction}>
          <input type="hidden" name="profile_id" value={profileId} />
          <input type="hidden" name="status" value="verified" />
          <button
            type="submit"
            disabled={pending}
            className="rounded-full bg-brand-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-brand-700 disabled:opacity-60"
          >
            Verify
          </button>
        </form>
        <form action={formAction}>
          <input type="hidden" name="profile_id" value={profileId} />
          <input type="hidden" name="status" value="rejected" />
          <button
            type="submit"
            disabled={pending}
            className="rounded-full border border-red-300 px-3 py-1.5 text-sm font-medium text-red-700 hover:bg-red-50 disabled:opacity-60"
          >
            Reject
          </button>
        </form>
      </div>
      {state.error && <p className="mt-1 text-sm text-red-600">{state.error}</p>}
    </div>
  );
}
