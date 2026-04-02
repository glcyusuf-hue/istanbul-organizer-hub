import { useState } from "react";
import { Search, Plus, QrCode, Check, X, MessageSquare, ChevronRight, CalendarIcon, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { tr } from "date-fns/locale";
import { useIsMobile } from "@/hooks/use-mobile";

type BookingStatus = "onaylandi" | "beklemede" | "iptal" | "tamamlandi";

interface Booking {
  id: string;
  refNo: string;
  date: string;
  time: string;
  guest: { name: string; email: string; phone: string; avatar: string };
  experience: string;
  status: BookingStatus;
  amount: number;
  source: string;
  checkedIn: boolean;
  guestCount: string;
  isToday: boolean;
}

const bookings: Booking[] = [
  { id: "1", refNo: "JI-2026-0089", date: "15 Nis", time: "14:00", guest: { name: "Ahmet M.", email: "ahmet@email.com", phone: "+90 532 123 4567", avatar: "A" }, experience: "Kadıköy Sokak Lezzetleri Turu", status: "onaylandi", amount: 350, source: "Website", checkedIn: false, guestCount: "2 Yetişkin", isToday: true },
  { id: "2", refNo: "JI-2026-0088", date: "15 Nis", time: "14:00", guest: { name: "Elif K.", email: "elif@email.com", phone: "+90 535 234 5678", avatar: "E" }, experience: "Kadıköy Sokak Lezzetleri Turu", status: "onaylandi", amount: 280, source: "Google", checkedIn: false, guestCount: "1 Yetişkin", isToday: true },
  { id: "3", refNo: "JI-2026-0087", date: "15 Nis", time: "18:00", guest: { name: "Can D.", email: "can@email.com", phone: "+90 533 345 6789", avatar: "C" }, experience: "Bosphorus Yoga Serenity", status: "onaylandi", amount: 200, source: "Instagram", checkedIn: false, guestCount: "1 Yetişkin", isToday: true },
  { id: "4", refNo: "JI-2026-0086", date: "16 Nis", time: "10:00", guest: { name: "Zeynep A.", email: "zeynep@email.com", phone: "+90 536 456 7890", avatar: "Z" }, experience: "Türk Kahvesi Workshop", status: "beklemede", amount: 280, source: "Website", checkedIn: false, guestCount: "2 Yetişkin, 1 Çocuk", isToday: false },
  { id: "5", refNo: "JI-2026-0085", date: "17 Nis", time: "14:00", guest: { name: "Burak S.", email: "burak@email.com", phone: "+90 537 567 8901", avatar: "B" }, experience: "Seramik Atölyesi", status: "onaylandi", amount: 420, source: "Direkt", checkedIn: false, guestCount: "1 Yetişkin", isToday: false },
  { id: "6", refNo: "JI-2026-0084", date: "18 Nis", time: "14:00", guest: { name: "Deniz F.", email: "deniz@email.com", phone: "+90 538 678 9012", avatar: "D" }, experience: "Kadıköy Sokak Lezzetleri Turu", status: "iptal", amount: 350, source: "Website", checkedIn: false, guestCount: "3 Yetişkin", isToday: false },
  { id: "7", refNo: "JI-2026-0080", date: "12 Nis", time: "14:00", guest: { name: "Fatma G.", email: "fatma@email.com", phone: "+90 539 789 0123", avatar: "F" }, experience: "Kadıköy Sokak Lezzetleri Turu", status: "tamamlandi", amount: 350, source: "Google", checkedIn: true, guestCount: "2 Yetişkin", isToday: false },
  { id: "8", refNo: "JI-2026-0079", date: "11 Nis", time: "10:00", guest: { name: "Gökhan H.", email: "gokhan@email.com", phone: "+90 530 890 1234", avatar: "G" }, experience: "Türk Kahvesi Workshop", status: "tamamlandi", amount: 280, source: "Website", checkedIn: true, guestCount: "1 Yetişkin", isToday: false },
  { id: "9", refNo: "JI-2026-0078", date: "10 Nis", time: "14:00", guest: { name: "Hakan I.", email: "hakan@email.com", phone: "+90 531 901 2345", avatar: "H" }, experience: "Bosphorus Yoga Serenity", status: "tamamlandi", amount: 200, source: "Instagram", checkedIn: true, guestCount: "1 Yetişkin", isToday: false },
  { id: "10", refNo: "JI-2026-0077", date: "9 Nis", time: "10:00", guest: { name: "İrem J.", email: "irem@email.com", phone: "+90 534 012 3456", avatar: "İ" }, experience: "Seramik Atölyesi", status: "iptal", amount: 420, source: "Direkt", checkedIn: false, guestCount: "2 Yetişkin", isToday: false },
];

const statusTabs = [
  { value: "all", label: "Tümü" },
  { value: "yaklasan", label: "Yaklaşan" },
  { value: "tamamlandi", label: "Tamamlanan" },
  { value: "iptal", label: "İptal" },
  { value: "beklemede", label: "Beklemede" },
];

function StatusBadge({ status }: { status: BookingStatus }) {
  const map: Record<BookingStatus, { cls: string; label: string }> = {
    onaylandi: { cls: "badge-onaylandi", label: "Onaylandı" },
    beklemede: { cls: "badge-beklemede", label: "Beklemede" },
    iptal: { cls: "badge-iptal", label: "İptal" },
    tamamlandi: { cls: "badge-aktif", label: "Tamamlandı" },
  };
  const s = map[status];
  return <span className={s.cls}>{s.label}</span>;
}

function GuestAvatar({ letter, size = 32 }: { letter: string; size?: number }) {
  return (
    <div
      className="rounded-full bg-navy-medium flex items-center justify-center text-white font-semibold flex-shrink-0"
      style={{ width: size, height: size, fontSize: size * 0.4 }}
    >
      {letter}
    </div>
  );
}

function BookingDetailPanel({ booking, onClose }: { booking: Booking; onClose: () => void }) {
  const brut = booking.amount;
  const komisyon = Math.round(brut * 0.08);
  const islem = Math.round(brut * 0.029);
  const net = brut - komisyon - islem;

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs text-muted-foreground font-medium">Rez. #{booking.refNo}</p>
          <StatusBadge status={booking.status} />
        </div>
      </div>

      {/* Guest Info */}
      <div className="bg-background rounded-lg p-4 space-y-3">
        <div className="flex items-center gap-3">
          <GuestAvatar letter={booking.guest.avatar} size={48} />
          <div>
            <p className="text-sm font-bold text-foreground">{booking.guest.name}</p>
            <p className="text-xs text-muted-foreground">{booking.guest.email}</p>
            <p className="text-xs text-muted-foreground">{booking.guest.phone}</p>
          </div>
        </div>
        <Button variant="ghost" size="sm" className="text-navy-medium text-xs px-0">Profili Gör →</Button>
      </div>

      {/* Experience */}
      <div className="space-y-1">
        <p className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">Deneyim</p>
        <p className="text-sm font-semibold text-foreground">{booking.experience}</p>
        <p className="text-xs text-muted-foreground">{booking.date} {booking.time} • {booking.guestCount}</p>
      </div>

      {/* Payment */}
      <div className="bg-background rounded-lg p-4 space-y-2">
        <p className="text-xs uppercase tracking-wider text-muted-foreground font-semibold mb-2">Ödeme Detayı</p>
        <div className="flex justify-between text-sm"><span className="text-muted-foreground">Brüt Tutar</span><span className="text-foreground">₺{brut}</span></div>
        <div className="flex justify-between text-sm"><span className="text-muted-foreground">Komisyon (%8)</span><span className="text-foreground">-₺{komisyon}</span></div>
        <div className="flex justify-between text-sm"><span className="text-muted-foreground">İşlem Ücreti (%2.9)</span><span className="text-foreground">-₺{islem}</span></div>
        <div className="border-t border-border my-2" />
        <div className="flex justify-between text-sm font-bold"><span>Net Tutar</span><span className="text-foreground">₺{net}</span></div>
      </div>

      {/* QR Code placeholder */}
      <div className="flex justify-center">
        <div className="w-36 h-36 rounded-lg bg-muted flex items-center justify-center">
          <QrCode className="w-16 h-16 text-muted-foreground/40" />
        </div>
      </div>

      {/* Timeline */}
      <div className="space-y-0">
        <p className="text-xs uppercase tracking-wider text-muted-foreground font-semibold mb-3">Zaman Çizelgesi</p>
        {[
          { label: "Oluşturuldu", time: "10 Nis 09:15", done: true },
          { label: "Ödeme alındı", time: "10 Nis 09:16", done: true },
          { label: "Onaylandı", time: "10 Nis 09:16", done: true },
          { label: "Check-in bekleniyor", time: "", done: false },
        ].map((step, i) => (
          <div key={i} className="flex gap-3 items-start">
            <div className="flex flex-col items-center">
              <div className={cn("w-3 h-3 rounded-full border-2 mt-0.5", step.done ? "bg-success border-success" : "border-muted-foreground/30 bg-card")} />
              {i < 3 && <div className="w-px h-6 bg-border" />}
            </div>
            <div className="pb-4">
              <p className={cn("text-sm", step.done ? "text-foreground" : "text-muted-foreground")}>{step.label}</p>
              {step.time && <p className="text-xs text-muted-foreground">{step.time}</p>}
            </div>
          </div>
        ))}
      </div>

      {/* Actions */}
      <div className="flex gap-2 pt-2">
        <Button className="flex-1 rounded-pill bg-accent text-accent-foreground hover:bg-gold-hover h-10 text-sm">
          <Check className="w-4 h-4 mr-1.5" /> Check-in Yap
        </Button>
        <Button variant="outline" className="flex-1 rounded-pill border-destructive text-destructive hover:bg-destructive/5 h-10 text-sm">
          <X className="w-4 h-4 mr-1.5" /> İptal Et
        </Button>
      </div>
      <Button variant="ghost" className="w-full text-primary text-sm">
        <MessageSquare className="w-4 h-4 mr-1.5" /> Mesaj Gönder
      </Button>
    </div>
  );
}

