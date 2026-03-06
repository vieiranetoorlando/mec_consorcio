import { AppError } from "@/lib/http/errors";
import { getSupabaseServerClient } from "@/lib/supabase/server";

const ADMIN_USER_ID = "d08b72a0-1a9f-4b44-acb4-605deb835812";
const ADMIN_EMAIL = "mec.contemplado@gmail.com";

export async function getCurrentUser() {
  try {
    const supabase = await getSupabaseServerClient();
    const { data, error } = await supabase.auth.getUser();
    if (error) return null;
    return data.user;
  } catch {
    return null;
  }
}

export async function requireAdminUser() {
  const user = await getCurrentUser();
  if (!user) throw new AppError("Não autenticado.", 401);

  const isAllowed = user.id === ADMIN_USER_ID || user.email === ADMIN_EMAIL;
  if (!isAllowed) throw new AppError("Acesso negado.", 403);

  return user;
}
