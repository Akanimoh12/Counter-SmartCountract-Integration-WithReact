import React, { useState } from "react";
import { ethers } from "ethers";
import { CiWallet } from "react-icons/ci";
import CounterDisplay from "./components/CounterDisplay";
import IncrementButton from "./components/IncrementButton";
import DecrementButton from "./components/DecrementButton";
import SetCountForm from "./components/SetCountForm";
import contractABI from "./components/contractABI.json";

const contractAddress = "0x361CdC897819b7bEc6e53CEd7150B5222414e175"; // Replace with your deployed address

function App() {
  const [provider, setProvider] = useState(null);
  const [contract, setContract] = useState(null);
  const [account, setAccount] = useState("");
  const [count, setCount] = useState(0);
  const [isConnecting, setIsConnecting] = useState(false);

  // Connect to wallet
  const connectWallet = async () => {
    if (typeof window.ethereum !== "undefined") {
      setIsConnecting(true);
      try {
        // Request account access via MetaMask
        await window.ethereum.request({ method: "eth_requestAccounts" });
        const provider = new ethers.BrowserProvider(window.ethereum); // Use BrowserProvider for ethers v6
        setProvider(provider);
        const signer = await provider.getSigner();
        const contract = new ethers.Contract(
          contractAddress,
          contractABI,
          signer
        );
        setContract(contract);
        const address = await signer.getAddress();
        setAccount(address);
        // Fetch initial count
        const currentCount = await contract.count();
        setCount(Number(currentCount)); // Use Number() for BigNumber in ethers v6
      } catch (error) {
        console.error("Failed to connect wallet:", error);
        alert("Failed to connect wallet: " + error.message);
      } finally {
        setIsConnecting(false);
      }
    } else {
      alert("Please install MetaMask!");
      setIsConnecting(false);
    }
  };

  // Function to update count after transactions
  const updateCount = async () => {
    if (contract) {
      const currentCount = await contract.count();
      setCount(Number(currentCount)); // Use Number() for BigNumber
    }
  };

  return (
    <div className="flex flex-col items-center bg-linear-to-bl from-gray-800 to-pink-950 justify-center min-h-screen bg-gray-100">
      
      {account ? (
        <>
        <div className="p-8   rounded-2xl w-full sm:w-[300px] sm:border-[1px] border-gray-500 ">

          <div className=" w-full items-center text-gray-400  ">
            <p className="bg-white w-fit text-black px-2 rounded-2xl flex items-center gap-1.5 pulsate-fwd ">
              Connected
              <div className="pulsate-fwd w-2.5 h-2.5 bg-green-400 rounded-full">

              </div>
            </p>
            {/* <CiWallet className="text-white text-4xl font-bold " /> */}
            <p className=" mt-1.5 text-xl w-full overflow-hidden "> {account}</p>
          </div>
        
          <CounterDisplay count={count} />

          <div className="mt-4 space-y-2">
            <IncrementButton contract={contract} updateCount={updateCount}  />
            <DecrementButton contract={contract} updateCount={updateCount} />
          </div>

          <SetCountForm contract={contract} updateCount={updateCount} />

        </div>
          
        </>
      ) : (
        <div className="text-center">
          <h1 className={`text-white text-4xl font-bold mb-4`}>Counter dApp</h1> 
          <p className="text-red-500 mb-4 vibrate-1 ">Please connect wallet </p>
          <button
            onClick={connectWallet}
            disabled={isConnecting} 
            className={`shake-top pulsate-fwd m-auto py-2 text-white border-2 rounded-2xl px-6 bg-linear-to-bl from-gray-800 to-gray-900 flex items-center gap-1.5  cursor-pointer ${
              isConnecting ? "bg-red-600" : ""
            }`}
          >
            <CiWallet className="text-white text-2xl font-bold " />
            {isConnecting ? "Connecting..." : "Connect Wallet"}           
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
