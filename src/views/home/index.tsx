import { WalletMultiButton } from "@solana/wallet-adapter-ant-design";
import { Button, Col, Row } from "antd";
import React from "react";
import { Link } from "react-router-dom";
import { TokenIcon } from "../../components/TokenIcon";
import { useUserBalance, useUserTotalBalance } from "../../hooks";
import { WRAPPED_SOL_MINT } from "../../utils/ids";
import { formatUSD } from "../../utils/utils";

export const HomeView = () => {

  const SRM_ADDRESS = "SRMuApVNdxXokk5GT7XD5cUUgXMBCoAz2LHeuAoKWRt";
  const SRM = useUserBalance(SRM_ADDRESS);
  const SOL = useUserBalance(WRAPPED_SOL_MINT);
  const isConnected = SOL.accounts[0] !== undefined;
  const { balanceInUSD: totalBalanceInUSD } = useUserTotalBalance();

  return (
    <Row gutter={16} align="middle">
      <Col span={24}>
        <h2>Your balances ({formatUSD.format(totalBalanceInUSD)}):</h2>
        <h2>
          SOL: {SOL.balance} ({formatUSD.format(SOL.balanceInUSD)})
        </h2>
        <h2 style={{ display: "inline-flex", alignItems: "center" }}>
          <TokenIcon mintAddress={SRM_ADDRESS} /> SRM: {SRM?.balance} (
          {formatUSD.format(SRM?.balanceInUSD)})
        </h2>
        <h2>
          LAMPORTS: {SOL.balanceLamports} ({formatUSD.format(SOL.balanceInUSD)})
        </h2>
        <h2>
          NFTs: {0}
        </h2>
        {isConnected
          ? 
          <Link to="/mint">
            <Button>MINT</Button>
          </Link>
          : 
          <WalletMultiButton />
        }
      </Col>
      <Col span={12}>
        <WalletMultiButton type="ghost" />
      </Col>
      <Col span={12}>
        {process.env.NODE_ENV === 'development' &&
          <Link to="/faucet">
            <Button>Faucet</Button>
          </Link>
        }
      </Col>
      <Col span={24}>
        <div className="builton" />
      </Col>
    </Row>
  );
};
