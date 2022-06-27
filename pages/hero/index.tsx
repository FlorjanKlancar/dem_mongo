import React, { useState, useEffect } from "react";
import NavbarDem from "../../components/Navbar/NavbarDem";

function HeroPage() {
  var ContractAddress = "0xfe7662f86d46c7a40133570e45a58698c07888bb";
  var ContractObject: any;
  var ContractState: any;
  const [MyNfts, setMyNfts] = useState<any>([]);

  function checkWallet() {
    if (window.zilPay) {
      return true;
    } else {
      return false;
    }
  }
  async function connectWallet() {
    return await window.zilPay.wallet.connect();
  }
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

    console.log(tokenOwners);

    for (let i in tokenOwners) {
      if (window.zilPay.wallet.defaultAccount.base16 == tokenOwners[i]) {
        getNftData(tokenUris[i]);
      }
      getNftData(tokenUris[i]);
      console.log(tokenUris[i]);
    }
    console.log(MyNfts);
  }

  function getNftData(tokenUri: any) {
    let data: any = [];

    fetch(tokenUri)
      .then(function (response) {
        return response.json();
      })
      .then(function (myJson) {
        data = myJson;
        console.log(data);
        setMyNfts((oldMyNfts: any) => [...oldMyNfts, data]);
        console.log(MyNfts);
      });
  }
  console.log(MyNfts);

  async function onloadInit() {
    var check1 = checkWallet();
    var check2 = await connectWallet();
    if (check1 && check2) {
      ContractObject = loadContract(ContractAddress);
      if (ContractObject) {
        ContractObject.getState().then(function (stateData: any) {
          ContractState = stateData;
          //alert("Contract State Loaded Successfully!")
          loadGallery();
        });
      }
    }
  }

  useEffect(() => {
    // call api or anything
    onloadInit();
  }, []);

  return (
    <>
      <NavbarDem />
      <div className="lg:px-8 xl:px-52 2xl:px-96">
        <div className="mb-12 flex flex-col space-y-4 rounded-lg border-2 border-primary/80 bg-slate-800 px-6 py-4">
          <div>
            <h1 className="text-center text-2xl font-semibold text-primary">
              Hero Inventory
            </h1>

            {MyNfts.map((val: any, index: any) => (
              <div key={index}>test{val.name}</div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default HeroPage;
