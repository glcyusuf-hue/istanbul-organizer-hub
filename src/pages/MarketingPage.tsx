import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Megaphone, Share2, Link2, Copy, ExternalLink, Image, Download,
  Facebook, Instagram, Globe, TrendingUp, Eye, MousePointerClick, Users, QrCode
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const experiences = [
  { id: 1, name: "Boğaz Turu", slug: "bogaz-turu", views: 2340, clicks: 189, bookings: 42, convRate: 22.2, image: "🚢" },
  { id: 2, name: "Tarihi Yarımada Yürüyüşü", slug: "tarihi-yarimada", views: 1870, clicks: 156, bookings: 31, convRate: 19.9, image: "🏛️" },
  { id: 3, name: "Kapadokya Balon Turu", slug: "kapadokya-balon", views: 3120, clicks: 298, bookings: 67, convRate: 22.5, image: "🎈" },
];

const referralLinks = [
  { id: 1, code: "REF-MK2024", partner: "TripAdvisor", clicks: 456, bookings: 23, revenue: "₺18.400", status: "active" },
  { id: 2, code: "REF-BLOG01", partner: "Istanbul Blog", clicks: 234, bookings: 12, revenue: "₺9.600", status: "active" },
  { id: 3, code: "REF-INFL03", partner: "Travel Influencer", clicks: 89, bookings: 4, revenue: "₺3.200", status: "expired" },
];

const seoSuggestions = [
  { page: "Boğaz Turu", issue: "Meta açıklama eksik", priority: "high", action: "Meta açıklama ekleyin (max 160 karakter)" },
  { page: "Kapadokya Balon", issue: "Alt text eksik (3 görsel)", priority: "medium", action: "Tüm görsellere açıklayıcı alt text ekleyin" },
  { page: "Genel", issue: "Sayfa yükleme hızı: 3.2s", priority: "low", action: "Görselleri sıkıştırın, lazy loading ekleyin" },
];

