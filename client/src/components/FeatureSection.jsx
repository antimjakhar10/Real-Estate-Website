import React from 'react';
import './FeatureSection.css';

const FeatureSection = () => {
  const data = [
    {
      id: 1,
      title: "Find your home",
      desc: "Altus cedo tantillus video patrocinor valeo carus subseco vestrum credo virtus.",
      btn: "Find A Home",
      icon: "🏠" 
    },
    {
      id: 2,
      title: "Sell a Property",
      desc: "Tantillus certe patrocinor video adipisci valeo carus. Subseco vestrum taedium.",
      btn: "Sell A Home",
      icon: "🤝"
    },
    {
      id: 3,
      title: "Rent a Home",
      desc: "Velox surgo clarus tantillus confido carus video lumen cedo virtus spes decerno.",
      btn: "Rent A Home",
      icon: "🏘️"
    }
  ];

  return (
    <section className="feature-container">
      {/* Background Image Overlay */}
      <div className="overlay"></div>

      <div className="content-wrapper">
        {/* Top Header Part */}
        <div className="header-flex">
          <div className="title-side">
            <p className="subtitle"><span>—</span> Why Choose Us <span>—</span></p>
            <h2 className="main-heading-trusted">Trusted by 100+ Million Buyers</h2>
          </div>

          <div className="trust-side">
            <div className="trustpilot">
              <span className="star-icon">★</span> Trustpilot
            </div>
            <div className="avatar-group">
              <img src="https://i.pravatar.cc/100?img=1" alt="user" />
              <img src="https://i.pravatar.cc/100?img=2" alt="user" />
              <img src="https://i.pravatar.cc/100?img=3" alt="user" />
              <div className="more-count">+59K</div>
            </div>
            <div className="rating-info">
              <div className="stars">★★★★★</div>
              <p>19k+ clients</p>
            </div>
          </div>
        </div>

        {/* Cards Grid */}
        <div className="cards-grid">
          {data.map((item) => (
            <div className="feature-card" key={item.id}>
              <div className="icon-box">
                <span className="icon-main">{item.icon}</span>
              </div>
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
              <button className="card-btn" >{item.btn}</button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureSection;