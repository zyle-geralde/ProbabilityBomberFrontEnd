import './LessonPage.css';
import './LessonSelector.css';

import HomeNavbar from '../../components/navbar/HomeNavbar';
import LessonCard from "../../components/lesson-card/LessonCard";
import { getAUserStageInformation } from '../../hooks/UseStageInfo';
import React, { useState, useEffect } from "react";

function LessonPage() {
  const [userStageInfo, setUserStageInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  const isStageCompleted = (stageNum) => {
    const dataArray = userStageInfo?.userStageData || userStageInfo;

    if (!Array.isArray(dataArray)) {
      return false;
    }

    return dataArray.some(
      (entry) => entry.stageNumber === stageNum && entry.numberOfStars >= 1
    );
  };


  useEffect(() => {
    const fetchUserAchievements = async () => {
      try {
        setLoading(true);
        const data = await getAUserStageInformation();
        
        //Corrected: Storing the data fetched
        //setUserStageInfo(data);
        console.log("DATAME")
        console.log(data)


        
        setUserStageInfo(data);
      } catch (error) {
        console.error("Failed to fetch user stage information:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserAchievements();
  }, []); // Run only on mount

  let completeStage2 = isStageCompleted(1)
  let completeStage3 = isStageCompleted(2)
  console.log(completeStage2)
  console.log(completeStage3)

  return (
    <div className="min-h-screen flex flex-col">
      <HomeNavbar />
      <div className="header-container flex relative min-h-[300px] text-white overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-rose-300 to-[#641B2E] opacity-80"></div>

        <img
            src="/images/authentication_background.png"
            alt="Stage Background"
            className="absolute inset-0 w-full h-full object-cover opacity-30"
            onError={(e) => (e.currentTarget.style.display = "none")}
        />

        <div className="welcome-Header h-full flex relative z-20 max-w-7xl my-auto mx-auto px-4 lg:px-8 py-16">
          {/* Header */}
          <div className="text-center">
            <h1 className="!text-6xl text-center font-bold mb-2">Welcome to the Stage Catalog</h1>
            <p className="!mt-10 flex-col md:flex-row items-center justify-center gap-6 text-gray-200 text-lg">
                Challenge yourself with our curated stage collection.
            </p>
          </div>
        </div>
      </div>
      

    {/* Content */}
    <div className="flex-1 bg-gray-100 flex flex-wrap gap-6 p-6 justify-center items-center align-baseline  box-border">

        <LessonCard
          stageLink="/tutorialPage"
          stageNo="0"
          image="/images/tutorial.png"
          title="Tutorial"
          description="Learn the basics of the game here. This tutorial will walk you through movement, interactions, and scoring so you’re ready for the main stages."
          isLocked={false}
        />

        <LessonCard
          stageLink="/stage01Page"
          stageNo="1"
          image="/images/colored_balls.jpg "
          title="Basic Probability"
          description="Learn the fundamentals of probability theory, including sample spaces, events, and basic probability rules."
          isLocked={false}
        />

        <LessonCard
          stageLink="/stage02Page"
          stageNo="2"
          image="/images/deck_of_cards.jpg"
          title="Mutually and Non-Mutually Exclusive Events"
          description="Explore how mutually and non-mutually exclusive events affect one another and learn how to calculate their combined probabilities."
          isLocked={!completeStage2}
        />

        <LessonCard
          stageLink="/stage03Page"
          stageNo="3"
          image="/images/candy.jpg"
          title="Independent & Dependent Probability"
          description="Explore how independent and dependent events relate to each other and learn how one event can influence the probability of another."
          isLocked={!completeStage3}
        />
    </div>
  </div>
  );
}

export default LessonPage;
