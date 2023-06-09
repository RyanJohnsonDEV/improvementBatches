import './Header.css';
import headerbg from '../../images/header-bg.png';

function Header() {
  return (
    <div className="header">
      <img src={headerbg} className="header-bg" alt="bg"></img>
      <div className="header-content">
        <h1>Improvement Batches</h1>
        <p className="by-me">
          by:{' '}
          <a
            href="https://osu.ppy.sh/users/16482505"
            target="_blank"
            rel="noreferrer"
          >
            Crisper
          </a>
        </p>
        <p>
          <span className="red-text">Rules:</span> Must get an S on each map in
          a batch to progress to the next batch. No pausing.
        </p>
      </div>
    </div>
  );
}

export default Header;
