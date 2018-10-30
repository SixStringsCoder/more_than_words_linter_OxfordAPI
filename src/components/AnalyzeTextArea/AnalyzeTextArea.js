import React, {Component} from 'react';
import PropTypes from 'prop-types';
import './AnalyzeTextArea.css';


class AnalyzeTextArea extends Component {
  static propTypes = {
    printAnalysis: PropTypes.string.isRequired,
  }
  
  render() {
    const { printAnalysis } = this.props;

    return (
        <div className="analyzeTextArea">
          <div className="analyzeBox">
            { printAnalysis }
          </div>
        </div>
    );
  }
}

export default AnalyzeTextArea;
