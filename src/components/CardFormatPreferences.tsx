import React from 'react';
import { Layout, FileText, Type } from 'lucide-react';

interface CardFormatPreferencesProps {
  userProfile: {
    field: string;
    purpose: string;
    examType: string;
  };
  onSubmit: (format: { style: string; complexity: number }) => void;
}

const cardStyles = [
  {
    id: 'basic',
    name: 'Basic Q&A',
    icon: FileText,
    description: 'Simple question and answer format',
    example: {
      front: 'What is the capital of France?',
      back: 'Paris',
    },
  },
  {
    id: 'cloze',
    name: 'Cloze Deletion',
    icon: Type,
    description: 'Fill-in-the-blank style cards',
    example: {
      front: 'The heart pumps [...] to the lungs for oxygenation.',
      back: 'blood',
    },
  },
  {
    id: 'custom',
    name: 'Custom Format',
    icon: Layout,
    description: 'Create your own card layout',
    example: {
      front: 'Scenario: Patient presents with...',
      back: 'Diagnosis: ...\nTreatment: ...',
    },
  },
];

export function CardFormatPreferences({ userProfile, onSubmit }: CardFormatPreferencesProps) {
  const [selectedStyle, setSelectedStyle] = React.useState('');
  const [complexity, setComplexity] = React.useState(50);

  const handleSubmit = () => {
    onSubmit({ style: selectedStyle, complexity });
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Choose Your Card Format</h2>

      <div className="space-y-8">
        <div>
          <label className="text-sm font-medium text-gray-700 mb-4 block">
            Select your preferred card style
          </label>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {cardStyles.map(({ id, name, icon: Icon, description, example }) => (
              <div
                key={id}
                onClick={() => setSelectedStyle(id)}
                className={`cursor-pointer rounded-xl border-2 p-4 transition-all ${
                  selectedStyle === id
                    ? 'border-indigo-600 bg-indigo-50'
                    : 'border-gray-200 hover:border-indigo-200'
                }`}
              >
                <Icon className={`h-6 w-6 mb-2 ${
                  selectedStyle === id ? 'text-indigo-600' : 'text-gray-400'
                }`} />
                <h3 className={`font-medium mb-2 ${
                  selectedStyle === id ? 'text-indigo-600' : 'text-gray-900'
                }`}>
                  {name}
                </h3>
                <p className="text-sm text-gray-500 mb-4">{description}</p>
                
                <div className="bg-gray-50 rounded-lg p-3 text-sm">
                  <div className="font-medium mb-2">Example:</div>
                  <div className="text-gray-600">Front: {example.front}</div>
                  <div className="text-gray-600">Back: {example.back}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <label className="text-sm font-medium text-gray-700 mb-4 block">
            Card Complexity Level
          </label>
          <div className="space-y-2">
            <input
              type="range"
              min="0"
              max="100"
              value={complexity}
              onChange={(e) => setComplexity(Number(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
            <div className="flex justify-between text-sm text-gray-500">
              <span>Quick Recall</span>
              <span>Complex Reasoning</span>
            </div>
          </div>
        </div>

        <div className="pt-4">
          <button
            onClick={handleSubmit}
            disabled={!selectedStyle}
            className="w-full bg-indigo-600 text-white rounded-lg py-3 px-4 hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Continue to Upload Content
          </button>
        </div>
      </div>
    </div>
  );
}