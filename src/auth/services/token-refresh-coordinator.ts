// single-flight mechanism
import { injectable } from "tsyringe";

import { TokenRefreshService } from "./token-refresh.service";

@injectable()
export class TokenRefreshCoordinator {
  private refreshPromise: Promise<string> | null = null;

  constructor(private readonly tokenRefreshService: TokenRefreshService) {}

  async refresh(): Promise<string> {
    if (this.refreshPromise) {
      return this.refreshPromise;
    }

    this.refreshPromise = this.tokenRefreshService.refresh();

    try {
      return await this.refreshPromise;
    } finally {
      this.refreshPromise = null;
    }
  }
}
