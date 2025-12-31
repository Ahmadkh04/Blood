import { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send } from 'lucide-react';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hello! I'm LifeDrop assistant. How can I help you today?",
      sender: 'bot',
      timestamp: new Date(),
    },
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  // Chatbot responses based on keywords
  const getBotResponse = (userMessage) => {
    const message = userMessage.toLowerCase().trim();

    // Greetings
    if (message.match(/^(hi|hello|hey|greetings)/)) {
      return "Hello! I'm here to help you with blood donation questions. What would you like to know?";
    }

    // Eligibility questions
    if (message.match(/(eligib|qualif|can i donate|who can donate|age|weight)/)) {
      return "To donate blood, you should be:\n• 17 years or older (16 with consent in some regions)\n• Weigh at least 110 pounds (50 kg)\n• Feeling healthy on the day of donation\n• Wait 56 days between whole blood donations\n\nDo you have any specific eligibility questions?";
    }

    // Blood types
    if (message.match(/(blood type|blood group|o\+|o-|a\+|a-|b\+|b-|ab\+|ab-)/)) {
      return "There are 8 main blood types:\n• O- (Universal donor)\n• O+ (Most transfused type)\n• A+ (Needed for trauma response)\n• A- (Critical for platelets)\n• B+ (Supports positive recipients)\n• B- (Rare but vital)\n• AB+ (Universal recipient)\n• AB- (Plasma hero)\n\nAll blood types are needed!";
    }

    // Donation process
    if (message.match(/(process|how to donate|what happens|procedure|steps)/)) {
      return "The donation process is simple:\n1. Schedule - Pick a time that fits your day\n2. Screening - Quick wellness check with our nurses\n3. Donation - The actual draw lasts about 8-10 minutes\n4. Refresh - Celebrate with snacks and know you've helped others\n\nWould you like to schedule a donation?";
    }

    // Schedule/Appointment
    if (message.match(/(schedule|appointment|book|reserve|when|time|date)/)) {
      return "You can schedule a donation by:\n1. Going to the home page\n2. Scroll to 'Reserve a donation slot'\n3. Fill in your details and choose a date\n\nMake sure you're logged in first! Need help with registration?";
    }

    // Registration/Login
    if (message.match(/(register|sign up|create account|login|sign in|account)/)) {
      return "To create an account:\n1. Click 'Register' in the navigation or go to /register\n2. Fill in your details (name, email, phone, blood type, password)\n3. Submit the form\n\nYou'll be automatically logged in after registration!";
    }

    // Benefits
    if (message.match(/(benefit|why donate|help|save|important)/)) {
      return "Donating blood helps:\n• Save lives - A single donation can support transfusions for up to three patients\n• Your health - Regular donors enjoy free mini checkups and balanced iron levels\n• Your community - Ensure hospitals are ready for everyday needs and emergencies\n\nEvery donation makes a difference!";
    }

    // Safety
    if (message.match(/(safe|safe|risk|sterile|clean|infection)/)) {
      return "Blood donation is very safe! We use:\n• Sterile, single-use equipment for each donor\n• Trained medical professionals\n• Strict safety protocols\n• Health screening before donation\n\nYour safety is our top priority!";
    }

    // Frequency
    if (message.match(/(how often|frequency|when can i donate again|next donation|56 days)/)) {
      return "You can donate whole blood every 56 days (about 8 weeks). This gives your body time to replenish the blood cells. Some people can donate platelets more frequently. Check with our staff for specific guidelines!";
    }

    // Contact
    if (message.match(/(contact|phone|call|email|help|support|talk to someone)/)) {
      return "You can reach us at:\n• Phone: Lebanon Red Cross • 140\n• Location: Beirut, Lebanon\n• Or visit our contact section on the website\n\nWe're here to help!";
    }

    // Default responses
    const defaultResponses = [
      "I'm here to help with blood donation questions. Could you tell me more about what you need?",
      "That's a great question! You can find more information on our website, or I can help you with specific questions about eligibility, scheduling, or the donation process.",
      "I'd be happy to help! Are you asking about eligibility, scheduling a donation, or something else?",
    ];

    return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!inputMessage.trim() || isTyping) return;

    const userMessage = {
      id: Date.now(),
      text: inputMessage,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Simulate bot thinking time
    setTimeout(() => {
      const botResponse = {
        id: Date.now() + 1,
        text: getBotResponse(inputMessage),
        sender: 'bot',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botResponse]);
      setIsTyping(false);
    }, 1000);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage(e);
    }
  };

  return (
    <>
      {/* Chatbot Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-lifedrop text-white shadow-lg transition hover:scale-110 hover:shadow-xl"
          aria-label="Open chatbot"
        >
          <MessageCircle className="h-6 w-6" />
        </button>
      )}

      {/* Chatbot Window */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 z-50 flex h-[600px] w-96 flex-col rounded-2xl bg-white shadow-2xl ring-1 ring-gray-200">
          {/* Header */}
          <div className="flex items-center justify-between rounded-t-2xl bg-lifedrop px-5 py-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20">
                <MessageCircle className="h-5 w-5 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-white">LifeDrop Assistant</h3>
                <p className="text-xs text-white/80">We're here to help</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="rounded-full p-1 text-white transition hover:bg-white/20"
              aria-label="Close chatbot"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4">
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] rounded-2xl px-4 py-2 ${
                      message.sender === 'user'
                        ? 'bg-lifedrop text-white'
                        : 'bg-gray-100 text-gray-900'
                    }`}
                  >
                    <p className="whitespace-pre-line text-sm">{message.text}</p>
                    <p className="mt-1 text-xs opacity-70">
                      {message.timestamp.toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </p>
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="rounded-2xl bg-gray-100 px-4 py-2">
                    <div className="flex gap-1">
                      <div className="h-2 w-2 animate-bounce rounded-full bg-gray-400 [animation-delay:-0.3s]"></div>
                      <div className="h-2 w-2 animate-bounce rounded-full bg-gray-400 [animation-delay:-0.15s]"></div>
                      <div className="h-2 w-2 animate-bounce rounded-full bg-gray-400"></div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          </div>

          {/* Input */}
          <form onSubmit={handleSendMessage} className="border-t border-gray-200 p-4">
            <div className="flex gap-2">
              <input
                ref={inputRef}
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message..."
                className="flex-1 rounded-xl border border-gray-300 px-4 py-2 text-sm focus:border-lifedrop focus:outline-none focus:ring-2 focus:ring-lifedrop/20"
                disabled={isTyping}
              />
              <button
                type="submit"
                disabled={!inputMessage.trim() || isTyping}
                className="rounded-xl bg-lifedrop p-2 text-white transition hover:bg-lifedropDark disabled:cursor-not-allowed disabled:opacity-50"
                aria-label="Send message"
              >
                <Send className="h-5 w-5" />
              </button>
            </div>
            <p className="mt-2 text-xs text-gray-500">
              Ask about eligibility, scheduling, blood types, or donation process
            </p>
          </form>
        </div>
      )}
    </>
  );
};

export default Chatbot;

