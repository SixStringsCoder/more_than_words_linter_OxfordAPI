import React, {Component} from 'react';
import './DictSearchBar.css';
import {DictResults} from '../DictResults/DictResults';
import {ThesResults} from '../ThesResults/ThesResults';


class DictSearchBar extends Component {
    state = {
      word: '', // search term typed in the input
    }

  // Set state to the text typed into the search Enter Word input element
  handleWordEntry = (event) => {
    this.setState({
      word: event.target.value,
    });
  }

  handleSearch = (event) => {
    this.props.lookUpWord(this.state.word);
    // prevent the default action of clicking a link from triggering at the end of the method.
    event.preventDefault();
  }

  render() {
    const { wordDefDetails, wordThesDetails } = this.props;

    return (
      <section className="oxfordArea">
          <h5>Dictionary & Thesaurus</h5>
        <div className="dictTitleAndBtn">
          <input onChange={this.handleWordEntry} type="text" className="wordInputGoBtn" placeholder="Enter word"/>
          <button type="submit" onClick={this.handleSearch} id="defineBtn">Go</button>
        </div>
        <div className="definitionBox">
        {
          wordDefDetails.map((detail, key) => {
            return <DictResults detail={detail} key={detail.id} />;
          })
        }

        {
          wordThesDetails.map((detail, key) => {
            return <ThesResults detail={detail} key={detail.id} />;
          })
        }
        </div>
      </section>
    )
  }
}

export default DictSearchBar;
