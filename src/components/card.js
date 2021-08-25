import React from 'react';

class Card extends React.Component {
  constructor() {
    super();
    this.state = {
      input: '',
    };
  }
  render() {
    return (
      <div className="card-container">
        <div>
          <input
            type="text"
            placeholder="Enter City Name"
            onChange={(event) => {
              this.setState({ ...this.state, input: event.target.value });
              localStorage.setItem('input', event.target.value);
            }}
            value={this.state.input}
          />
          <button onClick={() => this.props.fetchHandle()}>Search</button>
        </div>
        <div className="weather-info">
          Weather info<div>{this.props.children}</div>
        </div>
      </div>
    );
  }
}

export default Card;
