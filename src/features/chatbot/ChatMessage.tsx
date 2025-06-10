import React from 'react';
import { Bot, User } from 'lucide-react';

interface ChatMessageProps {
  message: string;
  role: 'user' | 'assistant';
  timestamp: Date;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({ message, role, timestamp }) => {
  const isUser = role === 'user';
  
  return (
    <div className={`flex mb-4 ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div className={`flex max-w-[80%] ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
        <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 
          ${isUser ? 'ml-2 bg-cyan-900/50' : 'mr-2 bg-blue-900/50'}`}
        >
          {isUser ? (
            <User className="w-4 h-4 text-cyan-300" />
          ) : (
            <Bot className="w-4 h-4 text-blue-300" />
          )}
        </div>
        
        <div 
          className={`p-3 rounded-lg ${
            isUser 
              ? 'bg-cyan-900/30 border border-cyan-800/50 text-cyan-300' 
              : 'bg-blue-900/30 border border-blue-800/50 text-blue-300'
          }`}
        >
          <div className="text-sm whitespace-pre-wrap">{message}</div>
          <div className="text-xs mt-1 opacity-60">
            {timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </div>
        </div>
      </div>
    </div>
  );
};