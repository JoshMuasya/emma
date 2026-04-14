"use client";

import { useEffect, useState } from "react";

interface ProposalScreenProps {
    step: number;
    onNext: () => void;
}

const screens = [
    {
        text: "Hey… don’t rush this 😌",
        subtext: "I’ve been trying to act normal around you… it’s honestly failing",
        animClass: "animate-fade-in-up",
        subAnimClass: "animate-fade-in-up-delay",
    },
    {
        text: "Because somehow…",
        subtext:
            "you became my favorite distraction… and I didn’t even notice when it happened",
        animClass: "animate-slide-right",
        subAnimClass: "animate-slide-right-delay",
    },
    {
        text: "Now I have a tiny problem…",
        subtext: "you’re on my mind way more than you should be 😏",
        animClass: "animate-scale-in",
        subAnimClass: "animate-scale-in-delay",
    },
    {
        text: "So let’s just be honest…",
        subtext: "I like you. Like… a lot more than I planned to 💜",
        animClass: "animate-slow-fade-up",
        subAnimClass: "animate-slow-fade-up-delay",
    },
];

const ProposalScreen = ({ step, onNext }: ProposalScreenProps) => {
    const [visible, setVisible] = useState(false);
    const [hearts, setHearts] = useState<{ id: number; x: number }[]>([]);

    const screen = screens[step];

    useEffect(() => {
        setVisible(false);
        const t = setTimeout(() => setVisible(true), 200); // smoother emotional pacing
        return () => clearTimeout(t);
    }, [step]);

    // optional soft background music
    useEffect(() => {
        const audio = new Audio("/romantic.mp3");
        audio.loop = true;
        audio.volume = 0.2;
        audio.play().catch(() => { });
    }, []);

    const handleClick = () => {
        const id = Date.now();
        const x = Math.random() * window.innerWidth;

        setHearts((prev) => [...prev, { id, x }]);
        onNext();

        setTimeout(() => {
            setHearts((prev) => prev.filter((h) => h.id !== id));
        }, 2000);
    };

    if (!screen) return null;

    return (
        <div
            className="min-h-screen bg-romantic flex flex-col items-center justify-center px-6 relative overflow-hidden cursor-pointer select-none"
            onClick={handleClick}
        >
            {/* Background image */}
            <div className="absolute inset-0 animate-image-fade-in">
                <img
                    src="/emma.jpeg"
                    alt=""
                    className="w-full h-full object-cover scale-110 blur-sm animate-subtle-zoom"
                />

                {/* dark + gradient overlay */}
                <div className="absolute inset-0 bg-background/50" />
                <div className="absolute inset-0 bg-gradient-to-br from-purple-900/40 via-black/50 to-pink-900/40" />
            </div>

            {/* glowing radial light */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div
                    className="w-[500px] h-[500px] rounded-full animate-bg-glow"
                    style={{
                        background:
                            "radial-gradient(circle, hsl(270 60% 70% / 0.15), transparent 70%)",
                    }}
                />
            </div>

            {/* floating hearts */}
            {hearts.map((heart) => (
                <span
                    key={heart.id}
                    className="absolute bottom-0 text-pink-400 text-xl animate-float-up pointer-events-none"
                    style={{ left: heart.x }}
                >
                    💜
                </span>
            ))}

            {/* text content */}
            {visible && (
                <div className="relative z-10 text-center max-w-md">
                    <h1
                        key={`title-${step}`}
                        className={`text-3xl md:text-4xl font-semibold text-lilac mb-4 ${screen.animClass} animate-breathe`}
                    >
                        {screen.text}
                    </h1>
                    <p
                        key={`sub-${step}`}
                        className={`text-lg md:text-xl text-lilac-soft ${screen.subAnimClass}`}
                    >
                        {screen.subtext}
                    </p>
                </div>
            )}

            {/* tap hint */}
            <div className="absolute bottom-10 text-muted-foreground text-sm animate-pulse">
                tap… but gently 💜
            </div>
        </div>
    );
};

export default ProposalScreen;