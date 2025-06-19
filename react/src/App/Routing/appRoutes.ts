type Package = {
  packageId: string;
};

type ApiVersion = Package & {
  apiVersion: string;
};

type Doc = {
  page: string;
};

export const appRoutes = {
  home: () => '/',
  package: ({ packageId }: Package) => `/package/${packageId}`,
  apiVersion: ({ packageId, apiVersion }: ApiVersion) => `/package/${packageId}/api/${apiVersion}`,
  doc: ({ page }: Doc) => `/doc/${page}`,
};
