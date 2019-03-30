import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './TextArea.css';

class TextArea extends Component {
  static propTypes = {
    addText: PropTypes.func.isRequired,
    text: PropTypes.string.isRequired,
  };

  handleChange = (event) => {
    const newText = event.target.value;
    this.props.addText(newText);
  }

  render() {
    const { text } = this.props;

    return (
      <section className="textArea">
        <h3>Enter Text</h3>
        <textarea onChange={this.handleChange}
                  className="textBox"
                  placeholder="Paste your text here..."
                  autoFocus required>
          { text }
        </textarea>
      </section>
    )
  }
}

export default TextArea;
