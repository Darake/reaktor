import React from "react";
import { useHistory } from "react-router-dom";

const UploadPackageFile = ({ setPackages, toPage }) => {
  const history = useHistory();

  const setReverseDependencies = packages =>
    packages.forEach(value =>
      value.dependencies.forEach(dependency => {
        const dependencyObject = packages.get(dependency);
        if (dependencyObject) {
          packages.set(dependency, {
            ...dependencyObject,
            reverseDependencies: dependencyObject.reverseDependencies.concat(
              value.name
            )
          });
        }
      })
    );

  const getDependencies = text => {
    const dependencyArray = text.split("Depends: ")[1]
      ? text
          .split("Depends: ")[1]
          .split("\n", 1)[0]
          .split(/\s\(.*?\)[(,\s)|(\s\|)^]*|,\s/)
          .filter(dependency => dependency.length !== 0)
      : null;
    return new Set(dependencyArray);
  };

  const createPackageObjects = text => {
    const packages = text
      .split(/(?=Package:)/g)
      .reduce((packageMap, packageInfo) => {
        const packageObject = {
          name: packageInfo.split("Package: ")[1].split("\n", 1)[0],
          description: packageInfo
            .split("Description: ")[1]
            .split(/\n(?<!\s)/)[0],
          dependencies: getDependencies(packageInfo),
          reverseDependencies: []
        };
        packageMap.set(packageObject.name, packageObject);
        return packageMap;
      }, new Map());
    setReverseDependencies(packages);
    const packagesAsc = new Map([...packages.entries()].sort());
    setPackages(packagesAsc);
    history.push("/packages");
  };

  const onFileLoad = e => {
    const reader = new FileReader();
    reader.readAsText(e.target.files[0]);
    reader.onload = e => {
      createPackageObjects(e.target.result);
    };
  };

  return (
    <>
      <label htmlFor="file">Please upload a dpkg status file</label>
      <input type="file" id="file" onChange={e => onFileLoad(e)} />
    </>
  );
};

export default UploadPackageFile;
