"use client";

import { useEffect, useState } from "react";

const messages = [
    "You make my heart do stupid things 💜",
    "I smile like an idiot when I think about you 😌",
    "You're my favorite notification 📱",
    "I didn't plan this, but here we are ❤️",
    "You're the reason I check my phone too much 😏",
    "Being with you feels like coming home 🏠",
    "You make everything better just by existing 🌸",
    "I'd choose you in every universe 🌌",
    "My heart skips beats and it's your fault 💗",
    "You're the plot twist I never saw coming 🦋",
    "I miss you even when you're right here 🫶",
    "You're my 11:11 wish every single time ✨",
    "I never get tired of your face 😍",
    "You had me at hello… and every word after 💬",
    "I'd swipe right on you a thousand times 💜",
];

// floating hearts
const Hearts = () => {
    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {Array.from({ length: 12 }).map((_, i) => (
                <span
                    key={i}
                    className="absolute text-pink-300 opacity-40 animate-float-up"
                    style={{
                        left: `${Math.random() * 100}%`,
                        bottom: `-${Math.random() * 20}px`,
                        fontSize: `${12 + Math.random() * 20}px`,
                        animationDuration: `${6 + Math.random() * 6}s`,
                    }}
                >
                    💜
                </span>
            ))}
        </div>
    );
};

const Love = () => {
    const [message, setMessage] = useState("");
    const [displayText, setDisplayText] = useState("");
    const [visible, setVisible] = useState(false);
    const [typing, setTyping] = useState(false);
    const [pressed, setPressed] = useState(false);

    const typeMessage = (text: string) => {
        setDisplayText("");
        setTyping(true);
        setVisible(true);

        let i = 0;
        const interval = setInterval(() => {
            setDisplayText(text.slice(0, i + 1));
            i++;

            if (i === text.length) {
                clearInterval(interval);
                setTyping(false);
            }
        }, 35);
    };

    const showMessage = () => {
        const randomMsg =
            messages[Math.floor(Math.random() * messages.length)];

        setPressed(true);
        setMessage(randomMsg);

        setTimeout(() => {
            typeMessage(randomMsg);
        }, 150);

        setTimeout(() => setPressed(false), 300);
    };

    return (
        <div className="min-h-screen bg-romantic flex flex-col items-center justify-center px-6 relative overflow-hidden">
            {/* glow */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div
                    className="w-[600px] h-[600px] rounded-full animate-pulse-slow"
                    style={{
                        background:
                            "radial-gradient(circle, hsl(270 60% 70% / 0.15), transparent 70%)",
                    }}
                />
            </div>

            <Hearts />

            <div className="relative z-10 text-center max-w-md">
                {/* avatar */}
                <div className="mb-6 flex justify-center animate-fade-in-up">
                    <div className="relative w-28 h-28 rounded-full overflow-hidden ring-2 ring-primary/60 glow-lilac animate-float">
                        <img
                            src="/josh.jpg"
                            alt="Me"
                            className="w-full h-full object-cover"
                        />
                    </div>
                </div>

                <h2 className="text-2xl font-semibold text-lilac mb-2 animate-fade-in-up">
                    For You 💜
                </h2>

                <p className="text-muted-foreground text-sm mb-10 animate-fade-in-up-delay">
                    Tap this when you miss me
                </p>

                {/* button */}
                <button
                    onClick={showMessage}
                    className={`px-10 py-5 text-xl font-semibold rounded-2xl transition-all duration-300 mb-10
                        bg-primary text-primary-foreground glow-lilac
                        hover:scale-105 active:scale-95
                        ${pressed ? "opacity-70 scale-95" : ""}`}
                >
                    Give me love 💜
                </button>

                {/* message box */}
                {visible && (
                    <div className="mt-4 p-6 rounded-2xl bg-secondary/50 backdrop-blur-md border border-border transition-all duration-300">
                        <p className="text-xl text-lilac-soft font-medium min-h-[60px]">
                            {displayText}
                            <span className="animate-pulse">|</span>
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Love;