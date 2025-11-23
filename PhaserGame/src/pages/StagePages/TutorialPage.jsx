import React from "react";
import HomeNavbar from "../../components/navbar/HomeNavbar";
import { Link } from "react-router-dom";

export default function TutorialPage() {
    return (
        <>
            <HomeNavbar />

            {/* Breadcrumb + Header Container with background */}
            <div className="relative min-h-[300px] text-white overflow-hidden">
                {/* Background overlay (gradient) */}
                <div className="absolute inset-0 bg-gradient-to-b from-rose-300 to-[#641B2E] opacity-80"></div>

                {/* Background image */}
                <img
                    src="/images/tutorial.png"
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
                        <li className="text-white font-medium min-w-0">Tutorial</li>
                    </ol>

                    {/* Header */}
                    <div className="text-center">
                        <h1 className="!text-6xl text-center font-bold mb-2">Tutorial</h1>
                        <p className="!mt-10 flex-col md:flex-row items-center justify-center gap-6 text-gray-200 text-lg">
                            Learn the basics of the game here. This tutorial will walk you through
                            movement, interactions, and scoring so you’re ready for the main stages.
                        </p>
                    </div>
                </div>
            </div>


            {/* Main Grid */}
            <div className="max-w-7xl mx-auto py-4 px-4 lg:px-8 pb-12">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Left Column */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Information */}
                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                            <h2 className="text-xl font-bold text-gray-900 mb-4">
                                Information
                            </h2>
                            <div className="h-auto px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg flex items-center justify-center text-gray-700 leading-relaxed">
                                This tutorial will guide you through the basic game mechanics. You will
                                learn how to move, interact, and complete simple tasks.
                            </div>
                        </div>

                        {/* Stage */}
                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                            <h2 className="text-xl font-bold text-gray-900 mb-2">Movement</h2>

                            <span className="text-black-500 text-sm italic " style={{ "display": "block" }}>
                                Click <strong>Up Arrow key</strong> to move upwards
                            </span>
                            <span className="text-black-500 text-sm italic " style={{ "display": "block" }}>
                                Click <strong>Down Arrow key</strong> to move downwards
                            </span>
                            <span className="text-black-500 text-sm italic " style={{ "display": "block" }}>
                                Click <strong>Right Arrow key</strong> to move to the right
                            </span>
                            <span className="text-black-500 text-sm italic " style={{ "display": "block" }}>
                                Click <strong>Left Arrow key</strong> to move to the left
                            </span>


                            <div className="flex items-center justify-between mt-3 p-4 border rounded-lg">
                                <video
                                    src="/videos/UpDownMovement.mp4"
                                    controls
                                    className="rounded-lg w-full h-auto"
                                />
                            </div>


                        </div>

                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                            <h2 className="text-xl font-bold text-gray-900 mb-2">Bomb Placement</h2>

                            <span className="text-black-500 text-sm italic " style={{ "display": "block" }}>
                                Press <strong>A key</strong> to drop bombs. You can drop a <strong>maximum of 2 bombs at a time</strong>.
                            </span>
                            <span className="text-black-500 text-sm italic" style={{ display: "block" }}>
                                Enemies will <strong>disappear</strong> when hit by an explosion.
                            </span>
                            <span className="text-black-500 text-sm italic" style={{ display: "block" }}>
                                Breakable walls will <strong>break</strong> when hit by an explosion, revealing the probability answer.
                            </span>



                            <div className="flex items-center justify-between mt-3 p-4 border rounded-lg">
                                <video
                                    src="/videos/BombPlacement.mp4"
                                    controls
                                    className="rounded-lg w-full h-auto"
                                />
                            </div>


                        </div>

                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                            <h2 className="text-xl font-bold text-gray-900 mb-2">Player hit</h2>

                            <span className="text-black-500 text-sm italic " style={{ "display": "block" }}>
                                Player's health <strong>decreases</strong> when they are hit by an <strong>explosion or an enemy</strong>.
                            </span>
                            <span className="text-black-500 text-sm italic " style={{ "display": "block" }}>
                                Once hit, the player becomes <strong>immune for 3 seconds</strong> before they can be hit again.
                            </span>
                            <span className="text-black-500 text-sm italic " style={{ "display": "block" }}>
                                Game will end when player's life reaches <strong>0</strong>.
                            </span>


                            <div className="flex items-center justify-between mt-3 p-4 border rounded-lg">
                                <video
                                    src="/videos/PlayerHit.mp4"
                                    controls
                                    className="rounded-lg w-full h-auto"
                                />
                            </div>


                        </div>

                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                            <h2 className="text-xl font-bold text-gray-900 mb-2">Item Collection</h2>

                            <span className="text-black-500 text-sm italic " style={{ "display": "block" }}>
                                Collect items by <strong>running through them</strong>.
                            </span>
                            <span className="text-black-500 text-sm italic " style={{ "display": "block" }}>
                                <strong>Heart Item</strong> increases life.
                            </span>
                            <span className="text-black-500 text-sm italic " style={{ "display": "block" }}>
                                <strong>Boots Item</strong> increases speed.
                            </span>
                            <span className="text-black-500 text-sm italic " style={{ "display": "block" }}>
                                <strong>Shield Item</strong> grants immunity.
                            </span>
                            <span className="text-black-500 text-sm italic " style={{ "display": "block" }}>
                                <strong>ExplosionItem</strong> grants immunity.
                            </span>


                            <div className="flex items-center justify-between mt-3 p-4 border rounded-lg">
                                <video
                                    src="/videos/ItemCollection.mp4"
                                    controls
                                    className="rounded-lg w-full h-auto"
                                />
                            </div>


                        </div>

                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                            <h2 className="text-xl font-bold text-gray-900 mb-2">Probability Collection</h2>

                            <span className="text-black-500 text-sm italic" style={{ display: "block" }}>
                                Press <strong>S key</strong> to collect numbers.
                            </span>
                            <span className="text-black-500 text-sm italic" style={{ display: "block" }}>
                                Press <strong>X key</strong> to reset your answer.
                            </span>
                            <span className="text-black-500 text-sm italic" style={{ display: "block" }}>
                                The numbers you collect will appear on the <strong>banner</strong> at the top.
                            </span>
                            <span className="text-black-500 text-sm italic" style={{ display: "block" }}>
                                The banner text turns <strong>green</strong> for a correct answer and <strong>red</strong> for an incorrect one.
                            </span>
                            <span className="text-black-500 text-sm italic" style={{ display: "block" }}>
                                You’ll earn <strong>points</strong> for each correct answer.
                            </span>



                            <div className="flex items-center justify-between mt-3 p-4 border rounded-lg">
                                <video
                                    src="/videos/ProbabilityCollection.mp4"
                                    controls
                                    className="rounded-lg w-full h-auto"
                                />
                            </div>


                        </div>



                    </div>
                    {/* Right Column - Placeholder for future content */}
                </div>
            </div>
        </>
    );
}
