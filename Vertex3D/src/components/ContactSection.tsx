import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Send, Mail, Phone, MapPin, CheckCircle, Upload, Shield, Sparkles } from 'lucide-react';

interface ContactSectionProps {
  initialService?: string;
  initialEstimate?: string;
}

export const ContactSection: React.FC<ContactSectionProps> = ({
  initialService = '',
  initialEstimate = '',
}) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [service, setService] = useState('Tasarım & Modelleme');
  const [message, setMessage] = useState('');
  const [ndaRequested, setNdaRequested] = useState(true);
  const [uploadedFileName, setUploadedFileName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const [showConfigBadge, setShowConfigBadge] = useState(false);

  useEffect(() => {
    if (initialService) {
      setService(initialService);
    }
    if (initialEstimate) {
      setShowConfigBadge(true);
      setMessage((prev) =>
        prev
          ? `${prev}\n\n${initialEstimate}`
          : `${initialEstimate}\n\nEk Notlar & Açıklama:\n`
      );
    }
  }, [initialService, initialEstimate]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);

      // Trigger celebratory confetti
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#00C6FF', '#2E7DFF', '#FFFFFF', '#0B1F44'],
      });
    }, 900);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setUploadedFileName(e.target.files[0].name);
    }
  };

  return (
    <section id="iletisim" className="py-24 bg-[#0A0A0A] relative overflow-hidden scroll-mt-24">
      {/* Background glow */}
      <div className="absolute top-1/2 right-1/4 w-[500px] h-[500px] bg-[#2E7DFF]/10 blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column: Direct Agency Contacts & Coordinates */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0B1F44] border border-[#2E7DFF]/30 text-xs font-bold text-[#00C6FF] tracking-wider uppercase mb-4">
                <Sparkles className="w-3.5 h-3.5" />
                İLETİŞİM & PROJEYE BAŞLA
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-['Montserrat'] font-black text-white tracking-tight mb-4">
                Projenizi Birlikte <br />
                <span className="text-[#00C6FF] bg-gradient-to-r from-[#00C6FF] to-[#2E7DFF] bg-clip-text text-transparent">
                  Hayata Geçirelim
                </span>
              </h2>
              <p className="text-sm text-[#C4C8D0] leading-relaxed mb-8">
                Fikirlerinizi, 2D teknik çizimlerinizi veya CAD dosyalarınızı bize iletin; 24 saat içinde detaylı teknik analiz ve bütçe teklifinizi hazırlayalım.
              </p>

              <div className="space-y-5 mb-8">
                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 rounded-xl bg-[#0B1F44] border border-[#2E7DFF]/30 flex items-center justify-center shrink-0 text-[#00C6FF]">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs text-[#C4C8D0]">E-Posta Teklif & Bilgi</div>
                    <a
                      href="mailto:contact@vertex3d.studio"
                      className="text-sm font-bold text-white hover:text-[#00C6FF] transition-colors"
                    >
                      contact@vertex3d.studio
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 rounded-xl bg-[#0B1F44] border border-[#2E7DFF]/30 flex items-center justify-center shrink-0 text-[#2E7DFF]">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs text-[#C4C8D0]">Doğrudan Danışman Hattı</div>
                    <a
                      href="tel:+902123456789"
                      className="text-sm font-bold text-white hover:text-[#00C6FF] transition-colors"
                    >
                      +90 (212) 840 33 00
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 rounded-xl bg-[#0B1F44] border border-[#2E7DFF]/30 flex items-center justify-center shrink-0 text-[#00C6FF]">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs text-[#C4C8D0]">3D Laboratuvar & Stüdyo</div>
                    <div className="text-sm font-bold text-white">
                      İTÜ ARI Teknokent & Maslak Plaza, Kat: 8, İstanbul
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* NDA Commitment Badge */}
            <div className="p-4 rounded-2xl bg-[#0B1F44]/50 border border-[#2E7DFF]/30 flex items-center gap-3.5">
              <Shield className="w-6 h-6 text-[#00C6FF] shrink-0" />
              <div className="text-xs text-[#C4C8D0]">
                <strong className="text-white block font-semibold">Gizlilik & NDA Güvencesi</strong>
                Yüklenen tüm veriler uçtan uca şifrelenir ve asla 3. taraflarla paylaşılmaz.
              </div>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-7">
            <div className="glass-card rounded-3xl border border-[#2E7DFF]/40 p-5 sm:p-8 md:p-10 shadow-2xl relative">
              {isSubmitted ? (
                <div className="py-12 text-center flex flex-col items-center justify-center animate-fade-in">
                  <div className="w-16 h-16 rounded-full bg-[#00C6FF]/20 border-2 border-[#00C6FF] flex items-center justify-center text-[#00C6FF] mb-5 shadow-[0_0_30px_rgba(0,198,255,0.6)]">
                    <CheckCircle className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-bold font-['Montserrat'] text-white mb-2">
                    Talebiniz Başarıyla Alındı!
                  </h3>
                  <p className="text-sm text-[#C4C8D0] max-w-md mx-auto mb-6">
                    Teşekkürler <span className="text-white font-semibold">{fullName || 'Sayın Yetkili'}</span>. 3D mühendislik ve proje ekibimiz en geç 24 saat içinde sizinle iletişime geçecektir.
                  </p>
                  <button
                    onClick={() => {
                      setIsSubmitted(false);
                      setMessage('');
                      setUploadedFileName('');
                    }}
                    className="px-6 py-2.5 rounded-xl text-xs font-bold text-[#0A0A0A] bg-[#00C6FF] hover:bg-white transition-all shadow-[0_0_15px_rgba(0,198,255,0.4)] cursor-pointer"
                  >
                    Yeni Bir Mesaj Gönder
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-white mb-1.5">
                        Adınız Soyadınız *
                      </label>
                      <input
                        type="text"
                        required
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="Örn: Ahmet Yılmaz"
                        className="w-full px-4 py-3 rounded-xl bg-[#0A0A0A] border border-[#2E7DFF]/30 text-white text-base sm:text-sm focus:outline-none focus:border-[#00C6FF] focus:ring-1 focus:ring-[#00C6FF] transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-white mb-1.5">
                        E-Posta Adresiniz *
                      </label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Örn: ahmet@sirketiniz.com"
                        className="w-full px-4 py-3 rounded-xl bg-[#0A0A0A] border border-[#2E7DFF]/30 text-white text-base sm:text-sm focus:outline-none focus:border-[#00C6FF] focus:ring-1 focus:ring-[#00C6FF] transition-all"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-white mb-1.5">
                        Telefon Numarası
                      </label>
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+90 (5XX) XXX XX XX"
                        className="w-full px-4 py-3 rounded-xl bg-[#0A0A0A] border border-[#2E7DFF]/30 text-white text-base sm:text-sm focus:outline-none focus:border-[#00C6FF] focus:ring-1 focus:ring-[#00C6FF] transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-white mb-1.5">
                        İlgilenilen Hizmet Alanı
                      </label>
                      <select
                        value={service}
                        onChange={(e) => setService(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl bg-[#0A0A0A] border border-[#2E7DFF]/30 text-white text-base sm:text-sm focus:outline-none focus:border-[#00C6FF] transition-all"
                      >
                        <option value="Endüstriyel Uygulamalar (3D Baskı & Prototip)">Endüstriyel Uygulamalar (3D Baskı & Prototip)</option>
                        <option value="Tersine Mühendislik & 3D Tarama">Tersine Mühendislik & 3D Tarama</option>
                        <option value="Tasarım & Modelleme">Tasarım & Modelleme</option>
                        <option value="Mimarlık & İnşaat">Mimarlık & İnşaat</option>
                        <option value="Oyun & Eğlence">Oyun & Eğlence</option>
                        <option value="Kreatif Çözümler">Kreatif Çözümler</option>
                      </select>
                    </div>
                  </div>

                  {showConfigBadge && (
                    <div className="p-3.5 rounded-xl bg-[#0B1F44]/90 border border-[#00C6FF]/60 flex items-center justify-between text-xs text-white shadow-lg animate-fade-in">
                      <div className="flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-[#00C6FF]" />
                        <span><strong>3D Baskı Laboratuvarından</strong> hesaplanan üretim parametreleri mesaja aktarıldı.</span>
                      </div>
                      <span className="text-[10px] font-mono text-[#00C6FF] bg-[#00C6FF]/10 px-2 py-0.5 rounded">
                        Aktif
                      </span>
                    </div>
                  )}

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-white mb-1.5">
                      Proje Detayları & Açıklama *
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Projenizin hedefleri, tahmini parça sayısı, tolerans gereksinimi veya hedef teslim tarihini paylaşın..."
                      className="w-full px-4 py-3 rounded-xl bg-[#0A0A0A] border border-[#2E7DFF]/30 text-white text-sm focus:outline-none focus:border-[#00C6FF] focus:ring-1 focus:ring-[#00C6FF] transition-all"
                    />
                  </div>

                  {/* Optional File Attachment */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#C4C8D0] mb-1.5">
                      CAD veya Çizim Dosyası Ekle (Opsiyonel: STEP, STL, OBJ, PDF, ZIP)
                    </label>
                    <label className="flex items-center justify-center gap-3 px-4 py-3 rounded-xl border border-dashed border-[#2E7DFF]/40 bg-[#0B1F44]/20 hover:bg-[#0B1F44]/50 cursor-pointer text-xs text-[#C4C8D0] transition-colors">
                      <Upload className="w-4 h-4 text-[#00C6FF]" />
                      <span>{uploadedFileName || 'Dosya seçin veya buraya sürükleyin (Maks 100MB)'}</span>
                      <input
                        type="file"
                        onChange={handleFileChange}
                        className="hidden"
                      />
                    </label>
                  </div>

                  {/* NDA Checkbox */}
                  <div className="flex items-center gap-2 pt-1">
                    <input
                      type="checkbox"
                      id="ndaCheck"
                      checked={ndaRequested}
                      onChange={(e) => setNdaRequested(e.target.checked)}
                      className="rounded accent-[#00C6FF] cursor-pointer"
                    />
                    <label htmlFor="ndaCheck" className="text-xs text-[#C4C8D0] cursor-pointer select-none">
                      Teklif öncesinde karşılıklı <span className="text-white font-semibold">Gizlilik Sözleşmesi (NDA)</span> imzalanmasını talep ediyorum.
                    </label>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 rounded-xl font-bold text-xs uppercase tracking-wider text-[#0A0A0A] bg-gradient-to-r from-[#00C6FF] to-[#2E7DFF] hover:from-white hover:to-[#00C6FF] transition-all duration-300 shadow-[0_0_25px_rgba(0,198,255,0.5)] flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <span>İşleniyor...</span>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Projeyi Başlat & Teklif Al</span>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
