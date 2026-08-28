import type { CurrentUser } from "@app/shared";

export interface AuthContextUser {
  user: CurrentUser | null;
  refreshUser: () => Promise<void>;
}
