import React from 'react';
import annyang from 'annyang';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      liveCaption: '',
      recognizing: false,
    };
  }

  componentDidMount() {
    // Initialize annyang, but don't start it automatically here
    if (annyang) {
      annyang.addCallback('result', this.handleSpeech);
    } else {
      console.log('Speech recognition not supported');
    }
  }

  componentWillUnmount() {
    // Stop annyang when the component unmounts
    annyang.abort();
  }

  handleSpeech = (phrases) => {
    if (phrases.length > 0) {
      const caption = phrases[0];
      this.setState({ liveCaption: caption });
    }
  };

  startRecognition = () => {
    annyang.start();
    this.setState({ recognizing: true });
  };

  stopRecognition = () => {
    annyang.abort();
    this.setState({ recognizing: false });
  };

  render() {
    const { liveCaption, recognizing } = this.state;

    return (
      <div className="App">
        <button onClick={this.startRecognition} disabled={recognizing}>
          Start Captioning
        </button>
        <button onClick={this.stopRecognition} disabled={!recognizing}>
          Stop Captioning
        </button>
        <div className="live-caption">
          <p>Live Caption:</p>
          <div className="caption-text">{liveCaption}</div>
        </div>
      </div>
    );
  }
}

export default App;
