import React, { useState } from 'react';
import { GitBranch, Check, AlertCircle } from 'lucide-react';

interface GitHubUploaderProps {
  fileContent: string;
  fileName: string;
}

const GitHubUploader: React.FC<GitHubUploaderProps> = ({ fileContent, fileName }) => {
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'uploading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const uploadToGitHub = async () => {
    setUploadStatus('uploading');
    try {
      const response = await fetch('/api/upload-to-github', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          content: fileContent,
          fileName,
          repo: 'fablib250/calculations_QE',
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to upload file to GitHub');
      }

      setUploadStatus('success');
    } catch (error) {
      setUploadStatus('error');
      setErrorMessage(error instanceof Error ? error.message : 'Failed to upload file');
    }
  };

  return (
    <div className="p-4">
      <button
        onClick={uploadToGitHub}
        disabled={uploadStatus === 'uploading'}
        className={`w-full flex items-center justify-center px-4 py-2 rounded-md transition-colors ${
          uploadStatus === 'uploading'
            ? 'bg-gray-600 cursor-not-allowed'
            : 'bg-blue-500 hover:bg-blue-600'
        }`}
      >
        <GitBranch className="w-5 h-5 mr-2" />
        {uploadStatus === 'uploading' ? 'Uploading...' : 'Upload to GitHub'}
      </button>

      {uploadStatus === 'success' && (
        <div className="mt-4 flex items-center justify-center text-green-400">
          <Check className="w-5 h-5 mr-2" />
          <span>File uploaded to GitHub successfully</span>
        </div>
      )}

      {uploadStatus === 'error' && (
        <div className="mt-4 flex items-center justify-center text-red-400">
          <AlertCircle className="w-5 h-5 mr-2" />
          <span>{errorMessage}</span>
        </div>
      )}
    </div>
  );
};

export default GitHubUploader;