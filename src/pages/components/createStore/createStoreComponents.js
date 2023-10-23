import React from "react";
import CreateStoreScroller from "./createStoreScroller";
import CreateStoreForms from "./createStoreForms";

const CreateStoreComponents = () => {
  return (
    <div className="__create_store_wrapper">
      <div className="__create_store_wrapper_layerOne">
        <CreateStoreScroller />
      </div>
      <div className="__create_store_wrapper_layerTwo">
        <CreateStoreForms />
      </div>
    </div>
  );
};

export default CreateStoreComponents;
