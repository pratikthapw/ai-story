import React from 'react'
import { Button } from '../ui/button'
import Link from 'next/link'

interface BookContainerProps {
    children: React.ReactNode,
    variant: 'page-flip' | 'custom-flip'
}

const LINK_MAP = {
    'custom-flip': {
        href: "/page-flip",
        text: "Go to React Page Flip"
    },
    'page-flip': {
        href: "/",
        text: "Go to Custom Page Flip"
    },
} as const

const BookContainer = ({ children, variant }: BookContainerProps) => {
    return (
        <section className="flex flex-col gap-4 min-h-screen w-full items-center justify-center bg-linear-to-b from-background via-background to-muted/50 p-4">
            <Button asChild>
                <Link href={LINK_MAP[variant].href}>{LINK_MAP[variant].text}</Link>
            </Button>
            {children}
        </section>
    )
}

export default BookContainer