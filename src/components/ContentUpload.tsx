import React from 'react';
import { Upload, File as FileIcon, X, AlertCircle } from 'lucide-react';

interface ContentUploadProps {
  onComplete: (content: string) => void;
}

const SUPPORTED_FORMATS = {
  'text/plain': '.txt'
};

export function ContentUpload({ onComplete }: ContentUploadProps) {
  const [files, setFiles] = React.useState<File[]>([]);
  const [isDragging, setIsDragging] = React.useState(false);
  const [textContent, setTextContent] = React.useState('');
  const [error, setError] = React.useState('');

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setIsDragging(true);
    } else if (e.type === 'dragleave') {
      setIsDragging(false);
    }
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    setError('');

    const file = e.dataTransfer.files[0];
    if (!file || !Object.keys(SUPPORTED_FORMATS).includes(file.type)) {
      setError(`Please upload a supported file type (${Object.values(SUPPORTED_FORMATS).join(', ')})`);
      return;
    }

    setFiles([file]);
    const content = await file.text();
    setTextContent(content);
  };

  const handleFileInput = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!Object.keys(SUPPORTED_FORMATS).includes(file.type)) {
      setError(`Please upload a supported file type (${Object.values(SUPPORTED_FORMATS).join(', ')})`);
      return;
    }

    setFiles([file]);
    const content = await file.text();
    setTextContent(content);
  };

  const handleSubmit = () => {
    if (!textContent.trim()) {
      setError('Please enter some content or upload a file');
      return;
    }
    onComplete(textContent);
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-lg p-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Enter your study content
        </label>
        <textarea
          value={textContent}
          onChange={(e) => {
            setTextContent(e.target.value);
            setError('');
          }}
          rows={6}
          className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          placeholder="Enter your study material here..."
        />
      </div>

      <div
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        className={`border-2 border-dashed rounded-xl p-8 text-center transition-colors ${
          isDragging
            ? 'border-indigo-600 bg-indigo-50'
            : 'border-gray-300 hover:border-indigo-400'
        }`}
      >
        <Upload className="h-8 w-8 mx-auto mb-4 text-gray-400" />
        <p className="text-sm text-gray-600 mb-2">
          Drag and drop your file here, or{' '}
          <label className="text-indigo-600 hover:text-indigo-700 font-medium cursor-pointer">
            browse files
            <input
              type="file"
              className="hidden"
              accept={Object.values(SUPPORTED_FORMATS).join(',')}
              onChange={handleFileInput}
            />
          </label>
        </p>
        <p className="text-xs text-gray-500">
          Supported formats: {Object.values(SUPPORTED_FORMATS).join(', ')}
        </p>
      </div>

      {files.length > 0 && (
        <div className="flex items-center justify-between bg-gray-50 rounded-lg p-3">
          <div className="flex items-center space-x-3">
            <FileIcon className="h-5 w-5 text-gray-400" />
            <span className="text-sm text-gray-700">{files[0].name}</span>
          </div>
          <button
            onClick={() => {
              setFiles([]);
              setTextContent('');
            }}
            className="text-gray-400 hover:text-gray-600"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
      )}

      {error && (
        <div className="flex items-center space-x-2 text-red-600">
          <AlertCircle className="h-5 w-5" />
          <p className="text-sm">{error}</p>
        </div>
      )}

      <div className="flex justify-end">
        <button
          onClick={handleSubmit}
          disabled={!textContent.trim()}
          className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Generate Flashcards
        </button>
      </div>
    </div>
  );
}