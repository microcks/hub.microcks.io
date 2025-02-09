import type { ApiPackage } from "@client/types.gen"

type PackageCardProp = {
    apiPackage: ApiPackage;
}

const PackageCard = ({ apiPackage }: PackageCardProp) => {
    return (
        <div key={apiPackage.name} className="bg-white rounded-md shadow-sm p-4">
            <h3 className="font-bold">{apiPackage.displayName}</h3>
            <p>provided by {apiPackage.provider}</p>
            <p className="text-sm text-gray-600">
                {apiPackage.description}
            </p>
        </div>
    )
}

export { PackageCard };