import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  UserCog, Plus, Mail, Phone, Star, Calendar, Shield, Edit2, Trash2, MoreVertical
} from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useToast } from "@/hooks/use-toast";

const teamMembers = [
  { id: 1, name: "Mehmet Kaya", initials: "MK", role: "owner", email: "mehmet@joinistanbul.com", phone: "+90 532 111 22 33", experiences: 5, rating: 4.8, status: "active", tours: 156 },
  { id: 2, name: "Ayşe Demir", initials: "AD", role: "guide", email: "ayse@joinistanbul.com", phone: "+90 533 222 33 44", experiences: 3, rating: 4.9, status: "active", tours: 98 },
  { id: 3, name: "Can Yılmaz", initials: "CY", role: "guide", email: "can@joinistanbul.com", phone: "+90 534 333 44 55", experiences: 2, rating: 4.5, status: "active", tours: 45 },
  { id: 4, name: "Elif Öz", initials: "EÖ", role: "assistant", email: "elif@joinistanbul.com", phone: "+90 535 444 55 66", experiences: 0, rating: 0, status: "inactive", tours: 12 },
];

const roleLabels: Record<string, string> = { owner: "Sahip", guide: "Rehber", assistant: "Asistan", admin: "Yönetici" };
const roleColors: Record<string, string> = { owner: "badge-vip", guide: "badge-aktif", assistant: "badge-taslak", admin: "badge-onaylandi" };

const permissions = [
  { key: "bookings", label: "Rezervasyonları Görüntüle", desc: "Tüm rezervasyonları görebilir" },
  { key: "bookings_edit", label: "Rezervasyon Düzenle", desc: "Rezervasyonları düzenleyip iptal edebilir" },
  { key: "pricing", label: "Fiyatlandırma", desc: "Fiyat değişikliği yapabilir" },
  { key: "revenue", label: "Gelir & Finans", desc: "Mali verileri görebilir" },
  { key: "team", label: "Ekip Yönetimi", desc: "Ekip üyesi ekleyip çıkarabilir" },
  { key: "settings", label: "Ayarlar", desc: "Genel ayarları değiştirebilir" },
];

