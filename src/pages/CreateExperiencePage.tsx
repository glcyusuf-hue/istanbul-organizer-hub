import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import {
  ArrowLeft, ArrowRight, Check, Upload, Plus, X, Clock, Users,
  MapPin, Globe, Camera, Tag, Calendar, Eye, Sparkles, FileText
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const steps = [
  { id: 1, label: "Yöntem", icon: Sparkles },
  { id: 2, label: "Temel Bilgiler", icon: FileText },
  { id: 3, label: "Detaylar", icon: MapPin },
  { id: 4, label: "Fotoğraflar", icon: Camera },
  { id: 5, label: "Fiyatlandırma", icon: Tag },
  { id: 6, label: "Takvim", icon: Calendar },
  { id: 7, label: "Önizleme", icon: Eye },
];

const categories = ["Yürüyüş Turu", "Tekne Turu", "Yemek & Mutfak", "Sanat & Kültür", "Doğa & Macera", "Gece Hayatı", "Workshop", "Fotoğraf Turu"];
const languages = ["Türkçe", "İngilizce", "Almanca", "Fransızca", "İspanyolca", "Arapça", "Japonca", "Korece"];

export default function CreateExperiencePage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [creationMethod, setCreationMethod] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    title: "", category: "", description: "", shortDescription: "",
    duration: "", maxGuests: "", minGuests: "", meetingPoint: "",
    languages: [] as string[], included: [""], notIncluded: [""],
    highlights: [""], photos: [] as string[],
    basePrice: "", childPrice: "", groupDiscount: "",
    instantBooking: true, cancelPolicy: "flex",
    weekdays: { mon: true, tue: true, wed: true, thu: true, fri: true, sat: true, sun: true },
    startTimes: ["09:00"],
  });
  const navigate = useNavigate();
  const { toast } = useToast();

  const progress = (currentStep / steps.length) * 100;

  const updateField = (key: string, value: any) => setFormData((prev) => ({ ...prev, [key]: value }));
  const updateListItem = (key: "included" | "notIncluded" | "highlights", index: number, value: string) => {
    const list = [...formData[key]];
    list[index] = value;
    updateField(key, list);
  };
  const addListItem = (key: "included" | "notIncluded" | "highlights") => updateField(key, [...formData[key], ""]);
  const removeListItem = (key: "included" | "notIncluded" | "highlights", index: number) => updateField(key, formData[key].filter((_, i) => i !== index));
  const toggleLanguage = (lang: string) => {
    const langs = formData.languages.includes(lang) ? formData.languages.filter((l) => l !== lang) : [...formData.languages, lang];
    updateField("languages", langs);
  };

  const nextStep = () => setCurrentStep((s) => Math.min(s + 1, steps.length));
  const prevStep = () => setCurrentStep((s) => Math.max(s - 1, 1));

  const handlePublish = () => {
    toast({ title: "Deneyim yayınlandı!", description: "Deneyiminiz başarıyla oluşturuldu." });
    navigate("/org/experiences");
  };

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      {/* Progress Header */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <Button variant="ghost" size="sm" onClick={() => navigate("/org/experiences")}>
            <ArrowLeft size={16} /> Deneyimlerim
          </Button>
          <span className="text-sm text-muted-foreground">Adım {currentStep} / {steps.length}</span>
        </div>
        <Progress value={progress} className="h-1.5" />
        {/* Step indicators */}
        <div className="flex justify-between mt-3">
          {steps.map((step) => (
            <button
              key={step.id}
              onClick={() => step.id <= currentStep && setCurrentStep(step.id)}
              className={`flex flex-col items-center gap-1 ${step.id <= currentStep ? "text-foreground" : "text-muted-foreground/40"} ${step.id < currentStep ? "cursor-pointer" : ""}`}
            >
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium transition-colors
                ${step.id === currentStep ? "bg-accent text-accent-foreground" : step.id < currentStep ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}>
                {step.id < currentStep ? <Check size={14} /> : step.id}
              </div>
              <span className="text-[10px] hidden sm:block">{step.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Step 1: Method Selection */}
      {currentStep === 1 && (
        <div className="space-y-4">
          <div className="text-center mb-6">
            <h2 className="text-xl font-headline font-semibold">Nasıl oluşturmak istersiniz?</h2>
            <p className="text-sm text-muted-foreground mt-1">Başlangıç yönteminizi seçin</p>
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            {[
              { id: "scratch", title: "Sıfırdan", desc: "Tüm bilgileri kendiniz girin", icon: FileText },
              { id: "ai", title: "AI ile Oluştur", desc: "Açıklama yazın, AI tamamlasın", icon: Sparkles },
              { id: "template", title: "Şablondan", desc: "Hazır şablonlardan seçin", icon: Globe },
            ].map((method) => (
              <Card
                key={method.id}
                className={`card-shadow cursor-pointer transition-card hover:card-shadow-hover ${creationMethod === method.id ? "ring-2 ring-accent" : ""}`}
                onClick={() => setCreationMethod(method.id)}
              >
                <CardContent className="p-6 text-center">
                  <div className={`w-12 h-12 rounded-full mx-auto mb-3 flex items-center justify-center ${creationMethod === method.id ? "bg-accent text-accent-foreground" : "bg-muted text-muted-foreground"}`}>
                    <method.icon size={20} />
                  </div>
                  <h3 className="font-medium text-foreground">{method.title}</h3>
                  <p className="text-xs text-muted-foreground mt-1">{method.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
          {creationMethod === "ai" && (
            <Card className="card-shadow">
              <CardContent className="p-4 space-y-3">
                <Label>Deneyiminizi kısaca anlatın</Label>
                <Textarea placeholder="Örn: İstanbul'un tarihi yarımadasında 3 saatlik bir yürüyüş turu. Sultanahmet, Ayasofya ve Topkapı Sarayı'nı kapsıyor..." rows={4} />
                <Button size="sm" className="rounded-full"><Sparkles size={14} /> AI ile Doldur</Button>
              </CardContent>
            </Card>
          )}
        </div>
      )}

      {/* Step 2: Basic Info */}
      {currentStep === 2 && (
        <Card className="card-shadow">
          <CardHeader>
            <CardTitle className="text-lg">Temel Bilgiler</CardTitle>
            <CardDescription>Deneyiminizin ana bilgilerini girin</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Deneyim Adı *</Label>
              <Input value={formData.title} onChange={(e) => updateField("title", e.target.value)} placeholder="Örn: Tarihi Yarımada Yürüyüş Turu" />
            </div>
            <div className="space-y-2">
              <Label>Kategori *</Label>
              <Select value={formData.category} onValueChange={(v) => updateField("category", v)}>
                <SelectTrigger><SelectValue placeholder="Kategori seçin" /></SelectTrigger>
                <SelectContent>
                  {categories.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Kısa Açıklama *</Label>
              <Input value={formData.shortDescription} onChange={(e) => updateField("shortDescription", e.target.value)} placeholder="Max 160 karakter" maxLength={160} />
              <p className="text-xs text-muted-foreground text-right">{formData.shortDescription.length}/160</p>
            </div>
            <div className="space-y-2">
              <Label>Detaylı Açıklama *</Label>
              <Textarea value={formData.description} onChange={(e) => updateField("description", e.target.value)} placeholder="Deneyiminizi detaylı açıklayın..." rows={5} />
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label>Süre (saat)</Label>
                <Input type="number" value={formData.duration} onChange={(e) => updateField("duration", e.target.value)} placeholder="3" />
              </div>
              <div className="space-y-2">
                <Label>Min Kişi</Label>
                <Input type="number" value={formData.minGuests} onChange={(e) => updateField("minGuests", e.target.value)} placeholder="1" />
              </div>
              <div className="space-y-2">
                <Label>Max Kişi</Label>
                <Input type="number" value={formData.maxGuests} onChange={(e) => updateField("maxGuests", e.target.value)} placeholder="15" />
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Step 3: Details */}
      {currentStep === 3 && (
        <div className="space-y-4">
          <Card className="card-shadow">
            <CardHeader>
              <CardTitle className="text-lg">Konum & Dil</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Buluşma Noktası *</Label>
                <Input value={formData.meetingPoint} onChange={(e) => updateField("meetingPoint", e.target.value)} placeholder="Örn: Sultanahmet Meydanı, çeşmenin önü" />
              </div>
              <div className="space-y-2">
                <Label>Diller</Label>
                <div className="flex flex-wrap gap-2">
                  {languages.map((lang) => (
                    <Badge
                      key={lang}
                      variant={formData.languages.includes(lang) ? "default" : "outline"}
                      className={`cursor-pointer ${formData.languages.includes(lang) ? "bg-accent text-accent-foreground" : ""}`}
                      onClick={() => toggleLanguage(lang)}
                    >
                      {lang}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Included / Not included / Highlights */}
          {(["highlights", "included", "notIncluded"] as const).map((listKey) => (
            <Card key={listKey} className="card-shadow">
              <CardHeader className="pb-3">
                <CardTitle className="text-base">
                  {listKey === "highlights" ? "Öne Çıkanlar" : listKey === "included" ? "Dahil Olanlar" : "Dahil Olmayanlar"}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {formData[listKey].map((item, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <Input value={item} onChange={(e) => updateListItem(listKey, i, e.target.value)} placeholder="Madde ekleyin" />
                    {formData[listKey].length > 1 && (
                      <Button variant="ghost" size="icon" className="h-8 w-8 shrink-0" onClick={() => removeListItem(listKey, i)}>
                        <X size={14} />
                      </Button>
                    )}
                  </div>
                ))}
                <Button variant="outline" size="sm" onClick={() => addListItem(listKey)}>
                  <Plus size={14} /> Ekle
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Step 4: Photos */}
      {currentStep === 4 && (
        <Card className="card-shadow">
          <CardHeader>
            <CardTitle className="text-lg">Fotoğraflar</CardTitle>
            <CardDescription>En az 3, en fazla 10 fotoğraf ekleyin. İlk fotoğraf kapak görseli olacaktır.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="aspect-[4/3] rounded-lg border-2 border-dashed border-border hover:border-accent flex flex-col items-center justify-center cursor-pointer transition-colors bg-muted/30">
                  {i === 1 ? (
                    <>
                      <Upload size={24} className="text-muted-foreground mb-2" />
                      <p className="text-xs text-muted-foreground">Kapak Görseli</p>
                      <p className="text-[10px] text-muted-foreground">Sürükle veya tıkla</p>
                    </>
                  ) : (
                    <>
                      <Camera size={20} className="text-muted-foreground mb-1" />
                      <p className="text-[10px] text-muted-foreground">Fotoğraf {i}</p>
                    </>
                  )}
                </div>
              ))}
            </div>
            <p className="text-xs text-muted-foreground mt-3">Önerilen: 1920x1080px, JPEG/PNG, max 5MB</p>
          </CardContent>
        </Card>
      )}

      {/* Step 5: Pricing */}
      {currentStep === 5 && (
        <Card className="card-shadow">
          <CardHeader>
            <CardTitle className="text-lg">Fiyatlandırma</CardTitle>
            <CardDescription>Fiyat bilgilerini ve ödeme kurallarını belirleyin</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label>Yetişkin Fiyatı (₺) *</Label>
                <Input type="number" value={formData.basePrice} onChange={(e) => updateField("basePrice", e.target.value)} placeholder="800" />
              </div>
              <div className="space-y-2">
                <Label>Çocuk Fiyatı (₺)</Label>
                <Input type="number" value={formData.childPrice} onChange={(e) => updateField("childPrice", e.target.value)} placeholder="400" />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Grup İndirimi (%)</Label>
              <Input type="number" value={formData.groupDiscount} onChange={(e) => updateField("groupDiscount", e.target.value)} placeholder="Örn: 10 (5+ kişi için)" />
              <p className="text-xs text-muted-foreground">5 ve üzeri kişilik gruplara uygulanır</p>
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">Anında Rezervasyon</p>
                <p className="text-xs text-muted-foreground">Onay beklemeden otomatik onaylansın</p>
              </div>
              <Switch checked={formData.instantBooking} onCheckedChange={(v) => updateField("instantBooking", v)} />
            </div>
            <div className="space-y-2">
              <Label>İptal Politikası</Label>
              <Select value={formData.cancelPolicy} onValueChange={(v) => updateField("cancelPolicy", v)}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="flex">Esnek — 24 saat öncesine kadar ücretsiz</SelectItem>
                  <SelectItem value="moderate">Orta — 48 saat öncesine kadar ücretsiz</SelectItem>
                  <SelectItem value="strict">Katı — İade yok</SelectItem>
                </SelectContent>
              </Select>
            </div>
            {formData.basePrice && (
              <div className="p-3 rounded-lg bg-muted/50 text-sm">
                <p className="font-medium mb-1">Tahmini Kazanç (kişi başı):</p>
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Brüt:</span><span>₺{formData.basePrice}</span>
                </div>
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Komisyon (%8):</span><span>-₺{(Number(formData.basePrice) * 0.08).toFixed(0)}</span>
                </div>
                <div className="flex justify-between text-xs font-medium text-foreground mt-1 pt-1 border-t border-border">
                  <span>Net:</span><span>₺{(Number(formData.basePrice) * 0.92).toFixed(0)}</span>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Step 6: Calendar */}
      {currentStep === 6 && (
        <Card className="card-shadow">
          <CardHeader>
            <CardTitle className="text-lg">Takvim & Müsaitlik</CardTitle>
            <CardDescription>Deneyiminizin hangi günlerde ve saatlerde aktif olacağını belirleyin</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Aktif Günler</Label>
              <div className="flex flex-wrap gap-2">
                {([
                  ["mon", "Pzt"], ["tue", "Sal"], ["wed", "Çar"], ["thu", "Per"], ["fri", "Cum"], ["sat", "Cmt"], ["sun", "Paz"],
                ] as const).map(([key, label]) => (
                  <Badge
                    key={key}
                    variant={formData.weekdays[key] ? "default" : "outline"}
                    className={`cursor-pointer px-3 py-1.5 ${formData.weekdays[key] ? "bg-accent text-accent-foreground" : ""}`}
                    onClick={() => updateField("weekdays", { ...formData.weekdays, [key]: !formData.weekdays[key] })}
                  >
                    {label}
                  </Badge>
                ))}
              </div>
            </div>
            <div className="space-y-2">
              <Label>Başlangıç Saatleri</Label>
              {formData.startTimes.map((time, i) => (
                <div key={i} className="flex items-center gap-2">
                  <Clock size={14} className="text-muted-foreground" />
                  <Input
                    type="time"
                    value={time}
                    onChange={(e) => {
                      const times = [...formData.startTimes];
                      times[i] = e.target.value;
                      updateField("startTimes", times);
                    }}
                    className="w-32"
                  />
                  {formData.startTimes.length > 1 && (
                    <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => updateField("startTimes", formData.startTimes.filter((_, idx) => idx !== i))}>
                      <X size={14} />
                    </Button>
                  )}
                </div>
              ))}
              <Button variant="outline" size="sm" onClick={() => updateField("startTimes", [...formData.startTimes, "14:00"])}>
                <Plus size={14} /> Saat Ekle
              </Button>
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">Sezonluk Duraklatma</p>
                <p className="text-xs text-muted-foreground">Belirli tarih aralıklarında otomatik kapat</p>
              </div>
              <Switch />
            </div>
          </CardContent>
        </Card>
      )}

      {/* Step 7: Preview */}
      {currentStep === 7 && (
        <div className="space-y-4">
          <Card className="card-shadow">
            <CardHeader>
              <CardTitle className="text-lg">Önizleme</CardTitle>
              <CardDescription>Deneyiminiz misafirlere böyle görünecek</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Preview Card */}
              <div className="rounded-xl border border-border overflow-hidden">
                <div className="h-48 bg-muted flex items-center justify-center">
                  <Camera size={32} className="text-muted-foreground" />
                </div>
                <div className="p-4 space-y-3">
                  <div className="flex items-center gap-2">
                    {formData.category && <span className="badge-aktif">{formData.category}</span>}
                    {formData.languages.map((l) => <Badge key={l} variant="outline" className="text-[10px]">{l}</Badge>)}
                  </div>
                  <h3 className="text-lg font-headline font-semibold">{formData.title || "Deneyim Adı"}</h3>
                  <p className="text-sm text-muted-foreground">{formData.shortDescription || "Kısa açıklama..."}</p>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    {formData.duration && <span className="flex items-center gap-1"><Clock size={12} /> {formData.duration} saat</span>}
                    {formData.maxGuests && <span className="flex items-center gap-1"><Users size={12} /> Max {formData.maxGuests} kişi</span>}
                    {formData.meetingPoint && <span className="flex items-center gap-1"><MapPin size={12} /> {formData.meetingPoint}</span>}
                  </div>
                  {formData.basePrice && (
                    <p className="text-lg font-semibold text-accent">₺{formData.basePrice} <span className="text-xs font-normal text-muted-foreground">/ kişi</span></p>
                  )}
                </div>
              </div>

              {/* Summary */}
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div className="p-3 rounded-lg bg-muted/50">
                  <p className="text-xs text-muted-foreground">Dahil Olanlar</p>
                  <ul className="mt-1 space-y-0.5">
                    {formData.included.filter(Boolean).map((item, i) => <li key={i} className="text-xs">✓ {item}</li>)}
                    {formData.included.filter(Boolean).length === 0 && <li className="text-xs text-muted-foreground">—</li>}
                  </ul>
                </div>
                <div className="p-3 rounded-lg bg-muted/50">
                  <p className="text-xs text-muted-foreground">Aktif Günler</p>
                  <p className="text-xs mt-1">
                    {Object.entries(formData.weekdays).filter(([, v]) => v).map(([k]) =>
                      ({ mon: "Pzt", tue: "Sal", wed: "Çar", thu: "Per", fri: "Cum", sat: "Cmt", sun: "Paz" }[k])
                    ).join(", ") || "—"}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">Saatler: {formData.startTimes.join(", ")}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Navigation */}
      <div className="flex items-center justify-between pt-2 pb-4">
        <Button variant="outline" onClick={prevStep} disabled={currentStep === 1}>
          <ArrowLeft size={16} /> Geri
        </Button>
        <div className="flex gap-2">
          {currentStep < steps.length ? (
            <Button onClick={nextStep} className="rounded-full" disabled={currentStep === 1 && !creationMethod}>
              İleri <ArrowRight size={16} />
            </Button>
          ) : (
            <>
              <Button variant="outline" onClick={() => toast({ title: "Taslak kaydedildi" })}>Taslak Kaydet</Button>
              <Button onClick={handlePublish} className="rounded-full bg-accent hover:bg-accent/90">
                <Check size={16} /> Yayınla
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
