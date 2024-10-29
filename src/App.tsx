import React from 'react';
import { Brain } from 'lucide-react';
import { UserProfileSetup } from './components/UserProfileSetup';
import { CardFormatPreferences } from './components/CardFormatPreferences';
import { ContentUpload } from './components/ContentUpload';
import { CardPreview } from './components/CardPreview';

type Step = 'profile' | 'format' | 'upload' | 'preview';

function App() {
  const [currentStep, setCurrentStep] = React.useState<Step>('profile');
  const [userProfile, setUserProfile] = React.useState<any>(null);
  const [cardFormat, setCardFormat] = React.useState<any>(null);
  const [cards, setCards] = React.useState<any[]>([]);

  const handleProfileSubmit = (profile: any) => {
    setUserProfile(profile);
    setCurrentStep('format');
  };

  const handleFormatSubmit = (format: any) => {
    setCardFormat(format);
    setCurrentStep('upload');
  };

  const handleContentSubmit = (content: string) => {
    // For now, just create a sample card
    setCards([
      { front: 'Sample Question', back: 'Sample Answer' },
      { front: 'Another Question', back: 'Another Answer' },
    ]);
    setCurrentStep('preview');
  };

  const handleCardsApprove = (approvedCards: any[]) => {
    // Handle exporting to Anki format
    const content = approvedCards
      .map(card => `${card.front}\t${card.back}`)
      .join('\n');
    
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'flashcards.txt';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center">
              <Brain className="h-8 w-8 text-indigo-600" />
              <span className="ml-2 text-xl font-semibold text-gray-900">FlashMaster</span>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Create Your Flashcards
          </h1>
          <p className="text-xl text-gray-600">
            Upload your content and let AI help you create effective study materials
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          {currentStep === 'profile' && (
            <UserProfileSetup onSubmit={handleProfileSubmit} />
          )}
          
          {currentStep === 'format' && userProfile && (
            <CardFormatPreferences
              userProfile={userProfile}
              onSubmit={handleFormatSubmit}
            />
          )}
          
          {currentStep === 'upload' && (
            <ContentUpload onComplete={handleContentSubmit} />
          )}
          
          {currentStep === 'preview' && cards.length > 0 && (
            <CardPreview
              cards={cards}
              onApprove={handleCardsApprove}
            />
          )}
        </div>
      </main>
    </div>
  );
}

export default App;