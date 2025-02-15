import type { Contract } from "@client/types.gen";
import { Button } from "@components/components/ui/button"
import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogDescription, DialogClose, DialogHeader, DialogFooter } from "@components/components/ui/dialog"
import { Copy } from "lucide-react"
import { CopyCode } from "./CopyCode";

type InstallMicrocksDialogProps = {
    packageName: string,
    packageAPIVersionName: string,
    contracts: Contract[];
}

export const InstallMicrocksDialog = ({
    packageName,
    packageAPIVersionName,
    contracts
}: InstallMicrocksDialogProps) => {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="default" className="w-full">Install</Button>
            </DialogTrigger>
            <DialogContent className="max-w-xl block">
                <DialogHeader>
                    <DialogTitle>Install on Microcks</DialogTitle>
                    <DialogDescription>
                        You have 2 options for installing this API Mocks into your Microcks instance.
                    </DialogDescription>
                </DialogHeader>
                <div className="flex flex-col flex-wrap space-y-2">
                    <h4 className="text-md font-semibold tracking-tight mt-4">
                        Create new Import Job(s) into Microcks UI, copy/pasting these URL(s)
                    </h4>
                    {
                        contracts.map((contract) => {
                            if (!contract.url) {
                                return
                            }

                            return <CopyCode code={contract.url} />
                        })
                    }
                </div>
                <div className="flex items-center flex-wrap space-y-2">
                    <h4 className="text-md font-semibold tracking-tight mt-4">
                        Use microcks-cli command line tool with the importAPI command:
                    </h4>
                    <CopyCode code={`microcks-cli importAPI ${packageName}:${packageAPIVersionName} --microcksURL=http://localhost:8080/api/ --keycloakClientId=microcks-serviceaccount --keycloakClientSecret=7deb71e8-8c80-4376-95ad-00a399ee3ca1 --insecure --verbose`} />
                </div>
                <DialogFooter className="sm:justify-start mt-4">
                    <DialogClose asChild>
                        <Button type="button" variant="secondary">
                            Close
                        </Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
