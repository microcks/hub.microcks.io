import type { ApiPackageFull } from "@client/types.gen";
import { Avatar, AvatarImage } from "@components/components/ui/avatar";
import type React from "react";

type PackageHeroProps = {
    apiPackage: ApiPackageFull;
}

const PackageContainer = ({ apiPackage, children }: React.PropsWithChildren<PackageHeroProps>) => {
    return <div>
        <div className="p-2 flex gap-4 mb-4 items-center">
            <Avatar className="w-32 h-32 p-4 border-2 bg-white rounded-full flex items-center justify-center">
                <AvatarImage src={apiPackage.thumbUrl} className="object-scale-down" />
            </Avatar>

            <div className="flex-1">
                <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">{apiPackage.displayName}</h1>
                <p className="leading-7 [&:not(:first-child)]:mt-6">{apiPackage.description}</p>
            </div>
        </div>

        <div className="markdown">
            {children}
        </div>
    </div>
};


export { PackageContainer };