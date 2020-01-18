import React from "react";
import { Link } from "react-router-dom";

const PackageList = ({ packages }) => {
  return (
    <ul>
      {Array.from(packages, ([key, value]) => (
        <li>
          <Link to={`/packages/${key}`}>{key}</Link>
        </li>
      ))}
    </ul>
  );
};

export default PackageList;