function ManualBookingDialog() {
  const [date, setDate] = useState<Date>();

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="rounded-pill h-9 px-4 text-sm border-primary text-primary">
          <Plus className="w-4 h-4 mr-1.5" /> Manuel Rezervasyon
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md rounded-2xl">
        <DialogHeader>
          <DialogTitle className="font-headline text-primary">Manuel Rezervasyon</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-2">
          <div className="space-y-1.5">
            <Label className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">Misafir Adı</Label>
            <Input placeholder="Ad Soyad" className="rounded-lg h-10" />
          </div>
          <div className="space-y-1.5">
            <Label className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">Telefon</Label>
            <Input placeholder="+90 5XX XXX XXXX" className="rounded-lg h-10" />
          </div>
          <div className="space-y-1.5">
            <Label className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">Deneyim</Label>
            <Select>
              <SelectTrigger className="rounded-lg h-10"><SelectValue placeholder="Deneyim seçin" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="kadikoy">Kadıköy Sokak Lezzetleri Turu</SelectItem>
                <SelectItem value="kahve">Türk Kahvesi Workshop</SelectItem>
                <SelectItem value="seramik">Seramik Atölyesi</SelectItem>
                <SelectItem value="yoga">Bosphorus Yoga Serenity</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">Tarih</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className={cn("w-full justify-start text-left font-normal h-10 rounded-lg", !date && "text-muted-foreground")}>
                    <CalendarIcon className="w-4 h-4 mr-2" />
                    {date ? format(date, "d MMM yyyy", { locale: tr }) : "Tarih seçin"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar mode="single" selected={date} onSelect={setDate} className="p-3 pointer-events-auto" />
                </PopoverContent>
              </Popover>
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">Saat</Label>
              <Select>
                <SelectTrigger className="rounded-lg h-10"><SelectValue placeholder="Saat" /></SelectTrigger>
                <SelectContent>
                  {["10:00","11:00","12:00","13:00","14:00","15:00","16:00","17:00","18:00","19:00"].map(t => (
                    <SelectItem key={t} value={t}>{t}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="space-y-1.5">
            <Label className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">Kişi Sayısı</Label>
            <Input type="number" placeholder="2" min={1} className="rounded-lg h-10" />
          </div>
          <div className="space-y-1.5">
            <Label className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">Notlar</Label>
            <Textarea placeholder="Özel notlar..." className="rounded-lg resize-none" rows={2} />
          </div>
        </div>
        <DialogFooter>
          <Button className="w-full rounded-pill bg-accent text-accent-foreground hover:bg-gold-hover h-10">Oluştur</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default function BookingsPage() {
  const isMobile = useIsMobile();
  const [statusFilter, setStatusFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [expFilter, setExpFilter] = useState("all");
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [checkedInIds, setCheckedInIds] = useState<string[]>([]);

  const todayBookings = bookings.filter(b => b.isToday && b.status === "onaylandi");

  const filtered = bookings.filter((b) => {
    if (search && !b.guest.name.toLowerCase().includes(search.toLowerCase()) && !b.refNo.toLowerCase().includes(search.toLowerCase())) return false;
    if (expFilter !== "all" && b.experience !== expFilter) return false;
    if (statusFilter === "all") return true;
    if (statusFilter === "yaklasan") return b.status === "onaylandi" || b.status === "beklemede";
    return b.status === statusFilter;
  });

  const counts: Record<string, number> = {
    all: bookings.length,
    yaklasan: bookings.filter(b => b.status === "onaylandi" || b.status === "beklemede").length,
    tamamlandi: bookings.filter(b => b.status === "tamamlandi").length,
    iptal: bookings.filter(b => b.status === "iptal").length,
    beklemede: bookings.filter(b => b.status === "beklemede").length,
  };

  const toggleCheckIn = (id: string) => {
    setCheckedInIds(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };

  return (
    <div className="space-y-4">
      {/* Today's Check-in */}
      {todayBookings.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <h3 className="text-base font-bold text-foreground">Bugünkü Check-in</h3>
            <span className="badge-aktif">{todayBookings.length}</span>
          </div>
          <div className="flex gap-3 overflow-x-auto pb-2">
            {todayBookings.map(b => (
              <div key={b.id} className="bg-card rounded-lg card-shadow p-3 flex items-center gap-3 min-w-[280px] flex-shrink-0">
                <GuestAvatar letter={b.guest.avatar} size={40} />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-foreground truncate">{b.guest.name}</p>
                  <p className="text-xs text-muted-foreground">{b.time} • {b.experience.split(" ").slice(0,2).join(" ")}...</p>
                  <p className="text-xs text-muted-foreground">{b.guestCount}</p>
                </div>
                <button
                  onClick={() => toggleCheckIn(b.id)}
                  className={cn(
                    "w-12 h-12 rounded-lg flex items-center justify-center font-semibold text-xs transition-all flex-shrink-0",
                    checkedInIds.includes(b.id)
                      ? "bg-success text-success-foreground"
                      : "bg-muted text-muted-foreground hover:bg-success/10 hover:text-success"
                  )}
                >
                  <Check className="w-5 h-5" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Top Bar: Filters */}
      <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input placeholder="Misafir adı veya rez. no ara..." value={search} onChange={e => setSearch(e.target.value)} className="pl-9 rounded-pill h-10 bg-input border-0" />
        </div>
        <div className="flex flex-wrap gap-2 items-center">
          <Select value={expFilter} onValueChange={setExpFilter}>
            <SelectTrigger className="w-[160px] h-9 text-xs rounded-md"><SelectValue placeholder="Deneyim" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tüm Deneyimler</SelectItem>
              <SelectItem value="Kadıköy Sokak Lezzetleri Turu">Kadıköy Turu</SelectItem>
              <SelectItem value="Türk Kahvesi Workshop">Kahve Workshop</SelectItem>
              <SelectItem value="Kuzguncuk Seramik Atölyesi">Seramik Atölyesi</SelectItem>
              <SelectItem value="Bosphorus Yoga Serenity">Yoga Serenity</SelectItem>
            </SelectContent>
          </Select>
          <ManualBookingDialog />
        </div>
      </div>

      {/* Status Tabs */}
      <div className="flex gap-1 border-b border-border overflow-x-auto pb-0">
        {statusTabs.map(tab => (
          <button
            key={tab.value}
            onClick={() => setStatusFilter(tab.value)}
            className={cn(
              "px-4 py-2.5 text-sm font-medium whitespace-nowrap border-b-2 transition-colors",
              statusFilter === tab.value ? "border-accent text-accent" : "border-transparent text-muted-foreground hover:text-foreground"
            )}
          >
            {tab.label} ({counts[tab.value] || 0})
          </button>
        ))}
      </div>

      {/* Content */}
      {filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center mb-4">
            <CalendarIcon className="w-8 h-8 text-muted-foreground/40" />
          </div>
          <h3 className="text-lg font-headline font-semibold text-primary mb-1">Henüz rezervasyonunuz yok</h3>
          <p className="text-sm text-muted-foreground max-w-sm">Deneyimlerinize slot ekleyin ve misafirlerin sizi bulmalarını bekleyin.</p>
        </div>
      ) : isMobile ? (
        /* Mobile Card Layout */
        <div className="space-y-3">
          {filtered.map(b => (
            <Sheet key={b.id}>
              <SheetTrigger asChild>
                <button
                  className="w-full bg-card rounded-lg card-shadow p-4 flex items-center gap-3 text-left transition-card hover:card-shadow-hover"
                  onClick={() => setSelectedBooking(b)}
                >
                  <GuestAvatar letter={b.guest.avatar} size={40} />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <p className="text-sm font-semibold text-foreground truncate">{b.guest.name}</p>
                      <StatusBadge status={b.status} />
                    </div>
                    <p className="text-xs text-muted-foreground mt-0.5">{b.date} {b.time} • {b.experience.split(" ").slice(0,3).join(" ")}</p>
                    <div className="flex items-center justify-between mt-1">
                      <span className="text-sm font-bold text-foreground">₺{b.amount}</span>
                      <span className="text-xs text-muted-foreground">{b.source}</span>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                </button>
              </SheetTrigger>
              <SheetContent className="w-full sm:max-w-md overflow-y-auto">
                <SheetHeader><SheetTitle className="sr-only">Rezervasyon Detayı</SheetTitle></SheetHeader>
                <BookingDetailPanel booking={b} onClose={() => {}} />
              </SheetContent>
            </Sheet>
          ))}
        </div>
      ) : (
        /* Desktop Table + Sheet */
        <div className="bg-card rounded-lg card-shadow overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-background hover:bg-background">
                <TableHead className="text-[11px] uppercase tracking-wider text-muted-foreground font-semibold">Tarih & Saat</TableHead>
                <TableHead className="text-[11px] uppercase tracking-wider text-muted-foreground font-semibold">Misafir</TableHead>
                <TableHead className="text-[11px] uppercase tracking-wider text-muted-foreground font-semibold">Deneyim</TableHead>
                <TableHead className="text-[11px] uppercase tracking-wider text-muted-foreground font-semibold">Durum</TableHead>
                <TableHead className="text-[11px] uppercase tracking-wider text-muted-foreground font-semibold">Tutar</TableHead>
                <TableHead className="text-[11px] uppercase tracking-wider text-muted-foreground font-semibold">Kaynak</TableHead>
                <TableHead className="text-[11px] uppercase tracking-wider text-muted-foreground font-semibold text-center">Check-in</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map(b => (
                <Sheet key={b.id}>
                  <SheetTrigger asChild>
                    <TableRow
                      className="group cursor-pointer transition-card hover:bg-muted/30"
                      onClick={() => setSelectedBooking(b)}
                    >
                      <TableCell className="text-sm text-foreground whitespace-nowrap">
                        <span className="font-medium">{b.date}</span> <span className="text-muted-foreground">{b.time}</span>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2.5">
                          <GuestAvatar letter={b.guest.avatar} />
                          <span className="text-sm font-medium text-foreground">{b.guest.name}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-sm text-foreground max-w-[200px] truncate">{b.experience}</TableCell>
                      <TableCell><StatusBadge status={b.status} /></TableCell>
                      <TableCell className="text-sm font-medium text-foreground">₺{b.amount}</TableCell>
                      <TableCell className="text-sm text-muted-foreground">{b.source}</TableCell>
                      <TableCell className="text-center">
                        {b.status === "tamamlandi" || checkedInIds.includes(b.id) ? (
                          <span className="inline-flex w-6 h-6 rounded-full bg-success/10 items-center justify-center"><Check className="w-3.5 h-3.5 text-success" /></span>
                        ) : (
                          <span className="text-sm text-muted-foreground">—</span>
                        )}
                      </TableCell>
                    </TableRow>
                  </SheetTrigger>
                  <SheetContent className="w-full sm:max-w-[420px] overflow-y-auto">
                    <SheetHeader><SheetTitle className="sr-only">Rezervasyon Detayı</SheetTitle></SheetHeader>
                    <BookingDetailPanel booking={b} onClose={() => {}} />
                  </SheetContent>
                </Sheet>
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      {/* QR floating button (mobile) */}
      {isMobile && todayBookings.length > 0 && (
        <button className="fixed bottom-24 right-4 z-50 w-14 h-14 rounded-full bg-primary text-primary-foreground card-shadow flex items-center justify-center">
          <QrCode className="w-6 h-6" />
        </button>
      )}
    </div>
  );
}
