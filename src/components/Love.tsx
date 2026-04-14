"use client";

import { useEffect, useState } from "react";

const messages = [
    "Different time zones, same heartbeat… somehow we just work 💜",
    "While you're starting your day, I’m thinking about you ending mine 😌",
    "You're miles away but somehow the closest person to my heart 📱",
    "I didn’t plan to fall for someone so far away… but I’d do it again ❤️",
    "No matter the distance, you’re still my favorite place 😏",
    "Being with you, even through a screen, feels like home 🏠",
    "You make the distance feel smaller just by being you 🌸",
    "I'd cross every mile between Kenya and Canada just to hold you 🌌",
    "My heart doesn’t care about distance… it just chose you 💗",
    "You’re the best thing that ever came from a different time zone 🦋",
    "I miss you in ways I can’t even explain 🫶",
    "You're my wish… even across continents ✨",
    "Even through a screen, you still take my breath away 😍",
    "You didn’t just enter my life… you crossed oceans to change it 💬",
    "I'd still swipe right on you… even from another continent 💜",
    "You make the late nights and early mornings worth it 💖",
    "No distance could ever make me feel less for you 😌",
    "You're the reason I check my phone at the weirdest hours 😅",
    "You feel close even when you're thousands of miles away 💫",
    "Even silence with you on call feels perfect 🫶",
    "You’re not just far away… you’re deeply mine 💕",
    "Every message from you feels like a little piece of home 🌹",
    "You make love feel real, even from across the world ❤️",
    "You're the reason distance doesn’t scare me anymore 🎶",
    "I didn’t expect to find something this real so far away 💭",
    "You’ve got my heart traveling across time zones daily 💜",
    "If love had a location, mine would be wherever you are 📖",
    "You’re my peace… even from miles away 🌊",
    "No matter the distance, I’m always yours 💗",
    "One day, all this distance will just be a story we tell 💫",
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
    const [displayText, setDisplayText] = useState("");
    const [visible, setVisible] = useState(false);
    const [typing, setTyping] = useState(false);
    const [pressed, setPressed] = useState(false);

    const [clickCount, setClickCount] = useState(0);
    const [disabled, setDisabled] = useState(false);

    // get today's date key
    const getTodayKey = () => {
        const today = new Date();
        return today.toDateString(); // e.g. "Tue Apr 14 2026"
    };

    // load stored data
    useEffect(() => {
        const storedDate = localStorage.getItem("love_date");
        const storedCount = localStorage.getItem("love_count");

        const today = getTodayKey();

        if (storedDate === today) {
            const count = Number(storedCount) || 0;
            setClickCount(count);
            if (count >= 2) setDisabled(true);
        } else {
            // reset for new day
            localStorage.setItem("love_date", today);
            localStorage.setItem("love_count", "0");
            setClickCount(0);
            setDisabled(false);
        }
    }, []);

    const updateStorage = (count: number) => {
        localStorage.setItem("love_count", count.toString());
    };

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
        if (disabled) return;

        const randomMsg =
            messages[Math.floor(Math.random() * messages.length)];

        setPressed(true);

        setTimeout(() => {
            typeMessage(randomMsg);
        }, 150);

        setTimeout(() => setPressed(false), 300);

        const newCount = clickCount + 1;
        setClickCount(newCount);
        updateStorage(newCount);

        if (newCount >= 2) {
            setTimeout(() => {
                setDisabled(true);
                typeMessage(
                    "Okay… that’s enough love for today 😌💜\nCome back tomorrow, I miss you already."
                );
            }, 1200);
        }
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
                            src="/me.jpeg"
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
                    disabled={disabled}
                    className={`px-10 py-5 text-xl font-semibold rounded-2xl transition-all duration-300 mb-10
                        bg-primary text-primary-foreground glow-lilac
                        hover:scale-105 active:scale-95
                        ${pressed ? "opacity-70 scale-95" : ""}
                        ${disabled ? "opacity-40 cursor-not-allowed" : ""}`}
                >
                    {disabled ? "Come back tomorrow my Queen 💜" : "Give me love 💜"}
                </button>

                {/* message box */}
                {visible && (
                    <div className="mt-4 p-6 rounded-2xl bg-secondary/50 backdrop-blur-md border border-border transition-all duration-300">
                        <p className="text-xl text-lilac-soft font-medium min-h-[60px] whitespace-pre-line">
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