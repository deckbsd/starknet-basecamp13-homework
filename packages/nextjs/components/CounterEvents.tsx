"use client"
import { useScaffoldEventHistory } from "~~/hooks/scaffold-stark/useScaffoldEventHistory";

type CounterChangedParsedArgs = {
    caller: string;
    old_value: number;
    new_value: number;
    reason: Reason;
};

type Reason = {
    variant: Record<string, {}>;
};

export const CounterEvents = () => {
    const {data, isLoading, error} = useScaffoldEventHistory({
        contractName: "CounterContract",
        eventName: "CounterChanged",
        fromBlock: 0n,
        watch: true,
        format: true,
    });

    if (error) return <div className="text-error">Error loading events</div>;

    const activeVariant = (reason: Reason): string => {
        const variant = reason.variant;
        const keys = Object.keys(variant);
        if (keys.length == 0) {
            return "";
        } else if (keys.length == 1) {
            return keys[0];
        } else {
            return keys.find((k) => variant[k]) ?? "";
        }
    };

    return (
        <div className="w-full max-w-xl mt-6">
            <h3 className="font-semibold mb-2">CounterChanged Events</h3>
            <div className="border rounded p-3 space-y-2 text-sm">
                {data && data.length > 0 ? (
                    data.map((ev: { parsedArgs: CounterChangedParsedArgs }, idx: number) => (
                        <div key={idx}>
                            <div>
                                <span className="font-medium">caller:</span> {ev.parsedArgs.caller}
                            </div>
                            <div>
                                <span className="font-medium">old:</span> {ev.parsedArgs.old_value}
                                {"  "}
                                <span className="font-medium">new:</span> {ev.parsedArgs.new_value}
                                {"  "}
                                 <span className="font-medium">reason:</span> {activeVariant(ev.parsedArgs.reason)}
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="text-sm opacity-70">No events found.</div>
                )}
            </div>
        </div>
    );
};