"use client"
import { TSingleStory } from "@/types/story"
import Image from "next/image"
import React, { useRef, useState, useEffect } from "react"
import HTMLFlipBook from "react-pageflip"

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const FlipBook: any = HTMLFlipBook

const ReactPageFlip = ({ pages }: { pages: TSingleStory['pages'] }) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const bookRef = useRef<any>(null)
    const [dimensions, setDimensions] = useState({ width: 500, height: 700 })

    useEffect(() => {
        const updateDimensions = () => {
            const screenWidth = window.innerWidth
            const screenHeight = window.innerHeight

            let width = 500
            let height = 700

            if (screenWidth < 640) {
                width = Math.min(screenWidth * 0.85, 300)
                height = Math.min(screenHeight * 0.6, 450)
            }
            else if (screenWidth < 1024) {
                width = Math.min(screenWidth * 0.4, 400)
                height = Math.min(screenHeight * 0.7, 600)
            }
            else {
                width = Math.min(screenWidth * 0.35, 550)
                height = Math.min(screenHeight * 0.75, 750)
            }

            setDimensions({ width, height })
        }

        updateDimensions()
        window.addEventListener('resize', updateDimensions)
        return () => window.removeEventListener('resize', updateDimensions)
    }, [])

    return (
        <div className="flex flex-col items-center justify-center w-full gap-4 p-4">
            <FlipBook
                ref={bookRef}
                width={dimensions.width}
                height={dimensions.height}
                size="stretch"
                minWidth={280}
                maxWidth={600}
                minHeight={400}
                maxHeight={800}
                maxShadowOpacity={0.5}
                showCover={false}
                mobileScrollSupport={true}
                clickEventForward={true}
                usePortrait={true}
                startPage={0}
                drawShadow={true}
                flippingTime={400}
                useMouseEvents={true}
                swipeDistance={30}
                autoSize={true}
                className="shadow-2xl mx-auto"
            >
                {pages.flatMap((page, index) => [
                    <ImagePage
                        key={`${page.id}-image`}
                        imageUrl={page.imageUrl}
                        pageNumber={index + 1}
                    />,
                    <TextPage
                        key={`${page.id}-text`}
                        text={page.content}
                        pageNumber={index + 1}
                    />
                ])}
            </FlipBook>
        </div>
    )
}


interface RefProps {
    ref?: React.Ref<HTMLDivElement>
}
interface ImagePageProps extends RefProps {
    imageUrl: string
    pageNumber: number
}

const ImagePage = ({ imageUrl, pageNumber, ref }: ImagePageProps) => {
    return (
        <div
            ref={ref}
            className="w-full h-full relative overflow-hidden bg-muted shadow-lg"
            style={{
                boxShadow: 'inset -10px 0 20px -5px rgba(0,0,0,0.6)'
            }}
        >
            <Image
                src={imageUrl}
                alt={`Page ${pageNumber}`}
                fill
                sizes="(max-width: 640px) 300px, (max-width: 1024px) 400px, 550px"
                className="object-cover"
                priority={pageNumber <= 2}
            />
            <div
                className="absolute right-0 top-0 bottom-0 w-16 pointer-events-none"
                style={{
                    background: 'linear-gradient(to right, transparent 0%, rgba(0,0,0,0.05) 20%, rgba(0,0,0,0.15) 50%, rgba(0,0,0,0.3) 80%, rgba(0,0,0,0.5) 100%)'
                }}
            />
            <div
                className="absolute right-12 top-0 bottom-0 w-8 pointer-events-none opacity-40"
                style={{
                    background: 'linear-gradient(to right, transparent 0%, rgba(255,255,255,0.3) 50%, transparent 100%)'
                }}
            />
        </div>
    )
}


interface TextPageProps extends RefProps {
    text: string
    pageNumber: number
}

const TextPage = ({ text, pageNumber, ref }: TextPageProps) => {
    return (
        <div
            ref={ref}
            className="w-full h-full flex flex-col p-6 overflow-hidden shadow-lg bg-muted relative"
            style={{
                boxShadow: 'inset 10px 0 20px -5px rgba(0,0,0,0.6)'
            }}
        >
            <div
                className="absolute left-0 top-0 bottom-0 w-16 pointer-events-none"
                style={{
                    background: 'linear-gradient(to left, transparent 0%, rgba(0,0,0,0.05) 20%, rgba(0,0,0,0.15) 50%, rgba(0,0,0,0.3) 80%, rgba(0,0,0,0.5) 100%)'
                }}
            />
            {/* Highlight curve effect */}
            <div
                className="absolute left-12 top-0 bottom-0 w-8 pointer-events-none opacity-40"
                style={{
                    background: 'linear-gradient(to left, transparent 0%, rgba(255,255,255,0.3) 50%, transparent 100%)'
                }}
            />
            <div className="flex-1 overflow-hidden pr-2 text-center flex items-center justify-center h-full -mb-10">
                <p className="text-[clamp(12px,4vw,30px)] transform-[translateZ(0)] text-justify
                        font-head leading-relaxed whitespace-pre-line
                        antialiased backface-hidden first-letter:text-5xl first-letter:font-bold first-letter:mr-1 ">
                    {text}
                </p>
            </div>
            <div className="mt-4 pt-3 text-center text-sm text-popover-foreground border-t border-popover-foreground">
                {pageNumber}
            </div>
        </div>
    )
}

export default ReactPageFlip
