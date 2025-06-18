import { useParams } from "react-router";

function Package() {
  const { packageId } = useParams();
  return <h1>Package: {packageId}</h1>;
}

export default Package;