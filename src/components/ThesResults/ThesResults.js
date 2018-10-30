import React from 'react';
import './ThesResults.css';

export const ThesResults = (props) => {
    const { syn } = props.detail;

    return (
      <div className="thesaurusWords">
      <span className="classify">synonyms</span>:
        <ul>
          { syn }
        </ul>
      </div>
    )
  }
