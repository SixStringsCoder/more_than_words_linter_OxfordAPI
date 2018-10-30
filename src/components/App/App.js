import React, {Component} from 'react';
import './App.css';
import TextArea from '../TextArea/TextArea';
import Analyze from '../Analyze/Analyze';
import AnalyzeTextArea from '../AnalyzeTextArea/AnalyzeTextArea';
import DictSearchBar from '../DictSearchBar/DictSearchBar';
// import {DictResults} from '../DictResults/DictResults';
import Oxford from '../../util/Oxford';

// const styles = {
//   color: 'red',
//   textShadow: '1px 1px green',
// };


class App extends Component {
    state = {
      textEntry: '',
      analysis: '',
      wordDefDetails: [],
      wordThesDetails: [],
    };


  // Text pasted into <textarea> box
  addText = (text) => {
    this.setState({
      textEntry: text
    });
  }

  cleanAnalyze = (text) => {
    // Storage object for 'stats' before setting state
    const stats = {
      numberOfWords: 0,
      overusedWordsCount: 0,
      unnecessaryWordsCount: 0,
      sentenceCount: 0,
      editedText: null,
    }

    // Split text entry into an array
    const textAsArrayNoSpaces = this.state.textEntry.split(' ');
    const textAsArray = textAsArrayNoSpaces.map(word => word + " ");

    // Count number of words
    stats.numberOfWords = textAsArray.length;

    // Count how many sentences are in the paragraph based on punctuation
    textAsArrayNoSpaces.forEach((punctuation) => {
      const re = /[.!?]/;
      // Length-1 is the last character in the element
      const punct = punctuation[punctuation.length-1];
      if ( re.test(punct) ) {
           stats.sentenceCount += 1;
    	    }
    }); // End of forEach

    // Define OVER-USED and UNNECESSARY words
    let overusedWords = ['really ', 'very ', 'basically '];
    let unnecessaryWords = ['extremely ', 'literally ', 'actually ' ];

    // Isolate OVER-USED words and log their frequency
    textAsArray.map(function(freqWord, index) {
      if (overusedWords.includes(freqWord)) {
        stats.overusedWordsCount += 1;
        textAsArray[index] = <span style={{color: 'red'}}>{freqWord} </span>;
        stats.editedText = textAsArray;
      }
    });

    // Isolate UNNECESSARY words and log their frequency
    textAsArray.map(function(noNeedWord, index) {
      if (unnecessaryWords.includes(noNeedWord)) {
        stats.unnecessaryWordsCount += 1;
        textAsArray[index] = <span style={{fontWeight: 'bold'}}>{noNeedWord} </span>;
        stats.editedText = textAsArray;

      }

    });

    // // Filter out unnecessary words
    // let betterWords = textAsArray.filter(function(word) {
    //   	return !unnecessaryWords.includes(word);
    // });

    this.setPrintState(stats);
  } // End of cleanAnalyze

  // Fill in report template with stats and Set state for all stats
  setPrintState = (statsObject) => {
    console.log(statsObject.editedText);
    let report = <div class="report">
                 <ul><li>There are {statsObject.numberOfWords} words.</li>
                 <li>There are {statsObject.sentenceCount} sentences.</li></ul>
                 <ul><li>You included these <span style={{color: 'red'}}>over-used words</span> {statsObject.overusedWordsCount} times.</li>
                 <li>You included these <span style={{fontWeight: 'bold'}}>unnecessary words</span> {statsObject.unnecessaryWordsCount} times.</li></ul>
                 <p> {statsObject.editedText} </p>
                </div>;

    this.setState({
      analysis: report
    });
  }

  // Search Oxford online Dictionary
  searchOxford = (word) => {
    Oxford.search(word).then(results => {
      this.setState({
        wordDefDetails: results // the returned array in the JSON
      });
    });

    Oxford.searchThesaurus(word).then(results => {
      this.setState({
        wordThesDetails: results
      });
    });
  }

  render() {
    const { textEntry, analysis, wordDefDetails, wordThesDetails } = this.state;

    return (
      <main id="app">
        <header className="navBar">
          <h1>More Than Words &#9997; <span>The Online Linter</span></h1>
        </header>

        <TextArea addText={this.addText} text={ textEntry } />
        <Analyze analyze={this.cleanAnalyze} />
        <AnalyzeTextArea printAnalysis={ analysis } />
        <DictSearchBar lookUpWord={this.searchOxford}
          wordDefDetails={ wordDefDetails }
          wordThesDetails={ wordThesDetails }
          />

      </main>
    );
  }
}

export default App;
