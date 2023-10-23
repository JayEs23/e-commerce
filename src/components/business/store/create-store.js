import React from "react";

const CreateStore = () => {
  return (
    <div className="create-store-container">
      <div className="required-inputs">
        {/* <h3>Create store</h3> */}
        <div className="drag-drop">
          <div className="logo-image-container">
            <img src="/assets/images/business/Image_02.png" alt="" />
          </div>
          <div className="">
            <h6>Store logo</h6>
            <p>Click or drag/drop to upload image.</p>
            <p>Allowed files - .jpeg .png .jpg files.</p>
          </div>
        </div>
        <div className="input-container">
          <p>Store name</p>
          <input type="text" placeholder="Enter store name" />
        </div>
        <div className="input-container">
          <p>Store Description</p>
          <textarea placeholder="Enter store description" />
        </div>
        <div className="input-container">
          <p>Shop address (Optional)</p>
          <input type="textarea" placeholder="Enter your shop address" />
        </div>
      </div>
      <div className="preview">
        <p>Preview</p>
        <div className="preview-container">
          <div className="logo-image-container">
            <img src="/assets/images/business/Image_02.png" alt="" />
          </div>
          <div className="text-container">
            <h4>Shop name</h4>
            <p>Description should be this long</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateStore;
