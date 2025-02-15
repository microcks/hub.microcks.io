import { Button } from "@components/components/ui/button"
import { Copy, Check } from "lucide-react";
import { updateClipboard } from '@utils/updateClipboard';
import { useState } from "react";

type CopyCodeProps = {
    code: string;
}

export const CopyCode = ({ code }: CopyCodeProps) => {
    const [copied, setCopied] = useState(false);

    const handleCopyClick = () => {
        updateClipboard(code, () => {
            setCopied(true);
            setTimeout(() => setCopied(false), 1000);
        })
    }

    return <div className="flex gap-2 max-w-full relative">
        <code className="flex-1 overflow-auto line-clamp-5 rounded px-[0.3rem] pr-12 py-[0.2rem] font-mono bg-gray-100 text-sm ">
            {code}
        </code>
        <Button variant="outline" size="sm" className="px-3 absolute top-2 right-2" onClick={handleCopyClick}>
            {copied ?
                <>
                    <span className="sr-only">Copied!</span>
                    <Check />
                </> :
                <>
                    <span className="sr-only">Copy</span>
                    <Copy />
                </>
            }
        </Button>
    </div>

}
