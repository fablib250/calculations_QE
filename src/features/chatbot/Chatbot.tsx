import React, { useState, useRef, useEffect } from 'react';
import { HolographicPanel } from '../../components/HolographicPanel';
import { Send, RotateCcw, Lightbulb, Zap } from 'lucide-react';
import { ChatMessage } from './ChatMessage';
import { suggestedQuestions } from './suggestedQuestions';

export const Chatbot: React.FC = () => {
  const [messages, setMessages] = useState<Array<{ role: 'user' | 'assistant'; content: string; timestamp: Date }>>([
    {
      role: 'assistant',
      content: 'Hello! I\'m your Material Science Agent Assistant. How can I help you today?',
      timestamp: new Date(),
    },
  ]);
  
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  
  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  
  const handleSend = async () => {
    if (input.trim() === '') return;
    
    // Add user message
    const userMessage = { role: 'user' as const, content: input, timestamp: new Date() };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);
    
    // Simulate API call delay
    setTimeout(() => {
      generateResponse(input);
    }, 1000);
  };
  
  const generateResponse = (userInput: string) => {
    // This is a simplified mock response generation
    // In a real app, this would call a language model API
    let response = '';
    const lowercaseInput = userInput.toLowerCase();
    
    if (lowercaseInput.includes('titanium') || lowercaseInput.includes('ti')) {
      response = 'Titanium (Ti) is a lightweight, strong, lustrous metal with atomic number 22. It has excellent corrosion resistance and the highest strength-to-weight ratio of any metal. Common applications include aerospace components, medical implants, and high-performance sporting goods.';
    } else if (lowercaseInput.includes('carbon fiber') || lowercaseInput.includes('composite')) {
      response = 'Carbon fiber is a polymer consisting of thin, strong crystalline filaments of carbon. It\'s known for its high strength-to-weight ratio, stiffness, and chemical resistance. Carbon fiber reinforced composites are used in aerospace, automotive, sporting goods, and high-end consumer products.';
    } else if (lowercaseInput.includes('steel') || lowercaseInput.includes('alloy')) {
      response = 'Steel is an alloy of iron and carbon, often with other elements that determine its properties. Different steel alloys offer varying degrees of strength, hardness, and corrosion resistance. Steel is one of the most widely used materials in construction, manufacturing, and engineering.';
    } else if (lowercaseInput.includes('property') || lowercaseInput.includes('properties')) {
      response = 'Key material properties include: tensile strength (resistance to breaking under tension), hardness (resistance to deformation), ductility (ability to deform without breaking), thermal conductivity (heat transfer ability), and corrosion resistance. These properties determine a material\'s suitability for specific applications.';
    } else if (lowercaseInput.includes('periodic') || lowercaseInput.includes('element')) {
      response = 'The periodic table organizes elements by atomic number and chemical properties. Elements in the same group (column) have similar properties. Metals are on the left, nonmetals on the right, and metalloids between them. The table helps predict chemical behavior and is fundamental to materials science.';
    } else if (lowercaseInput.includes('hello') || lowercaseInput.includes('hi') || lowercaseInput.includes('hey')) {
      response = 'Hello! I\'m your Material Science Agent assistant. Feel free to ask me about elements, materials, properties, or engineering applications.';
    } else {
      response = 'That\'s an interesting question about materials science. While I don\'t have specific information on that topic, I can help with questions about elements, material properties, alloys, composites, and engineering applications. Could you provide more details or try a different question?';
    }
    
    setMessages(prev => [...prev, { role: 'assistant', content: response, timestamp: new Date() }]);
    setIsTyping(false);
  };
  
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };
  
  const handleSuggestedQuestion = (question: string) => {
    setInput(question);
  };
  
  const handleClearChat = () => {
    setMessages([
      {
        role: 'assistant',
        content: 'Chat history cleared. How can I help you today?',
        timestamp: new Date(),
      },
    ]);
  };
  
  return (
    <div className="space-y-6">
      <header>
        <h2 className="text-2xl font-bold text-cyan-300">AI Materials Assistant</h2>
        <p className="text-cyan-500/80 mt-1">Your expert guide for materials science and engineering</p>
      </header>
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3">
          <HolographicPanel className="h-[600px] flex flex-col">
            <div className="flex-1 overflow-y-auto pr-2">
              {messages.map((msg, index) => (
                <ChatMessage 
                  key={index} 
                  message={msg.content} 
                  role={msg.role} 
                  timestamp={msg.timestamp} 
                />
              ))}
              {isTyping && (
                <div className="flex items-center space-x-2 text-cyan-500/70 text-sm mb-4">
                  <div className="flex space-x-1">
                    <span className="w-2 h-2 bg-cyan-500 rounded-full animate-pulse\" style={{ animationDelay: '0ms' }}></span>
                    <span className="w-2 h-2 bg-cyan-500 rounded-full animate-pulse" style={{ animationDelay: '200ms' }}></span>
                    <span className="w-2 h-2 bg-cyan-500 rounded-full animate-pulse" style={{ animationDelay: '400ms' }}></span>
                  </div>
                  <span>AI assistant is typing...</span>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
            
            <div className="mt-4 relative">
              <textarea
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask about materials, elements, properties..."
                className="w-full px-4 py-3 pr-12 bg-black/30 border border-cyan-800/50 rounded-md text-cyan-300 placeholder:text-cyan-700/50 focus:outline-none focus:border-cyan-600/70 resize-none"
                rows={2}
              />
              <button
                onClick={handleSend}
                disabled={input.trim() === ''}
                className="absolute right-3 bottom-3 text-cyan-500 hover:text-cyan-400 disabled:text-cyan-800 disabled:cursor-not-allowed"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </HolographicPanel>
        </div>
        
        <div className="space-y-6">
          <HolographicPanel title="Suggested Questions" glowColor="blue">
            <div className="space-y-2">
              {suggestedQuestions.slice(0, 5).map((q, index) => (
                <button 
                  key={index}
                  onClick={() => handleSuggestedQuestion(q)}
                  className="w-full text-left p-2 text-sm bg-blue-900/20 hover:bg-blue-900/30 rounded-md border border-blue-900/30 transition-colors duration-150"
                >
                  {q}
                </button>
              ))}
            </div>
          </HolographicPanel>
          
          <HolographicPanel title="Actions" glowColor="purple">
            <div className="space-y-2">
              <button 
                onClick={handleClearChat}
                className="w-full flex items-center p-2 text-sm bg-purple-900/20 hover:bg-purple-900/30 rounded-md border border-purple-900/30"
              >
                <RotateCcw className="w-4 h-4 mr-2" />
                Clear Chat History
              </button>
              
              <button className="w-full flex items-center p-2 text-sm bg-purple-900/20 hover:bg-purple-900/30 rounded-md border border-purple-900/30">
                <Lightbulb className="w-4 h-4 mr-2" />
                Material Analysis Mode
              </button>
              
              <button className="w-full flex items-center p-2 text-sm bg-purple-900/20 hover:bg-purple-900/30 rounded-md border border-purple-900/30">
                <Zap className="w-4 h-4 mr-2" />
                Engineering Assistant
              </button>
            </div>
          </HolographicPanel>
        </div>
      </div>
    </div>
  );
};