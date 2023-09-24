import React from 'react';
import annyang from 'annyang';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      liveCaption: '',
    };
  }

  componentDidMount() {
    // Initialize annyang
    if (annyang) {
      annyang.start();
      annyang.addCallback('result', this.handleSpeech);
    } else {
      console.log('Speech recognition not supported');
    }

    // Set an interval to capture live captions every 3 seconds
    this.interval = setInterval(this.captureLiveCaption, 3000);
  }

  componentWillUnmount() {
    // Clear the interval when the component unmounts
    clearInterval(this.interval);
  }

  handleSpeech = (phrases) => {
    if (phrases.length > 0) {
      const caption = phrases[0];
      // Remove the console.log statement to prevent logging
      this.setState({ liveCaption: caption });
    }
  };

  captureLiveCaption = () => {
    // Manually capture the live caption
    const { result } = annyang.getSpeechRecognizer();
    if (result) {
      this.setState({ liveCaption: result });
    }
  };

  render() {
    const { liveCaption } = this.state;

    return (
      <div className="App">
        <button onClick={this.handleClick}>Start Captioning</button>
        <div className="live-caption">
          <p>Live Caption:</p>
          <div className="caption-text">{liveCaption}</div>
        </div>
      </div>
    );
  }
}

export default App;
