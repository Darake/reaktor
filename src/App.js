import React, { useState } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import UploadPackageFile from "./components/UploadPackageFile";
import PackageList from "./components/PackageList";
import Package from "./components/Package";

const App = () => {
  const [packages, setPackages] = useState(null);

  return (
    <div>
      <Router>
        <Route
          exact
          path="/"
          render={() => <UploadPackageFile setPackages={setPackages} />}
        />
        <Route
          exact
          path="/packages"
          render={() =>
            packages ? (
              <PackageList packages={packages} />
            ) : (
              <UploadPackageFile setPackages={setPackages} />
            )
          }
        />
        <Route
          exact
          path="/packages/:key"
          render={({ match }) => (
            <Package
              packageInfo={packages.get(match.params.key)}
              packages={packages}
            />
          )}
        />
      </Router>
    </div>
  );
};

export default App;
