import './BeatmapOverlay.css';
import { useState } from 'react';

function BeatmapOverlay(props) {
  const [isChecked, setIsChecked] = useState('');

  function setComplete() {
    if (isChecked === '') {
      if (props.cleared === 'complete') {
        window.localStorage.removeItem(props.diffID);
        props.removeClear();
      } else {
        window.localStorage.setItem(props.diffID, 1);
        setIsChecked('complete');
      }
    } else {
      window.localStorage.removeItem(props.diffID);
      setIsChecked('');
    }
  }

  return (
    // <div className="beatmap-container" onClick={props.download}>
    //   Download <i className="fa-solid fa-download"></i>
    // </div>
    <>
      <div className={`complete-overlay ${isChecked} ${props.cleared}`}></div>
      <div className="beatmap-container">
        <div className="beatmap-complete" onClick={setComplete}>
          <div>
            <i
              className={`fa-solid fa-check container-check ${isChecked} ${props.cleared}`}
            ></i>
          </div>
          <div className="complete-text">Mark as complete</div>
        </div>
        <div className="beatmap-download-info">
          <div
            className="beatmap-page"
            onClick={() => {
              window.open(
                `https://osu.ppy.sh/beatmapsets/${props.beatmap}#mania/${props.diffID}`,
                '_blank'
              );
            }}
          >
            <i className="fa-solid fa-circle-info"></i> View Beatmap Page
          </div>
          <div className="beatmap-download" onClick={props.download}>
            <i className="fa-solid fa-download"></i> Download
          </div>
        </div>
      </div>
    </>
  );
}

export default BeatmapOverlay;
