import React, { useState, useRef, useEffect } from 'react';
import {
  MessageSquare,
  X,
  Send,
  Sparkles,
  Bot,
  RotateCcw,
  ChevronDown,
  Layers,
  Calculator,
  Compass,
  ArrowRight,
  ShieldCheck,
  Zap,
} from 'lucide-react';

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
  quickActions?: { label: string; action: string }[];
}

const INITIAL_SUGGESTIONS = [
  'Hangi 3D filament malzemesini seçmeliyim?',
  'Fiyat hesaplama nasıl çalışıyor?',
  'Reçine (SLA) ile FDM arasındaki fark nedir?',
  '0.01 mm tolerans ve endüstriyel standartlarınız neler?',
  'Tersine mühendislik ve 3D tarama yapıyor musunuz?',
];

export const AIAssistantBot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [unreadBadge, setUnreadBadge] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: 'assistant',
      content:
        'Merhaba! Ben **Vertex AI**, 3D baskı ve katmanlı imalat danışmanınızım. 🤖✨\n\nMalzeme seçimi (PLA, PETG, ABS, Reçine, Karbon Fiber), dosya hazırlama (STL/STEP), 0.01 mm toleranslarımız veya anlık fiyat hesaplama hakkında merak ettiğiniz her şeyi sorabilirsiniz!',
      timestamp: 'Şimdi',
      quickActions: [
        { label: '3D Fiyat Hesapla', action: '#hesaplayici' },
        { label: 'Hizmetleri İncele', action: '#hizmetler' },
      ],
    },
  ]);

  // Scroll to bottom of messages
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
      setUnreadBadge(false);
      setTimeout(() => {
        inputRef.current?.focus();
      }, 200);
    }
  }, [isOpen, messages]);

  // Close on Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  const handleSendMessage = async (textToSend?: string) => {
    const text = (textToSend || inputMessage).trim();
    if (!text || isLoading) return;

    const userMsgId = `user-${Date.now()}`;
    const newMessages: ChatMessage[] = [
      ...messages,
      {
        id: userMsgId,
        role: 'user',
        content: text,
        timestamp: new Date().toLocaleTimeString('tr-TR', {
          hour: '2-digit',
          minute: '2-digit',
        }),
      },
    ];

    setMessages(newMessages);
    setInputMessage('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: text,
          messages: newMessages.map((m) => ({
            role: m.role,
            content: m.content,
          })),
        }),
      });

      if (!response.ok) {
        throw new Error(`Sunucu yanıtı: ${response.status}`);
      }

      const data = await response.json();
      const replyContent =
        data.reply ||
        'Yanıt alınamadı. Lütfen daha sonra tekrar deneyiniz.';

      setMessages((prev) => [
        ...prev,
        {
          id: `ai-${Date.now()}`,
          role: 'assistant',
          content: replyContent,
          timestamp: new Date().toLocaleTimeString('tr-TR', {
            hour: '2-digit',
            minute: '2-digit',
          }),
        },
      ]);
    } catch (err) {
      console.warn('Chat request failed, providing domain fallback:', err);
      // Smart domain fallback if backend endpoint is unavailable
      const fallbackReply = generateLocalDomainResponse(text);
      setMessages((prev) => [
        ...prev,
        {
          id: `ai-${Date.now()}`,
          role: 'assistant',
          content: fallbackReply,
          timestamp: new Date().toLocaleTimeString('tr-TR', {
            hour: '2-digit',
            minute: '2-digit',
          }),
          quickActions: [
            { label: 'Hesaplayıcıya Git', action: '#hesaplayici' },
            { label: 'Bize Ulaşın', action: '#iletisim' },
          ],
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  // Local knowledge-base fallback if offline or backend route is booting
  const generateLocalDomainResponse = (query: string): string => {
    const q = query.toLowerCase();
    if (q.includes('filament') || q.includes('malzeme') || q.includes('pla') || q.includes('petg') || q.includes('abs')) {
      return (
        '**3D Baskı Malzeme Rehberimiz:**\n\n' +
        '• **PLA:** Hızlı prototipleme, mimari maketler ve görsel sunumlar için ideal, pürüzsüz ve ekonomik.\n' +
        '• **PETG:** Kimyasala, suya ve darbeye karşı yüksek mukavemet. Mekanik parçalar ve fonksiyonel prototipler için önerilir.\n' +
        '• **ABS / ASA:** Yüksek sıcaklık dayanımı (100°C+) ve otomotiv parçaları için uygun (ASA UV dayanımlıdır).\n' +
        '• **Karbon Fiber:** Ultra rijit, hafif ve metal alternatifi yüksek mukavemetli drone ve robotik parçaları.\n\n' +
        'Web sitemizdeki **Fiyat Hesaplayıcı** üzerinden dilediğiniz malzemeyi seçip anlık maliyeti hesaplayabilirsiniz!'
      );
    } else if (q.includes('fiyat') || q.includes('hesap') || q.includes('ücret') || q.includes('maliyet')) {
      return (
        '**Fiyat Hesaplama & Teklif Alma:**\n\n' +
        'Web sitemizdeki interaktif **3D Fiyat Hesaplayıcı** sayesinde;\n' +
        '1. Malzemenizi (PLA, PETG, ABS, Reçine vb.) seçebilirsiniz.\n' +
        '2. Katman hassasiyeti (0.1 mm - 0.3 mm) ve doluluk oranını (%10 - %100) belirleyebilirsiniz.\n' +
        '3. STL, OBJ veya STEP dosyanızı yükleyerek 3D sanal model önizlemesi alabilir ve saniyeler içinde anında teklif oluşturabilirsiniz!'
      );
    } else if (q.includes('reçine') || q.includes('sla') || q.includes('fdm')) {
      return (
        '**FDM vs Reçine (SLA) Karşılaştırması:**\n\n' +
        '• **FDM Teknolojisi:** Termoplastik filamentleri eriterek katman katman üretir. Büyük boyutlu parçalar, dayanıklı mekanik prototipler ve seri üretim için en ekonomik yöntemdir.\n' +
        '• **SLA / Reçine Teknolojisi:** Sıvı fotopolimer reçinenin UV ışıkla kürlenmesidir. Katman çizgisi neredeyse görünmezdir, 0.025 mm gibi mikron seviyesinde detay verir; takı, medikal ve yüksek yüzey kalitesi gerektiren parçalar için eşsizdir.'
      );
    } else if (q.includes('tolerans') || q.includes('hassasiyet')) {
      return (
        '**Vertex 3D Endüstriyel Hassasiyet Standartları:**\n\n' +
        'Endüstriyel kalibre edilmiş optik lazer tarama ve SLA/FDM sistemlerimizle **±0.01 mm** hassasiyete kadar üretim yapabiliyoruz. Havacılık, savunma sanayii ve medikal standartlarına uygun Class-A parametrik modelleme desteği sağlıyoruz.'
      );
    }
    return (
      'Vertex 3D olarak; endüstriyel katmanlı imalat, tersine mühendislik, optik 3D lazer tarama ve CAD modelleme alanlarında uçtan uca hizmet veriyoruz.\n\n' +
      'Sorunuzla ilgili daha detaylı teknik bilgi veya anlık maliyet teklifi almak için sayfamızdaki **3D Fiyat Hesaplayıcı** modülünü kullanabilir veya doğrudan bizimle iletişime geçebilirsiniz!'
    );
  };

  const handleActionClick = (action: string) => {
    if (action.startsWith('#')) {
      const target = document.querySelector(action);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
        // on mobile, close the bot so the user can see the target section
        if (window.innerWidth < 768) {
          setIsOpen(false);
        }
      }
    }
  };

  const handleClearChat = () => {
    setMessages([
      {
        id: `welcome-${Date.now()}`,
        role: 'assistant',
        content:
          'Sohbet geçmişi sıfırlandı. 3D baskı malzemeleri, CAD tasarım veya Vertex 3D hizmetleri hakkında ne öğrenmek istersiniz?',
        timestamp: 'Şimdi',
        quickActions: [
          { label: '3D Fiyat Hesapla', action: '#hesaplayici' },
          { label: 'Hizmetleri İncele', action: '#hizmetler' },
        ],
      },
    ]);
  };

  const renderBold = (text: string) => {
    const boldChunks = text.split('**');
    return boldChunks.map((chunk, cIdx) =>
      cIdx % 2 === 1 ? (
        <strong key={cIdx} className="text-white font-bold">
          {chunk}
        </strong>
      ) : (
        chunk
      )
    );
  };

  const renderInlineSpans = (text: string) => {
    const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
    const parts: React.ReactNode[] = [];
    let lastIndex = 0;
    let match;

    while ((match = linkRegex.exec(text)) !== null) {
      if (match.index > lastIndex) {
        parts.push(renderBold(text.substring(lastIndex, match.index)));
      }
      const label = match[1];
      const href = match[2];
      parts.push(
        <button
          key={`link-${match.index}`}
          onClick={() => handleActionClick(href)}
          className="text-[#00C6FF] hover:underline font-semibold inline-flex items-center gap-0.5 cursor-pointer underline-offset-2"
        >
          {label}
        </button>
      );
      lastIndex = linkRegex.lastIndex;
    }

    if (lastIndex < text.length) {
      parts.push(renderBold(text.substring(lastIndex)));
    }

    return parts;
  };

  const renderFormattedContent = (content: string) => {
    const lines = content.split('\n');
    return lines.map((line, lIdx) => {
      const trimmed = line.trim();
      if (!trimmed) {
        return <div key={lIdx} className="h-1" />;
      }
      if (trimmed.startsWith('### ')) {
        return (
          <h4 key={lIdx} className="text-white font-bold text-xs sm:text-sm mt-2 mb-1 flex items-center gap-1.5">
            <span className="w-1 h-3 bg-[#00C6FF] rounded-full inline-block shrink-0" />
            <span>{renderInlineSpans(trimmed.replace('### ', ''))}</span>
          </h4>
        );
      }
      if (trimmed.startsWith('## ')) {
        return (
          <h3 key={lIdx} className="text-white font-extrabold text-xs sm:text-sm mt-2.5 mb-1 text-[#00C6FF]">
            {renderInlineSpans(trimmed.replace('## ', ''))}
          </h3>
        );
      }
      if (trimmed.startsWith('---')) {
        return <hr key={lIdx} className="border-white/10 my-2" />;
      }
      if (trimmed.startsWith('* ') || trimmed.startsWith('• ') || trimmed.startsWith('- ')) {
        const itemText = trimmed.replace(/^[\*\•\-]\s*/, '');
        return (
          <div key={lIdx} className="flex items-start gap-1.5 ml-1 my-0.5 text-xs leading-relaxed">
            <span className="text-[#00C6FF] mt-1 shrink-0 text-[10px]">•</span>
            <div className="flex-1">{renderInlineSpans(itemText)}</div>
          </div>
        );
      }
      if (trimmed.startsWith('|') && trimmed.endsWith('|')) {
        // Simple table row
        if (trimmed.includes('---')) return null;
        const cells = trimmed.split('|').filter((c) => c.trim().length > 0);
        return (
          <div key={lIdx} className="grid grid-cols-2 sm:grid-cols-3 gap-2 p-1.5 bg-black/40 rounded border border-white/5 my-1 text-[11px]">
            {cells.map((cell, cIdx) => (
              <span key={cIdx} className={cIdx === 0 ? 'text-white font-semibold' : 'text-[#C4C8D0]'}>
                {renderInlineSpans(cell.trim())}
              </span>
            ))}
          </div>
        );
      }

      return (
        <p key={lIdx} className="my-0.5 text-xs leading-relaxed">
          {renderInlineSpans(line)}
        </p>
      );
    });
  };

  return (
    <>
      {/* Floating Trigger Button */}
      <div className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-40 flex items-center gap-3">
        {!isOpen && unreadBadge && (
          <div
            onClick={() => setIsOpen(true)}
            className="hidden sm:flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#0B1F44]/95 border border-[#00C6FF]/50 text-white text-xs shadow-[0_0_20px_rgba(0,198,255,0.4)] backdrop-blur-md cursor-pointer animate-bounce hover:border-[#00C6FF]"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#00C6FF]" />
            <span className="font-semibold text-[#00C6FF]">Vertex AI:</span>
            <span>3D Baskı Sorusu Sor</span>
          </div>
        )}

        <button
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? 'Asistanı Kapat' : 'Vertex 3D Yapay Zeka Asistanını Aç'}
          className="relative group p-3.5 sm:p-4 rounded-2xl bg-gradient-to-br from-[#0B1F44] via-[#081736] to-[#0A0A0A] border border-[#00C6FF]/60 text-white shadow-[0_0_25px_rgba(0,198,255,0.5)] hover:shadow-[0_0_35px_rgba(0,198,255,0.8)] hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer flex items-center justify-center"
        >
          {/* Animated Neon Ring */}
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[#00C6FF] to-[#2E7DFF] opacity-0 group-hover:opacity-20 blur-md transition-opacity" />

          {isOpen ? (
            <X className="w-6 h-6 text-[#00C6FF] relative z-10" />
          ) : (
            <>
              <Bot className="w-6 h-6 text-[#00C6FF] relative z-10" />
              {/* Online Pulse Dot */}
              <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00C6FF] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-[#00C6FF] border-2 border-[#0A0A0A]"></span>
              </span>
            </>
          )}
        </button>
      </div>

      {/* Chat Window Panel */}
      {isOpen && (
        <div
          role="dialog"
          aria-label="Vertex 3D Yapay Zeka Asistanı"
          className="fixed bottom-20 right-4 sm:bottom-24 sm:right-6 z-50 w-[calc(100vw-2rem)] sm:w-[420px] max-h-[85vh] h-[580px] bg-[#0A0A0A]/95 backdrop-blur-2xl border border-[#2E7DFF]/50 rounded-3xl shadow-[0_10px_50px_rgba(0,0,0,0.8)] flex flex-col overflow-hidden animate-fade-in"
        >
          {/* Header */}
          <div className="p-4 bg-gradient-to-r from-[#0B1F44] via-[#081736] to-[#0A0A0A] border-b border-[#2E7DFF]/30 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#0B1F44] to-[#00C6FF]/30 border border-[#00C6FF]/60 flex items-center justify-center text-[#00C6FF] shadow-[0_0_15px_rgba(0,198,255,0.4)]">
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-['Montserrat',sans-serif] font-bold text-white text-sm">
                    Vertex AI Asistanı
                  </h3>
                  <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-[#00C6FF]/20 text-[#00C6FF] font-semibold border border-[#00C6FF]/40">
                    Gemini Free
                  </span>
                </div>
                <p className="text-[11px] text-[#C4C8D0] flex items-center gap-1.5 mt-0.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  3D Baskı ve Marka Uzmanı
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={handleClearChat}
                title="Sohbeti Sıfırla"
                className="p-2 rounded-lg text-white/60 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                title="Kapat"
                className="p-2 rounded-lg text-white/60 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              >
                <ChevronDown className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Quick Category Bar */}
          <div className="px-3 py-2 bg-[#0B1F44]/40 border-b border-white/5 flex items-center gap-2 overflow-x-auto no-scrollbar shrink-0 text-[11px]">
            <span className="text-white/40 shrink-0 flex items-center gap-1 font-mono">
              <Zap className="w-3 h-3 text-[#00C6FF]" /> Konular:
            </span>
            <button
              onClick={() => handleSendMessage('Filament ve malzeme tavsiyesi verir misiniz?')}
              className="px-2.5 py-1 rounded-lg bg-white/5 hover:bg-[#2E7DFF]/30 text-white/80 hover:text-white border border-white/10 whitespace-nowrap transition-colors cursor-pointer"
            >
              Malzemeler
            </button>
            <button
              onClick={() => handleSendMessage('3D baskı fiyatı nasıl hesaplanır?')}
              className="px-2.5 py-1 rounded-lg bg-white/5 hover:bg-[#2E7DFF]/30 text-white/80 hover:text-white border border-white/10 whitespace-nowrap transition-colors cursor-pointer"
            >
              Fiyatlandırma
            </button>
            <button
              onClick={() => handleSendMessage('SLA reçine ile FDM arasındaki fark nedir?')}
              className="px-2.5 py-1 rounded-lg bg-white/5 hover:bg-[#2E7DFF]/30 text-white/80 hover:text-white border border-white/10 whitespace-nowrap transition-colors cursor-pointer"
            >
              SLA / Reçine
            </button>
            <button
              onClick={() => handleSendMessage('Tersine mühendislik ve 3D tarama süreciniz nasıl işliyor?')}
              className="px-2.5 py-1 rounded-lg bg-white/5 hover:bg-[#2E7DFF]/30 text-white/80 hover:text-white border border-white/10 whitespace-nowrap transition-colors cursor-pointer"
            >
              3D Tarama
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${
                  msg.role === 'user' ? 'items-end' : 'items-start'
                }`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl p-3.5 text-xs sm:text-sm leading-relaxed ${
                    msg.role === 'user'
                      ? 'bg-gradient-to-r from-[#0066FF] to-[#2E7DFF] text-white shadow-[0_4px_15px_rgba(46,125,255,0.3)] rounded-br-none'
                      : 'bg-[#0B1F44]/70 border border-[#2E7DFF]/30 text-[#C4C8D0] shadow-[0_4px_20px_rgba(0,0,0,0.4)] rounded-bl-none'
                  }`}
                >
                  {/* Assistant name/icon */}
                  {msg.role === 'assistant' && (
                    <div className="flex items-center gap-1.5 text-[11px] font-semibold text-[#00C6FF] mb-1.5">
                      <Sparkles className="w-3 h-3" />
                      <span>Vertex AI</span>
                    </div>
                  )}

                  {/* Message formatted content */}
                  <div className="space-y-1">
                    {renderFormattedContent(msg.content)}
                  </div>

                  {/* Optional Quick Action Buttons in message */}
                  {msg.quickActions && msg.quickActions.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-3 pt-2.5 border-t border-white/10">
                      {msg.quickActions.map((qa, qIdx) => (
                        <button
                          key={qIdx}
                          onClick={() => handleActionClick(qa.action)}
                          className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#00C6FF]/20 hover:bg-[#00C6FF]/30 text-[#00C6FF] text-[11px] font-semibold border border-[#00C6FF]/40 transition-colors cursor-pointer"
                        >
                          {qa.label.includes('Hesapla') ? (
                            <Calculator className="w-3 h-3" />
                          ) : (
                            <ArrowRight className="w-3 h-3" />
                          )}
                          <span>{qa.label}</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                <span className="text-[10px] text-white/40 mt-1 px-1">
                  {msg.timestamp}
                </span>
              </div>
            ))}

            {/* Typing Indicator */}
            {isLoading && (
              <div className="flex items-start gap-2">
                <div className="bg-[#0B1F44]/70 border border-[#2E7DFF]/30 rounded-2xl rounded-bl-none p-3 flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-[#00C6FF] animate-bounce" />
                  <div className="w-2 h-2 rounded-full bg-[#00C6FF] animate-bounce [animation-delay:0.2s]" />
                  <div className="w-2 h-2 rounded-full bg-[#00C6FF] animate-bounce [animation-delay:0.4s]" />
                  <span className="text-[11px] text-[#C4C8D0] ml-1.5">
                    Vertex AI yanıt hazırlıyor...
                  </span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Suggestions Chips (if only 1 or 2 messages) */}
          {messages.length <= 2 && (
            <div className="px-4 py-2 border-t border-white/5 bg-[#0B1F44]/20 flex flex-col gap-1.5">
              <span className="text-[10px] text-white/50 font-mono">
                ÖNERİLEN SORULAR:
              </span>
              <div className="flex flex-wrap gap-1.5 max-h-24 overflow-y-auto no-scrollbar">
                {INITIAL_SUGGESTIONS.slice(0, 3).map((sug, sIdx) => (
                  <button
                    key={sIdx}
                    onClick={() => handleSendMessage(sug)}
                    className="text-[11px] px-2.5 py-1 rounded-lg bg-[#0B1F44]/60 hover:bg-[#2E7DFF]/20 text-[#C4C8D0] hover:text-white border border-white/10 transition-colors text-left truncate max-w-full cursor-pointer"
                  >
                    💬 {sug}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input Form Area */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="p-3 bg-gradient-to-t from-[#0B1F44] to-[#0A0A0A] border-t border-[#2E7DFF]/30 flex items-center gap-2 shrink-0"
          >
            <input
              ref={inputRef}
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="3D baskı veya Vertex 3D hakkında bir soru sorun..."
              disabled={isLoading}
              className="flex-1 bg-black/60 border border-white/15 focus:border-[#00C6FF] rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white placeholder-white/40 outline-none transition-colors"
            />
            <button
              type="submit"
              disabled={!inputMessage.trim() || isLoading}
              aria-label="Gönder"
              className="p-2.5 sm:p-3 rounded-xl bg-gradient-to-r from-[#00C6FF] to-[#2E7DFF] text-white disabled:opacity-40 disabled:cursor-not-allowed hover:shadow-[0_0_15px_#00C6FF] transition-all cursor-pointer shrink-0"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>

          {/* Subtle Disclaimer Footer */}
          <div className="py-1 px-4 bg-black text-[9px] text-white/40 text-center font-mono border-t border-white/5">
            Vertex 3D Mühendislik Bilgi Bankası • Gemini Free API ile Güçlendirildi
          </div>
        </div>
      )}
    </>
  );
};
