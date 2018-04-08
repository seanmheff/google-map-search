import './App.css';
import React from 'react';
import classNames from 'classnames';
import { loadMap } from '../actions'
import { connect } from 'react-redux'
import logo from '../images/favicon.png';

class App extends React.Component {
  componentDidMount() {
    this.props.loadMap(this._map, this._input);
  }

  render() {
    return (
      <div className="App">
        <div className={classNames("App-wrapper", { hidden: this.props.loading })}>
          <header className="App-header">
            <img src={logo} className="App-logo animated rotateIn" alt="logo" />
            <h1 className="App-title">Where would you like to go?</h1>
            <div className="row">
              <div className="col-md-6 offset-md-3">
                <input
                  type="text"
                  className="form-control"
                  ref={ref => (this._input = ref)}
                  placeholder="The world is your oyster..."
                />
              </div>
            </div>
          </header>
          <div className="App-map" ref={ref => (this._map = ref)} />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    loading: state.loading
  }
}

const mapDispatchToProps = dispatch => {
  return {
    loadMap: (map, input) => dispatch(loadMap(map, input))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(App)
