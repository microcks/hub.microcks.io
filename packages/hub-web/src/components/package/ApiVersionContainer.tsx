import type { ApiVersion } from "@client/types.gen";
import { Avatar, AvatarImage } from "@components/components/ui/avatar";
import type React from "react";

type PackageHeroProps = {
    apiVersion: ApiVersion;
}

const ApiVersionContainer = ({ apiVersion, children }: React.PropsWithChildren<PackageHeroProps>) => {
    return <div>
        <div className="flex gap-4 mb-4 items-center">
            <Avatar className="w-32 h-32 rounded-full flex items-center justify-center">
                <AvatarImage src={apiVersion.thumbUrl} className="object-scale-down filter" />
            </Avatar>

            <div className="flex-1">
                <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">{apiVersion.displayName}</h1>
            </div>
        </div>

        <div className="markdown">
            {children}
        </div>
    </div>
};


export { ApiVersionContainer };