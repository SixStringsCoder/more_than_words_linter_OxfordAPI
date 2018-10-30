import React, {Component} from 'react';
import PropTypes from 'prop-types';
import './Analyze.css';

class Analyze extends Component {
  static propTypes = {
    analyze: PropTypes.func.isRequired,
  }

  handleClick = (event) => {
    const words = event.target.value;
    this.props.analyze(words);
  }

  render() {
    return (
      <section className="analyzerArea">

        <div className="analyzeBtnArea">
          <button id="analyze" onClick={this.handleClick}>Analyze</button>
          <button id="translate">Translate</button>
        </div>

      </section>
    );
  }
}

export default Analyze;
