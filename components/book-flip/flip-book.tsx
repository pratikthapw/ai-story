"use client"

import clsx from "clsx"
import React from "react"
import Image from "next/image"

export interface BookFlipProps {
    pages: {
        id: number
        pageNumber: number
        content: string
        imageUrl: string
    }[]
    className?: string
    initialIndex?: number
    ariaLabel?: string
    onPageChange?: (index: number) => void
}

export const BookFlip: React.FC<BookFlipProps> = ({
    pages,
    className,
    initialIndex = 0,
    ariaLabel = "Flip book",
    onPageChange,
}) => {
    const total = pages.length

    const [index, setIndex] = React.useState(() =>
        Math.min(initialIndex, Math.max(0, total - 1))
    )

    const [leftImageIndex, setLeftImageIndex] = React.useState(() => {
        const initial = Math.min(initialIndex, Math.max(0, total - 1))
        return initial
    })

    React.useEffect(() => {
        if (index > total - 1) {
            setIndex(Math.max(0, total - 1))
        }
    }, [total, index])

    React.useEffect(() => {
        const timer = setTimeout(() => {
            setLeftImageIndex(index)
        }, 600)

        return () => clearTimeout(timer)
    }, [index])

    const canPrev = index > 0
    const canNext = index < total - 1

    const goPrev = React.useCallback(() => {
        if (!canPrev) return
        setIndex((i) => Math.max(0, i - 1))
    }, [canPrev])

    const goNext = React.useCallback(() => {
        if (!canNext) return
        setIndex((i) => Math.min(total - 1, i + 1))
    }, [canNext, total])

    React.useEffect(() => {
        onPageChange?.(index)
    }, [onPageChange, index])

    const onKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
        if (e.key === "ArrowRight") {
            e.preventDefault()
            goNext()
        } else if (e.key === "ArrowLeft") {
            e.preventDefault()
            goPrev()
        }
    }

    return (
        <div className={clsx("flex w-full items-center justify-center", className)}>
            <div
                role="region"
                aria-label={ariaLabel}
                tabIndex={0}
                onKeyDown={onKeyDown}
                className={clsx(
                    `relative aspect-[68/42.6] w-full max-w-[900px]
          shadow-[0_0_80px_rgba(0,0,0,0.25)]`,
                    "bg-background"
                )}
            >
                <div
                    className="pointer-events-none absolute top-0 bottom-0 left-0 w-1/2"
                >
                    <div
                        className="absolute top-[3px] right-0 bottom-[3px] left-[3px]
              border-t border-b border-l border-border/40 bg-background"
                        style={{ transform: "translateX(-10px)", zIndex: 1 }}
                    />
                    <div
                        className="absolute top-1.5 right-0 bottom-1.5 left-1.5
              border-t border-b border-l border-border/30 bg-background"
                        style={{ transform: "translateX(-20px)", zIndex: 0 }}
                    />
                    <div
                        className="absolute top-[9px] right-0 bottom-[9px] left-[9px]
              border-t border-b border-l border-border/20 bg-background"
                        style={{ transform: "translateX(-30px)", zIndex: -1 }}
                    />
                </div>

                <div
                    className="pointer-events-none absolute top-0 right-0 bottom-0 w-1/2"
                >
                    <div
                        className="absolute top-[3px] right-[3px] bottom-[3px] left-0
              border-t border-r border-b border-border/40 bg-background"
                        style={{ transform: "translateX(10px)", zIndex: 1 }}
                    />
                    <div
                        className="absolute top-[6px] right-[6px] bottom-[6px] left-0
              border-t border-r border-b border-border/30 bg-background"
                        style={{ transform: "translateX(20px)", zIndex: 0 }}
                    />
                    <div
                        className="absolute top-[9px] right-[9px] bottom-[9px] left-0
              border-t border-r border-b border-border/20 bg-background"
                        style={{ transform: "translateX(30px)", zIndex: -1 }}
                    />
                </div>

                <div
                    className="pointer-events-none absolute top-0 bottom-0 left-1/2"
                    style={{ zIndex: 15 }}
                >
                    <div
                        className="absolute top-0 bottom-0 w-3"
                        style={{
                            left: "-1.5px",
                            background:
                                "linear-gradient(to right, rgba(0,0,0,0.15), transparent)",
                        }}
                    />
                    <div
                        className="absolute top-0 bottom-0 w-3"
                        style={{
                            right: "-1.5px",
                            background:
                                "linear-gradient(to left, rgba(0,0,0,0.15), transparent)",
                        }}
                    />
                    <div
                        className="absolute top-0 bottom-0 w-px bg-border/30"
                        style={{ left: "-0.5px" }}
                    />
                </div>

                <div
                    className="absolute inset-0 flex [perspective:1600px]"
                    style={{ zIndex: 10 }}
                >
                    <div
                        className="relative h-full w-1/2 cursor-pointer overflow-hidden"
                        onClick={goPrev}
                    >
                        {pages[leftImageIndex]?.imageUrl ? (
                            <Image
                                src={pages[leftImageIndex].imageUrl}
                                alt={`Page ${pages[leftImageIndex].pageNumber} image`}
                                fill
                                sizes="(max-width: 768px) 50vw, 450px"
                                className="object-cover"
                                priority={Math.abs(leftImageIndex - index) <= 1}
                                loading={
                                    Math.abs(leftImageIndex - index) <= 2 ? "eager" : "lazy"
                                }
                            />
                        ) : (
                            <span
                                className="flex h-full w-full items-center justify-center
                  text-muted-foreground"
                            >
                                No Image
                            </span>
                        )}
                    </div>

                    {pages.map((p, idx) => {
                        const flipped = idx < index
                        const isActive = idx === index
                        const z = 100 - idx

                        return (
                            <div
                                key={p.id}
                                aria-hidden={!isActive}
                                className={clsx(
                                    "absolute right-0 h-full w-1/2",
                                    "transform-3d",
                                    "bg-background",
                                    `transition-transform duration-900
                  [transition-timing-function:cubic-bezier(0.645,0.045,0.355,1)]`,
                                    flipped
                                        ? "[transform-origin:left] [transform:rotateY(-180deg)]"
                                        : "[transform-origin:left] [transform:rotateY(0deg)]",
                                    "select-none",
                                    "before:absolute before:top-0 before:bottom-0 before:left-0",
                                    "before:pointer-events-none before:z-[25] before:w-[6px]",
                                    `before:bg-gradient-to-r before:from-gray-200/80
                  before:via-gray-100/50 before:to-transparent`,
                                    `before:opacity-0 before:transition-opacity
                  before:duration-[900ms]`,
                                    isActive && !flipped ? "before:opacity-100" : ""
                                )}
                                style={{
                                    zIndex: z,
                                    boxShadow:
                                        isActive && !flipped
                                            ? "0 5px 20px rgba(0,0,0,0.3)"
                                            : "none",
                                }}
                            >
                                <div
                                    className="absolute inset-0
                    [transform:rotateY(0deg)_translateZ(1px)]
                    [backface-visibility:hidden]"
                                    onClick={goNext}
                                >
                                    <div
                                        className="relative flex h-full items-center justify-center
                      px-6 pt-8 pb-10 text-xl select-none sm:px-8"
                                    >
                                        <div
                                            className="[transform:translateZ(0)] text-justify
                        font-head text-xl leading-relaxed whitespace-pre-line
                        antialiased [backface-visibility:hidden]"
                                        >
                                            {p.content}
                                        </div>
                                        <div
                                            aria-hidden
                                            className="absolute right-0 bottom-3 left-0 text-center
                        font-serif text-sm"
                                        >
                                            {p.pageNumber}
                                        </div>
                                    </div>
                                </div>

                                <div
                                    className="absolute inset-0
                    [transform:rotateY(180deg)_translateZ(0px)]
                    [backface-visibility:hidden]"
                                    onClick={goPrev}
                                >
                                    <div className="relative h-full text-center select-none">
                                        {pages[leftImageIndex]?.imageUrl ? (
                                            <Image
                                                src={pages[leftImageIndex]?.imageUrl}
                                                alt={`Page ${p.pageNumber} image`}
                                                fill
                                                sizes="(max-width: 768px) 50vw, 450px"
                                                className="object-cover"
                                                priority={Math.abs(idx - index) <= 1}
                                                loading={Math.abs(idx - index) <= 2 ? "eager" : "lazy"}
                                            />
                                        ) : (
                                            <span
                                                className="flex h-full w-full items-center
                          justify-center text-muted-foreground"
                                            >
                                                No Image
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default BookFlip
