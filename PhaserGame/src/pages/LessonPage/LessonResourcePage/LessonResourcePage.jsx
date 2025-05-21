import React from 'react';
import "./LessonResourcePage.css";
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useParams, useNavigate } from 'react-router-dom';

function LessonResourcePage() {
    const navigate = useNavigate(); 
    let { topicTarget } = useParams();
    topicTarget = Number(topicTarget);

    const topicTitles = {
        1: "Lesson 1: Introduction to Probability",
        2: "Lesson 2: Equally Likely & Complementary Events",
        3: "Lesson 3: Types of Probability",
        4: "Lesson 4: Mutually and Not Mutually Exclusive Events"
    };

    const navTitle = topicTitles[topicTarget] || "Lesson";

    return (
        <>
            <nav className="navbar">
                <div className="navbar-back-container">
                    <div className="navbar-back-icon" onClick={() => navigate(-1)}>
                        <FontAwesomeIcon icon={faArrowLeft} />
                    </div>
                    <div className='navbar-back-lesson-title'>
                        {navTitle}
                    </div>
                </div>
            </nav>

            <div className='lesson-resource-container'>

                {(topicTarget === 1 || topicTarget === undefined) && (
                    <div className="topic">
                        <div className="subtopic">
                            <h3>What is Probability?</h3>
                            <p>Probability is a way of measuring how likely an event is to happen. It gives us a number between 0 and 1:</p>
                            <ul>
                                <li>If an event is impossible, its probability is 0.</li>
                                <li>If an event is certain, its probability is 1.</li>
                                <li>Most events fall somewhere in between.</li>
                            </ul>
                            <div className="example">
                                Example 1: The probability of the sun rising tomorrow is close to 1.
                            </div>
                            <div className="example">
                                Example 2: The probability of rolling a 7 on a standard die is 0 (impossible).
                            </div>
                            
                            <p><br /> We can express probability as:</p>
                            <div className="standard example">
                                0 ≤ P(event) ≤ 1
                            </div>
                            <p><br /> Also, the total probability of all outcomes in a given scenario must equal 1.</p>
                            
                        </div>

                        <div className="subtopic">
                            <h3>Applications of Probability</h3>
                            <p>Why Is Probability Useful? Probability helps us make informed predictions in uncertain situations. It’s used in:</p>
                            <ul>
                                <li>Weather forecasts (chance of rain)</li>
                                <li>Health studies (risk of disease)</li>
                                <li>Games and gambling</li>
                                <li>Business decisions (like market predictions)</li>
                                <li>Daily decisions (like crossing the street safely)</li>
                            </ul>
                        </div>

                        <div className="subtopic">
                            <h3>Probability of an Event - Formula</h3>
                            <p>The probability of an event is given by:</p>
                            <p><strong>P(E) = m / n</strong>, where m is favorable outcomes and n is total outcomes.</p>
                            <div className="standard example" style={{ display: 'flex', alignItems: 'center' }}>
                                <div style={{ marginRight: '10px', fontWeight: 'bold' }}>P(E) =</div>
                                <div style={{ textAlign: 'center' }}>
                                    <div>Number of favorable outcomes (m)</div>
                                    <hr style={{ margin: '0' }} />
                                    <div>Total number of possible outcomes (n)</div>
                                </div>
                            </div>

                            <div className="example">
                                Example:
                                <p>If you roll a die, what's the probability of getting a 4?</p>
                                <ul>
                                    <li>Favorable outcomes = 1 (only one face has 4)</li>
                                    <li>Total outcomes = 6 (faces 1 to 6)</li>
                                </ul>
                                 <strong>P (4) = 1 / 6</strong>
                                </div>
                        </div>
                    </div>
                )}

                {topicTarget === 2 && (
                    <div className="topic">
                        <div className="subtopic">
                            <h3>Equally Likely Events</h3>
                            <p>When the events have the same theoretical probability of happening, then they are called equally likely events. The results of a sample space are called equally likely if all of them have the same probability of occurring. 
                            </p>
                            <div className="example">
                                Example: <br/> 
                                When rolling a fair six-sided die:
                                <ul>
                                    <li>Each number from 1 to 6 is equally likely.</li>
                                    <li>So, P(1) = P(2) = P(3) = P(4) = P(5) = P(6) = 1/6.</li>
                                    <li>For example, the probability P(3) = the probability of P(5) = 1/6 chance of occuring — all have the same chance of occurring</li>
                                </ul>
                            </div>
                            <p>This concept is important because the classical formula of probability only works correctly when outcomes are equally likely.</p>
                            <div className="example">
                                Example: <br/> 
                                When rolling a die, are these events equally likely?
                                <ul>
                                    <li>Getting a 3 → Yes, it’s a single outcome with a probability of 1/6</li>
                                    <li>Getting an even number (2, 4, 6) → No, this includes three outcomes, so its probability is 3/6 = 1/2, which is greater than the chance of getting just a 3.</li>
                                </ul>
                                Conclusion: These events are not equally likely because one involves more possible outcomes than the other.
                            </div>
                        </div>

                        <div className="subtopic">
                            <h3>Complementary Events</h3>
                            <p>The possibility that there will be only two outcomes which states that an event will occur or not occur</p>
                            <div className="example">
                                Example <br/>
                                <ul>
                                    <li>
                                    It will rain or not rain today
                                    </li>
                                    <li>The student will pass the exam or not pass.
                                    </li>
                                    <li>
                                    You win the lottery or you don’t.
                                    </li>
                                </ul>


                            </div>
                        </div>
                    </div>
                )}

                {topicTarget === 3 && (
                    <div className="topic">
                        There are four main types of probability. Understanding them helps us choose the right method in different situations.
                        <div className="subtopic">
                            <h3>Classical Probability</h3>
                            <p>Referred to as "theoretical probability" or "priori", states that in an experiment with B equally likely outcomes, if an event X consists of exactly A of those outcomes, then the probability of event X occurring is:</p>
                            <div className="standard example" style={{ display: 'flex', alignItems: 'center' }}>
                                <div style={{ marginRight: '10px', fontWeight: 'bold' }}>P(X) =</div>
                                <div style={{ textAlign: 'center' }}>
                                    <div>A</div>
                                    <hr style={{ margin: '0' }} />
                                    <div>B</div>
                                </div>
                            </div>
                            <div className="example">
                                Example:<br/>
                                What is the probability of drawing a heart from a standard deck of 52 cards?
                                <ul>
                                    <li>
                                    Favorable outcomes = 13 hearts
                                    </li>
                                    <li>
                                    Total outcomes = 52
                                    </li>
                                </ul>
                                <div className="standard example" style={{ display: 'flex', alignItems: 'center' }}>
                                <div style={{ marginRight: '10px', fontWeight: 'bold' }}>P(heart) =</div>
                                <div style={{ textAlign: 'center' }}>
                                    <div>13</div>
                                    <hr style={{ margin: '0' }} />
                                    <div>52</div>
                                </div>
                            </div>
                            </div>
                        </div>

                        <div className="subtopic">
                            <h3>Empirical Probability</h3>
                            <p>The empirical probability or the experimental perspective evaluates probability through thought experiments. 
                            </p>
                            <div className="standard example" style={{ display: 'flex', alignItems: 'center' }}>
                                <div style={{ marginRight: '10px', fontWeight: 'bold' }}>P(E) =</div>
                                <div style={{ textAlign: 'center' }}>
                                    <div>Number of times event happened</div>
                                    <hr style={{ margin: '0' }} />
                                    <div>Total number of trials</div>
                                </div>
                            </div>
                            
                            <div className="example">
                                Example:<br/>
                                <p>
                                You roll a die 100 times and get a 6 in 20 of those rolls:
                                </p>
                                <div className="standard example" style={{ display: 'flex', alignItems: 'center' }}>    
                                    <div style={{ marginRight: '10px', fontWeight: 'bold' }}>P(6) =</div>
                                    <div style={{ textAlign: 'center' }}>
                                        <div>20</div>
                                        <hr style={{ margin: '0' }} />
                                        <div>100</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="subtopic">
                            <h3>Subjective Probability</h3>
                            <p>Subjective probability considers an individual's own belief of an event occurring. 
                            </p>
                            <div className="example">
                                Example:<br/>
                                <p>
                                You believe there’s a 90% chance you’ll pass your exam because you studied hard. This is not based on a mathematical model — it’s subjective.
                                </p>
                                <p>Subjective probability is common in:</p>
                                <ul>
                                    <li>
                                    Sports predictions
                                    </li>
                                    <li>
                                    Financial forecasts
                                    </li>
                                    <li>
                                    Everyday decisions
                                    </li>
                                </ul>
                            </div>
                        </div>

                        <div className="subtopic">
                            <h3>Axiomatic Probability</h3>
                            <p>This is the modern mathematical approach to probability using a set of formal rules (axioms), created by Kolmogorov.</p>
                            <div className='example'>      
                                <p>Key axioms:
                                </p>
                                <ul>
                                    <li>P(E) ≥ 0</li>
                                    <li>P(Sample Space) = 1</li>
                                    <li>If A and B can't occur together → P(A or B) = P(A) + P(B)</li>
                                </ul>
                            </div>
                            <p>
                            Axiomatic probability can handle complex events, like combining events, intersections, and complements.
                            </p>
                        </div>
                    </div>
                )}

                {topicTarget === 4 && (
                    <div className="topic">
                        <div className="subtopic">
                            <h3>Mutually Exclusive Events</h3>
                            <p>Mutually exclusive events are the events that cannot occur or happen at the same time. </p>
                            <div className="example">
                                Example:<br/>
                                <ul>
                                    <li>When flipping a coin: getting a Head and getting a Tail at the same time is impossible.</li>
                                    <li>When drawing a card: you can’t draw a 5 and a Queen at the same time from one card.</li>
                                </ul>
                            </div>
                            <p><br/>For mutually exclusive events:</p>
                            <div className='standard example'>
                            P(A or B) = P(A) + P(B)
                            </div>
                            
                            <div className="example">
                                Example:<br/>
                                <p>
                                What’s the probability of rolling a 4 or 5 on a die?
                                </p>
                                <p>
                                P(4 or 5) = P(4) + P(5) = 1/6 + 1/6 = 2/6 = <strong>1/3</strong></p>
                            </div>
                        </div>

                        <div className="subtopic">
                            <h3>Not Mutually Exclusive Events</h3>
                            <p>These are events that can happen at the same time. When this happens, we must subtract the overlap.</p>
                            <p>Formula:</p>
                            <div className="standard example">
                                P(A or B) = P(A) + P(B) − P(A∩B)
                            </div>
                            
                            <div className="example">
                                Example <br/>
                                <p>From a deck of 52 cards:</p>
                                <ul>
                                    <li>P(Red) = 26/52</li>
                                    <li>P(6) = 4/52</li>
                                    <li>P(Red and 6) = 2/52 (red 6 of hearts and diamonds)</li>
                                </ul>
                                <p>P(Red or 6) = 26/52 + 4/52 - 2/52 = 28/52 = <strong>7/13</strong></p>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}

export default LessonResourcePage;
