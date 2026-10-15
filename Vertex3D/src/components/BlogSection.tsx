import React, { useState } from 'react';
import { blogPosts, BlogPost } from '../data/blogData';
import {
  BookOpen,
  Clock,
  Calendar,
  Search,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  X,
  Share2,
  Tag,
  User,
  ChevronRight,
  Bookmark,
} from 'lucide-react';

interface BlogSectionProps {
  onStartProjectWithTopic?: (topic: string) => void;
}

export const BlogSection: React.FC<BlogSectionProps> = ({ onStartProjectWithTopic }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [readingPost, setReadingPost] = useState<BlogPost | null>(null);

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setReadingPost(null);
    };
    if (readingPost) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [readingPost]);

  const categories = [
    { id: 'all', label: 'Tüm Yazılar' },
    { id: 'metal', label: 'Metal 3D Baskı' },
    { id: 'polimer', label: 'Reçine & Polimer' },
    { id: 'medikal', label: 'Medikal & Sağlık' },
    { id: 'muhendislik', label: 'Mühendislik & DfAM' },
  ];

  const filteredPosts = blogPosts.filter((post) => {
    const matchesCategory =
      selectedCategory === 'all' || post.category === selectedCategory;
    const matchesSearch =
      searchQuery === '' ||
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase())) ||
      post.author.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const featuredPost = blogPosts.find((p) => p.featured) || blogPosts[0];

  const handleStartProject = (topicTitle: string) => {
    setReadingPost(null);
    if (onStartProjectWithTopic) {
      onStartProjectWithTopic(`Blog Danışmanlığı / Teknoloji: ${topicTitle}`);
    } else {
      const el = document.getElementById('iletisim');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="blog" className="py-24 bg-[#0A0A0A] relative overflow-hidden scroll-mt-24">
      {/* Background Ambient Glow */}
      <div className="absolute top-1/3 left-1/4 w-[600px] h-[600px] bg-[#0B1F44]/35 blur-[160px] pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-[500px] h-[500px] bg-[#2E7DFF]/15 blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-14 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0B1F44] border border-[#00C6FF]/40 text-xs font-bold text-[#00C6FF] tracking-wider uppercase mb-3 shadow-[0_0_15px_rgba(0,198,255,0.3)]">
              <BookOpen className="w-3.5 h-3.5" />
              VERTEX 3D ENDÜSTRİYEL BLOG & AR-GE
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-['Montserrat'] font-black text-white tracking-tight">
              Katmanlı Üretim &{' '}
              <span className="text-[#00C6FF] bg-gradient-to-r from-[#00C6FF] to-[#2E7DFF] bg-clip-text text-transparent">
                Mühendislik Makaleleri
              </span>
            </h2>
            <p className="text-[#C4C8D0] text-sm sm:text-base max-w-2xl mt-2">
              Metal sinterlemeden mikron hassasiyetli biyouyumlu reçinelere; 3D baskı endüstrisindeki en son teknik gelişmeler ve rehberler.
            </p>
          </div>

          {/* Search Box */}
          <div className="relative w-full lg:w-80">
            <Search className="w-4 h-4 text-[#00C6FF] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Konu, malzeme veya teknoloji ara..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#0B1F44]/50 border border-[#2E7DFF]/30 text-white text-xs placeholder:text-[#C4C8D0]/60 focus:outline-none focus:border-[#00C6FF] transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#C4C8D0] hover:text-white"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Featured Spotlight Card */}
        {selectedCategory === 'all' && !searchQuery && (
          <div className="mb-14 rounded-3xl overflow-hidden glass-card border border-[#2E7DFF]/40 shadow-[0_0_40px_rgba(11,31,68,0.7)] group">
            <div className="grid grid-cols-1 lg:grid-cols-12 items-center">
              <div className="lg:col-span-7 relative h-72 sm:h-96 w-full overflow-hidden">
                <img
                  src={featuredPost.image}
                  alt={featuredPost.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-transparent to-[#0A0A0A] opacity-80" />
                <span className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-bold bg-[#0B1F44]/95 text-[#00C6FF] border border-[#2E7DFF]/40 backdrop-blur-md">
                  ★ ÖNE ÇIKAN YAZI
                </span>
              </div>

              <div className="lg:col-span-5 p-6 sm:p-10 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-3 text-xs text-[#00C6FF] font-semibold mb-3">
                    <span className="px-2.5 py-0.5 rounded bg-[#00C6FF]/15 border border-[#00C6FF]/30">
                      {featuredPost.categoryLabel}
                    </span>
                    <span className="flex items-center gap-1 text-[#C4C8D0]">
                      <Clock className="w-3.5 h-3.5" />
                      {featuredPost.readTime}
                    </span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-bold font-['Montserrat'] text-white group-hover:text-[#00C6FF] transition-colors mb-3">
                    {featuredPost.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#C4C8D0] leading-relaxed mb-6">
                    {featuredPost.summary}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-white/10">
                  <div className="flex items-center gap-2.5">
                    <img
                      src={featuredPost.author.avatar}
                      alt={featuredPost.author.name}
                      className="w-8 h-8 rounded-full object-cover border border-[#2E7DFF]"
                    />
                    <div>
                      <div className="text-xs font-bold text-white">{featuredPost.author.name}</div>
                      <div className="text-[10px] text-[#C4C8D0]">{featuredPost.author.role}</div>
                    </div>
                  </div>

                  <button
                    onClick={() => setReadingPost(featuredPost)}
                    className="px-4 py-2 rounded-xl text-xs font-bold text-[#0A0A0A] bg-[#00C6FF] hover:bg-white transition-all shadow-[0_0_15px_rgba(0,198,255,0.4)] flex items-center gap-1.5 cursor-pointer"
                  >
                    <span>Makaleyi Oku</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Category Filters */}
        <div className="flex flex-wrap gap-2 mb-10 p-2 rounded-2xl bg-[#0A0A0A]/80 border border-[#2E7DFF]/25 backdrop-blur-md">
          {categories.map((cat) => {
            const count =
              cat.id === 'all'
                ? blogPosts.length
                : blogPosts.filter((p) => p.category === cat.id).length;
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold tracking-wide transition-all ${
                  isActive
                    ? 'bg-[#2E7DFF] text-white shadow-[0_0_15px_rgba(46,125,255,0.6)] font-bold'
                    : 'text-[#C4C8D0] hover:text-white hover:bg-white/5'
                }`}
              >
                <span>{cat.label}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                    isActive ? 'bg-white/20 text-white' : 'bg-[#0B1F44] text-[#00C6FF]'
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Blog Posts Grid (10 Articles) */}
        {filteredPosts.length === 0 ? (
          <div className="text-center py-16 glass-card rounded-3xl border border-white/10">
            <BookOpen className="w-10 h-10 text-[#00C6FF] mx-auto mb-3 opacity-60" />
            <h3 className="text-lg font-bold text-white mb-1">Aramanızla Eşleşen Makale Bulunamadı</h3>
            <p className="text-xs text-[#C4C8D0] mb-4">Lütfen farklı bir anahtar kelime deneyin.</p>
            <button
              onClick={() => {
                setSelectedCategory('all');
                setSearchQuery('');
              }}
              className="px-4 py-2 rounded-xl text-xs font-semibold bg-[#2E7DFF] text-white"
            >
              Tüm Yazıları Göster
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPosts.map((post) => (
              <article
                key={post.id}
                onClick={() => setReadingPost(post)}
                className="group relative rounded-2xl overflow-hidden glass-card border border-[#2E7DFF]/20 hover:border-[#00C6FF]/60 cursor-pointer transition-all duration-300 hover:-translate-y-2 shadow-xl flex flex-col justify-between"
              >
                <div>
                  {/* Thumbnail Image */}
                  <div className="relative h-52 w-full overflow-hidden">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/40 to-transparent opacity-75" />

                    <div className="absolute top-3 left-3 flex items-center gap-2">
                      <span className="px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase bg-[#0B1F44]/95 text-[#00C6FF] border border-[#2E7DFF]/30 backdrop-blur-md">
                        {post.categoryLabel}
                      </span>
                    </div>

                    <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-[11px] text-[#C4C8D0] backdrop-blur-xs">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3 text-[#00C6FF]" />
                        {post.date}
                      </span>
                      <span className="flex items-center gap-1 font-mono">
                        <Clock className="w-3 h-3 text-[#2E7DFF]" />
                        {post.readTime}
                      </span>
                    </div>
                  </div>

                  {/* Body */}
                  <div className="p-5">
                    <h4 className="text-base sm:text-lg font-bold font-['Montserrat'] text-white group-hover:text-[#00C6FF] transition-colors mb-2 line-clamp-2 leading-snug">
                      {post.title}
                    </h4>
                    <p className="text-xs text-[#C4C8D0] line-clamp-3 mb-4 leading-relaxed">
                      {post.summary}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {post.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-0.5 rounded text-[10px] bg-[#0B1F44]/60 text-[#C4C8D0] border border-white/5"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Footer Author & CTA */}
                <div className="px-5 pb-5 pt-3 border-t border-white/10 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <img
                      src={post.author.avatar}
                      alt={post.author.name}
                      className="w-7 h-7 rounded-full object-cover border border-[#2E7DFF]/40"
                    />
                    <span className="text-xs font-semibold text-white truncate max-w-[140px]">
                      {post.author.name}
                    </span>
                  </div>

                  <span className="text-xs font-bold text-[#00C6FF] group-hover:translate-x-1 transition-transform flex items-center gap-1">
                    <span>Oku</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>

      {/* ========================================================
          FULL ARTICLE READING MODAL
          ======================================================== */}
      {readingPost && (
        <div
          onClick={(e) => {
            if (e.target === e.currentTarget) setReadingPost(null);
          }}
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-2xl animate-fade-in"
        >
          <div className="relative w-full max-w-4xl bg-[#0A0A0A] border border-[#2E7DFF]/50 rounded-3xl overflow-hidden shadow-[0_0_80px_rgba(46,125,255,0.4)] max-h-[92vh] flex flex-col">
            {/* Sticky Modal Top Bar */}
            <div className="p-4 sm:p-5 bg-[#0B1F44]/90 border-b border-white/10 flex items-center justify-between z-20 backdrop-blur-md shrink-0">
              <div className="flex items-center gap-3">
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#00C6FF] text-[#0A0A0A]">
                  {readingPost.categoryLabel}
                </span>
                <span className="text-xs text-[#C4C8D0] hidden sm:inline flex items-center gap-1 font-mono">
                  <Clock className="w-3.5 h-3.5 text-[#00C6FF]" />
                  {readingPost.readTime}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setReadingPost(null)}
                  className="p-2 rounded-xl bg-white/10 text-white hover:bg-[#2E7DFF] transition-all cursor-pointer"
                  title="Kapat"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Scrollable Article Body */}
            <div className="overflow-y-auto p-6 sm:p-10 space-y-8 font-sans">
              {/* Article Header */}
              <div>
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold font-['Montserrat'] text-white leading-tight mb-4">
                  {readingPost.title}
                </h1>

                {/* Author & Meta */}
                <div className="flex flex-wrap items-center justify-between gap-4 py-4 border-y border-white/10 text-xs text-[#C4C8D0]">
                  <div className="flex items-center gap-3">
                    <img
                      src={readingPost.author.avatar}
                      alt={readingPost.author.name}
                      className="w-11 h-11 rounded-full object-cover border-2 border-[#00C6FF]"
                    />
                    <div>
                      <div className="text-sm font-bold text-white">{readingPost.author.name}</div>
                      <div className="text-xs text-[#00C6FF]">{readingPost.author.role}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span>Yayın Tarihi: <strong className="text-white">{readingPost.date}</strong></span>
                  </div>
                </div>
              </div>

              {/* Cover Banner */}
              <div className="relative h-64 sm:h-80 w-full rounded-2xl overflow-hidden border border-[#2E7DFF]/30">
                <img
                  src={readingPost.image}
                  alt={readingPost.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Introduction */}
              <div className="p-5 rounded-2xl bg-[#0B1F44]/30 border-l-4 border-[#00C6FF] text-sm sm:text-base text-white leading-relaxed font-medium">
                {readingPost.content.intro}
              </div>

              {/* Content Sections */}
              <div className="space-y-8">
                {readingPost.content.sections.map((section, idx) => (
                  <div key={idx} className="space-y-3">
                    <h3 className="text-lg sm:text-xl font-bold font-['Montserrat'] text-white flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-[#00C6FF]" />
                      {section.heading}
                    </h3>
                    <p className="text-sm text-[#C4C8D0] leading-relaxed">
                      {section.body}
                    </p>

                    {/* Bullet Points */}
                    {section.bulletPoints && (
                      <div className="space-y-2 p-4 rounded-xl bg-[#0B1F44]/20 border border-white/5 my-3">
                        {section.bulletPoints.map((point, i) => (
                          <div key={i} className="flex items-start gap-2.5 text-xs text-white">
                            <CheckCircle2 className="w-4 h-4 text-[#00C6FF] shrink-0 mt-0.5" />
                            <span>{point}</span>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Highlight Callout */}
                    {section.callout && (
                      <div className="p-4 rounded-xl bg-gradient-to-r from-[#0B1F44] to-[#0A0A0A] border border-[#2E7DFF]/50 text-xs sm:text-sm text-[#00C6FF] font-semibold italic flex items-center gap-3">
                        <Sparkles className="w-5 h-5 shrink-0" />
                        <span>"{section.callout}"</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Key Takeaways Box */}
              <div className="p-6 rounded-2xl glass-card border-2 border-[#00C6FF]/40">
                <h4 className="text-sm font-bold uppercase tracking-wider text-[#00C6FF] mb-3 flex items-center gap-2">
                  <Bookmark className="w-4 h-4" />
                  Bu Makaleden Öne Çıkan Anahtar Çıkarımlar
                </h4>
                <div className="space-y-2">
                  {readingPost.content.takeaways.map((takeaway, i) => (
                    <div key={i} className="flex items-start gap-2.5 text-xs text-white font-medium">
                      <span className="w-5 h-5 rounded-md bg-[#00C6FF]/20 flex items-center justify-center text-[#00C6FF] text-xs font-bold shrink-0 mt-0.5">
                        {i + 1}
                      </span>
                      <span>{takeaway}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Article Footer & Direct CTA */}
              <div className="p-6 rounded-2xl bg-gradient-to-r from-[#0B1F44] to-[#0A0A0A] border border-[#2E7DFF]/50 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <h4 className="text-base font-bold text-white mb-1">
                    Bu teknolojiyi projenizde uygulamak ister misiniz?
                  </h4>
                  <p className="text-xs text-[#C4C8D0]">
                    Uzman mühendislerimiz 24 saat içinde fizibilite ve CAD analizi sunmaktadır.
                  </p>
                </div>
                <button
                  onClick={() => handleStartProject(readingPost.title)}
                  className="px-6 py-3 rounded-xl font-bold text-xs uppercase tracking-wider text-[#0A0A0A] bg-gradient-to-r from-[#00C6FF] to-[#2E7DFF] hover:bg-white transition-all shadow-[0_0_20px_rgba(0,198,255,0.5)] shrink-0 cursor-pointer"
                >
                  Bu Teknoloji İçin Teklif Al
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
