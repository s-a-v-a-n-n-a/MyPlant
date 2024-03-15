import React from 'react';

import "./HomePage.scss"
import NavigationBar from "../navigation-bar";
import ContentScreen from "../content-screen";

function HomePage() {
    const onStartRedirect = () => {
        window.location.href = window.location.origin + '/popular-articles';
    }

    return (
      <div className="home-page-wrap">
          <NavigationBar/>
          <ContentScreen onStart={onStartRedirect}/>
      </div>
    );
}

export default HomePage;