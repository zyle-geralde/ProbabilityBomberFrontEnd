import './LessonPage.css';
import './LessonSelector.css';

import HomeNavbar from '../../components/navbar/HomeNavbar';
import LessonCard from "../../components/lesson-card/LessonCard";

function LessonPage() {


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
        />

        <LessonCard
          stageLink="/stage01Page"
          stageNo="1"
          image="/images/deck_of_cards.jpg"
          title="Basic Probability"
          description="Learn the fundamentals of probability theory, including sample spaces, events, and basic probability rules."
        />

        <LessonCard
          stageLink="/stage02Page"
          stageNo="2"
          image="/images/colored_balls.jpg"
          title="Independent & Dependent Probability"
          description="Explore how different events affect one another and how to calculate their probabilities."
        />

        <LessonCard
          stageLink="/stage03Page"
          stageNo="3"
          image="/images/candy.jpg"
          title="Bayes’ Theorem"
          description="Understand how to update probabilities when new information becomes available."
        />
    </div>
  </div>
  );
}

export default LessonPage;
