import {
  TrendingUp, CalendarCheck, Star, Clock, MapPin, Percent,
  PlusCircle, CalendarPlus, UserPlus, DollarSign, MessageCircle, Mail,
  CircleCheck, CircleX, CreditCard, Sparkles, CheckCircle, Circle
} from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const kpis = [
  { icon: TrendingUp, label: "AYLIK GELİR", value: "₺12,450", change: "+12%", positive: true, tintClass: "bg-gold-tint text-accent" },
  { icon: CalendarCheck, label: "TOPLAM REZERVASYON", value: "34", change: "+8%", positive: true, tintClass: "bg-info/10 text-info" },
  { icon: Star, label: "ORTALAMA PUAN", value: "4.8", change: "+0.2", positive: true, tintClass: "bg-gold-tint text-accent" },
  { icon: Clock, label: "YANIT SÜRESİ", value: "2.3 saat", change: "-15%", positive: true, tintClass: "bg-primary/10 text-primary" },
  { icon: MapPin, label: "BUGÜNKÜ SLOT", value: "3", change: "", positive: true, tintClass: "bg-info/10 text-info" },
  { icon: Percent, label: "DOLULUK ORANI", value: "%78", change: "+5%", positive: true, tintClass: "bg-primary/10 text-primary" },
];

const revenueData = Array.from({ length: 30 }, (_, i) => ({
  day: `${i + 1}`,
  value: 200 + Math.floor(Math.random() * 400 + Math.sin(i / 3) * 150),
}));

const schedule = [
  { time: "10:00 - 12:00", name: "Türk Kahvesi Workshop", current: 6, max: 10 },
  { time: "14:00 - 17:00", name: "Kadıköy Sokak Lezzetleri", current: 12, max: 12 },
  { time: "18:00 - 20:00", name: "Bosphorus Yoga Serenity", current: 3, max: 8 },
];

const activities = [
  { icon: CircleCheck, color: "text-success", text: 'Ahmet M. "Kadıköy Turu" için rezervasyon yaptı', time: "12 dk önce" },
  { icon: Star, color: "text-accent", text: "Elif K. 5 yıldız yorum bıraktı", time: "1 saat önce" },
  { icon: CircleX, color: "text-destructive", text: 'Zeynep A. "Yoga" rezervasyonunu iptal etti', time: "3 saat önce" },
  { icon: CircleCheck, color: "text-success", text: 'Can D. "Kahve Workshop" için rezervasyon yaptı', time: "5 saat önce" },
  { icon: CreditCard, color: "text-primary", text: "₺2,340 ödeme hesabınıza aktarıldı", time: "dün" },
];

const quickActions = [
  { icon: PlusCircle, label: "Yeni Deneyim" },
  { icon: CalendarPlus, label: "Slot Ekle" },
  { icon: UserPlus, label: "Manuel Rez." },
  { icon: DollarSign, label: "Gelir" },
  { icon: MessageCircle, label: "Yorum Yanıtla" },
  { icon: Mail, label: "Mesaj" },
];

const checklistItems = [
  { text: "Hesabınızı oluşturun", done: true },
  { text: "Profilinizi tamamlayın", done: true },
  { text: "İlk deneyiminizi ekleyin", done: true },
  { text: "IBAN bilgilerinizi girin", done: false },
  { text: "İlk slotunuzu açın", done: false },
];

