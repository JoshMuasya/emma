"use client";

import { useCallback, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface SuccessScreenProps {
    onContinue: () => void;
}

const hearts = Array.from({ length: 18 });

const SuccessScreen = ({ onContinue }: SuccessScreenProps) => {
    const [showContinue, setShowContinue] = useState(false);
    const [isExiting, setIsExiting] = useState(false);

    useEffect(() => {
        const t = setTimeout(() => setShowContinue(true), 2500);
        return () => clearTimeout(t);
    }, []);

    const handleContinue = useCallback(() => {
        if (isExiting) return;

        setIsExiting(true);

        // allow cinematic exit before navigating
        setTimeout(() => {
            onContinue();
        }, 900);
    }, [onContinue, isExiting]);

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{
                    opacity: 1,
                    scale: isExiting ? 1.08 : 1,
                    filter: isExiting ? "blur(10px)" : "blur(0px)",
                }}
                exit={{ opacity: 0, scale: 1.1 }}
                transition={{ duration: 0.8 }}
                className="min-h-screen bg-romantic flex flex-col items-center justify-center px-6 relative overflow-hidden"
                onClick={handleContinue}
            >
                {/* 🌑 Romantic vignette overlay */}
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute inset-0 bg-black/20" />

                    <div
                        className="absolute inset-0"
                        style={{
                            background:
                                "radial-gradient(circle at center, rgba(0,0,0,0) 40%, rgba(0,0,0,0.65) 100%)",
                        }}
                    />
                </div>

                {/* 💋 Kiss zoom glow */}
                <motion.div
                    className="absolute inset-0 flex items-center justify-center pointer-events-none"
                    animate={{
                        scale: isExiting ? 1.3 : [1, 1.05, 1],
                    }}
                    transition={{
                        duration: isExiting ? 0.8 : 6,
                        repeat: isExiting ? 0 : Infinity,
                    }}
                >
                    <div
                        className="w-[700px] h-[700px] rounded-full"
                        style={{
                            background:
                                "radial-gradient(circle, hsl(340 70% 65% / 0.25), hsl(270 60% 70% / 0.1), transparent 70%)",
                        }}
                    />
                </motion.div>

                {/* 💓 Floating hearts */}
                <div className="absolute inset-0 pointer-events-none">
                    {hearts.map((_, i) => (
                        <motion.div
                            key={i}
                            className="absolute text-pink-300 text-xl"
                            initial={{
                                y: "100vh",
                                x: Math.random() * 100 + "%",
                                opacity: 0,
                                scale: 0.5,
                            }}
                            animate={{
                                y: "-10vh",
                                opacity: [0, 1, 0],
                                scale: [0.5, 1, 0.8],
                            }}
                            transition={{
                                duration: 6 + Math.random() * 4,
                                repeat: Infinity,
                                delay: Math.random() * 5,
                                ease: "easeInOut",
                            }}
                        >
                            ❤️
                        </motion.div>
                    ))}
                </div>

                {/* 💖 Main content */}
                <div className="relative z-10 text-center space-y-5">
                    <motion.div
                        animate={{
                            scale: isExiting ? 1.4 : [1, 1.08, 1],
                        }}
                        transition={{
                            duration: isExiting ? 0.8 : 2,
                            repeat: isExiting ? 0 : Infinity,
                        }}
                        className="text-6xl"
                    >
                        💋
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="text-3xl md:text-4xl font-bold text-lilac"
                    >
                        I knew it… come here ❤️
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.9 }}
                        className="text-sm text-muted-foreground"
                    >
                        Everything fades except this moment ✨
                    </motion.p>
                </div>

                {/* 👇 Continue hint */}
                <AnimatePresence>
                    {showContinue && !isExiting && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                            className="absolute bottom-10 text-sm text-muted-foreground"
                        >
                            tap anywhere for a kiss 💋
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>
        </AnimatePresence>
    );
};

export default SuccessScreen;