import React from "react";
import HomeNavbar from "../../components/navbar/HomeNavbar";
import { Link,useNavigate } from "react-router-dom";
import StageLeaderboard from "../../components/stage-leaderboard/StageLeaderboard"

export default function Stage03Page() {

    const navigate = useNavigate()
    const stageNum = 3

    //Navigating to different stage
    const navigateToGame = () => {
        navigate("/PhaserGame", { state: { stageNum } })
    }
    return (
        <>
            <HomeNavbar />

            {/* Breadcrumb + Header Container with background */}
            <div className="relative min-h-[300px] text-white overflow-hidden">
                {/* Background overlay (gradient) */}
                <div className="absolute inset-0 bg-gradient-to-b from-rose-300 to-[#641B2E] opacity-80"></div>

                {/* Background image */}
                <img
                    src="/images/candy.jpg"
                    alt="Stage Background"
                    className="absolute inset-0 w-full h-full object-cover opacity-30"
                    onError={(e) => (e.currentTarget.style.display = "none")}
                />

                {/* Content */}
                <div className="relative z-20 max-w-7xl mx-auto px-4 lg:px-8 py-16">
                    {/* Breadcrumb */}
                    <ol className="flex items-center space-x-2 text-sm mb-4">
                        <li>
                            <Link to="/lessonPage" className="text-white hover:text-gray-200 font-medium">
                                Homepage
                            </Link>
                        </li>
                        <li className="text-white">/</li>
                        <li className="text-white font-medium min-w-0">Stage 3</li>
                    </ol>

                    {/* Header */}
                    <div className="text-center">
                        <h1 className="!text-6xl text-center font-bold mb-2">Stage 3 - Bayes’ Theorem</h1>
                        <p className="!mt-10 flex-col md:flex-row items-center justify-center gap-6 text-gray-200 text-lg">
                            Understand how to update probabilities when new information becomes available.
                        </p>
                    </div>
                </div>
            </div>


            {/* Main Grid */}
            <div className="max-w-7xl mx-auto py-4 px-4 lg:px-8 pb-12">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Information */}
                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                            <h2 className="text-xl font-bold text-gray-900 mb-4">
                                Information
                            </h2>
                            <div className="h-auto px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg flex items-center justify-center text-gray-700 leading-relaxed">
                                <p>
                                    Bayes’ Theorem is a powerful tool in probability that
                                    allows us to calculate the probability of an event based
                                    on prior knowledge of related conditions. It connects{" "}
                                    <span className="font-semibold">prior probabilities</span>{" "}
                                    (what we know before seeing data) with{" "}
                                    <span className="font-semibold">conditional
                                        probabilities</span> (how likely outcomes are given new
                                    evidence). For example, it can be used in medical
                                    testing, spam filtering, and risk assessment. In this
                                    stage, you will learn how to apply Bayes’ Theorem to
                                    update beliefs when new information is introduced.
                                </p>
                            </div>
                        </div>

                        {/* Stage */}
                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                            <h2 className="text-xl font-bold text-gray-900 mb-2">Challenge</h2>

                            <span className="text-gray-400 text-sm italic ">
                                Note: You can retry as much as you want
                            </span>

                            <div className="flex items-center justify-between mt-3 p-4 border rounded-lg">
                                <span className="text-gray-500 text-2xl">Score: 0</span>
                                <button className="bg-[#641B2E] text-white px-4 py-2 rounded-lg hover:bg-[#501423] transition" onClick={navigateToGame}>
                                    Start Game
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Right Column (Leaderboard) */}
                    <StageLeaderboard stageNumber={3} />
                </div>
            </div>
        </>
    );
}
