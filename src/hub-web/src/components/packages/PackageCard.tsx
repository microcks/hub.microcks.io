import type { ApiPackage } from "@client/types.gen"
import { Avatar, AvatarImage } from "@components/components/ui/avatar";

type PackageCardProp = {
    apiPackage: ApiPackage;
}

const PackageCard = ({ apiPackage }: PackageCardProp) => {
    return (
        <a key={apiPackage.name} href={`/packages/${apiPackage.name}`} className="flex">
            <div className="bg-white rounded-md shadow-sm p-4">
                <Avatar className="overflow-visible">
                    <AvatarImage src={apiPackage.thumbUrl} alt={apiPackage.displayName} className="object-scale-down" />
                </Avatar>
                <p className="text-sm text-gray-600">
                    {apiPackage.categories.join(',')}
                </p>
                <h3 className="font-bold">{apiPackage.displayName}</h3>
                <p>provided by {apiPackage.provider}</p>
                <p className="text-sm text-gray-600">
                    {apiPackage.description}
                </p>
            </div>
        </a>
    )
}

export { PackageCard };