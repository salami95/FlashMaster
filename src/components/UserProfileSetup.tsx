import React from 'react';
import { BookOpen, GraduationCap, Brain } from 'lucide-react';

const fields = [
  { id: 'medicine', name: 'Medicine', icon: Brain },
  { id: 'law', name: 'Law', icon: GraduationCap },
  { id: 'language', name: 'Language Learning', icon: BookOpen },
];

interface UserProfileSetupProps {
  onSubmit: (profile: { field: string; purpose: string; examType: string }) => void;
}

export function UserProfileSetup({ onSubmit }: UserProfileSetupProps) {
  const [field, setField] = React.useState('');
  const [purpose, setPurpose] = React.useState('');
  const [examType, setExamType] = React.useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ field, purpose, examType });
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Tell us about your study goals</h2>
      
      <form onSubmit={handleSubmit} className="space-y-8">
        <div>
          <label className="text-sm font-medium text-gray-700 mb-4 block">
            Select your field of study
          </label>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {fields.map(({ id, name, icon: Icon }) => (
              <button
                key={id}
                type="button"
                onClick={() => setField(id)}
                className={`p-4 rounded-xl border-2 transition-all ${
                  field === id
                    ? 'border-indigo-600 bg-indigo-50'
                    : 'border-gray-200 hover:border-indigo-200'
                }`}
              >
                <Icon className={`h-8 w-8 mx-auto mb-2 ${
                  field === id ? 'text-indigo-600' : 'text-gray-400'
                }`} />
                <span className={`block text-sm font-medium ${
                  field === id ? 'text-indigo-600' : 'text-gray-600'
                }`}>
                  {name}
                </span>
              </button>
            ))}
          </div>
        </div>

        <div>
          <label htmlFor="purpose" className="block text-sm font-medium text-gray-700 mb-2">
            What's your primary purpose?
          </label>
          <select
            id="purpose"
            value={purpose}
            onChange={(e) => setPurpose(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          >
            <option value="">Select a purpose</option>
            <option value="exam">Exam Preparation</option>
            <option value="knowledge">General Knowledge</option>
            <option value="certification">Professional Certification</option>
          </select>
        </div>

        {purpose === 'exam' && (
          <div>
            <label htmlFor="examType" className="block text-sm font-medium text-gray-700 mb-2">
              Which exam are you preparing for?
            </label>
            <input
              type="text"
              id="examType"
              value={examType}
              onChange={(e) => setExamType(e.target.value)}
              placeholder="e.g., USMLE Step 2, Bar Exam"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>
        )}

        <div className="pt-4">
          <button
            type="submit"
            disabled={!field || !purpose}
            className="w-full bg-indigo-600 text-white rounded-lg py-3 px-4 hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Continue to Card Format
          </button>
        </div>
      </form>
    </div>
  );
}