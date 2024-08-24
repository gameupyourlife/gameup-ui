"use client"
import { createQueryUri } from '@/actions/helper'
import { usePathname } from 'next/navigation'
import { useRouter } from 'next/navigation'

export default function Tag({text}: {text: string}) {
    const router = useRouter()
    const pathname = usePathname()

    return (
        <button
            //   href={`/tags/${slug(text)}`}
            onClick={() => {
                // <pathname>?sort=asc
                router.push(createQueryUri(pathname, "tag", text))
            }}  
            className="mr-3 text-sm font-medium uppercase text-accent"
        >
            {text}
        </button>
    )

}



