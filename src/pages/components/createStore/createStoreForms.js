import React from "react";

const CreateStoreForms = () => {
  return (
    <div className="___create_store_form_wrapper">
      <div className="___create_store_form_wrapper_content">
        <div className="___create_store_form_wrapper_content_header">
          <h3>Create a store</h3>
        </div>

        <div className="___create_store_form_wrapper_content_form">
          <div className="___create_store_form_wrapper_content_form_details">
            <div className="___create_store_form_wrapper_content_form_details_name">
              <div className="___create_store_form_wrapper_content_form_details_name_container">
                <label>First name</label>
                <input />
              </div>
              <div className="___create_store_form_wrapper_content_form_details_name_container">
                <label>Last name</label>
                <input />
              </div>
            </div>
            <div className="___create_store_form_wrapper_content_form_details_show">
              <label>Store phone number</label>
              <input />
            </div>
            <div className="___create_store_form_wrapper_content_form_details_show">
              <label>Store email</label>
              <input />
            </div>
            <div className="___create_store_form_wrapper_content_form_details_show">
              <label>Store address (optional)</label>
              <input />
            </div>
            <div className="___create_store_form_wrapper_content_form_details_showarea">
              <label>Store description</label>
              <textarea></textarea>
            </div>
          </div>
          <div className="___create_store_form_wrapper_content_form_button">
            <button>Create store</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateStoreForms;
