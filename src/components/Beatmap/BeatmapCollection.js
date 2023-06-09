import Beatmap from './Beatmap';
import './BeatmapCollection.css';
import LoadingSpinner from '../UI/LoadingSpinner';
import { useRef } from 'react';

let opened = false;
let loading = false;
function BeatmapCollection(props) {
  let loaded = true;

  const buttonRef = useRef();

  // try {
  //   props.set !== undefined &&
  //   props.maps.length >= props.mapList[props.set][1].length
  //     ? (loaded = true) && (opened = true)
  //     : (loaded = false) && (opened = false);
  // } catch (error) {
  //   console.log('No set selected');
  // }

  const sets = props.mapList.map((batch, i) => {
    if (loading) {
      try {
        props.set !== undefined &&
        props.maps.length >= props.mapList[props.set][1].length
          ? (loaded = true) && (loading = false)
          : (loaded = false);
      } catch (error) {
        console.log('No set selected');
      }
    }

    function loadMaps() {
      if (!opened) {
        opened = true;
        loaded = false;
        loading = true;
        props.load(i);
      } else if (opened && batch[0] === props.set) {
        loaded = true;
        loading = false;
        opened = false;
        props.clear();
      } else {
        opened = true;
        loaded = false;
        loading = true;
        props.load(i);
      }
    }

    let maps = props.maps.map((beatmap) => {
      return (
        <Beatmap
          name={beatmap.OsuFile}
          beatmap={beatmap.DiffName}
          key={beatmap.BeatmapId}
          diffID={beatmap.BeatmapId}
          download={beatmap.ParentSetId}
          image={`https://assets.ppy.sh/beatmaps/${beatmap.ParentSetId}/covers/cover.jpg`}
          diff={beatmap.DifficultyRating}
        />
      );
    });

    return (
      <div key={batch[0]}>
        <div className="batch-button">
          <div className="title">
            <button
              onClick={loaded === true ? loadMaps : () => {}}
              style={{ backgroundPositionX: `${(batch[0] + 3.7) * 5}%` }}
              ref={buttonRef}
            >
              {batch[0] === props.set && maps ? '▼' : '▶'} Batch {batch[0] + 1}
            </button>
          </div>
        </div>
        <div>
          <div className="beatmap-collection">
            {loaded === true && opened === true
              ? batch[0] === props.set && maps
              : batch[0] === props.set &&
                opened && (
                  <div className="loading">
                    Loading... <LoadingSpinner />
                  </div>
                )}
          </div>
        </div>
      </div>
    );
  });

  return <>{sets}</>;
}

export default BeatmapCollection;
