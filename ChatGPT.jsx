import React from 'react';
import './ChatGPT.css';

class ChatGPTComponent extends React.Component {
  constructor() {
    super();
    this.state = {
      userInput: '',
      response: '',
    };
    this.handleInputChange = this.handleInputChange.bind(this);
  }
  handleInputChange = (event) => {
    this.setState({ userInput: event.target.value });
  };

  handleSubmit = async (event) => {
    event.preventDefault();

    const userInput = this.state.userInput;
    const response = await this.getChatGPTResponse(userInput);

    this.setState({ response });
  };

  async getChatGPTResponse(userInput) {
    // Stelle sicher, dass du deinen OpenAI API-Schlüssel hier einsetzt
    const apiKey = 'DEIN_API_SCHLUESSEL';

    try {
      const response = await fetch('https://api.openai.com/v1/engines/text-davinci-002/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          prompt: userInput,
          max_tokens: 50, // Maximale Anzahl von Tokens in der Antwort
        }),
      });

      if (response.ok) {
        const data = await response.json();
        const modelResponse = data.choices[0].text;

        return modelResponse; // Gib die Modellantwort zurück
      } else {
        console.error('Fehler beim Abrufen der Antwort von OpenAI.');
        return ''; // Gib einen leeren String zurück, wenn ein Fehler auftritt
      }
    } catch (error) {
      console.error('Fehler bei der Kommunikation mit OpenAI:', error);
      return ''; // Gib einen leeren String zurück, wenn ein Fehler auftritt
    }
  }

  render() {
    return (
      <div>
        <h1>ChatGPT React-Komponente</h1>
        <form onSubmit={this.handleSubmit}>
        <input
  type="text"
  value={this.state.userInput}
  onChange={this.handleInputChange}
  placeholder="Fragen an ChatGPT..."
/>
          <button type="submit">Senden</button>
        </form>
        <div>
          <strong>Antwort:</strong>
          <p>{this.state.response}</p>
        </div>
      </div>
    );
  }
}

export default ChatGPTComponent;
