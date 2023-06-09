import './Beatmap.css';
import notLoaded from '../../images/notLoaded.jpg';
import BeatmapOverlay from './BeatmapOverlay';
import { useState, useEffect } from 'react';

function Beatmap(props) {
  const [cleared, setCleared] = useState('');
  function downloadBeatmap() {
    window.open(
      `https://api.chimu.moe/v1/download/${props.download}`,
      '_parent'
    );
  }
  useEffect(() => {
    if (window.localStorage.getItem(props.diffID)) {
      setCleared('complete');
    }
  }, []);

  function removeClear() {
    window.localStorage.removeItem(props.diffID);
    setCleared('');
  }
  return (
    <div className="beatmap">
      <BeatmapOverlay
        download={downloadBeatmap}
        beatmap={props.download}
        diffID={props.diffID}
        cleared={cleared}
        removeClear={removeClear}
      />
      <img
        className="main-photo"
        src={props.image}
        alt={props.name.split(`[${[props.beatmap]}].osu`)[0]}
        onError={({ currentTarget }) => {
          currentTarget.onerror = null;
          currentTarget.src = notLoaded;
        }}
      />
      <div className="details-container">
        <img
          className="bg-photo"
          src={props.image}
          alt={props.name.split(`[${[props.beatmap]}].osu`)[0]}
          onError={({ currentTarget }) => {
            currentTarget.onerror = null;
            currentTarget.src = notLoaded;
          }}
        />
        <h1 className="title-name">
          <div className="title-text">
            {props.name.split(`[${[props.beatmap]}].osu`)[0]}
          </div>
        </h1>
        <p className="diff-name">
          Difficulty:{' '}
          <span
            className="diff-color"
            style={{ backgroundPositionX: `${props.diff * 10}%` }}
          >
            {props.beatmap} - {props.diff.toFixed(2)}★
          </span>
        </p>
      </div>
    </div>
  );
}

export default Beatmap;
