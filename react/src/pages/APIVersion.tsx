import { useParams } from "react-router";

function APIVersion() {
  const { packageId, apiVersionId } = useParams();
  return <h1>API Version: {packageId}/{apiVersionId}</h1>;
}

export default APIVersion;