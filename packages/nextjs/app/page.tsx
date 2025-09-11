"use client"
import { IncreaseCounter } from "~~/components/IncreaseCounter";
import { DecreaseCounter } from "~~/components/DecreaseCounter";
import { ResetCounter } from "~~/components/ResetCounter";
import { SetCounter } from "~~/components/SetCounter";
import { CounterEvents } from "~~/components/CounterEvents";
import { useScaffoldReadContract } from "~~/hooks/scaffold-stark/useScaffoldReadContract";
import { useAccount } from "~~/hooks/useAccount";

const Home = () => {
  const { data: counterData } = useScaffoldReadContract({
    contractName: "CounterContract",
    functionName: "get_counter",
  });
  const counter = counterData ? Number(counterData) : 0;

  const { data: ownerAddress } = useScaffoldReadContract({
    contractName: "CounterContract",
    functionName: "owner",
  });
  const ownerAddressStr = (ownerAddress) ? ownerAddress.toString() : "";

  const {address: connectedAddress } = useAccount();
  const connectedAddressStr = connectedAddress ?? "";

  return (
    <div className="flex items-center flex-col grow pt-10">
      <p>Counter : {counter}</p>
      <div className="flex gap-4 items-center">
        <IncreaseCounter />
        <DecreaseCounter counter={counter}/>
        <ResetCounter counter={counter} connectedAddress={ownerAddressStr} ownerAddress={connectedAddressStr} />
      </div>
      <div className="mt-4">
        <SetCounter connectedAddress={ownerAddressStr} ownerAddress={connectedAddressStr} />
      </div>
      <CounterEvents />
    </div>
  );
};

export default Home;
