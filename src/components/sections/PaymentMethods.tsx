import type { ReactElement, SVGProps } from "react";
import { client } from "@/config/client";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CardIcon, CashIcon, OnlinePayIcon, ShieldIcon, WalletIcon } from "@/components/Icons";

type IconKey = (typeof client.payments)[number]["icon"];
const ICONS: Record<IconKey, (p: SVGProps<SVGSVGElement>) => ReactElement> = {
  cash: CashIcon,
  card: CardIcon,
  wallet: WalletIcon,
  online: OnlinePayIcon,
};

/** Home-page section listing every accepted payment method (client.payments). */
export function PaymentMethods() {
  return (
    <section className="section" aria-labelledby="payments-title">
      <div className="container-x">
        <SectionHeading
          id="payments-title"
          align="center"
          eyebrow="Payment methods"
          title={<>Pay the way <span className="brand-text">you prefer</span></>}
          intro="We accept all major payment methods at both branches — cash, cards, mobile wallets and online transfer."
        />
        <ul className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-5">
          {client.payments.map((m, i) => {
            const Icon = ICONS[m.icon];
            return (
              <li key={m.name} className="reveal reveal-zoom card card-hover flex flex-col items-center p-4 text-center last:col-span-2 sm:p-6 sm:last:col-span-1" style={{ ["--d" as string]: `${i * 70}ms` }}>
                <span className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-brand/12 text-brand ring-1 ring-brand/30">
                  <Icon width={28} height={28} />
                </span>
                <h3 className="mt-3 text-base font-bold text-white sm:mt-4 sm:text-lg">{m.name}</h3>
                <p className="mt-1 text-xs text-metal sm:text-sm">{m.note}</p>
              </li>
            );
          })}
        </ul>
        <p className="reveal mt-8 flex items-center justify-center gap-2 text-center text-sm text-mist">
          <ShieldIcon width={16} height={16} className="shrink-0 text-brand" />
          You get a clear estimate before any work starts, and you only pay for work you approve.
        </p>
      </div>
    </section>
  );
}
