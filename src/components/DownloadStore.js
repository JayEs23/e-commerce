const DownloadStore = ({ playstore = '', applestore = '' }) => {
    return (
      <div className="container p-3 border border-white border-rounded">
        <div className="row">
          <div className="col d-flex align-items-center">
            {applestore && (
                <i className={`fa fa-${applestore} mr-2`} style={{ fontSize: '2rem', lineHeight: '1.5' }}></i>
            )}
            {playstore === 'Google Play' && (
                <i className="fa fa-android mr-2" style={{ fontSize: '2rem', lineHeight: '1.5' }}></i>
            )}
            <div>
              {applestore && <div style={{ fontSize: '1.25rem', lineHeight: '1.5' }}><small style={{ fontSize: '1.0rem', lineHeight: '0.25' }}>Download it on </small><br />Apple Store</div>}
              {playstore && <div style={{ fontSize: '1.25rem', lineHeight: '1.5' }}><small style={{ fontSize: '1.0rem', lineHeight: '0.25' }}>Download it on </small><br /> {playstore} Store</div>}
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  export default DownloadStore;
  