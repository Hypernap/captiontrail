import React from 'react';
import annyang from 'annyang';

class App extends React.Component {
  componentDidMount() {
    // Initialize annyang
    if (annyang) {
      annyang.start();
      annyang.addCallback('result', this.handleSpeech);
    } else {
      console.log('Speech recognition not supported');
    }
  }

  handleSpeech = (phrases) => {
    if (phrases.length > 0) {
      const caption = phrases[0];
      console.log('Live Caption:', caption);
    }
  };

  handleClick = () => {
    // No need for anything here since annyang is capturing speech continuously
  };

  render() {
    return (
      <div className="App">
        <button onClick={this.handleClick}>Start Captioning</button>
      </div>
    );
  }
}

export default App;
