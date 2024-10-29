import Anthropic from '@anthropic-ai/sdk';

const apiKey = import.meta.env.VITE_ANTHROPIC_API_KEY;

if (!apiKey) {
  throw new Error('Anthropic API key is required. Please add VITE_ANTHROPIC_API_KEY to your .env file.');
}

const anthropic = new Anthropic({
  apiKey
});

export async function generateFlashcards(content: string, format: string, complexity: number) {
  const prompt = `Create flashcards from the following content. Use ${format} format with complexity level ${complexity}/100. 
  Format each card as "Q: [question] A: [answer]", with cards separated by double newlines.
  
  Content: ${content}`;

  const response = await anthropic.messages.create({
    model: "claude-3-sonnet-20240229",
    max_tokens: 1000,
    messages: [{
      role: "user",
      content: prompt
    }]
  });

  const cardsText = response.content[0].text;
  
  return cardsText.split('\n\n').map(card => {
    const [question, answer] = card.split('\nA: ');
    return {
      front: question.replace('Q: ', ''),
      back: answer || ''
    };
  });
}