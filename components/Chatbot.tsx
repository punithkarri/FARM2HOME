import React, { useState, useEffect, useRef } from 'react';
import { GoogleGenAI, Chat } from "@google/genai";
import { ChatBubbleIcon, CloseIcon, SendIcon, ChevronDownIcon } from './Icons';

interface Message {
  text: string;
  sender: 'user' | 'bot';
}

const Chatbot: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [messages, setMessages] = useState<Message[]>([
        {
            text: "Hello! I'm your Farm2Home assistant. How can I help with your fresh vegetable needs today? 🥕",
            sender: 'bot'
        }
    ]);
    const [chat, setChat] = useState<Chat | null>(null);
    const chatContainerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const initChat = () => {
            try {
                const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });
                // Initialize the chat without the config. It will be passed with each message.
                const newChat = ai.chats.create({
                    model: 'gemini-flash-lite-latest',
                });
                setChat(newChat);
            } catch (error) {
                console.error("Failed to initialize chatbot:", error);
                setMessages(prev => [...prev, { text: "Sorry, I'm having trouble connecting right now. Please try again later.", sender: 'bot' }]);
            }
        };
        initChat();
    }, []);

    useEffect(() => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    }, [messages]);

    const handleSendMessage = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const userInput = formData.get('message') as string;

        if (!userInput.trim() || isLoading || !chat) return;
        
        e.currentTarget.reset();
        
        const userMessage: Message = { text: userInput, sender: 'user' };
        setMessages(prev => [...prev, userMessage]);
        setIsLoading(true);

        try {
            const config = {
                systemInstruction: "You are a friendly and helpful customer service assistant for Farm2Home.in, an online store that delivers fresh, organic vegetables in Hyderabad. Your role is to answer customer questions about products, delivery areas, return policies, and the company's story. Keep your answers concise, helpful, and maintain a cheerful tone. Use emojis where appropriate. Do not answer questions unrelated to Farm2Home.in.",
            };

            const result = await chat.sendMessageStream({ 
                message: userInput,
                config: config,
            });
            
            let botResponse = '';
            setMessages(prev => [...prev, { text: '', sender: 'bot' }]);

            for await (const chunk of result) {
                const chunkText = chunk.text;
                botResponse += chunkText;
                setMessages(prev => {
                    const newMessages = [...prev];
                    newMessages[newMessages.length - 1].text = botResponse;
                    return newMessages;
                });
            }
        } catch (error) {
            console.error("Chatbot error:", error);
            setMessages(prev => [...prev, { text: "Oops, something went wrong. Please try again.", sender: 'bot' }]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`fixed bottom-6 right-6 bg-primary text-white rounded-full p-4 shadow-lg hover:bg-primary-dark transition-transform duration-300 transform hover:scale-110 z-50 ${isOpen ? 'opacity-0 scale-0' : 'opacity-100 scale-100'}`}
                aria-label="Open chat"
            >
                <ChatBubbleIcon className="h-8 w-8" />
            </button>

            <div
                className={`fixed bottom-0 right-0 sm:bottom-6 sm:right-6 w-full h-full sm:w-[400px] sm:h-[70vh] bg-white rounded-t-lg sm:rounded-lg shadow-2xl flex flex-col transition-transform duration-300 z-50 ${isOpen ? 'transform translate-y-0' : 'transform translate-y-full'}`}
                aria-hidden={!isOpen}
            >
                {/* Header */}
                <header className="bg-primary text-white p-4 flex justify-between items-center rounded-t-lg sm:rounded-t-lg">
                    <h2 className="font-bold text-lg">Farm2Home Assistant</h2>
                    <button onClick={() => setIsOpen(false)} aria-label="Close chat">
                        <ChevronDownIcon className="h-6 w-6" />
                    </button>
                </header>

                {/* Messages */}
                <div ref={chatContainerRef} className="flex-1 p-4 overflow-y-auto bg-gray-50 space-y-4">
                    {messages.map((msg, index) => (
                        <div key={index} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                            <div className={`max-w-[80%] p-3 rounded-2xl ${msg.sender === 'user' ? 'bg-primary-light text-text-dark rounded-br-none' : 'bg-gray-200 text-text-dark rounded-bl-none'}`}>
                                <p className="text-sm" dangerouslySetInnerHTML={{ __html: msg.text.replace(/\n/g, '<br />') }}></p>
                            </div>
                        </div>
                    ))}
                    {isLoading && (
                        <div className="flex justify-start">
                            <div className="max-w-[80%] p-3 rounded-2xl bg-gray-200 text-text-dark rounded-bl-none">
                                <div className="flex items-center space-x-2">
                                    <span className="h-2 w-2 bg-gray-500 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                                    <span className="h-2 w-2 bg-gray-500 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                                    <span className="h-2 w-2 bg-gray-500 rounded-full animate-bounce"></span>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Input */}
                <form onSubmit={handleSendMessage} className="p-4 border-t bg-white sm:rounded-b-lg">
                    <div className="relative">
                        <input
                            type="text"
                            name="message"
                            placeholder="Ask a question..."
                            className="w-full border rounded-full py-2 pl-4 pr-12 focus:outline-none focus:ring-2 focus:ring-primary-light"
                            disabled={isLoading}
                            autoComplete="off"
                        />
                        <button type="submit" className="absolute right-1 top-1/2 -translate-y-1/2 bg-primary text-white rounded-full p-2 hover:bg-primary-dark transition-colors" disabled={isLoading} aria-label="Send message">
                            <SendIcon className="h-5 w-5" />
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
};

export default Chatbot;