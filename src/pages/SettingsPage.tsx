import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import {
  User, Building2, Bell, CreditCard, Shield, Globe, Upload, Save
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function SettingsPage() {
  const { toast } = useToast();
  const save = () => toast({ title: "Ayarlar kaydedildi" });

  return (
    <div className="space-y-6">
      <Tabs defaultValue="profile" className="space-y-4">
        <TabsList className="flex-wrap">
          <TabsTrigger value="profile"><User size={14} className="mr-1.5" /> Profil</TabsTrigger>
          <TabsTrigger value="business"><Building2 size={14} className="mr-1.5" /> İşletme</TabsTrigger>
          <TabsTrigger value="notifications"><Bell size={14} className="mr-1.5" /> Bildirimler</TabsTrigger>
          <TabsTrigger value="payments"><CreditCard size={14} className="mr-1.5" /> Ödeme</TabsTrigger>
          <TabsTrigger value="security"><Shield size={14} className="mr-1.5" /> Güvenlik</TabsTrigger>
        </TabsList>

        {/* Profile */}
        <TabsContent value="profile">
          <Card className="card-shadow">
            <CardHeader>
              <CardTitle className="text-lg">Kişisel Bilgiler</CardTitle>
              <CardDescription>Profil bilgilerinizi güncelleyin</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center gap-4">
                <Avatar className="h-20 w-20">
                  <AvatarFallback className="bg-primary text-primary-foreground text-xl">MK</AvatarFallback>
                </Avatar>
                <div>
                  <Button variant="outline" size="sm"><Upload size={14} className="mr-1" /> Fotoğraf Yükle</Button>
                  <p className="text-xs text-muted-foreground mt-1">JPG, PNG. Max 2MB.</p>
                </div>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2"><Label>Ad</Label><Input defaultValue="Mehmet" /></div>
                <div className="space-y-2"><Label>Soyad</Label><Input defaultValue="Kaya" /></div>
                <div className="space-y-2"><Label>E-posta</Label><Input defaultValue="mehmet@joinistanbul.com" type="email" /></div>
                <div className="space-y-2"><Label>Telefon</Label><Input defaultValue="+90 532 111 22 33" type="tel" /></div>
              </div>
              <div className="space-y-2">
                <Label>Biyografi</Label>
                <Textarea defaultValue="10+ yıllık deneyimli tur organizatörü. İstanbul'un tarihi ve kültürel zenginliklerini keşfettiriyorum." rows={3} />
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2"><Label>Dil</Label>
                  <Select defaultValue="tr"><SelectTrigger><SelectValue /></SelectTrigger><SelectContent><SelectItem value="tr">Türkçe</SelectItem><SelectItem value="en">English</SelectItem></SelectContent></Select>
                </div>
                <div className="space-y-2"><Label>Saat Dilimi</Label>
                  <Select defaultValue="ist"><SelectTrigger><SelectValue /></SelectTrigger><SelectContent><SelectItem value="ist">İstanbul (UTC+3)</SelectItem><SelectItem value="lon">Londra (UTC+0)</SelectItem></SelectContent></Select>
                </div>
              </div>
              <Button onClick={save} className="rounded-full"><Save size={16} /> Kaydet</Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Business */}
        <TabsContent value="business">
          <Card className="card-shadow">
            <CardHeader>
              <CardTitle className="text-lg">İşletme Bilgileri</CardTitle>
              <CardDescription>Yasal ve vergi bilgileriniz</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2"><Label>İşletme Adı</Label><Input defaultValue="JoinIstanbul Tours" /></div>
                <div className="space-y-2"><Label>Vergi No</Label><Input defaultValue="1234567890" /></div>
                <div className="space-y-2"><Label>Vergi Dairesi</Label><Input defaultValue="Beyoğlu" /></div>
                <div className="space-y-2"><Label>TURSAB Belge No</Label><Input defaultValue="A-12345" /></div>
              </div>
              <div className="space-y-2"><Label>Adres</Label><Textarea defaultValue="İstiklal Cad. No:123, Beyoğlu, İstanbul" rows={2} /></div>
              <Separator />
              <div className="space-y-2">
                <Label>İptal Politikası</Label>
                <Select defaultValue="flex"><SelectTrigger><SelectValue /></SelectTrigger><SelectContent>
                  <SelectItem value="flex">Esnek — 24 saat öncesine kadar ücretsiz iptal</SelectItem>
                  <SelectItem value="moderate">Orta — 48 saat öncesine kadar ücretsiz iptal</SelectItem>
                  <SelectItem value="strict">Katı — İptal iadesi yok</SelectItem>
                </SelectContent></Select>
              </div>
              <Button onClick={save} className="rounded-full"><Save size={16} /> Kaydet</Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notifications */}
        <TabsContent value="notifications">
          <Card className="card-shadow">
            <CardHeader>
              <CardTitle className="text-lg">Bildirim Tercihleri</CardTitle>
              <CardDescription>Hangi bildirimleri almak istediğinizi seçin</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                { label: "Yeni Rezervasyon", desc: "Yeni bir rezervasyon yapıldığında", email: true, push: true },
                { label: "İptal Bildirimi", desc: "Bir rezervasyon iptal edildiğinde", email: true, push: true },
                { label: "Yeni Yorum", desc: "Misafir yorum bıraktığında", email: true, push: false },
                { label: "Yeni Mesaj", desc: "Misafirden mesaj geldiğinde", email: false, push: true },
                { label: "Ödeme Bildirimi", desc: "Ödeme yapıldığında", email: true, push: false },
                { label: "Haftalık Rapor", desc: "Haftalık performans özeti", email: true, push: false },
              ].map((n) => (
                <div key={n.label} className="flex items-center justify-between py-2">
                  <div>
                    <p className="text-sm font-medium">{n.label}</p>
                    <p className="text-xs text-muted-foreground">{n.desc}</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs text-muted-foreground">E-posta</span>
                      <Switch defaultChecked={n.email} />
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs text-muted-foreground">Push</span>
                      <Switch defaultChecked={n.push} />
                    </div>
                  </div>
                </div>
              ))}
              <Button onClick={save} className="rounded-full"><Save size={16} /> Kaydet</Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Payments */}
        <TabsContent value="payments">
          <Card className="card-shadow">
            <CardHeader>
              <CardTitle className="text-lg">Ödeme Ayarları</CardTitle>
              <CardDescription>Banka hesabı ve ödeme tercihleri</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 rounded-lg border border-border bg-muted/30">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm font-medium">Kayıtlı Banka Hesabı</p>
                  <Button variant="outline" size="sm" className="text-xs">Değiştir</Button>
                </div>
                <p className="text-sm text-foreground">Türkiye İş Bankası — **** **** **** 4567</p>
                <p className="text-xs text-muted-foreground">IBAN: TR** **** **** **** **** **** 67</p>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2"><Label>Ödeme Periyodu</Label>
                  <Select defaultValue="weekly"><SelectTrigger><SelectValue /></SelectTrigger><SelectContent>
                    <SelectItem value="weekly">Haftalık</SelectItem>
                    <SelectItem value="biweekly">İki Haftada Bir</SelectItem>
                    <SelectItem value="monthly">Aylık</SelectItem>
                  </SelectContent></Select>
                </div>
                <div className="space-y-2"><Label>Minimum Ödeme Tutarı</Label><Input defaultValue="500" type="number" /></div>
              </div>
              <div className="flex items-center justify-between py-2">
                <div>
                  <p className="text-sm font-medium">Otomatik Fatura</p>
                  <p className="text-xs text-muted-foreground">Her ödeme için otomatik e-fatura oluştur</p>
                </div>
                <Switch defaultChecked />
              </div>
              <Button onClick={save} className="rounded-full"><Save size={16} /> Kaydet</Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Security */}
        <TabsContent value="security">
          <Card className="card-shadow">
            <CardHeader>
              <CardTitle className="text-lg">Güvenlik</CardTitle>
              <CardDescription>Hesap güvenlik ayarlarınız</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Mevcut Şifre</Label>
                <Input type="password" placeholder="••••••••" />
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2"><Label>Yeni Şifre</Label><Input type="password" placeholder="••••••••" /></div>
                <div className="space-y-2"><Label>Şifre Tekrar</Label><Input type="password" placeholder="••••••••" /></div>
              </div>
              <Separator />
              <div className="flex items-center justify-between py-2">
                <div>
                  <p className="text-sm font-medium">İki Faktörlü Doğrulama</p>
                  <p className="text-xs text-muted-foreground">SMS veya authenticator app ile ek güvenlik</p>
                </div>
                <Switch />
              </div>
              <div className="flex items-center justify-between py-2">
                <div>
                  <p className="text-sm font-medium">Oturum Geçmişi</p>
                  <p className="text-xs text-muted-foreground">Son giriş: Bugün, 14:32 — Chrome, İstanbul</p>
                </div>
                <Button variant="outline" size="sm" className="text-xs">Tümünü Gör</Button>
              </div>
              <Button onClick={save} className="rounded-full"><Save size={16} /> Şifreyi Güncelle</Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