export default function MarketingPage() {
  const [activeTab, setActiveTab] = useState("social");
  const [createLinkOpen, setCreateLinkOpen] = useState(false);
  const { toast } = useToast();

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({ title: "Kopyalandı", description: "Link panoya kopyalandı." });
  };

  return (
    <div className="space-y-6">
      {/* KPI Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Toplam Görüntülenme", value: "7.330", icon: Eye, change: "+12%" },
          { label: "Tıklama", value: "643", icon: MousePointerClick, change: "+8%" },
          { label: "Dönüşüm Oranı", value: "21.8%", icon: TrendingUp, change: "+2.1%" },
          { label: "Referans Geliri", value: "₺31.200", icon: Users, change: "+15%" },
        ].map((kpi) => (
          <Card key={kpi.label} className="card-shadow">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <kpi.icon size={18} className="text-muted-foreground" />
                <span className="text-xs font-medium text-success">{kpi.change}</span>
              </div>
              <p className="text-2xl font-headline font-bold text-foreground">{kpi.value}</p>
              <p className="text-xs text-muted-foreground mt-1">{kpi.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="social">Sosyal Medya</TabsTrigger>
          <TabsTrigger value="referral">Referans Linkleri</TabsTrigger>
          <TabsTrigger value="seo">SEO Önerileri</TabsTrigger>
        </TabsList>

        {/* Social Media Tab */}
        <TabsContent value="social" className="space-y-4 mt-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {experiences.map((exp) => (
              <Card key={exp.id} className="card-shadow transition-card hover:card-shadow-hover">
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">{exp.image}</span>
                    <div>
                      <CardTitle className="text-base">{exp.name}</CardTitle>
                      <CardDescription className="text-xs">joinistanbul.com/{exp.slug}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="grid grid-cols-3 gap-2 text-center">
                    <div>
                      <p className="text-lg font-semibold text-foreground">{exp.views.toLocaleString()}</p>
                      <p className="text-[10px] text-muted-foreground">Görüntülenme</p>
                    </div>
                    <div>
                      <p className="text-lg font-semibold text-foreground">{exp.clicks}</p>
                      <p className="text-[10px] text-muted-foreground">Tıklama</p>
                    </div>
                    <div>
                      <p className="text-lg font-semibold text-accent">%{exp.convRate}</p>
                      <p className="text-[10px] text-muted-foreground">Dönüşüm</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" className="flex-1 text-xs" onClick={() => copyToClipboard(`https://joinistanbul.com/${exp.slug}`)}>
                      <Link2 size={14} /> Link Kopyala
                    </Button>
                    <Button size="sm" variant="outline" className="text-xs">
                      <Image size={14} /> Görsel
                    </Button>
                    <Button size="sm" variant="outline" className="text-xs">
                      <Share2 size={14} />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Social Share Templates */}
          <Card className="card-shadow">
            <CardHeader>
              <CardTitle className="text-lg">Paylaşım Şablonları</CardTitle>
              <CardDescription>Hazır sosyal medya görselleri ve metinleri</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-3 md:grid-cols-3">
                {["Instagram Story", "Facebook Post", "Twitter/X Banner"].map((template) => (
                  <div key={template} className="border border-border rounded-lg p-4 text-center space-y-2 hover:border-accent transition-colors cursor-pointer">
                    <div className="w-full h-24 bg-muted rounded flex items-center justify-center">
                      <Image size={24} className="text-muted-foreground" />
                    </div>
                    <p className="text-sm font-medium">{template}</p>
                    <Button size="sm" variant="outline" className="text-xs w-full">
                      <Download size={14} /> İndir
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Referral Links Tab */}
        <TabsContent value="referral" className="space-y-4 mt-4">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-lg font-headline font-semibold">Referans Linkleri</h3>
              <p className="text-sm text-muted-foreground">Ortaklarınız ve influencer'lar için özel takip linkleri</p>
            </div>
            <Button onClick={() => setCreateLinkOpen(true)} className="rounded-full">
              <Link2 size={16} /> Yeni Link
            </Button>
          </div>

          <div className="space-y-3">
            {referralLinks.map((link) => (
              <Card key={link.id} className="card-shadow">
                <CardContent className="p-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <p className="font-medium text-foreground">{link.partner}</p>
                        <Badge variant={link.status === "active" ? "default" : "secondary"} className={`text-[10px] ${link.status === "active" ? "badge-aktif" : "badge-taslak"}`}>
                          {link.status === "active" ? "Aktif" : "Süresi Dolmuş"}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <code className="bg-muted px-2 py-0.5 rounded">{link.code}</code>
                        <button onClick={() => copyToClipboard(`https://joinistanbul.com/?ref=${link.code}`)} className="hover:text-foreground">
                          <Copy size={12} />
                        </button>
                      </div>
                    </div>
                    <div className="flex gap-4 text-center">
                      <div>
                        <p className="text-sm font-semibold">{link.clicks}</p>
                        <p className="text-[10px] text-muted-foreground">Tıklama</p>
                      </div>
                      <div>
                        <p className="text-sm font-semibold">{link.bookings}</p>
                        <p className="text-[10px] text-muted-foreground">Rezervasyon</p>
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-accent">{link.revenue}</p>
                        <p className="text-[10px] text-muted-foreground">Gelir</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* SEO Tab */}
        <TabsContent value="seo" className="space-y-4 mt-4">
          <Card className="card-shadow">
            <CardHeader>
              <CardTitle className="text-lg">SEO Sağlık Skoru</CardTitle>
              <CardDescription>Arama motoru optimizasyon durumunuz</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-6 mb-6">
                <div className="w-20 h-20 rounded-full border-4 border-accent flex items-center justify-center">
                  <span className="text-2xl font-headline font-bold text-accent">78</span>
                </div>
                <div className="text-sm text-muted-foreground">
                  <p>3 iyileştirme öneriniz var.</p>
                  <p>Geçen aya göre <span className="text-success font-medium">+5 puan</span> artış.</p>
                </div>
              </div>

              <div className="space-y-3">
                {seoSuggestions.map((sug, i) => (
                  <div key={i} className="flex items-start gap-3 p-3 rounded-lg border border-border">
                    <div className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${sug.priority === "high" ? "bg-destructive" : sug.priority === "medium" ? "bg-warning" : "bg-success"}`} />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-0.5">
                        <p className="text-sm font-medium text-foreground">{sug.page}</p>
                        <span className="text-xs text-muted-foreground">— {sug.issue}</span>
                      </div>
                      <p className="text-xs text-muted-foreground">{sug.action}</p>
                    </div>
                    <Button size="sm" variant="outline" className="text-xs shrink-0">Düzelt</Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Create Referral Link Dialog */}
      <Dialog open={createLinkOpen} onOpenChange={setCreateLinkOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Yeni Referans Linki</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Partner / Kaynak Adı</Label>
              <Input placeholder="Örn: TripAdvisor, Blogger Ayşe" />
            </div>
            <div className="space-y-2">
              <Label>Referans Kodu</Label>
              <Input placeholder="Örn: REF-TRIP01" />
            </div>
            <div className="space-y-2">
              <Label>Komisyon Oranı (%)</Label>
              <Input type="number" placeholder="10" />
            </div>
            <div className="flex items-center gap-2">
              <Switch defaultChecked />
              <Label>Son kullanma tarihi yok</Label>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setCreateLinkOpen(false)}>İptal</Button>
            <Button className="rounded-full" onClick={() => { setCreateLinkOpen(false); toast({ title: "Link oluşturuldu" }); }}>Oluştur</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
