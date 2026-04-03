import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import {
  HelpCircle, Search, BookOpen, Video, MessageCircle, Mail, Phone,
  ExternalLink, ChevronRight, Lightbulb, FileText
} from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

const faqs = [
  { q: "Deneyim nasıl oluşturulur?", a: "Sol menüden 'Deneyimlerim' > 'Yeni Deneyim' butonuna tıklayın. Adım adım rehber sizi yönlendirecektir. Temel bilgiler, fiyatlandırma, takvim ve fotoğraf ekleyerek deneyiminizi yayına alabilirsiniz." },
  { q: "Komisyon oranı nedir?", a: "Platform komisyon oranı brüt gelirin %8'idir. Ek olarak ödeme işlem ücreti %2.9 + ₺0.50 uygulanır. Net geliriniz bu kesintiler sonrası hesaplanır." },
  { q: "Ödemeler ne zaman yapılır?", a: "Ödemeler seçtiğiniz periyoda göre (haftalık/iki haftalık/aylık) kayıtlı banka hesabınıza aktarılır. Minimum ödeme tutarı ₺500'dir." },
  { q: "Rezervasyon nasıl iptal edilir?", a: "Rezervasyonlar sayfasından ilgili rezervasyonu bulun, detay panelini açın ve 'İptal Et' butonuna tıklayın. İptal politikanıza göre iade işlemi otomatik yapılır." },
  { q: "Fiyatlandırmayı nasıl değiştiririm?", a: "Fiyatlandırma sayfasından yaş grupları, dinamik kurallar ve promosyon kodlarını yönetebilirsiniz. Değişiklikler gelecekteki rezervasyonlara uygulanır." },
  { q: "Rehber nasıl eklenir?", a: "Ekip Yönetimi sayfasından 'Üye Davet Et' butonuyla yeni rehberler ekleyebilir, izinlerini ve atandıkları deneyimleri yönetebilirsiniz." },
];

const guides = [
  { title: "Başlangıç Rehberi", desc: "Platformu kullanmaya başlamak için adım adım", icon: BookOpen, tag: "Yeni" },
  { title: "Fiyatlandırma Stratejileri", desc: "Dinamik fiyatlandırma ile geliri artırın", icon: Lightbulb, tag: "Popüler" },
  { title: "Fotoğraf Çekimi İpuçları", desc: "Deneyimlerinizi en iyi şekilde tanıtın", icon: FileText, tag: "" },
  { title: "Yorum Yönetimi", desc: "Misafir yorumlarına etkili yanıt verin", icon: MessageCircle, tag: "" },
];

const videos = [
  { title: "Platform Tanıtımı", duration: "5:30", views: "1.2k" },
  { title: "Deneyim Oluşturma", duration: "8:15", views: "890" },
  { title: "Takvim Yönetimi", duration: "4:45", views: "650" },
  { title: "Fiyatlandırma Ayarları", duration: "6:20", views: "720" },
];

export default function HelpPage() {
  const [search, setSearch] = useState("");
  const [contactOpen, setContactOpen] = useState(false);
  const { toast } = useToast();

  const filteredFaqs = faqs.filter((f) => search === "" || f.q.toLowerCase().includes(search.toLowerCase()) || f.a.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="space-y-6">
      {/* Search */}
      <Card className="card-shadow bg-primary text-primary-foreground">
        <CardContent className="p-6 text-center">
          <h2 className="text-xl font-headline font-semibold mb-2">Nasıl yardımcı olabiliriz?</h2>
          <p className="text-sm opacity-80 mb-4">Aradığınız cevabı bulun veya bize ulaşın</p>
          <div className="relative max-w-md mx-auto">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 opacity-60" />
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Soru veya konu arayın..."
              className="pl-10 bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/50"
            />
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* FAQ */}
        <div className="lg:col-span-2 space-y-4">
          <h3 className="text-lg font-headline font-semibold">Sık Sorulan Sorular</h3>
          <Accordion type="single" collapsible className="space-y-2">
            {filteredFaqs.map((faq, i) => (
              <AccordionItem key={i} value={`faq-${i}`} className="border border-border rounded-lg px-4">
                <AccordionTrigger className="text-sm font-medium hover:no-underline">{faq.q}</AccordionTrigger>
                <AccordionContent className="text-sm text-muted-foreground">{faq.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
          {filteredFaqs.length === 0 && (
            <p className="text-sm text-muted-foreground text-center py-8">Sonuç bulunamadı. Farklı bir arama deneyin veya bize ulaşın.</p>
          )}

          {/* Video Tutorials */}
          <h3 className="text-lg font-headline font-semibold pt-4">Video Eğitimler</h3>
          <div className="grid gap-3 sm:grid-cols-2">
            {videos.map((v) => (
              <Card key={v.title} className="card-shadow transition-card hover:card-shadow-hover cursor-pointer">
                <CardContent className="p-3">
                  <div className="w-full h-24 rounded bg-muted flex items-center justify-center mb-2">
                    <Video size={24} className="text-muted-foreground" />
                  </div>
                  <p className="text-sm font-medium">{v.title}</p>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
                    <span>{v.duration}</span>
                    <span>•</span>
                    <span>{v.views} görüntülenme</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          {/* Quick Guides */}
          <Card className="card-shadow">
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Rehberler</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {guides.map((g) => (
                <div key={g.title} className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted cursor-pointer transition-colors">
                  <g.icon size={16} className="text-muted-foreground shrink-0" />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5">
                      <p className="text-sm font-medium truncate">{g.title}</p>
                      {g.tag && <span className={g.tag === "Yeni" ? "badge-aktif" : "badge-vip"}>{g.tag}</span>}
                    </div>
                    <p className="text-xs text-muted-foreground truncate">{g.desc}</p>
                  </div>
                  <ChevronRight size={14} className="text-muted-foreground shrink-0" />
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Contact */}
          <Card className="card-shadow">
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Bize Ulaşın</CardTitle>
              <CardDescription>Yanıt süresi: ~2 saat</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="outline" className="w-full justify-start text-sm" onClick={() => setContactOpen(true)}>
                <Mail size={16} /> Destek Talebi Oluştur
              </Button>
              <Button variant="outline" className="w-full justify-start text-sm">
                <MessageCircle size={16} /> Canlı Sohbet
              </Button>
              <Button variant="outline" className="w-full justify-start text-sm">
                <Phone size={16} /> +90 212 555 00 00
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Contact Dialog */}
      <Dialog open={contactOpen} onOpenChange={setContactOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Destek Talebi</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Konu</Label>
              <Select><SelectTrigger><SelectValue placeholder="Seçin" /></SelectTrigger><SelectContent>
                <SelectItem value="booking">Rezervasyon</SelectItem>
                <SelectItem value="payment">Ödeme</SelectItem>
                <SelectItem value="technical">Teknik Sorun</SelectItem>
                <SelectItem value="other">Diğer</SelectItem>
              </SelectContent></Select>
            </div>
            <div className="space-y-2">
              <Label>Açıklama</Label>
              <Textarea placeholder="Sorununuzu detaylı açıklayın..." rows={4} />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setContactOpen(false)}>İptal</Button>
            <Button className="rounded-full" onClick={() => { setContactOpen(false); toast({ title: "Talebiniz alındı", description: "En kısa sürede yanıt vereceğiz." }); }}>Gönder</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
