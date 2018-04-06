import React from 'react';

const Landing = () => (
  <section className="landing">
    <h1 className="hero-title">Turn the music up!</h1>
    <img className="imagess" src="http://droidlessons.com/wp-content/uploads/2016/03/unnamed.png" alt="Volume Speaker" />
    <section className="selling-points">
    <br />
      <div className="point">
        <h2 className="point-title">Choose your music</h2>
        <p className="point-description">(The world is full of music; why should you have to listen to music that someone else chose?)</p>
      </div>
      <div className="point">
        <h2 className="point-title">Unlimited, streaming, ad-free</h2>
        <p className="point-description">(No arbitrary limits. No distractions.)</p>
      </div>
      <div className="point">
        <h2 className="point-title">Mobile enabled</h2>
        <p className="point-description">(Listen to your music on the go. This streaming service is available on all mobile platforms.)</p>
      </div>
    </section>
    <footer className="footer">
    <br />
    <br />
    If you have any questions feel free to reach me at (555)-555-5555 or drhalterman1@yahoo.com
    </footer>
  </section>
  );

export default Landing;
