"use client"

import { useEffect, useRef, useState } from "react"

const noTexts = [
    "Are you sure?",
    "That didn't sound convincing 😏",
    "Try again",
    "You're cute when you're wrong",
    "Nice try 😌",
    "Wrong answer, babe",
]

interface FinalProposalProps {
    onAccept: () => void
}

const FinalProposal = ({ onAccept }: FinalProposalProps) => {
    const [noIndex, setNoIndex] = useState(0)
    const [yesScale, setYesScale] = useState(1)

    const noBtnRef = useRef<HTMLButtonElement | null>(null)
    const containerRef = useRef<HTMLDivElement | null>(null)

    const offsetRef = useRef({ x: 0, y: 0 })
    const rafRef = useRef<number | null>(null)
    const lastTextChange = useRef(0)

    // 💓 YES button growth
    useEffect(() => {
        const interval = setInterval(() => {
            setYesScale((prev) => Math.min(prev + 0.05, 1.4))
        }, 1200)

        return () => clearInterval(interval)
    }, [])

    // 💖 Heart burst
    const createHearts = () => {
        for (let i = 0; i < 14; i++) {
            const heart = document.createElement("div")
            heart.innerHTML = "💖"
            heart.style.position = "fixed"
            heart.style.left = "50%"
            heart.style.top = "50%"
            heart.style.fontSize = `${16 + Math.random() * 14}px`
            heart.style.pointerEvents = "none"
            heart.style.transform = "translate(-50%, -50%)"
            heart.style.animation = `floatUp 1s ease-out forwards`
            heart.style.zIndex = "9999"

            heart.style.marginLeft = `${(Math.random() - 0.5) * 120}px`
            heart.style.marginTop = `${(Math.random() - 0.5) * 80}px`

            document.body.appendChild(heart)
            setTimeout(() => heart.remove(), 1000)
        }
    }

    // 🧠 Smooth dodge using RAF
    const handleMouseMove = (e: React.MouseEvent) => {
        if (!noBtnRef.current) return

        if (rafRef.current) cancelAnimationFrame(rafRef.current)

        rafRef.current = requestAnimationFrame(() => {
            const rect = noBtnRef.current!.getBoundingClientRect()

            const centerX = rect.left + rect.width / 2
            const centerY = rect.top + rect.height / 2

            const dx = e.clientX - centerX
            const dy = e.clientY - centerY

            const distance = Math.sqrt(dx * dx + dy * dy)

            const trigger = 120

            if (distance < trigger) {
                const moveX = -dx * 0.6
                const moveY = -dy * 0.6

                const clampedX = Math.max(Math.min(moveX, 180), -180)
                const clampedY = Math.max(Math.min(moveY, 120), -120)

                offsetRef.current = { x: clampedX, y: clampedY }

                noBtnRef.current!.style.transform = `translate(${clampedX}px, ${clampedY}px)`

                // ⏱️ Limit text change frequency
                const now = Date.now()
                if (now - lastTextChange.current > 600) {
                    setNoIndex((prev) => (prev + 1) % noTexts.length)
                    lastTextChange.current = now
                }
            }
        })
    }

    // 🔄 Reset smoothly
    const handleMouseLeave = () => {
        if (!noBtnRef.current) return

        offsetRef.current = { x: 0, y: 0 }
        noBtnRef.current.style.transform = `translate(0px, 0px)`

        setNoIndex(0)
        setYesScale(1)
    }

    return (
        <div className="min-h-screen bg-romantic flex flex-col items-center justify-center px-6 relative overflow-hidden">

            {/* 🌌 Glow */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div
                    className="w-[700px] h-[700px] rounded-full animate-bg-glow blur-2xl"
                    style={{
                        background:
                            "radial-gradient(circle, hsl(270 60% 70% / 0.25), hsl(300 50% 75% / 0.1), transparent 70%)",
                    }}
                />
            </div>

            <div className="relative z-10 text-center max-w-md">

                {/* 💖 Image */}
                <div className="mb-8 flex justify-center">
                    <div className="relative w-52 h-52">

                        {/* Top Right Flower */}
                        <img
                            src="/lilac.png"
                            alt="flower"
                            className="absolute -top-6 -right-6 w-16 h-16 -rotate-30 z-20 opacity-70 pointer-events-none animate-pulse"
                        />

                        {/* Bottom Left Flower */}
                        <img
                            src="/lilac.png"
                            alt="flower"
                            className="absolute -bottom-6 -left-6 w-16 h-16 -rotate-12 z-20 opacity-70 pointer-events-none animate-pulse"
                        />

                        {/* Main Image */}
                        <div className="relative rounded-2xl overflow-hidden glow-lilac w-52 h-52 shadow-2xl">
                            <img
                                src="/emma.jpeg"
                                alt="For you"
                                className="w-full h-full object-cover"
                            />
                        </div>

                    </div>
                </div>

                <p className="text-lg text-lilac-soft mb-2">
                    So tell me something…
                </p>

                <h1 className="text-4xl md:text-5xl font-bold text-lilac mb-12">
                    Will you be mine?
                </h1>

                {/* 🎯 Buttons */}
                <div
                    ref={containerRef}
                    onMouseMove={handleMouseMove}
                    onMouseLeave={handleMouseLeave}
                    className="flex flex-col sm:flex-row items-center justify-center gap-6 mt-4"
                >
                    {/* YES */}
                    <button
                        onClick={() => {
                            createHearts()
                            onAccept()
                        }}
                        className="px-10 py-4 text-xl font-semibold rounded-2xl bg-primary text-primary-foreground transition-all duration-300 hover:scale-110 active:scale-95 shadow-xl"
                        style={{
                            transform: `scale(${yesScale})`,
                        }}
                    >
                        Yes 😌
                    </button>

                    {/* NO */}
                    <button
                        ref={noBtnRef}
                        className="px-8 py-3 text-lg rounded-2xl border border-border text-muted-foreground transition-all duration-300"
                        style={{
                            transition: "transform 0.25s ease-out",
                        }}
                    >
                        {noIndex === 0 ? "No 🙃" : noTexts[noIndex]}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default FinalProposal