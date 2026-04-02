import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, PlusCircle, MoreHorizontal, Star, Pause, Play, Trash2, Copy, Pencil, Camera } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useIsMobile } from "@/hooks/use-mobile";

type ExperienceStatus = "aktif" | "taslak" | "duraklatilmis" | "arsiv";

interface Experience {
  id: string;
  title: string;
  neighborhood: string;
  category: string;
  status: ExperienceStatus;
  price: number;
  bookings: number;
  rating: number | null;
  image: string;
}

const sampleExperiences: Experience[] = [
  { id: "1", title: "Kadıköy Sokak Lezzetleri Turu", neighborhood: "Kadıköy", category: "Gastronomi", status: "aktif", price: 350, bookings: 156, rating: 4.9, image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=96&h=96&fit=crop" },
  { id: "2", title: "Türk Kahvesi ve Fal Workshop", neighborhood: "Beyoğlu", category: "Gastronomi", status: "aktif", price: 280, bookings: 89, rating: 4.7, image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefda?w=96&h=96&fit=crop" },
  { id: "3", title: "Kuzguncuk Seramik Atölyesi", neighborhood: "Kuzguncuk", category: "Sanat & Zanaat", status: "aktif", price: 420, bookings: 67, rating: 4.8, image: "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=96&h=96&fit=crop" },
  { id: "4", title: "Bosphorus Yoga Serenity", neighborhood: "Beşiktaş", category: "Wellness", status: "aktif", price: 200, bookings: 45, rating: 4.6, image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=96&h=96&fit=crop" },
  { id: "5", title: "Istanbul Sokak Sanatı Keşfet", neighborhood: "Balat", category: "Sanat & Zanaat", status: "taslak", price: 180, bookings: 0, rating: null, image: "https://images.unsplash.com/photo-1499781350903-cb7f4ae4e814?w=96&h=96&fit=crop" },
  { id: "6", title: "Balat Fotoğraf Yürüyüşü", neighborhood: "Balat", category: "Sanat & Zanaat", status: "duraklatilmis", price: 250, bookings: 34, rating: 4.5, image: "https://images.unsplash.com/photo-1527838832700-5059252407fa?w=96&h=96&fit=crop" },
  { id: "7", title: "Boğaz'da Gün Batımı Yoga", neighborhood: "Ortaköy", category: "Wellness", status: "aktif", price: 180, bookings: 28, rating: 4.4, image: "https://images.unsplash.com/photo-1545389336-cf090694435e?w=96&h=96&fit=crop" },
  { id: "8", title: "Osmanlı Mutfağı Atölyesi", neighborhood: "Sultanahmet", category: "Gastronomi", status: "aktif", price: 450, bookings: 112, rating: 4.9, image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=96&h=96&fit=crop" },
  { id: "9", title: "Ebru Sanatı Workshop", neighborhood: "Nişantaşı", category: "Sanat & Zanaat", status: "aktif", price: 320, bookings: 53, rating: 4.7, image: "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=96&h=96&fit=crop" },
  { id: "10", title: "Haliç'te Meditasyon", neighborhood: "Eyüp", category: "Wellness", status: "arsiv", price: 150, bookings: 19, rating: 4.2, image: "https://images.unsplash.com/photo-1508672019048-805c876b67e2?w=96&h=96&fit=crop" },
];

const statusTabs: { value: ExperienceStatus | "all"; label: string }[] = [
  { value: "all", label: "Tümü" },
  { value: "aktif", label: "Aktif" },
  { value: "taslak", label: "Taslak" },
  { value: "duraklatilmis", label: "Duraklatılmış" },
  { value: "arsiv", label: "Arşiv" },
];

function StatusBadge({ status }: { status: ExperienceStatus }) {
  const map: Record<ExperienceStatus, { class: string; label: string; dot: string }> = {
    aktif: { class: "badge-aktif", label: "Aktif", dot: "bg-success" },
    taslak: { class: "badge-taslak", label: "Taslak", dot: "bg-muted-foreground" },
    duraklatilmis: { class: "badge-duraklatilmis", label: "Duraklatılmış", dot: "bg-warning" },
    arsiv: { class: "badge-taslak", label: "Arşiv", dot: "bg-muted-foreground" },
  };
  const s = map[status];
  return (
    <span className={`${s.class} inline-flex items-center gap-1.5`}>
      <span className={`w-1.5 h-1.5 rounded-full ${s.dot}`} />
      {s.label}
    </span>
  );
}

export default function ExperiencesPage() {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState<ExperienceStatus | "all">("all");
  const [sortBy, setSortBy] = useState("updated");
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const filtered = sampleExperiences.filter((e) => {
    if (search && !e.title.toLowerCase().includes(search.toLowerCase())) return false;
    if (categoryFilter !== "all" && e.category !== categoryFilter) return false;
    if (statusFilter !== "all" && e.status !== statusFilter) return false;
    return true;
  });

  const counts: Record<string, number> = { all: sampleExperiences.length };
  sampleExperiences.forEach((e) => { counts[e.status] = (counts[e.status] || 0) + 1; });

  const toggleSelect = (id: string) => setSelectedIds((prev) => prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]);
  const toggleAll = () => setSelectedIds((prev) => prev.length === filtered.length ? [] : filtered.map((e) => e.id));

  // Empty state
  if (sampleExperiences.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
        <div className="w-24 h-24 rounded-full bg-gold-tint flex items-center justify-center mb-6">
          <Camera className="w-10 h-10 text-accent" />
        </div>
        <h2 className="text-xl font-headline font-semibold text-primary mb-2">Henüz deneyim oluşturmadınız</h2>
        <p className="text-sm text-muted-foreground max-w-md mb-6">
          İstanbul'un en iyi deneyimlerini siz oluşturun. Link yapıştırın, 2 dakikada hazır.
        </p>
        <Button onClick={() => navigate("/org/create")} className="rounded-pill bg-accent text-accent-foreground hover:bg-gold-hover h-12 px-6">
          <PlusCircle className="w-4 h-4 mr-2" /> İlk Deneyiminizi Oluşturun
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Top Bar */}
      <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Deneyim ara..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 rounded-pill h-10 bg-input border-0"
          />
        </div>
        <div className="flex flex-wrap gap-2 items-center">
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="w-[140px] h-9 text-xs rounded-md">
              <SelectValue placeholder="Kategori" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tümü</SelectItem>
              <SelectItem value="Gastronomi">Gastronomi</SelectItem>
              <SelectItem value="Sanat & Zanaat">Sanat & Zanaat</SelectItem>
              <SelectItem value="Wellness">Wellness</SelectItem>
            </SelectContent>
          </Select>
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-[150px] h-9 text-xs rounded-md">
              <SelectValue placeholder="Sıralama" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="updated">Son Güncelleme</SelectItem>
              <SelectItem value="rating">Puan</SelectItem>
              <SelectItem value="bookings">Rezervasyon</SelectItem>
              <SelectItem value="price">Fiyat</SelectItem>
            </SelectContent>
          </Select>
          <Button onClick={() => navigate("/org/create")} className="rounded-pill bg-accent text-accent-foreground hover:bg-gold-hover h-9 px-4 text-sm">
            <PlusCircle className="w-4 h-4 mr-1.5" /> Yeni Deneyim
          </Button>
        </div>
      </div>

      {/* Status Tabs */}
      <div className="flex gap-1 border-b border-border overflow-x-auto pb-0">
        {statusTabs.map((tab) => (
          <button
            key={tab.value}
            onClick={() => setStatusFilter(tab.value)}
            className={`px-4 py-2.5 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${
              statusFilter === tab.value
                ? "border-accent text-accent"
                : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            {tab.label} ({counts[tab.value] || 0})
          </button>
        ))}
      </div>

      {/* No results */}
      {filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <Search className="w-10 h-10 text-muted-foreground/40 mb-3" />
          <p className="text-sm text-muted-foreground">Aramanızla eşleşen deneyim bulunamadı.</p>
        </div>
      ) : isMobile ? (
        /* Mobile Card Layout */
        <div className="grid grid-cols-1 gap-3">
          {filtered.map((exp) => (
            <div key={exp.id} className="bg-card rounded-lg card-shadow overflow-hidden transition-card hover:card-shadow-hover">
              <div className="relative aspect-[16/9]">
                <img src={exp.image} alt={exp.title} className="w-full h-full object-cover" />
                <span className="absolute top-2 left-2 badge-aktif bg-card/90 backdrop-blur-sm text-xs">{exp.category}</span>
                <span className="absolute top-2 right-2"><StatusBadge status={exp.status} /></span>
              </div>
              <div className="p-4 space-y-2">
                <h3 className="text-[15px] font-bold text-foreground leading-tight">{exp.title}</h3>
                <p className="text-xs text-muted-foreground">{exp.neighborhood}</p>
                <div className="flex items-center justify-between text-sm">
                  <span className="font-bold text-foreground">₺{exp.price}</span>
                  <span className="text-muted-foreground">{exp.bookings} rez.</span>
                  {exp.rating && (
                    <span className="flex items-center gap-1 text-accent">
                      <Star className="w-3.5 h-3.5 fill-accent" /> {exp.rating}
                    </span>
                  )}
                </div>
                <Button variant="ghost" size="sm" className="w-full text-primary mt-1">
                  <Pencil className="w-3.5 h-3.5 mr-1.5" /> Düzenle
                </Button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* Desktop Table */
        <div className="bg-card rounded-lg card-shadow overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-background hover:bg-background">
                <TableHead className="w-10">
                  <Checkbox
                    checked={selectedIds.length === filtered.length && filtered.length > 0}
                    onCheckedChange={toggleAll}
                  />
                </TableHead>
                <TableHead className="text-[11px] uppercase tracking-wider text-muted-foreground font-semibold">Deneyim</TableHead>
                <TableHead className="text-[11px] uppercase tracking-wider text-muted-foreground font-semibold">Kategori</TableHead>
                <TableHead className="text-[11px] uppercase tracking-wider text-muted-foreground font-semibold">Durum</TableHead>
                <TableHead className="text-[11px] uppercase tracking-wider text-muted-foreground font-semibold">Fiyat</TableHead>
                <TableHead className="text-[11px] uppercase tracking-wider text-muted-foreground font-semibold">Rez.</TableHead>
                <TableHead className="text-[11px] uppercase tracking-wider text-muted-foreground font-semibold">Puan</TableHead>
                <TableHead className="w-10" />
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((exp) => (
                <TableRow key={exp.id} className="group transition-card hover:bg-muted/30">
                  <TableCell>
                    <Checkbox checked={selectedIds.includes(exp.id)} onCheckedChange={() => toggleSelect(exp.id)} />
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <img src={exp.image} alt={exp.title} className="w-12 h-12 rounded-lg object-cover flex-shrink-0" />
                      <div>
                        <p className="text-sm font-semibold text-foreground leading-tight">{exp.title}</p>
                        <p className="text-xs text-muted-foreground mt-0.5">{exp.neighborhood}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-sm text-foreground">{exp.category}</TableCell>
                  <TableCell><StatusBadge status={exp.status} /></TableCell>
                  <TableCell className="text-sm font-medium text-foreground">₺{exp.price}</TableCell>
                  <TableCell className="text-sm text-foreground">{exp.bookings}</TableCell>
                  <TableCell>
                    {exp.rating ? (
                      <span className="flex items-center gap-1 text-sm text-accent font-medium">
                        <Star className="w-3.5 h-3.5 fill-accent" /> {exp.rating}
                      </span>
                    ) : (
                      <span className="text-sm text-muted-foreground">—</span>
                    )}
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity">
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-44">
                        <DropdownMenuItem><Pencil className="w-3.5 h-3.5 mr-2" /> Düzenle</DropdownMenuItem>
                        <DropdownMenuItem><Copy className="w-3.5 h-3.5 mr-2" /> Kopyala</DropdownMenuItem>
                        <DropdownMenuItem>
                          {exp.status === "aktif" ? <><Pause className="w-3.5 h-3.5 mr-2" /> Duraklat</> : <><Play className="w-3.5 h-3.5 mr-2" /> Etkinleştir</>}
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive focus:text-destructive">
                          <Trash2 className="w-3.5 h-3.5 mr-2" /> Sil
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      {/* Bulk Action Bar */}
      {selectedIds.length > 0 && (
        <div className="fixed bottom-20 lg:bottom-6 left-1/2 -translate-x-1/2 z-50 bg-primary text-primary-foreground rounded-pill px-6 py-3 card-shadow flex items-center gap-4 animate-fade-in">
          <span className="text-sm font-medium">{selectedIds.length} seçili:</span>
          <Button variant="ghost" size="sm" className="text-primary-foreground hover:bg-white/10 text-sm h-8">
            <Pause className="w-3.5 h-3.5 mr-1.5" /> Duraklat
          </Button>
          <Button variant="ghost" size="sm" className="text-primary-foreground hover:bg-white/10 text-sm h-8">
            Fiyat Güncelle
          </Button>
          <Button variant="ghost" size="sm" className="text-destructive-foreground hover:bg-destructive/20 text-sm h-8">
            <Trash2 className="w-3.5 h-3.5 mr-1.5" /> Sil
          </Button>
        </div>
      )}
    </div>
  );
}
