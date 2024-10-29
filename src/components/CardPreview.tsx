import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface FlashCard {
  front: string;
  back: string;
}

interface CardPreviewProps {
  cards: FlashCard[];
  onApprove: (cards: FlashCard[]) => void;
}

export function CardPreview({ cards, onApprove }: CardPreviewProps) {
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [isFlipped, setIsFlipped] = React.useState(false);
  const [editedCards, setEditedCards] = React.useState(cards);

  const currentCard = editedCards[currentIndex];

  const handleNext = () => {
    setIsFlipped(false);
    setCurrentIndex(prev => (prev + 1) % editedCards.length);
  };

  const handlePrevious = () => {
    setIsFlipped(false);
    setCurrentIndex(prev => (prev - 1 + editedCards.length) % editedCards.length);
  };

  const handleEdit = (side: 'front' | 'back', content: string) => {
    setEditedCards(prev => prev.map((card, i) => 
      i === currentIndex ? { ...card, [side]: content } : card
    ));
  };

  return (
    <div className="space-y-6">
      <div className="relative h-64">
        <div
          className={`absolute inset-0 transition-all duration-500 transform perspective-1000 ${
            isFlipped ? '[transform:rotateY(180deg)]' : ''
          }`}
          onClick={() => setIsFlipped(prev => !prev)}
        >
          <div className="absolute inset-0 bg-white rounded-xl shadow-lg p-6 backface-hidden">
            <textarea
              value={isFlipped ? currentCard.back : currentCard.front}
              onChange={(e) => handleEdit(isFlipped ? 'back' : 'front', e.target.value)}
              className="w-full h-full resize-none border-none focus:ring-0"
              placeholder={`Edit ${isFlipped ? 'back' : 'front'} side...`}
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <button
          onClick={handlePrevious}
          className="flex items-center space-x-2 text-gray-600 hover:text-gray-900"
        >
          <ChevronLeft className="h-5 w-5" />
          <span>Previous</span>
        </button>
        <span className="text-sm text-gray-500">
          {currentIndex + 1} of {editedCards.length}
        </span>
        <button
          onClick={handleNext}
          className="flex items-center space-x-2 text-gray-600 hover:text-gray-900"
        >
          <span>Next</span>
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>

      <div className="flex justify-end space-x-4">
        <button
          onClick={() => onApprove(editedCards)}
          className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
        >
          Export to Anki
        </button>
      </div>
    </div>
  );
}