export default function DashboardPage() {
  return (
    <div className="space-y-6 lg:space-y-8">
      {/* Greeting */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 animate-fade-in">
        <div>
          <h2 className="text-2xl lg:text-[28px] font-headline font-semibold text-primary">
            Günaydın, Mehmet!
          </h2>
          <p className="text-sm text-muted-foreground mt-1">
            Bugün 3 etkinliğiniz var. Harika bir gün olacak!
          </p>
        </div>
        <p className="text-sm text-muted-foreground">3 Nisan 2026, Cuma</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 lg:gap-4">
        {kpis.map((kpi, i) => (
          <div
            key={kpi.label}
            className="bg-card rounded-lg p-4 lg:p-5 card-shadow transition-card hover:card-shadow-hover animate-fade-in"
            style={{ animationDelay: `${i * 50}ms` }}
          >
            <div className={`w-9 h-9 rounded-full flex items-center justify-center ${kpi.tintClass} mb-3`}>
              <kpi.icon size={18} />
            </div>
            <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground mb-1">
              {kpi.label}
            </p>
            <div className="flex items-end justify-between">
              <span className="text-2xl lg:text-[28px] font-bold text-primary">{kpi.value}</span>
              {kpi.change && (
                <span className="badge-aktif text-[11px]">{kpi.change}</span>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Revenue Chart + Today's Schedule */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 lg:gap-6">
        <div className="lg:col-span-3 bg-card rounded-lg p-4 lg:p-6 card-shadow">
          <h3 className="text-base font-bold text-primary mb-4">Son 30 Gün Gelir</h3>
          <div className="h-52">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueData}>
                <defs>
                  <linearGradient id="goldGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#B7950B" stopOpacity={0.3} />
                    <stop offset="100%" stopColor="#B7950B" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="day" tick={{ fontSize: 11, fill: '#7F8C8D' }} axisLine={false} tickLine={false} interval={4} />
                <YAxis tick={{ fontSize: 11, fill: '#7F8C8D' }} axisLine={false} tickLine={false} width={40} />
                <Tooltip
                  contentStyle={{ borderRadius: 8, border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', fontSize: 13 }}
                  formatter={(value: number) => [`₺${value}`, 'Gelir']}
                />
                <Area type="monotone" dataKey="value" stroke="#B7950B" strokeWidth={2} fill="url(#goldGrad)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="lg:col-span-2 bg-card rounded-lg p-4 lg:p-6 card-shadow">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base font-bold text-primary">Bugünkü Program</h3>
            <button className="text-sm font-medium text-accent hover:text-gold-hover">Tümünü Gör</button>
          </div>
          <div className="space-y-3">
            {schedule.map((slot) => {
              const pct = (slot.current / slot.max) * 100;
              const isFull = slot.current >= slot.max;
              return (
                <div key={slot.time} className="border border-border rounded-md p-3">
                  <p className="text-sm font-bold text-primary">{slot.time}</p>
                  <p className="text-sm font-medium text-foreground mt-0.5">{slot.name}</p>
                  <div className="mt-2 flex items-center gap-2">
                    <div className="flex-1 h-1 rounded-full bg-muted">
                      <div
                        className={`h-full rounded-full ${isFull ? 'bg-destructive' : 'bg-primary'}`}
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                    <span className="text-[11px] text-muted-foreground whitespace-nowrap">
                      {slot.current}/{slot.max}
                    </span>
                    {isFull && <span className="badge-iptal text-[10px]">DOLU</span>}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Activity Feed + AI Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
        <div className="bg-card rounded-lg p-4 lg:p-6 card-shadow">
          <h3 className="text-base font-bold text-primary mb-4">Son Aktiviteler</h3>
          <div className="divide-y divide-border">
            {activities.map((act, i) => (
              <div key={i} className="flex items-center gap-3 py-3 first:pt-0 last:pb-0">
                <act.icon size={18} className={act.color} />
                <p className="flex-1 text-sm text-foreground">{act.text}</p>
                <span className="text-[11px] text-muted-foreground whitespace-nowrap">{act.time}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gold-tint rounded-lg p-4 lg:p-6 card-shadow">
          <div className="flex items-center gap-2 mb-3">
            <Sparkles size={16} className="text-accent" />
            <span className="text-[11px] font-semibold uppercase tracking-wider text-accent">AI ÖNERİ</span>
          </div>
          <p className="text-sm text-foreground leading-relaxed mb-4">
            Cuma akşam slotlarınız %40 daha hızlı doluyor. Premium fiyatlandırma ile geliri artırabilirsiniz.
          </p>
          <button className="bg-accent text-accent-foreground text-sm font-semibold px-4 py-2 rounded-pill hover:bg-gold-hover transition-colors">
            Fiyatlandırmaya Git
          </button>
          <p className="text-xs text-muted-foreground mt-4 leading-relaxed">
            💡 İpucu: Fotoğraflara insanlar eklemek, tıklama oranını %25 artırıyor.
          </p>
        </div>
      </div>

      {/* Quick Actions */}
      <div>
        <h3 className="text-base font-bold text-primary mb-3">Hızlı İşlemler</h3>
        <div className="grid grid-cols-3 lg:grid-cols-6 gap-3">
          {quickActions.map((action) => (
            <button
              key={action.label}
              className="bg-card rounded-lg p-4 card-shadow flex flex-col items-center gap-2 transition-card hover:card-shadow-hover"
            >
              <action.icon size={22} className="text-primary" />
              <span className="text-[11px] font-medium text-muted-foreground">{action.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Onboarding Checklist */}
      <div className="bg-card rounded-lg p-4 lg:p-6 card-shadow">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-base font-bold text-primary">Başlangıç Rehberi</h3>
          <span className="badge-beklemede text-[11px]">3/5 tamamlandı</span>
        </div>
        <div className="h-1.5 rounded-full bg-muted mb-4">
          <div className="h-full rounded-full bg-accent" style={{ width: "60%" }} />
        </div>
        <div className="space-y-2.5">
          {checklistItems.map((item) => (
            <div key={item.text} className="flex items-center gap-3">
              {item.done ? (
                <CheckCircle size={18} className="text-success flex-shrink-0" />
              ) : (
                <Circle size={18} className="text-muted-foreground flex-shrink-0" />
              )}
              <span className={`text-sm ${item.done ? "line-through text-muted-foreground" : "text-foreground"}`}>
                {item.text}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