export default function TeamPage() {
  const [inviteOpen, setInviteOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState<typeof teamMembers[0] | null>(null);
  const { toast } = useToast();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-xl font-headline font-semibold text-foreground">Ekip Yönetimi</h2>
          <p className="text-sm text-muted-foreground">{teamMembers.length} ekip üyesi</p>
        </div>
        <Button onClick={() => setInviteOpen(true)} className="rounded-full">
          <Plus size={16} /> Üye Davet Et
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Aktif Rehber", value: "3", icon: UserCog },
          { label: "Toplam Tur", value: "311", icon: Calendar },
          { label: "Ort. Puan", value: "4.7", icon: Star },
          { label: "Bu Ay Tur", value: "42", icon: Calendar },
        ].map((s) => (
          <Card key={s.label} className="card-shadow">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-1">
                <s.icon size={16} className="text-muted-foreground" />
                <span className="text-xs text-muted-foreground">{s.label}</span>
              </div>
              <p className="text-2xl font-headline font-bold text-foreground">{s.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Team Grid */}
      <div className="grid gap-4 md:grid-cols-2">
        {teamMembers.map((member) => (
          <Card key={member.id} className="card-shadow transition-card hover:card-shadow-hover cursor-pointer" onClick={() => setSelectedMember(member)}>
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <Avatar className="h-12 w-12">
                  <AvatarFallback className="bg-primary text-primary-foreground font-medium">{member.initials}</AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <h4 className="font-medium text-foreground">{member.name}</h4>
                      <span className={`${roleColors[member.role]}`}>{roleLabels[member.role]}</span>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={(e) => e.stopPropagation()}>
                          <MoreVertical size={14} />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem><Edit2 size={14} className="mr-2" /> Düzenle</DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive"><Trash2 size={14} className="mr-2" /> Kaldır</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                  <p className="text-xs text-muted-foreground mt-0.5">{member.email}</p>
                  <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                    <span>{member.experiences} deneyim</span>
                    <span>{member.tours} tur</span>
                    {member.rating > 0 && (
                      <span className="flex items-center gap-0.5">
                        <Star size={10} className="text-accent fill-accent" /> {member.rating}
                      </span>
                    )}
                    <span className={member.status === "active" ? "text-success" : "text-muted-foreground"}>
                      {member.status === "active" ? "● Aktif" : "○ Pasif"}
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Invite Dialog */}
      <Dialog open={inviteOpen} onOpenChange={setInviteOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Yeni Üye Davet Et</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Ad Soyad</Label>
                <Input placeholder="Tam isim" />
              </div>
              <div className="space-y-2">
                <Label>Rol</Label>
                <Select>
                  <SelectTrigger><SelectValue placeholder="Seçin" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="guide">Rehber</SelectItem>
                    <SelectItem value="assistant">Asistan</SelectItem>
                    <SelectItem value="admin">Yönetici</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-2">
              <Label>E-posta</Label>
              <Input type="email" placeholder="ornek@email.com" />
            </div>
            <div className="space-y-2">
              <Label>Telefon</Label>
              <Input type="tel" placeholder="+90 5xx xxx xx xx" />
            </div>
            <div className="space-y-3">
              <Label>İzinler</Label>
              {permissions.slice(0, 4).map((p) => (
                <div key={p.key} className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">{p.label}</p>
                    <p className="text-xs text-muted-foreground">{p.desc}</p>
                  </div>
                  <Switch />
                </div>
              ))}
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setInviteOpen(false)}>İptal</Button>
            <Button className="rounded-full" onClick={() => { setInviteOpen(false); toast({ title: "Davet gönderildi" }); }}>Davet Gönder</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Member Detail Dialog */}
      <Dialog open={!!selectedMember} onOpenChange={() => setSelectedMember(null)}>
        <DialogContent className="sm:max-w-lg">
          {selectedMember && (
            <>
              <DialogHeader>
                <DialogTitle>{selectedMember.name}</DialogTitle>
              </DialogHeader>
              <Tabs defaultValue="info">
                <TabsList className="w-full">
                  <TabsTrigger value="info" className="flex-1">Bilgiler</TabsTrigger>
                  <TabsTrigger value="permissions" className="flex-1">İzinler</TabsTrigger>
                </TabsList>
                <TabsContent value="info" className="space-y-4 mt-4">
                  <div className="flex items-center gap-4">
                    <Avatar className="h-16 w-16">
                      <AvatarFallback className="bg-primary text-primary-foreground text-lg">{selectedMember.initials}</AvatarFallback>
                    </Avatar>
                    <div>
                      <span className={`${roleColors[selectedMember.role]}`}>{roleLabels[selectedMember.role]}</span>
                      <p className="text-sm text-muted-foreground mt-1">{selectedMember.status === "active" ? "Aktif" : "Pasif"}</p>
                    </div>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2"><Mail size={14} className="text-muted-foreground" /> {selectedMember.email}</div>
                    <div className="flex items-center gap-2"><Phone size={14} className="text-muted-foreground" /> {selectedMember.phone}</div>
                  </div>
                  <div className="grid grid-cols-3 gap-4 text-center pt-2 border-t border-border">
                    <div>
                      <p className="text-lg font-semibold">{selectedMember.tours}</p>
                      <p className="text-xs text-muted-foreground">Toplam Tur</p>
                    </div>
                    <div>
                      <p className="text-lg font-semibold">{selectedMember.experiences}</p>
                      <p className="text-xs text-muted-foreground">Deneyim</p>
                    </div>
                    <div>
                      <p className="text-lg font-semibold flex items-center justify-center gap-1">
                        {selectedMember.rating > 0 ? <><Star size={14} className="text-accent fill-accent" />{selectedMember.rating}</> : "—"}
                      </p>
                      <p className="text-xs text-muted-foreground">Puan</p>
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="permissions" className="space-y-3 mt-4">
                  {permissions.map((p) => (
                    <div key={p.key} className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium">{p.label}</p>
                        <p className="text-xs text-muted-foreground">{p.desc}</p>
                      </div>
                      <Switch defaultChecked={selectedMember.role === "owner"} disabled={selectedMember.role === "owner"} />
                    </div>
                  ))}
                </TabsContent>
              </Tabs>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
