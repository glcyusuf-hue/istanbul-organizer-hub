import { useState } from "react";
import { TrendingUp, Clock, Users, Sparkles, Plus, Pencil, Trash2, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";

const experiences = [
  { name: "Kadıköy Sokak Lezzetleri", price: 350, rules: 3 },
  { name: "Türk Kahvesi Workshop", price: 280, rules: 1 },
  { name: "Seramik Atölyesi", price: 420, rules: 2 },
  { name: "Bosphorus Yoga", price: 200, rules: 0 },
];

const ageBands = [
  { label: "Yetişkin", pct: 100 },
  { label: "Çocuk", pct: 60 },
  { label: "Yaşlı", pct: 80 },
  { label: "Öğrenci", pct: 70 },
];

const dynamicRules = [
  { id: "1", condition: "doluluk > %80", action: "fiyat +%15", icon: TrendingUp, enabled: true, applied: 12 },
  { id: "2", condition: "son 48 saat", action: "fiyat +%10", icon: Clock, enabled: true, applied: 8 },
  { id: "3", condition: "grup 6+ kişi", action: "fiyat -%20", icon: Users, enabled: false, applied: 0 },
];

const promoCodes = [
  { code: "HOSGELDIN", discount: "%20", used: 23, limit: 50, expiry: "30 Nis 2026", status: "aktif" },
  { code: "ARKADAS10", discount: "%10", used: 8, limit: "∞", expiry: "31 May 2026", status: "aktif" },
  { code: "YAZDENEYIM", discount: "₺50", used: 50, limit: 50, expiry: "15 Mar 2026", status: "tukendi" },
];

const seasons = [
  { name: "Kış Fiyatı", range: "Oca - Mar", modifier: "-10%", color: "bg-info/10 text-info" },
  { name: "Normal", range: "Nis - May", modifier: "—", color: "bg-muted text-muted-foreground" },
  { name: "Yaz Fiyatı", range: "Haz - Ağu", modifier: "+20%", color: "bg-warning/10 text-warning" },
  { name: "Bayram", range: "Ramazan/Kurban", modifier: "+30%", color: "bg-accent/10 text-accent" },
];

export default function PricingPage() {
  const [ruleStates, setRuleStates] = useState<Record<string, boolean>>(
    Object.fromEntries(dynamicRules.map(r => [r.id, r.enabled]))
  );
  const [expandedExp, setExpandedExp] = useState<string | null>(null);

  return (
    <div className="space-y-4">
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList className="bg-muted p-1 rounded-lg h-auto flex-wrap">
          {[
            { value: "overview", label: "Genel Bakış" },
            { value: "age", label: "Yaş Bandı" },
            { value: "dynamic", label: "Dinamik Kurallar" },
            { value: "promo", label: "Promosyon Kodları" },
            { value: "season", label: "Sezon Fiyatları" },
          ].map(t => (
            <TabsTrigger key={t.value} value={t.value} className="rounded-md text-sm data-[state=active]:bg-card data-[state=active]:shadow-sm">
              {t.label}
            </TabsTrigger>
          ))}
        </TabsList>

        {/* Overview */}
        <TabsContent value="overview" className="space-y-4">
          <div className="bg-card rounded-lg card-shadow overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-background hover:bg-background">
                  <TableHead className="text-[11px] uppercase tracking-wider text-muted-foreground font-semibold">Deneyim</TableHead>
                  <TableHead className="text-[11px] uppercase tracking-wider text-muted-foreground font-semibold">Temel Fiyat</TableHead>
                  <TableHead className="text-[11px] uppercase tracking-wider text-muted-foreground font-semibold">Aktif Kural</TableHead>
                  <TableHead className="text-[11px] uppercase tracking-wider text-muted-foreground font-semibold" />
                </TableRow>
              </TableHeader>
              <TableBody>
                {experiences.map(e => (
                  <TableRow key={e.name} className="hover:bg-muted/30">
                    <TableCell className="text-sm font-medium text-foreground">{e.name}</TableCell>
                    <TableCell className="text-sm text-foreground">₺{e.price}</TableCell>
                    <TableCell className="text-sm text-muted-foreground">{e.rules} kural</TableCell>
                    <TableCell><Button variant="ghost" size="sm" className="text-navy-medium text-xs">Düzenle →</Button></TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          {/* AI Suggestion */}
          <div className="bg-gold-tint rounded-lg p-4 flex gap-3 items-start border border-accent/20">
            <Sparkles className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm text-foreground">Pazar brunch deneyiminiz piyasa ortalamasının %15 altında. ₺400'e çıkarmayı düşünün.</p>
              <Button size="sm" className="mt-2 rounded-pill bg-accent text-accent-foreground hover:bg-gold-hover text-xs h-7 px-3">Fiyat Güncelle</Button>
            </div>
          </div>
        </TabsContent>

        {/* Age Bands */}
        <TabsContent value="age" className="space-y-3">
          {experiences.map(exp => (
            <div key={exp.name} className="bg-card rounded-lg card-shadow overflow-hidden">
              <button
                onClick={() => setExpandedExp(expandedExp === exp.name ? null : exp.name)}
                className="w-full p-4 flex items-center justify-between text-left hover:bg-muted/20"
              >
                <div>
                  <span className="text-sm font-semibold text-foreground">{exp.name}</span>
                  <span className="text-xs text-muted-foreground ml-2">(₺{exp.price} temel)</span>
                </div>
                <span className="text-xs text-muted-foreground">{expandedExp === exp.name ? "▲" : "▼"}</span>
              </button>
              {expandedExp === exp.name && (
                <div className="px-4 pb-4 space-y-3">
                  {ageBands.map(band => (
                    <div key={band.label} className="flex items-center gap-4">
                      <span className="text-sm text-foreground w-20">{band.label}</span>
                      <span className="text-sm font-bold text-foreground w-16">₺{Math.round(exp.price * band.pct / 100)}</span>
                      <span className="text-xs text-muted-foreground w-10">{band.pct}%</span>
                      <div className="flex-1">
                        <Slider defaultValue={[band.pct]} max={100} step={5} className="w-full" />
                      </div>
                    </div>
                  ))}
                  <Button size="sm" className="rounded-pill bg-accent text-accent-foreground hover:bg-gold-hover text-xs mt-2">Kaydet</Button>
                </div>
              )}
            </div>
          ))}
        </TabsContent>

        {/* Dynamic Rules */}
        <TabsContent value="dynamic" className="space-y-3">
          {dynamicRules.map(rule => (
            <div key={rule.id} className="bg-card rounded-lg card-shadow p-4 flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center flex-shrink-0">
                <rule.icon className="w-5 h-5 text-primary" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold text-foreground">EĞER <span className="text-accent">{rule.condition}</span> İSE <span className="text-navy-medium">{rule.action}</span></p>
                <p className="text-xs text-muted-foreground mt-0.5">{rule.applied} kez uygulandı</p>
              </div>
              <Switch
                checked={ruleStates[rule.id]}
                onCheckedChange={(v) => setRuleStates(prev => ({ ...prev, [rule.id]: v }))}
              />
            </div>
          ))}
          <Button variant="outline" className="rounded-pill border-primary text-primary text-sm">
            <Plus className="w-4 h-4 mr-1.5" /> Yeni Kural Ekle
          </Button>
        </TabsContent>

        {/* Promo Codes */}
        <TabsContent value="promo" className="space-y-4">
          <div className="flex justify-end">
            <Dialog>
              <DialogTrigger asChild>
                <Button className="rounded-pill bg-accent text-accent-foreground hover:bg-gold-hover text-sm">
                  <Plus className="w-4 h-4 mr-1.5" /> Yeni Kod Oluştur
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md rounded-2xl">
                <DialogHeader><DialogTitle className="font-headline text-primary">Yeni Promosyon Kodu</DialogTitle></DialogHeader>
                <div className="space-y-4 py-2">
                  <div className="space-y-1.5">
                    <Label className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">Kod</Label>
                    <Input placeholder="HOSGELDIN" className="rounded-lg h-10 uppercase" />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1.5">
                      <Label className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">İndirim Tipi</Label>
                      <Select><SelectTrigger className="rounded-lg h-10"><SelectValue placeholder="Seçin" /></SelectTrigger>
                        <SelectContent><SelectItem value="pct">Yüzde (%)</SelectItem><SelectItem value="fix">Sabit (₺)</SelectItem></SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-1.5">
                      <Label className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">Değer</Label>
                      <Input type="number" placeholder="20" className="rounded-lg h-10" />
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">Kullanım Limiti</Label>
                    <Input type="number" placeholder="50" className="rounded-lg h-10" />
                  </div>
                </div>
                <DialogFooter><Button className="w-full rounded-pill bg-accent text-accent-foreground hover:bg-gold-hover h-10">Oluştur</Button></DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
          <div className="bg-card rounded-lg card-shadow overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-background hover:bg-background">
                  {["Kod", "İndirim", "Kullanım", "Limit", "Son Tarih", "Durum"].map(h => (
                    <TableHead key={h} className="text-[11px] uppercase tracking-wider text-muted-foreground font-semibold">{h}</TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {promoCodes.map(p => (
                  <TableRow key={p.code} className="hover:bg-muted/30">
                    <TableCell className="text-sm font-mono font-bold text-foreground">{p.code}</TableCell>
                    <TableCell className="text-sm text-foreground">{p.discount}</TableCell>
                    <TableCell className="text-sm text-foreground">{p.used}/{p.limit}</TableCell>
                    <TableCell className="text-sm text-muted-foreground">{p.limit}</TableCell>
                    <TableCell className="text-sm text-muted-foreground">{p.expiry}</TableCell>
                    <TableCell>
                      <span className={p.status === "aktif" ? "badge-aktif" : "badge-taslak"}>{p.status === "aktif" ? "🟢 Aktif" : "⚪ Tükendi"}</span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </TabsContent>

        {/* Seasonal Pricing */}
        <TabsContent value="season" className="space-y-4">
          {/* Timeline */}
          <div className="flex overflow-x-auto gap-0 rounded-lg overflow-hidden">
            {seasons.map(s => (
              <div key={s.name} className={cn("flex-1 min-w-[140px] p-4 text-center", s.color)}>
                <p className="text-sm font-semibold">{s.name}</p>
                <p className="text-xs mt-0.5 opacity-80">{s.range}</p>
                <p className="text-lg font-bold mt-1">{s.modifier}</p>
              </div>
            ))}
          </div>
          <div className="space-y-2">
            {seasons.filter(s => s.modifier !== "—").map(s => (
              <div key={s.name} className="bg-card rounded-lg card-shadow p-4 flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-foreground">{s.name}: {s.modifier}</p>
                  <p className="text-xs text-muted-foreground">{s.range}</p>
                </div>
                <div className="flex gap-2">
                  <Button variant="ghost" size="icon" className="h-8 w-8"><Pencil className="w-3.5 h-3.5" /></Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive"><Trash2 className="w-3.5 h-3.5" /></Button>
                </div>
              </div>
            ))}
          </div>
          <Button variant="outline" className="rounded-pill border-primary text-primary text-sm">
            <Plus className="w-4 h-4 mr-1.5" /> Yeni Sezon Ekle
          </Button>
        </TabsContent>
      </Tabs>
    </div>
  );
}
