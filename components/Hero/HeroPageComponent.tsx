import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { heroActions } from "../../store/hero-slice";

type HeroPageComponent = {
  userId: string;
};

function HeroPageComponent({ userId }: HeroPageComponent) {
  const [inventoryView, setInventoryView] = useState("heros");
  const [MyNfts, setMyNfts] = useState<any>([]);
  const [previewNft, setPreviewNft] = useState<any>({});

  const dispatch = useDispatch();
  const router = useRouter();

  var ContractAddressHeros = "0xf1678662108e263cbbd94091eef52b01133266af";
  var ContractAddressWeapons = "0xAfDbC13dDD1999310efB2Aaf29ffb8Af9E429522";
  var ContractObject: any;
  var ContractState: any;

  function loadContract(contractAddr: any) {
    try {
      return window.zilPay.contracts.at(contractAddr);
    } catch (err: any) {
      console.log(err.message);
      return false;
    }
  }

  function loadGallery() {
    let tokenOwners = ContractState.token_owners;
    let tokenUris = ContractState.token_uris;
    setMyNfts([]);
    for (let i in tokenOwners) {
      if (window.zilPay.wallet.defaultAccount.base16 == tokenOwners[i]) {
        getNftData(tokenUris[i]);
      }
      getNftData(tokenUris[i]);
    }
  }

  function getNftData(tokenUri: any) {
    let data: any = [];

    fetch(tokenUri)
      .then(function (response) {
        return response.json();
      })
      .then(function (myJson) {
        data = myJson;

        setMyNfts((oldMyNfts: any) => [...oldMyNfts, data]);
      });
  }

  async function onInitFetch(value: string) {
    ContractObject = loadContract(
      value === "heros" ? ContractAddressHeros : ContractAddressWeapons
    );
    if (ContractObject) {
      ContractObject.getState().then(function (stateData: any) {
        ContractState = stateData;
        loadGallery();
      });
    }
  }

  const setHeroImage = async () => {
    dispatch(heroActions.setHero(previewNft));

    await axios.put(`/api/user/${userId}`, {
      heroIcon: previewNft.resources[0].uri,
    });
    router.push("/resources");
    toast.success("Successfully selected hero!");
  };

  useEffect(() => {
    onInitFetch("heros");
  }, []);

  const changeInventoryViewHandler = (value: string) => {
    setPreviewNft({});
    setInventoryView(value);
    onInitFetch(value);
  };

  return (
    <div className="mb-12 flex flex-col rounded-lg border-2 border-primary/80 bg-slate-800 px-6 py-4">
      <div>
        <h1 className="text-2xl font-semibold text-primary">Hero Inventory</h1>
      </div>

      <hr className="mt-4 border-primary/80" />

      <div className="mt-4 flex justify-between">
        <div className="tabs">
          <button
            className={`tab${
              inventoryView === "heros" ? " tab-active" : ""
            }  tab-lifted  tab-lg`}
            value="heros"
            onClick={(e: any) => changeInventoryViewHandler(e.target.value)}
          >
            Heros
          </button>
          <button
            className={`tab${
              inventoryView === "weapons" ? " tab-active" : ""
            }  tab-lifted  tab-lg`}
            value="weapons"
            onClick={(e: any) => changeInventoryViewHandler(e.target.value)}
          >
            Weapons
          </button>
        </div>
        <div className="tabs">
          <a className="tab tab-lifted tab-active tab-lg">My Collection</a>
          <div
            className="tooltip-top tooltip"
            data-tip="Market is in development"
          >
            <a className="disabled tab tab-lifted tab-lg">Marketplace</a>
          </div>
        </div>
      </div>

      <div className="my-5 flex justify-around">
        <div className="flex flex-col gap-4">
          {MyNfts.map((nft: any, i: number) => (
            <div
              key={i}
              className="max-h-[56px] cursor-pointer text-center font-bold text-white"
              onClick={() => setPreviewNft(nft)}
            >
              <div className="rounded-lg bg-primary px-8 py-4">{nft.name}</div>
            </div>
          ))}
        </div>
        <div>
          {previewNft?.resources?.length ? (
            <div className="card relative w-96 bg-base-100 shadow-xl ">
              <figure>
                <img
                  src={previewNft.resources[0].uri}
                  alt="Hero_icon.png"
                  className={`${
                    inventoryView === "heros"
                      ? "h-[400px] w-full object-top"
                      : "h-[250px] w-[100px]"
                  }  object-cover `}
                />
              </figure>
              <div className="card-body">
                <h2 className="card-title text-primary">{previewNft.name}</h2>
                <p>Description: {previewNft.description}</p>
                <p>
                  {previewNft.attributes.map((attribute: any) => (
                    <div className="flex" key={attribute.trait_type}>
                      {attribute.trait_type}: {attribute.value}
                    </div>
                  ))}
                </p>
              </div>

              {inventoryView === "heros" ? (
                <div className="card-actions mx-5 mb-4 justify-end">
                  <button className="primary_button" onClick={setHeroImage}>
                    Select this hero
                  </button>
                </div>
              ) : (
                <div></div>
              )}
            </div>
          ) : (
            <div className="card relative w-96 bg-base-100 shadow-xl ">
              <figure>
                <div className="h-48 w-full animate-pulse bg-slate-700"></div>
              </figure>
              <div className="card-body">
                <h2 className="card-title text-lg text-primary">
                  Select one of the NFTs to see preview
                </h2>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default HeroPageComponent;
