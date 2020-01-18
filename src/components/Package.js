import React from "react";
import { Link } from "react-router-dom";

const Package = ({ packageInfo, packages }) => {
  return (
    <>
      <h1>{packageInfo.name}</h1>
      <p>{packageInfo.description}</p>
      <p>
        Dependencies:{" "}
        {[...packageInfo.dependencies].map(d =>
          packages.get(d) ? (
            <Link to={`/packages/${d}`}>{d}, </Link>
          ) : (
            <span>{d}, </span>
          )
        )}
      </p>
      <p>
        Reverse dependencies:{" "}
        {[...packageInfo.reverseDependencies].map(d =>
          packages.get(d) ? (
            <Link to={`/packages/${d}`}>{d}, </Link>
          ) : (
            <span>{d}, </span>
          )
        )}
      </p>
    </>
  );
};

export default Package;
