import { useState } from "react";
import { Star, Sparkles, MessageSquare, ThumbsUp, Minus, ThumbsDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";

interface Review {
  id: string;
  guest: { name: string; avatar: string };
  rating: number;
  experience: string;
  date: string;
  text: string;
  sentiment: "positive" | "neutral" | "negative";
  reply: string | null;
  photos: string[];
}

const reviews: Review[] = [
  { id: "1", guest: { name: "Elif K.", avatar: "E" }, rating: 5, experience: "Türk Kahvesi Workshop", date: "3 gün önce", text: "Türk kahvesi yapmanın inceliklerini öğrenmek harika bir deneyimdi! Mehmet Bey'in anlatımı çok akıcı ve bilgili. Kahve falı bölümü de çok eğlenceliydi. Kesinlikle tavsiye ederim.", sentiment: "positive", reply: null, photos: [] },
  { id: "2", guest: { name: "Can D.", avatar: "C" }, rating: 4, experience: "Kadıköy Sokak Lezzetleri", date: "5 gün önce", text: "Genel olarak güzeldi ama yürüyüş biraz uzundu. Lezzetler harikaydı, özellikle midye dolma durağı unutulmazdı. Sadece tempoya biraz dikkat edilebilir.", sentiment: "neutral", reply: "Merhaba Can Bey, geri bildiriminiz için teşekkürler! Yürüyüş mesafesini optimize etmek için rotamızı güncelliyoruz.", photos: [] },
  { id: "3", guest: { name: "Zeynep A.", avatar: "Z" }, rating: 3, experience: "Bosphorus Yoga", date: "1 hafta önce", text: "Mekan güzeldi fakat İngilizce açıklama yetersizdi. Uluslararası katılımcılar için dil desteği artırılmalı.", sentiment: "neutral", reply: null, photos: [] },
  { id: "4", guest: { name: "Ahmet M.", avatar: "A" }, rating: 5, experience: "Kadıköy Sokak Lezzetleri", date: "2 gün önce", text: "Müthiş bir deneyimdi! Rehber Mehmet Bey'in bilgisi ve enerjisi olağanüstüydü. Her durağı ayrı bir hikayeyle zenginleştirdi. 10/10!", sentiment: "positive", reply: "Teşekkür ederim Ahmet Bey! Sizinle bizi buluşturmak büyük keyifti. Tekrar bekleriz!", photos: [] },
  { id: "5", guest: { name: "Fatma H.", avatar: "F" }, rating: 5, experience: "Seramik Atölyesi", date: "4 gün önce", text: "Kuzguncuk'taki bu atölye gerçekten büyüleyici. Kendi tabağımı yapmak çok tatmin ediciydi. Eğitmenler çok sabırlı.", sentiment: "positive", reply: null, photos: [] },
  { id: "6", guest: { name: "Burak S.", avatar: "B" }, rating: 2, experience: "Bosphorus Yoga", date: "10 gün önce", text: "Beklediğimden farklıydı. Mekan kalabalıktı ve hava şartları dikkate alınmamıştı.", sentiment: "negative", reply: null, photos: [] },
];

const ratingDist = [
  { stars: 5, count: 180 },
  { stars: 4, count: 45 },
  { stars: 3, count: 20 },
  { stars: 2, count: 7 },
  { stars: 1, count: 4 },
];
const totalReviews = ratingDist.reduce((a, b) => a + b.count, 0);
const avgRating = (ratingDist.reduce((a, b) => a + b.stars * b.count, 0) / totalReviews).toFixed(1);

function Stars({ count, size = 14 }: { count: number; size?: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }, (_, i) => (
        <Star key={i} className={cn("flex-shrink-0", i < count ? "fill-accent text-accent" : "text-muted-foreground/30")} style={{ width: size, height: size }} />
      ))}
    </div>
  );
}

