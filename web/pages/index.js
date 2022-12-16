import Head from "next/head";
import Image from "next/image";
import "@picocss/pico";
import styles from "../styles/Home.module.css";
import Web3Modal from "web3modal";
import { providers, Contract } from "ethers";
import { useEffect, useRef, useState } from "react";
import { CONTRACT_ADDRESS, abi } from "../constants";

export default function Home() {
  // walletConnected keep track of whether the user's wallet is connected or not
  const [walletConnected, setWalletConnected] = useState(false);
  // display the active user
  const [activeUser, setActiveUser] = useState("");
  // Set a proposal
  const [proposed, setProposed] = useState(false);
  // Married keep track if the user is already married
  const [married, setMarried] = useState(false);
  // Set the address of th spouse
  const [spouse, setSpouse] = useState(null);
  //  the newly married couple
  const [getCouple, setGetCouple] = useState(null);
  // loading is set to true when we are waiting for a transaction to get mined
  const [loading, setLoading] = useState(false);
  // Create a reference to the Web3 Modal (used for connecting to Metamask) which persists as long as the page is open
  const web3ModalRef = useRef();

  const getProviderOrSigner = async (needSigner = false) => {
    // Connect to Metamask
    // Since we store `web3Modal` as a reference, we need to access the `current` value to get access to the underlying object
    const provider = await web3ModalRef.current.connect();
    const web3Provider = new providers.Web3Provider(provider);

    // If user is not connected to the Goerli network, let them know and throw an error
    const { chainId } = await web3Provider.getNetwork();
    if (chainId !== 5) {
      window.alert("Change the network to Goerli");
      throw new Error("Change network to Goerli");
    }

    if (needSigner) {
      const signer = web3Provider.getSigner();
      return signer;
    }
    return web3Provider;
  };

  const getActiveUser = async () => {
    try {
      const signer = await getProviderOrSigner(true);

      const activeUser = await signer.getAddress();
      setActiveUser(activeUser);
    } catch (err) {
      console.error(err);
    }
  };

  const getMarried = async (address) => {
    try {
      const signer = await getProviderOrSigner(true);

      const marryMeContract = new Contract(CONTRACT_ADDRESS, abi, signer);
      // calling the marry function on the smart contract
      const tx = await marryMeContract.marry(address);
      setLoading(true);

      await tx.wait();
      setLoading(false);

      setProposed(true);
    } catch (err) {
      console.error(err);
    }
  };

  const accepted = async () => {
    try {
      const signer = await getProviderOrSigner(true);

      const marryMeContract = new Contract(CONTRACT_ADDRESS, abi, signer);
      // calling the accept function on the smart contract
      const tx = await marryMeContract.accept();
      setLoading(true);
      await tx.wait();
      setLoading(false);

      setMarried(true);
    } catch (err) {
      console.error(err);
    }
  };

  const getSpouses = async () => {
    try {
      const provider = await getProviderOrSigner();

      const marryMeContract = new Contract(CONTRACT_ADDRESS, abi, provider);
      // calling the getSpouses function on the smart contract
      const spouses = await marryMeContract.getSpouses();
      setGetCouple(spouses);
    } catch (err) {
      console.error(err);
    }
  };

  const connectWallet = async () => {
    try {
      // Get the provider from web3Modal, which in our case is MetaMask
      // When used for the first time, it prompts the user to connect their wallet
      await getProviderOrSigner();
      setWalletConnected(true);
    } catch (err) {
      console.error(err);
    }
  };

  const renderButton = () => {
    if (walletConnected) {
      {
        return (
          <div className="container header">
            You are now logged in as {activeUser}
          </div>
        );
      }
      if (loading) {
        return <button className={styles.button}>Loading...</button>;
      } else {
      }
    } else {
      return (
        <button onClick={connectWallet} className={styles.button}>
          Connect your wallet
        </button>
      );
    }
  };

  const appButton = () => {
    //if connected user just proposed
    if (proposed) {
      return (
        <div className={styles.description}>
          waiting for your spouse to accept the proposal 🤗
        </div>
      );
    }

    // when the page is loading
    if (loading) {
      // return <button className={styles.button}>Loading...</button>;
      return (
        <a href="#" aria-busy="true">
          Transction pending, please wait
        </a>
      );
    }

    // if connected user is not married
    else if (!married) {
      return (
        <div>
          <input
            type="text"
            placeholder="Address of spouse"
            onChange={(e) => setSpouse(e.target.value)}
          ></input>

          <button onClick={() => getMarried(spouse)} className={styles.button}>
            Marry
          </button>

          <div>
            <button onClick={() => accepted()} className={styles.button}>
              Accept
            </button>
          </div>
        </div>
      );
    }

    //if connected user just accepted a proposal
    if (married) {
      return (
        <div className={styles.description}>
          By the power of the blockchain, we now celebrate the union of{" "}
          {getCouple}
          <div> congratulations to the newly wed 💍</div>
        </div>
      );
    }
  };

  useEffect(() => {
    // if wallet is not connected, create a new instance of Web3Modal and connect the MetaMask wallet
    if (!walletConnected) {
      // Assign the Web3Modal class to the reference object by setting it's `current` value
      // The `current` value is persisted throughout as long as this page is open
      web3ModalRef.current = new Web3Modal({
        network: "goerli",
        providerOptions: {},
        disableInjectedProvider: false,
      });
      connectWallet();
      getMarried();
      getSpouses();
      accepted();
      getActiveUser();
    }
  }, [walletConnected]);

  return (
    <div className={styles.container}>
      <Head>
        <title>Happily Ether After</title>
        <meta
          name="description"
          content="Marriage certificate on the blockchain"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {/* <nav>{renderButton()}</nav> */}
      <nav>
        <ul>
          <li>
            <strong>Happily Ether After V1</strong>
          </li>
        </ul>
        <ul>
          <li>
            <a role="button">{renderButton()} </a>
          </li>
        </ul>
      </nav>

      <h1 className={styles.title}>Happily Ether After</h1>

      <main className={styles.main}>{appButton()}</main>

      <footer className={styles.footer}>Made with 💜 by Alexis </footer>
    </div>
  );
}
