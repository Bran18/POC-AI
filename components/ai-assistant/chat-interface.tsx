'use client'
import { useChat } from 'ai/react';
import { Card } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import MessageList from './message-list';
import MessageInput from './message-input';

export default function ChatInterface() {
  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    isLoading,
    error,
    reload,
    stop,
    setInput,
  } = useChat({
    api: '/api/assistant',
    maxSteps: 5,
    initialMessages: [
      {
        id: 'welcome',
        role: 'assistant',
        content: "Hi! I'm your product knowledge assistant. I can provide detailed information about our products and help you understand their features and benefits. What would you like to learn more about?",
      },
    ],
  });

  const handleSendMessage = (message: string) => {
    setInput(message);
    handleSubmit(new Event('submit'));
  };

  return (
    <Card className="flex h-[calc(100vh-5rem)] flex-col gap-4 p-4">
      <ScrollArea className="flex-1 pr-4">
        <MessageList 
          messages={messages}
          isLoading={isLoading}
          onSendMessage={handleSendMessage}
        />
      </ScrollArea>
      <div className="flex flex-col gap-2">
        {error && (
          <div className="text-sm text-red-500">
            Error: {error.message}
            {/* biome-ignore lint/a11y/useButtonType: <explanation> */}
            <button 
              onClick={() => reload()} 
              className="ml-2 text-blue-500 hover:underline"
            >
              Try again
            </button>
          </div>
        )}
        <MessageInput 
          input={input}
          handleInputChange={handleInputChange}
          handleSubmit={handleSubmit}
          isLoading={isLoading}
          onStop={stop}
        />
      </div>
    </Card>
  );
}