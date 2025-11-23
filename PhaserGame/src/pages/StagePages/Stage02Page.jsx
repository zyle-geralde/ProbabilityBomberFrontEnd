import React, { useState } from "react";
import HomeNavbar from "../../components/navbar/HomeNavbar";
import { Link,useNavigate } from "react-router-dom";
import StageLeaderboard from "../../components/stage-leaderboard/StageLeaderboard"

export default function Stage02Page() {

    const navigate = useNavigate()
    const [userScore, setUserScore] = useState(0)
    const [userRank, setUserRank] = useState("N/A")
    const stageNum = 2

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
                    src="/images/colored_balls.jpg"
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
                        <li className="text-white font-medium min-w-0">Stage 2</li>
                    </ol>

                    {/* Header */}
                    <div className="text-center">
                        <h1 className="!text-6xl text-center font-bold mb-2">Stage 2 - Mutually and Non-Mutually Exclusive Events</h1>
                        <p className="!mt-10 flex-col md:flex-row items-center justify-center gap-6 text-gray-200 text-lg">
                            Explore how mutually and non-mutually exclusive events affect one another and learn how to calculate their combined probabilities.
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
                                    In probability, events can be classified as {" "}
                                    <span className="font-semibold">Mutual</span> or {" "}
                                    <span className="font-semibold">Non Mutual</span>.
                                    In this stage, you will learn about mutually and non-mutually
                                    exclusive events in probability. Mutually exclusive events
                                    are those that cannot occur at the same time, while
                                    non-mutually exclusive events can happen together. Understanding
                                    the difference between these two types of events helps in
                                    identifying whether outcomes overlap or remain separate.
                                    This concept builds a deeper understanding of how
                                    probabilities combine and prepares you for analyzing
                                    more complex probability relationships in future lessons.
                                </p>
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-4 mt-4">Understanding the Probability Question in the Game</h3>
                            <img src = "/images/Stage2Understanding.png"></img>
                        </div>

                        {/* Stage */}
                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                            <h2 className="text-xl font-bold text-gray-900 mb-2">Challenge</h2>

                            <strong style={{ fontSize: "18px" }}>You need 6 points or more to pass this stage</strong>
                            
                            <span className="text-gray-400 text-sm italic " style={{display:"block"}}>
                                Note: You can retry as much as you want
                            </span>
                            

                            <div className="flex items-center justify-between mt-3 p-4 border rounded-lg">
                                <span className="text-gray-500 text-2xl">Score: {userScore} Rank: {userRank}</span>
                                <button className="bg-[#641B2E] text-white px-4 py-2 rounded-lg hover:bg-[#501423] transition" onClick={navigateToGame}>
                                    Start Game
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Right Column (Leaderboard) */}
                    <StageLeaderboard stageNumber={2} setUserScore={setUserScore} setUserRank={setUserRank}/>
                </div>
            </div>
        </>
    );
}
