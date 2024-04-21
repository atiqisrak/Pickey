import React, { use, useEffect, useState } from "react";
import CodeEditor from "@/components/CodeEditor";
import questionData from "./api/questions.json";
import { Button, FormControl, FormControlLabel, FormLabel, Input, Radio, RadioGroup } from "@mui/material";

const stage3 = () => {
    const [questions] = useState(questionData);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [code, setCode] = useState("// write your code here");

    useEffect(() => {
        setSelectedAnswer(null);
    }, [currentQuestionIndex]);

    const handleNextQuestion = () => {
        setCurrentQuestionIndex((prev) => prev + 1);
        setSelectedAnswer(null);
    }

    const handlePreviousQuestion = () => {
        setCurrentQuestionIndex((prev) => prev - 1);
    }

    const handleAnswerSelect = (answer) => {
        setSelectedAnswer(answer);
    }

    const currentQuestion = questions[currentQuestionIndex];

    return (
        <div className="container flexed-column">
        <h1>Welcome to Stage 3</h1>
        {/* <CodeEditor /> */}
        <div className="container flexed-column">
            <div className="input-group">
                {/* {questions?.map((question) => (
                    <div key={question.id}>
                        <h3>{question.question}</h3>
                        {
                            question?.type === "cq" ? (
                                <div>
                                    {question?.cqOptions?.map((option) => (
                                        <div key={option.id}>
                                            <div>
                                                <Input type="radio" />
                                                {option.option}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <CodeEditor />
                            )
                        }
                    </div>
                ))} */}
                {currentQuestion && (
                <div className="container flexed-column">
                    <h2>Question {currentQuestionIndex + 1}</h2>
                    {currentQuestion.type === "cq" ? (
                        <FormControl component="fieldset">
                            <FormLabel>
                                {currentQuestion?.question}
                            </FormLabel>
                            <RadioGroup
                                value={selectedAnswer}
                                onChange={(e) => handleAnswerSelect(e.target.value)}
                            >
                                {currentQuestion?.cqOptions?.map((option) => (
                                    <FormControlLabel
                                        key={option.id}
                                        value={option.option}
                                        control={<Radio />}
                                        label={option.option}
                                    />
                                ))}
                            </RadioGroup>
                            </FormControl>
                    ) : (
                        <FormControl component="fieldset">
                            <FormLabel>
                                <center><h3>{currentQuestion?.question}</h3></center>
                            </FormLabel>
                        <CodeEditor
                        code={code}
                        setCode={setCode}
                        />
                        </FormControl>
                    )}
                    <div className="container flexed-row">
                    <Button style={{
                        marginRight: "1em",
                    }} className="btn" onClick={handlePreviousQuestion}>Previous</Button>
                    <Button style={{
                        marginRight: "1em",
                    }} className="btn" onClick={handleNextQuestion}>Next</Button>
                    </div>
                    
                </div>
            )}
            </div>
        </div>
        </div>
    );
    }

export default stage3;