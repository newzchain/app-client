import "../styles/globals.css";
import AppContext from "./../context";
import CoinbaseWalletSDK from "@coinbase/wallet-sdk";
import WalletConnect from "@walletconnect/web3-provider";
import Web3Modal from "web3modal";
import { ethers } from "ethers";
import { useState, useEffect } from "react";
import {
  NEWSCHAIN_CONTRACT_ABI,
  NEWSCHAIN_CONTRACT_ADDRESS,
} from "../constants/constants";
import NavBar from "./../components/NavBar";
import Footer from "../components/Footer";

import { create as ipfsHttpClient } from "ipfs-http-client";
function MyApp({ Component, pageProps }) {
  var client = ipfsHttpClient("https://ipfs.infura.io:5001/api/v0");
  const [profileLoading, setProfileLoading] = useState(true);
  const [content, setContent] = useState("");
  const [contentUrl, setContentUrl] = useState("");
  const [provider, setProvider] = useState();
  const [library, setLibrary] = useState();
  const [account, setAccount] = useState();
  const [network, setNetwork] = useState();
  const [chainId, setChainId] = useState();
  const [isCreator, setIsCreator] = useState();
  const [data, setData] = useState("");

  const [profileInfo, setProfileInfo] = useState({
    email: "",
    socialMedia: "",
    personalSite: "",
    bio: "",
    profileImgUrl: "",
    coverImgUrl: "",
  });
  const [fetchedProfile, setFetchedProfile] = useState({
    email: "",
    socialMedia: "",
    personalSite: "",
    bio: "",
    profileImgUrl: "",
    coverImgUrl: "",
  });

  const [fetchedPosts, setFetchedPosts] = useState([]);

  const [createdPosts, setCreatedPosts] = useState({
    title: "",
    coverPhoto: "",
    tag1: "",
    tag2: "",
    tag3: "",
  });

  const connectWallet = async () => {
    try {
      const providerOptions = {
        coinbasewallet: {
          package: CoinbaseWalletSDK,
          options: {
            appName: "Web 3 Modal Demo",
          },
        },
        walletconnect: {
          package: WalletConnect,
          options: {
            infuraId: "27e484dcd9e3efcfd25a83a78777cdf1",
          },
        },
      };
      const web3Modal = new Web3Modal({
        providerOptions, // required
      });
      const provider = await web3Modal.connect();
      const library = new ethers.providers.Web3Provider(provider);

      const accounts = await library.listAccounts();
      const network = await library.getNetwork();
      setProvider(provider);
      setLibrary(library);
      if (accounts) setAccount(accounts[0]);
      setNetwork(network);
    } catch (error) {
      console.error(error);
    }
  };

  const getCurrentAccount = async () => {
    window.ethereum.on("accountsChanged", (accounts) => {
      if (accounts.length > 0) {
        setAccount(accounts[0]);
        doesProfileExists();
        fetchProfile();
        fetchPosts();
      } else {
        setAccount("");
      }
    });
  };

  const onChangeProfileImg = async (e) => {
    const file = e.target.files[0];
    try {
      const added = await client.add(file);
      const url = `https://ipfs.infura.io/ipfs/${added.path}`;
      setProfileInfo({ ...profileInfo, profileImgUrl: url });
    } catch (error) {
      console.log(error);
    }
  };

  const onChangeCoverImg = async (e) => {
    const file = e.target.files[0];
    try {
      const added = await client.add(file);
      const url = `https://ipfs.infura.io/ipfs/${added.path}`;
      setProfileInfo({ ...profileInfo, coverImgUrl: url });
    } catch (error) {
      console.log(error);
    }
  };

  const getConnectedWallet = async () => {
    const accounts = await ethereum.request({ method: "eth_accounts" });

    if (accounts.length) {
      setAccount(accounts[0]);
    } else {
      console.log("no accounts found");
    }
  };

  useEffect(() => {
    getCurrentAccount();
    if (provider?.on) {
      const handleAccountsChanged = (accounts) => {
        setAccount(accounts);
      };

      const handleChainChanged = (chainId) => {
        setChainId(chainId);
      };

      const handleDisconnect = () => {
        disconnect();
      };

      provider.on("accountsChanged", handleAccountsChanged);
      provider.on("chainChanged", handleChainChanged);
      provider.on("disconnect", handleDisconnect);

      return () => {
        if (provider.removeListener) {
          provider.removeListener("accountsChanged", handleAccountsChanged);
          provider.removeListener("chainChanged", handleChainChanged);
          provider.removeListener("disconnect", handleDisconnect);
        }
      };
    }
  }, [provider]);

  useEffect(() => {
    getConnectedWallet();
    doesProfileExists();
    fetchProfile();
    fetchPosts();
  }, []);

  const doesProfileExists = async () => {
    try {
      const web3Modal = new Web3Modal();
      const provider = await web3Modal.connect();
      const library = new ethers.providers.Web3Provider(provider);
      const signer = library.getSigner();

      const newschainContract = new ethers.Contract(
        NEWSCHAIN_CONTRACT_ADDRESS,
        NEWSCHAIN_CONTRACT_ABI,
        signer
      );
      const profileExists = await newschainContract.isCreator(
        signer.getAddress()
      );
      setIsCreator(profileExists);
      return { profileExists, newschainContract, signer };
    } catch (error) {
      console.log(error);
    }
  };

  const createProfile = async (e) => {
    e.preventDefault();
    try {
      const { profileExists, newschainContract } = await doesProfileExists();
      console.log(profileExists);
      if (!profileExists) {
        const {
          email,
          socialMedia,
          personalSite,
          bio,
          profileImgUrl,
          coverImgUrl,
        } = profileInfo;
        if (
          !email ||
          !socialMedia ||
          !personalSite ||
          !bio ||
          !profileImgUrl ||
          !coverImgUrl
        ) {
          alert("All the fields are required");
          return;
        }
        const createProfileTxn = await newschainContract.createProfile(
          email,
          socialMedia,
          personalSite,
          bio,
          profileImgUrl,
          coverImgUrl
        );
        await createProfileTxn.wait();
        window.location.reload();
      }
      const profileExistsOrNot = await doesProfileExists();
      setIsCreator(profileExistsOrNot);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchProfile = async () => {
    try {
      const { profileExists, newschainContract } = await doesProfileExists();
      if (profileExists) {
        const currentProfileInfo = await newschainContract.fetchProfile();
        const _email = currentProfileInfo.emailId;
        const _social = currentProfileInfo.socialMedia;
        const _site = currentProfileInfo.personalWebsite;
        const _bio = currentProfileInfo.bio;
        const _profilePic = currentProfileInfo.profilePhoto;
        const _cover = currentProfileInfo.coverPhoto;
        setFetchedProfile({
          email: _email,
          socialMedia: _social,
          personalSite: _site,
          bio: _bio,
          profileImgUrl: _profilePic,
          coverImgUrl: _cover,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onChangePostsCoverImg = async (e) => {
    const file = e.target.files[0];
    try {
      const added = await client.add(file);
      const url = `https://ipfs.infura.io/ipfs/${added.path}`;
      setCreatedPosts({ ...createdPosts, coverPhoto: url });
    } catch (error) {
      console.log(error);
    }
  };

  const createNewPost = async (e) => {
    try {
      e.preventDefault();
      let json = JSON.stringify(content);
      const added = await client.add(json);
      const url = `https://ipfs.infura.io/ipfs/${added.path}
      `;
      setContentUrl(url);
      const { newschainContract } = await doesProfileExists();
      console.log(createdPosts.title, createdPosts.coverPhoto, url, [
        createdPosts.tag1,
        createdPosts.tag2,
        createdPosts.tag3,
      ]);
      if (
        !createdPosts.title ||
        !createdPosts.coverPhoto ||
        !url ||
        ![createdPosts.tag1, createdPosts.tag2, createdPosts.tag3]
      ) {
        alert("All the fields are mendatory");
        return;
      }
      const createPostTxn = await newschainContract.createPost(
        createdPosts.title,
        createdPosts.coverPhoto,
        url,
        [createdPosts.tag1, createdPosts.tag2, createdPosts.tag3]
      );
      await createPostTxn.wait();
    } catch (error) {
      console.log(error);
    }
  };

  const fetchPosts = async () => {
    try {
      const { newschainContract } = await doesProfileExists();
      const data = await newschainContract.fetchMyPosts();
      const posts = await Promise.all(
        data.map(async (i) => {
          let item = {
            ...i,
            content: i.content,
            postId: i.postId.toNumber(),
            publishedTime: new Date(
              i.publishedTime.toNumber() * 1000
            ).toLocaleDateString(),
          };

          return item;
        })
      );

      setFetchedPosts(posts);
      console.log(posts);
      setProfileLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const getContent = async (Post) => {
    let url = Post.content.substring(0, Post.content.length - 2);
    let response = await fetch(url);
    let json = await response.json();
    setData(json);
  };

  return (
    <AppContext.Provider
      value={{
        account,
        profileInfo,
        isCreator,
        fetchedProfile,
        profileLoading,
        content,
        fetchedPosts,
        createdPosts,
        data,
      }}
    >
      <NavBar />
      <Component
        {...pageProps}
        setProfileInfo={setProfileInfo}
        connectWallet={connectWallet}
        createProfile={createProfile}
        onChangeCoverImg={onChangeCoverImg}
        onChangeProfileImg={onChangeProfileImg}
        createNewPost={createNewPost}
        setContent={setContent}
        setFetchedPosts={setFetchedPosts}
        setCreatedPosts={setCreatedPosts}
        onChangePostsCoverImg={onChangePostsCoverImg}
        getContent={getContent}
        setData={setData}
      />
      <Footer />
    </AppContext.Provider>
  );
}

export default MyApp;
