import { useParams } from 'react-router';

export const Doc = () => {
  const { page } = useParams();
  return <h1>Doc: {page}</h1>;
};
