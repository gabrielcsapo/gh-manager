import React from 'react';

class Layout extends React.Component {
  render () {
    const { children } = this.props;

    return (
      <div>
        <div className="navbar navbar-center">
          <div className="container">
            <div className="navbar-title">
              <a className="text-black" href="/">
                <span className="text-black">gh-manager</span>
              </a>
            </div>
            <div className="nav">
              <a className="text-black" href="/manage">
                Manage
              </a>
            </div>
          </div>
        </div>
        <div>
          { children }
        </div>
          <div className="navbar navbar-center footer">
            <div className="container text-center">
              <div className="text-black">
                <a href="https://github.com/gabrielcsapo/gh-manager">gh-manager</a>
                &nbsp;by&nbsp;
                <a href="http://gabrielcsapo.com">@gabrielcsapo</a>
              </div>
            </div>
          </div>
      </div>
    );
  }
}

Layout.propTypes = {
  children: React.PropTypes.object
};

export default Layout;
