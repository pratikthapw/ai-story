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

            // Mobile devices
            if (screenWidth < 640) {
                width = Math.min(screenWidth * 0.85, 300)
                height = Math.min(screenHeight * 0.6, 450)
            }
            // Tablets
            else if (screenWidth < 1024) {
                width = Math.min(screenWidth * 0.4, 400)
                height = Math.min(screenHeight * 0.7, 600)
            }
            // Desktop
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
                flippingTime={1000}
                useMouseEvents={true}
                swipeDistance={30}
                autoSize={true}
                className="shadow-2xl"
                style={{ margin: '0 auto' }}
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

// Image Page - Left page with full cover image
// Using React.forwardRef as required by the library
interface ImagePageProps {
    imageUrl: string
    pageNumber: number
}

const ImagePage = React.forwardRef<HTMLDivElement, ImagePageProps>(
    ({ imageUrl, pageNumber }, ref) => {
        return (
            <div
                ref={ref}
                className="bg-gray-100 shadow-lg"
                style={{
                    width: '100%',
                    height: '100%',
                    position: 'relative',
                    overflow: 'hidden',
                }}
            >
                <Image
                    src={imageUrl}
                    alt={`Page ${pageNumber}`}
                    fill
                    sizes="(max-width: 640px) 300px, (max-width: 1024px) 400px, 550px"
                    style={{
                        objectFit: 'cover',
                    }}
                    priority={pageNumber <= 2}
                />
            </div>
        )
    }
)

ImagePage.displayName = 'ImagePage'

// Text Page - Right page with content
interface TextPageProps {
    text: string
    pageNumber: number
}

const TextPage = React.forwardRef<HTMLDivElement, TextPageProps>(
    ({ text, pageNumber }, ref) => {
        return (
            <div
                ref={ref}
                className="bg-white shadow-lg"
                style={{
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    padding: '24px',
                    overflow: 'auto',
                }}
            >
                <div style={{ flex: '1', overflow: 'auto' }}>
                    <p
                        style={{
                            fontSize: 'clamp(12px, 2.5vw, 16px)',
                            lineHeight: '1.7',
                            color: '#1a1a1a',
                            margin: 0,
                            fontFamily: 'Georgia, "Times New Roman", serif',
                            textAlign: 'justify',
                        }}
                    >
                        {text}
                    </p>
                </div>
                <div
                    style={{
                        marginTop: '16px',
                        paddingTop: '12px',
                        textAlign: 'center',
                        fontSize: '12px',
                        color: '#999',
                        borderTop: '1px solid #e5e5e5',
                    }}
                >
                    {pageNumber}
                </div>
            </div>
        )
    }
)

TextPage.displayName = 'TextPage'

export default ReactPageFlip