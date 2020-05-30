import React from 'react';
import './App.css';

import QuestionDisplay from './components/QuestionDisplay';
import StatusDisplay from './components/StatusDisplay';

class App extends React.Component {
  constructor(props) {
    super(props);
    var questionList = require('./Questions.json');
    // Create an empty list of answers matching the question count.
    var answerList = questionList.map((alternatives, i) => {return ""});
    console.log(answerList);
    this.state = {
      displayStatus: "questions",
      highlightMissing: false,
      answers: answerList,
      questions: questionList
    };
  }

  checkAnswers = () => {
    let acceptCount = 0;
    let cautionCount = 0;
    let emptyCount = 0;

    for (var i = 0; i < this.state.answers.length; i++) {
      if (this.state.answers[i] === "accept") {
        acceptCount++;
      } else if (this.state.answers[i] === "caution") {
        cautionCount++;
      } else {
        emptyCount++;
      }
    }

    console.log(acceptCount + "|" + cautionCount + "|" + emptyCount);
    if (emptyCount > 0) {
      console.log("Not all questions answered!");
      this.setState({highlightMissing: true});
      return;
    } else if (cautionCount > 0) {
      this.setState({ displayStatus: "caution" });
      return;
    } else {
      this.setState({ displayStatus: "ok" });
      return;
    }

  };

  handleAnswer = (questionID, answerStatus) => {
    console.log("answered: " + questionID + "|" + answerStatus);
    let answers = [...this.state.answers];
    answers[questionID] = answerStatus;
    this.setState({answers});
    console.log(this.state.answers);
  }

  switchDisplay = () => {
    this.setState({ displayStatus: "questions" });
  }

  render() {

    let output = '';
    if (this.state.displayStatus === "questions") {
      output = <QuestionDisplay
        questions={this.state.questions}
        answers={this.state.answers}
        handleAnswer={this.handleAnswer}
        handleClick={this.checkAnswers}
        highlightMissing={this.state.highlightMissing}
      />;
    } else {
      output = <StatusDisplay
        status={this.state.displayStatus}
        handleBack={this.switchDisplay}
      />;
    }
    return (
          <div className="App">
           {output}
          </div>
        );
  }
}

export default App;
