import React from 'react';
import PropTypes from 'prop-types';
import './DictResults.css';

export const DictResults = (props) => {

    const { id, part, def, ety, pron, listen } = props.detail;

    return (
          <div>
            <p><span id="term">{ id } ({ part })</span> { def }</p>
            <p><span className="classify">etymology</span>: { ety }</p>
            <p><span className="classify">pronunciation:</span> { pron }</p>
            <div>
              <audio className="my_audio" id="audioPlayer" controls controlsList="nodownload">
                  <source src={ listen } type="audio/mpeg" />
              </audio>
            </div>
          </div>
    )
  }

  DictResults.propTypes = {
    id: PropTypes.string,
    part: PropTypes.string,
    def: PropTypes.string,
    ety: PropTypes.string,
    pron: PropTypes.string,
    listen: PropTypes.string,
  }
