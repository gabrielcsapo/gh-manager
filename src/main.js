import React from 'react';

import Layout from './layout';

class Main extends React.Component {
  render () {

    return (
      <Layout>
        <div className="text-center" style={{width:"50%", position: "absolute", left: "25%", top: "50%",transform: "translateY(-50%)"}}>
          <blockquote>Have you ever wanted to manage your github repos without having to go to each one individually</blockquote>
          <h3> gh-manager is just that </h3>
        </div>
      </Layout>
    );
  }
}

export default Main;
