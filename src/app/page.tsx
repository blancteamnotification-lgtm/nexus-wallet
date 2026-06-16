import { MiningApp } from "@/modules/mining/components/MiningApp";
import { WaitlistApp } from "@/modules/waitlist/components/WaitlistApp";
import { WalletApp } from "@/modules/wallet/components/WalletApp";
import { getAppMode } from "@/shared/config/app-mode";

export default function HomePage() {
  const mode = getAppMode();

  if (mode === "waitlist") {
    return <WaitlistApp />;
  }

  if (mode === "mining") {
    return <MiningApp />;
  }

  return <WalletApp />;
}
