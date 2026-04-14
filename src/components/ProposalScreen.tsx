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
        image: "/emma.jpeg",
        animClass: "animate-fade-in-up",
        subAnimClass: "animate-fade-in-up-delay",
    },
    {
        text: "Because somehow…",
        subtext:
            "you became my favorite distraction… and I didn’t even notice when it happened",
        image: "/emma2.jpeg",
        animClass: "animate-slide-right",
        subAnimClass: "animate-slide-right-delay",
    },
    {
        text: "Now I have a tiny problem…",
        subtext: "you’re on my mind way more than you should be 😏",
        image: "/emma3.jpeg",
        animClass: "animate-scale-in",
        subAnimClass: "animate-scale-in-delay",
    },
    {
        text: "So let’s just be honest…",
        subtext: "I like you. Like… a lot more than I planned to 💜",
        image: "/emma4.jpeg",
        animClass: "animate-slow-fade-up",
        subAnimClass: "animate-slow-fade-up-delay",
    },
];

const ProposalScreen = ({ step, onNext }: ProposalScreenProps) => {
    const [visible, setVisible] = useState(false);
    const [canClick, setCanClick] = useState(false);
    const [isTransitioning, setIsTransitioning] = useState(false);
    const [hearts, setHearts] = useState<{ id: number; x: number }[]>([]);
    const [beat, setBeat] = useState(false);

    const [currentImage, setCurrentImage] = useState(screens[0].image);
    const [nextImage, setNextImage] = useState<string | null>(null);

    const screen = screens[step];

    // visibility + pacing
    useEffect(() => {
        setVisible(false);
        setCanClick(false);

        const showTimer = setTimeout(() => setVisible(true), 400);
        const clickTimer = setTimeout(() => setCanClick(true), 2200);

        return () => {
            clearTimeout(showTimer);
            clearTimeout(clickTimer);
        };
    }, [step]);

    // 💓 heartbeat
    useEffect(() => {
        const interval = setInterval(() => {
            setBeat((prev) => !prev);
        }, 1000);
        return () => clearInterval(interval);
    }, [step]);

    // 🎬 background crossfade logic
    useEffect(() => {
        if (!screen) return;

        setNextImage(screen.image);

        const t = setTimeout(() => {
            setCurrentImage(screen.image);
            setNextImage(null);
        }, 800); // match transition duration

        return () => clearTimeout(t);
    }, [step]);

    // music
    useEffect(() => {
        const audio = new Audio("/romantic.mp3");
        audio.loop = true;
        audio.volume = 0.2;
        audio.play().catch(() => { });
    }, []);

    const handleClick = () => {
        if (!canClick || isTransitioning) return;

        setIsTransitioning(true);

        const id = Date.now();
        const x = Math.random() * window.innerWidth;

        setHearts((prev) => [...prev, { id, x }]);

        setTimeout(() => {
            onNext();
            setIsTransitioning(false);
        }, 800);

        setTimeout(() => {
            setHearts((prev) => prev.filter((h) => h.id !== id));
        }, 2000);
    };

    if (!screen) return null;

    return (
        <div
            className="min-h-screen flex flex-col items-center justify-center px-6 relative overflow-hidden cursor-pointer select-none"
            onClick={handleClick}
        >
            {/* 🎬 Background Crossfade */}
            <div className="absolute inset-0">
                {/* current */}
                <img
                    src={currentImage}
                    className="absolute inset-0 w-full h-full object-cover scale-110 blur-sm transition-opacity duration-700 opacity-100"
                />

                {/* next */}
                {nextImage && (
                    <img
                        src={nextImage}
                        className="absolute inset-0 w-full h-full object-cover scale-110 blur-sm transition-opacity duration-700 opacity-100 animate-fade-in"
                    />
                )}

                {/* overlays */}
                <div className="absolute inset-0 bg-background/50" />
                <div className="absolute inset-0 bg-gradient-to-br from-purple-900/40 via-black/50 to-pink-900/40" />
            </div>

            {/* 💓 heartbeat glow */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div
                    className={`w-[500px] h-[500px] rounded-full transition-transform duration-700 ${beat ? "scale-105 opacity-80" : "scale-95 opacity-60"
                        }`}
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

            {/* text */}
            {visible && (
                <div
                    className={`relative z-10 text-center max-w-md transition-all duration-700 ${isTransitioning
                        ? "opacity-0 translate-y-4 scale-95"
                        : "opacity-100 translate-y-0 scale-100"
                        }`}
                >
                    <h1
                        key={`title-${step}`}
                        className={`text-3xl md:text-4xl font-semibold text-lilac mb-4 ${screen.animClass
                            } transition-transform duration-700 ${beat ? "scale-[1.03]" : "scale-100"
                            }`}
                    >
                        {screen.text}
                    </h1>

                    <p
                        key={`sub-${step}`}
                        className={`text-lg md:text-xl text-lilac-soft ${screen.subAnimClass
                            } transition-opacity duration-700 ${beat ? "opacity-100" : "opacity-80"
                            }`}
                    >
                        {screen.subtext}
                    </p>
                </div>
            )}

            {/* flowers */}
            <img
                src="/lilac.png"
                className="z-20 absolute bottom-0 left-0 w-32 -rotate-12 pointer-events-none"
            />
            <img
                src="/lilac.png"
                className="z-20 absolute top-0 right-0 w-28 rotate-12 scale-x-[-1] pointer-events-none"
            />

            {/* hint */}
            <div className="absolute bottom-10 text-muted-foreground text-sm">
                {!canClick ? "wait for it… 💜" : "tap gently 💜"}
            </div>
        </div>
    );
};

export default ProposalScreen;