import { useState } from "react";
import { Search, Mail, Phone, Tag, ArrowLeft, ChevronRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";

interface Guest {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar: string;
  totalBookings: number;
  totalSpent: number;
  lastVisit: string;
  avgRating: number;
  tags: string[];
  bookingHistory: { date: string; experience: string; amount: number; status: string }[];
  notes: string;
}

const guests: Guest[] = [
  { id: "1", name: "Ayşe K.", email: "ayse@email.com", phone: "+90 532 111 2233", avatar: "A", totalBookings: 5, totalSpent: 1750, lastVisit: "2 gün önce", avgRating: 4.6, tags: ["VIP", "Tekrar Eden"], bookingHistory: [{ date: "13 Nis", experience: "Kadıköy Turu", amount: 350, status: "Tamamlandı" }, { date: "5 Nis", experience: "Kahve Workshop", amount: 280, status: "Tamamlandı" }, { date: "28 Mar", experience: "Seramik Atölyesi", amount: 420, status: "Tamamlandı" }], notes: "Vejetaryen, tur sırasında et içeren duraklara alternatif sunulmalı." },
  { id: "2", name: "Burak S.", email: "burak@email.com", phone: "+90 535 222 3344", avatar: "B", totalBookings: 3, totalSpent: 1050, lastVisit: "1 hafta önce", avgRating: 4.8, tags: ["Tekrar Eden"], bookingHistory: [{ date: "8 Nis", experience: "Kadıköy Turu", amount: 350, status: "Tamamlandı" }, { date: "1 Nis", experience: "Yoga", amount: 200, status: "Tamamlandı" }], notes: "" },
  { id: "3", name: "Ceren D.", email: "ceren@email.com", phone: "+90 533 333 4455", avatar: "C", totalBookings: 1, totalSpent: 350, lastVisit: "bugün", avgRating: 5.0, tags: ["Yeni"], bookingHistory: [{ date: "15 Nis", experience: "Kadıköy Turu", amount: 350, status: "Onaylandı" }], notes: "" },
  { id: "4", name: "Deniz F.", email: "deniz@email.com", phone: "+90 536 444 5566", avatar: "D", totalBookings: 8, totalSpent: 3200, lastVisit: "3 gün önce", avgRating: 4.3, tags: ["VIP", "Sadık"], bookingHistory: [{ date: "12 Nis", experience: "Seramik Atölyesi", amount: 420, status: "Tamamlandı" }, { date: "5 Nis", experience: "Kadıköy Turu", amount: 350, status: "Tamamlandı" }], notes: "Grup organizasyonlarında öncelikli iletişim." },
  { id: "5", name: "Emre G.", email: "emre@email.com", phone: "+90 537 555 6677", avatar: "E", totalBookings: 2, totalSpent: 480, lastVisit: "2 hafta önce", avgRating: 4.5, tags: [], bookingHistory: [{ date: "1 Nis", experience: "Yoga", amount: 200, status: "Tamamlandı" }, { date: "25 Mar", experience: "Kahve Workshop", amount: 280, status: "Tamamlandı" }], notes: "" },
  { id: "6", name: "Fatma H.", email: "fatma@email.com", phone: "+90 538 666 7788", avatar: "F", totalBookings: 4, totalSpent: 1400, lastVisit: "5 gün önce", avgRating: 4.7, tags: ["Tekrar Eden"], bookingHistory: [{ date: "10 Nis", experience: "Kadıköy Turu", amount: 350, status: "Tamamlandı" }], notes: "" },
  { id: "7", name: "Gökhan I.", email: "gokhan@email.com", phone: "+90 539 777 8899", avatar: "G", totalBookings: 6, totalSpent: 2100, lastVisit: "1 gün önce", avgRating: 4.9, tags: ["VIP", "Tekrar Eden", "Sadık"], bookingHistory: [{ date: "14 Nis", experience: "Osmanlı Mutfağı", amount: 450, status: "Tamamlandı" }], notes: "Yüksek değerli misafir." },
];

const segments = [
  { value: "all", label: "Tüm Misafirler", count: 156 },
  { value: "tekrar", label: "Tekrar Eden", count: 23 },
  { value: "yuksek", label: "Yüksek Değerli", count: 12 },
  { value: "yeni", label: "Yeni", count: 45 },
  { value: "vip", label: "VIP", count: 5 },
];

function TagBadge({ tag }: { tag: string }) {
  const cls: Record<string, string> = {
    VIP: "bg-accent/15 text-accent",
    "Tekrar Eden": "bg-primary/10 text-primary",
    Yeni: "bg-info/10 text-info",
    Sadık: "bg-success/10 text-success",
  };
  return <span className={cn("text-[11px] font-semibold px-2 py-0.5 rounded-full", cls[tag] || "bg-muted text-muted-foreground")}>{tag}</span>;
}

function GuestAvatar({ letter, size = 36 }: { letter: string; size?: number }) {
  return (
    <div className="rounded-full bg-navy-medium flex items-center justify-center text-white font-semibold flex-shrink-0" style={{ width: size, height: size, fontSize: size * 0.4 }}>
      {letter}
    </div>
  );
}

export default function GuestsPage() {
  const isMobile = useIsMobile();
  const [search, setSearch] = useState("");
  const [segment, setSegment] = useState("all");
  const [selectedGuest, setSelectedGuest] = useState<Guest | null>(null);

  const filtered = guests.filter(g => {
    if (search && !g.name.toLowerCase().includes(search.toLowerCase()) && !g.email.toLowerCase().includes(search.toLowerCase())) return false;
    if (segment === "all") return true;
    if (segment === "vip") return g.tags.includes("VIP");
    if (segment === "tekrar") return g.tags.includes("Tekrar Eden");
    if (segment === "yeni") return g.tags.includes("Yeni");
    if (segment === "yuksek") return g.totalSpent >= 1500;
    return true;
  });

  if (selectedGuest) {
    return (
      <div className="space-y-5">
        <Button variant="ghost" size="sm" onClick={() => setSelectedGuest(null)} className="text-primary gap-1.5">
          <ArrowLeft className="w-4 h-4" /> Misafirler
        </Button>
        {/* Header */}
        <div className="bg-card rounded-lg card-shadow p-5 flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <GuestAvatar letter={selectedGuest.avatar} size={64} />
          <div className="flex-1">
            <h2 className="text-xl font-headline font-semibold text-primary">{selectedGuest.name}</h2>
            <div className="flex flex-wrap gap-3 mt-1 text-sm text-muted-foreground">
              <span className="flex items-center gap-1"><Mail className="w-3.5 h-3.5" />{selectedGuest.email}</span>
              <span className="flex items-center gap-1"><Phone className="w-3.5 h-3.5" />{selectedGuest.phone}</span>
            </div>
            <div className="flex flex-wrap gap-1.5 mt-2">{selectedGuest.tags.map(t => <TagBadge key={t} tag={t} />)}</div>
          </div>
        </div>
        {/* Mini stats */}
        <div className="grid grid-cols-3 gap-3">
          {[
            { label: "Toplam Rez.", value: selectedGuest.totalBookings.toString() },
            { label: "Toplam Harcama", value: `₺${selectedGuest.totalSpent.toLocaleString("tr-TR")}` },
            { label: "Ort. Puan Verdiği", value: selectedGuest.avgRating.toString() },
          ].map(s => (
            <div key={s.label} className="bg-card rounded-lg card-shadow p-4 text-center">
              <p className="text-[11px] uppercase tracking-wider text-muted-foreground font-semibold">{s.label}</p>
              <p className="text-2xl font-bold text-foreground font-body mt-1">{s.value}</p>
            </div>
          ))}
        </div>
        {/* Booking history */}
        <div className="bg-card rounded-lg card-shadow p-5">
          <h3 className="text-base font-bold text-foreground mb-3">Rezervasyon Geçmişi</h3>
          <div className="space-y-3">
            {selectedGuest.bookingHistory.map((bh, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="flex flex-col items-center">
                  <div className="w-2.5 h-2.5 rounded-full bg-success border-2 border-success" />
                  {i < selectedGuest.bookingHistory.length - 1 && <div className="w-px h-8 bg-border" />}
                </div>
                <div className="flex-1 flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-foreground">{bh.experience}</p>
                    <p className="text-xs text-muted-foreground">{bh.date}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold text-foreground">₺{bh.amount}</p>
                    <span className="badge-aktif text-[10px]">{bh.status}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* Notes */}
        <div className="bg-card rounded-lg card-shadow p-5">
          <h3 className="text-base font-bold text-foreground mb-3">Notlar</h3>
          <Textarea placeholder="Misafir hakkında özel notlar..." defaultValue={selectedGuest.notes} rows={3} className="rounded-lg resize-none" />
          <Button size="sm" className="mt-3 rounded-pill bg-accent text-accent-foreground hover:bg-gold-hover">Kaydet</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Search */}
      <div className="relative w-full sm:w-64">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input placeholder="Misafir ara..." value={search} onChange={e => setSearch(e.target.value)} className="pl-9 rounded-pill h-10 bg-input border-0" />
      </div>
      {/* Segments */}
      <div className="flex gap-2 overflow-x-auto pb-1">
        {segments.map(s => (
          <button key={s.value} onClick={() => setSegment(s.value)}
            className={cn("px-3 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors",
              segment === s.value ? "bg-accent text-accent-foreground" : "bg-input text-foreground hover:bg-muted"
            )}>
            {s.label} ({s.count})
          </button>
        ))}
      </div>

      {isMobile ? (
        <div className="space-y-2">
          {filtered.map(g => (
            <button key={g.id} onClick={() => setSelectedGuest(g)} className="w-full bg-card rounded-lg card-shadow p-3 flex items-center gap-3 text-left transition-card hover:card-shadow-hover">
              <GuestAvatar letter={g.avatar} />
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-semibold text-foreground">{g.name}</p>
                  <span className="text-xs text-muted-foreground">{g.lastVisit}</span>
                </div>
                <div className="flex gap-1 mt-1">{g.tags.slice(0, 2).map(t => <TagBadge key={t} tag={t} />)}</div>
              </div>
              <ChevronRight className="w-4 h-4 text-muted-foreground flex-shrink-0" />
            </button>
          ))}
        </div>
      ) : (
        <div className="bg-card rounded-lg card-shadow overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-background hover:bg-background">
                {["Misafir", "Email", "Toplam Rez.", "Toplam Harcama", "Son Ziyaret", "Etiketler"].map(h => (
                  <TableHead key={h} className="text-[11px] uppercase tracking-wider text-muted-foreground font-semibold">{h}</TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map(g => (
                <TableRow key={g.id} className="cursor-pointer hover:bg-muted/30" onClick={() => setSelectedGuest(g)}>
                  <TableCell>
                    <div className="flex items-center gap-2.5">
                      <GuestAvatar letter={g.avatar} />
                      <span className="text-sm font-medium text-foreground">{g.name}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">{g.email}</TableCell>
                  <TableCell className="text-sm text-foreground">{g.totalBookings}</TableCell>
                  <TableCell className="text-sm font-medium text-foreground">₺{g.totalSpent.toLocaleString("tr-TR")}</TableCell>
                  <TableCell className="text-sm text-muted-foreground">{g.lastVisit}</TableCell>
                  <TableCell>
                    <div className="flex gap-1 flex-wrap">{g.tags.map(t => <TagBadge key={t} tag={t} />)}</div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}
