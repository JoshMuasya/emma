"use client";

import { useEffect, useReducer, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import ProposalScreen from "./ProposalScreen";
import FinalProposal from "./FinalProposal";
import SuccessScreen from "./SuccessScreen";
import Love from "./Love";

type Phase = "proposal" | "final" | "success" | "app";

type State = {
    phase: Phase;
    step: number;
    kiss: boolean;
};

type Action =
    | { type: "NEXT_STEP" }
    | { type: "ACCEPT" }
    | { type: "CONTINUE" }
    | { type: "KISS_DONE" }
    | { type: "HYDRATE_APP" };

const STORAGE_KEY = "lovedAccepted";

const initialState: State = {
    phase: "proposal",
    step: 0,
    kiss: false,
};

function reducer(state: State, action: Action): State {
    switch (action.type) {
        case "HYDRATE_APP":
            return { ...state, phase: "app" };

        case "NEXT_STEP":
            if (state.step < 3) {
                return { ...state, step: state.step + 1 };
            }
            return { ...state, phase: "final" };

        case "ACCEPT":
            return { ...state, phase: "success", kiss: false };

        case "CONTINUE":
            return { ...state, phase: "app" };

        case "KISS_DONE":
            return { ...state, kiss: false };

        default:
            return state;
    }
}

export default function LoveApp() {
    const [state, dispatch] = useReducer(reducer, initialState);

    // 💓 HEARTBEAT AUDIO
    const audioRef = useRef<HTMLAudioElement | null>(null);

    useEffect(() => {
        if (typeof window === "undefined") return;

        audioRef.current = new Audio("/sounds/heartbeat.mp3");
        audioRef.current.loop = true;
        audioRef.current.volume = 0.4;

        return () => {
            audioRef.current?.pause();
        };
    }, []);

    // 💖 CHECK IF SHE ALREADY SAID YES
    useEffect(() => {
        const accepted = localStorage.getItem(STORAGE_KEY);

        if (accepted === "true") {
            dispatch({ type: "HYDRATE_APP" });
        }
    }, []);

    // 💖 SAVE YES + AUTO LOCK FLOW
    useEffect(() => {
        if (state.phase === "success") {
            localStorage.setItem(STORAGE_KEY, "true");

            audioRef.current?.play().catch(() => { });

            // optional auto transition to app
            const t = setTimeout(() => {
                dispatch({ type: "CONTINUE" });
            }, 2500);

            return () => clearTimeout(t);
        } else {
            audioRef.current?.pause();
        }
    }, [state.phase]);

    // 💖 CURSOR HEART TRAIL
    const [hearts, setHearts] = useState<
        { id: number; x: number; y: number }[]
    >([]);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            const id = Date.now();

            setHearts((prev) => [
                ...prev.slice(-25),
                { id, x: e.clientX, y: e.clientY },
            ]);

            setTimeout(() => {
                setHearts((prev) => prev.filter((h) => h.id !== id));
            }, 800);
        };

        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, []);

    const renderPhase = () => {
        switch (state.phase) {
            case "proposal":
                return <ProposalScreen step={state.step} onNext={() => dispatch({ type: "NEXT_STEP" })} />;

            case "final":
                return <FinalProposal onAccept={() => dispatch({ type: "ACCEPT" })} />;

            case "success":
                return <SuccessScreen onContinue={() => dispatch({ type: "CONTINUE" })} />;

            case "app":
                return <Love />;
        }
    };

    return (
        <div className="relative min-h-screen overflow-hidden bg-black text-white">

            {/* 🌙 Romantic background */}
            <div className="absolute inset-0 bg-gradient-to-br from-pink-900/20 via-purple-900/30 to-black blur-3xl animate-pulse" />

            {/* 💖 Cursor hearts */}
            <div className="pointer-events-none fixed inset-0 z-50">
                {hearts.map((heart) => (
                    <motion.div
                        key={heart.id}
                        initial={{ opacity: 0.8, scale: 1 }}
                        animate={{ opacity: 0, scale: 0 }}
                        transition={{ duration: 0.8 }}
                        className="absolute text-pink-400 text-xl"
                        style={{
                            left: heart.x,
                            top: heart.y,
                            transform: "translate(-50%, -50%)",
                        }}
                    >
                        💖
                    </motion.div>
                ))}
            </div>

            {/* 💓 Heartbeat glow */}
            {state.phase === "success" && (
                <motion.div
                    className="absolute inset-0 flex items-center justify-center z-40 pointer-events-none"
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ repeat: Infinity, duration: 1.2 }}
                >
                    <div className="w-[400px] h-[400px] rounded-full bg-pink-500/10 blur-3xl" />
                </motion.div>
            )}

            {/* 🌹 Screen transitions */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={state.phase}
                    initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    exit={{ opacity: 0, y: -20, filter: "blur(10px)" }}
                    transition={{ duration: 0.6 }}
                    className="relative z-10"
                >
                    {renderPhase()}
                </motion.div>
            </AnimatePresence>
        </div>
    );
}