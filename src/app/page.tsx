import { WaitlistApp } from "@/modules/waitlist/components/WaitlistApp";
import { WalletApp } from "@/modules/wallet/components/WalletApp";
import { getAppMode } from "@/shared/config/app-mode";

export default function HomePage() {
  if (getAppMode() === "waitlist") {
    return <WaitlistApp />;
  }

  return <WalletApp />;
}
