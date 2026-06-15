"use client";

import { QRCodeSVG } from "qrcode.react";
import Image from "next/image";
import type { Chain } from "../types";

type ChainQrCodeProps = {
  chain: Chain;
  size?: number;
  logoSize?: number;
};

export function ChainQrCode({
  chain,
  size = 226,
  logoSize = 40,
}: ChainQrCodeProps) {
  const logoContainerSize = Math.round(size * 0.25);

  return (
    <div
      className="relative rounded-2xl bg-white p-3"
      style={{ width: size + 24, height: size + 24 }}
    >
      <QRCodeSVG
        bgColor="#ffffff"
        fgColor="#000000"
        level="M"
        size={size}
        value={chain.address}
      />
      <div
        className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-2xl bg-black p-1"
        style={{ width: logoContainerSize, height: logoContainerSize }}
      >
        <Image
          alt={chain.name}
          className="rounded-full object-cover"
          height={logoSize}
          src={chain.icon}
          style={{ width: logoSize, height: logoSize }}
          width={logoSize}
        />
      </div>
    </div>
  );
}
