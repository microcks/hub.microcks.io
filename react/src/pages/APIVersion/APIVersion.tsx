import { useParams } from "react-router";

export const APIVersion = () => {
  const { packageId, apiVersionId } = useParams();
  return <h1>API Version: {packageId}/{apiVersionId}</h1>;
}