function SentimentBadge({ sentiment }: { sentiment: Review["sentiment"] }) {
  const map = {
    positive: { cls: "bg-success/10 text-success", label: "Pozitif", icon: ThumbsUp },
    neutral: { cls: "bg-warning/10 text-warning", label: "Nötr", icon: Minus },
    negative: { cls: "bg-destructive/10 text-destructive", label: "Negatif", icon: ThumbsDown },
  };
  const s = map[sentiment];
  return (
    <span className={cn("inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded-full", s.cls)}>
      <s.icon className="w-3 h-3" /> {s.label}
    </span>
  );
}

function GuestAvatar({ letter }: { letter: string }) {
  return (
    <div className="w-10 h-10 rounded-full bg-navy-medium flex items-center justify-center text-white font-semibold flex-shrink-0 text-sm">
      {letter}
    </div>
  );
}

export default function ReviewsPage() {
  const isMobile = useIsMobile();
  const [expFilter, setExpFilter] = useState("all");
  const [ratingFilter, setRatingFilter] = useState("all");
  const [replyFilter, setReplyFilter] = useState("all");
  const [aiSuggestions, setAiSuggestions] = useState<Record<string, string>>({});
  const [replyTexts, setReplyTexts] = useState<Record<string, string>>({});

  const filtered = reviews.filter(r => {
    if (expFilter !== "all" && r.experience !== expFilter) return false;
    if (ratingFilter !== "all" && r.rating !== parseInt(ratingFilter)) return false;
    if (replyFilter === "yanitlanmamis" && r.reply) return false;
    if (replyFilter === "yanitlanmis" && !r.reply) return false;
    return true;
  });

  const generateAiReply = (id: string, guestName: string) => {
    setAiSuggestions(prev => ({
      ...prev,
      [id]: `Teşekkür ederim ${guestName}! Geri bildiriminiz bizim için çok değerli. Deneyiminizi daha da iyileştirmek için sürekli çalışıyoruz. Tekrar görüşmek dileğiyle!`
    }));
  };

  return (
    <div className="space-y-5">
      {/* Summary Header */}
      <div className="bg-card rounded-lg card-shadow p-5">
        <div className="flex flex-col sm:flex-row gap-6 items-start">
          <div className="text-center sm:text-left">
            <p className="text-5xl font-bold text-accent font-body">{avgRating}</p>
            <Stars count={Math.round(parseFloat(avgRating))} size={18} />
            <p className="text-sm text-muted-foreground mt-1">({totalReviews} yorum)</p>
          </div>
          <div className="flex-1 space-y-1.5 w-full">
            {ratingDist.map(r => (
              <div key={r.stars} className="flex items-center gap-2">
                <span className="text-xs text-muted-foreground w-5 text-right">{r.stars}★</span>
                <div className="flex-1 h-2 bg-input rounded-full overflow-hidden">
                  <div className="h-full bg-accent rounded-full" style={{ width: `${(r.count / totalReviews) * 100}%` }} />
                </div>
                <span className="text-xs text-muted-foreground w-8">{r.count}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* AI Summary */}
      <div className="bg-gold-tint rounded-lg p-4 border border-accent/20">
        <div className="flex items-center gap-2 mb-2">
          <Sparkles className="w-4 h-4 text-accent" />
          <span className="text-xs font-semibold text-accent uppercase tracking-wider">AI Yorum Özeti — Kadıköy Turu</span>
        </div>
        <ul className="text-sm text-foreground space-y-1 list-disc list-inside">
          <li>3 misafir harika kahveyi övdü</li>
          <li>2 misafir yürüyüşün uzunluğundan bahsetti (iyileştirme fırsatı)</li>
          <li>1 misafir dil bariyerini belirtti</li>
        </ul>
        <p className="text-xs text-muted-foreground mt-2">Genel duygu: %89 Pozitif, %8 Nötr, %3 Negatif</p>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-2 items-center">
        <Select value={expFilter} onValueChange={setExpFilter}>
          <SelectTrigger className="w-[160px] h-9 text-xs rounded-md"><SelectValue placeholder="Deneyim" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tümü</SelectItem>
            <SelectItem value="Kadıköy Sokak Lezzetleri">Kadıköy Turu</SelectItem>
            <SelectItem value="Türk Kahvesi Workshop">Kahve Workshop</SelectItem>
            <SelectItem value="Bosphorus Yoga">Yoga</SelectItem>
            <SelectItem value="Seramik Atölyesi">Seramik</SelectItem>
          </SelectContent>
        </Select>
        <Select value={ratingFilter} onValueChange={setRatingFilter}>
          <SelectTrigger className="w-[100px] h-9 text-xs rounded-md"><SelectValue placeholder="Puan" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tümü</SelectItem>
            {[5,4,3,2,1].map(n => <SelectItem key={n} value={n.toString()}>{n}★</SelectItem>)}
          </SelectContent>
        </Select>
        <Select value={replyFilter} onValueChange={setReplyFilter}>
          <SelectTrigger className="w-[140px] h-9 text-xs rounded-md"><SelectValue placeholder="Yanıt" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tümü</SelectItem>
            <SelectItem value="yanitlanmamis">Yanıtlanmamış</SelectItem>
            <SelectItem value="yanitlanmis">Yanıtlanmış</SelectItem>
          </SelectContent>
        </Select>
        <span className="text-xs text-muted-foreground ml-auto">Ort. yanıt süresi: 2.3 saat</span>
      </div>

      {/* Review Cards */}
      <div className="space-y-3">
        {filtered.map(r => (
          <div key={r.id} className="bg-card rounded-lg card-shadow p-5 space-y-3">
            {/* Header */}
            <div className="flex items-center justify-between gap-2 flex-wrap">
              <div className="flex items-center gap-3">
                <GuestAvatar letter={r.guest.avatar} />
                <div>
                  <p className="text-sm font-semibold text-foreground">{r.guest.name}</p>
                  <p className="text-xs text-muted-foreground">{r.experience} • {r.date}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Stars count={r.rating} />
                <SentimentBadge sentiment={r.sentiment} />
              </div>
            </div>

            {/* Body */}
            <p className="text-sm text-foreground leading-relaxed">{r.text}</p>

            {/* Reply */}
            {r.reply ? (
              <div className="bg-background rounded-lg p-3 ml-6 border-l-2 border-primary">
                <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider mb-1">Organizatör Yanıtı</p>
                <p className="text-sm text-foreground">{r.reply}</p>
              </div>
            ) : (
              <div className="ml-6 space-y-2">
                {aiSuggestions[r.id] && (
                  <div className="bg-info/5 rounded-lg p-3 border border-info/20">
                    <p className="text-sm text-foreground">{aiSuggestions[r.id]}</p>
                    <div className="flex gap-2 mt-2">
                      <Button size="sm" className="rounded-pill bg-accent text-accent-foreground hover:bg-gold-hover text-xs h-7 px-3"
                        onClick={() => { setReplyTexts(prev => ({ ...prev, [r.id]: aiSuggestions[r.id]! })); setAiSuggestions(prev => { const n = { ...prev }; delete n[r.id]; return n; }); }}>
                        Kullan
                      </Button>
                      <Button size="sm" variant="ghost" className="text-xs h-7" onClick={() => setAiSuggestions(prev => { const n = { ...prev }; delete n[r.id]; return n; })}>Yeniden Oluştur</Button>
                    </div>
                  </div>
                )}
                <Textarea
                  placeholder="Yanıtınızı yazın..."
                  value={replyTexts[r.id] || ""}
                  onChange={e => setReplyTexts(prev => ({ ...prev, [r.id]: e.target.value }))}
                  rows={2}
                  className="rounded-lg resize-none text-sm"
                />
                <div className="flex gap-2">
                  <Button size="sm" className="rounded-pill bg-accent text-accent-foreground hover:bg-gold-hover text-xs h-8 px-4">
                    <MessageSquare className="w-3.5 h-3.5 mr-1" /> Yanıtla
                  </Button>
                  <Button size="sm" variant="outline" className="rounded-pill text-xs h-8 px-3 border-accent text-accent"
                    onClick={() => generateAiReply(r.id, r.guest.name)}>
                    <Sparkles className="w-3.5 h-3.5 mr-1" /> AI ile Yanıt Öner
                  </Button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
