import { useState } from "react";
import { Search, Paperclip, Send, MessageSquare, Smartphone, Mail, Check, CheckCheck } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";

interface Message {
  id: string;
  sender: "guest" | "organizer";
  text: string;
  time: string;
  read: boolean;
}

interface Conversation {
  id: string;
  guest: { name: string; avatar: string };
  lastMessage: string;
  time: string;
  unread: boolean;
  channel: "app" | "whatsapp" | "email";
  lastSeen: string;
  messages: Message[];
}

const conversations: Conversation[] = [
  {
    id: "1",
    guest: { name: "Ahmet M.", avatar: "A" },
    lastMessage: "Merhaba, 14:00 seansında park...",
    time: "12dk",
    unread: true,
    channel: "app",
    lastSeen: "5dk önce",
    messages: [
      { id: "m1", sender: "guest", text: "Merhaba, 15 Nisan'daki tura 4 kişi katılmak istiyoruz. Özel fiyat mümkün mü?", time: "14:22", read: true },
      { id: "m2", sender: "organizer", text: "Merhaba Ahmet Bey! 4+ kişi için %15 grup indirimiz var. Kişi başı ₺297 olur.", time: "14:25", read: true },
      { id: "m3", sender: "guest", text: "Harika! Hemen rezervasyon yapıyorum, teşekkürler.", time: "14:26", read: true },
      { id: "m4", sender: "guest", text: "Merhaba, 14:00 seansında park yeri var mı?", time: "15:10", read: false },
    ],
  },
  {
    id: "2",
    guest: { name: "Elif K.", avatar: "E" },
    lastMessage: "Teşekkürler, görüşürüz!",
    time: "2s",
    unread: false,
    channel: "whatsapp",
    lastSeen: "2 saat önce",
    messages: [
      { id: "m5", sender: "guest", text: "Workshop'a çocuğumla gelebilir miyim?", time: "10:00", read: true },
      { id: "m6", sender: "organizer", text: "Tabii ki! 8 yaş üzeri çocuklar katılabilir. Çocuk fiyatı ₺168.", time: "10:15", read: true },
      { id: "m7", sender: "guest", text: "Teşekkürler, görüşürüz!", time: "10:20", read: true },
    ],
  },
  {
    id: "3",
    guest: { name: "Can D.", avatar: "C" },
    lastMessage: "İptal süreci hakkında...",
    time: "1g",
    unread: true,
    channel: "app",
    lastSeen: "1 gün önce",
    messages: [
      { id: "m8", sender: "guest", text: "İptal süreci hakkında bilgi alabilir miyim? Planlarım değişti.", time: "09:00", read: false },
    ],
  },
  {
    id: "4",
    guest: { name: "Deniz F.", avatar: "D" },
    lastMessage: "Grup için özel fiyat mümkün mü?",
    time: "3g",
    unread: false,
    channel: "app",
    lastSeen: "3 gün önce",
    messages: [
      { id: "m9", sender: "guest", text: "Grup için özel fiyat mümkün mü?", time: "11:00", read: true },
      { id: "m10", sender: "organizer", text: "Elbette! Kaç kişilik bir grup düşünüyorsunuz?", time: "11:30", read: true },
    ],
  },
];

const autoMessages = [
  { id: "1", trigger: "Rezervasyon Onayı", template: "Merhaba {isim}, {deneyim} için rez. onaylandı!", enabled: true },
  { id: "2", trigger: "24 Saat Önce Hatırlatma", template: "Yarın {saat}'de {deneyim} var, unutmayın!", enabled: true },
  { id: "3", trigger: "Sonrası Teşekkür", template: "Teşekkürler {isim}! Deneyim nasıl geçti?", enabled: true },
  { id: "4", trigger: "+3 Gün Yorum İsteği", template: "Yorumunuz bizim için çok değerli...", enabled: true },
];

const quickReplies = [
  "Teşekkürler! Herhangi bir sorunuz olursa...",
  "Maalesef bu tarih dolu, alternatif...",
  "Buluşma noktası: Kadıköy iskele...",
];

function ChannelIcon({ channel }: { channel: Conversation["channel"] }) {
  if (channel === "whatsapp") return <Smartphone className="w-3.5 h-3.5 text-success" />;
  if (channel === "email") return <Mail className="w-3.5 h-3.5 text-info" />;
  return <MessageSquare className="w-3.5 h-3.5 text-primary" />;
}

function GuestAvatar({ letter, size = 40 }: { letter: string; size?: number }) {
  return (
    <div className="rounded-full bg-navy-medium flex items-center justify-center text-white font-semibold flex-shrink-0" style={{ width: size, height: size, fontSize: size * 0.4 }}>
      {letter}
    </div>
  );
}

export default function MessagesPage() {
  const isMobile = useIsMobile();
  const [selectedConv, setSelectedConv] = useState<Conversation | null>(isMobile ? null : conversations[0]);
  const [messageInput, setMessageInput] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [convFilter, setConvFilter] = useState("all");

  const filteredConvs = conversations.filter(c => {
    if (searchTerm && !c.guest.name.toLowerCase().includes(searchTerm.toLowerCase())) return false;
    if (convFilter === "unread" && !c.unread) return false;
    return true;
  });

  const unreadCount = conversations.filter(c => c.unread).length;

  // Mobile: show list or chat
  if (isMobile && selectedConv) {
    return (
      <div className="flex flex-col h-[calc(100vh-140px)]">
        {/* Chat Header */}
        <div className="flex items-center gap-3 pb-3 border-b border-border">
          <Button variant="ghost" size="sm" onClick={() => setSelectedConv(null)} className="text-primary">← Geri</Button>
          <GuestAvatar letter={selectedConv.guest.avatar} size={36} />
          <div className="flex-1">
            <p className="text-sm font-semibold text-foreground">{selectedConv.guest.name}</p>
            <p className="text-xs text-muted-foreground">Son görülme: {selectedConv.lastSeen}</p>
          </div>
          <ChannelIcon channel={selectedConv.channel} />
        </div>
        {/* Messages */}
        <div className="flex-1 overflow-y-auto py-4 space-y-3">
          {selectedConv.messages.map(m => (
            <div key={m.id} className={cn("flex", m.sender === "organizer" ? "justify-end" : "justify-start")}>
              <div className={cn("max-w-[80%] rounded-xl px-3 py-2", m.sender === "organizer" ? "bg-primary text-primary-foreground rounded-tr-sm" : "bg-input text-foreground rounded-tl-sm")}>
                <p className="text-sm">{m.text}</p>
                <div className={cn("flex items-center gap-1 mt-1", m.sender === "organizer" ? "justify-end" : "justify-start")}>
                  <span className={cn("text-[10px]", m.sender === "organizer" ? "text-primary-foreground/60" : "text-muted-foreground")}>{m.time}</span>
                  {m.sender === "organizer" && <CheckCheck className={cn("w-3 h-3", m.read ? "text-info" : "text-primary-foreground/40")} />}
                </div>
              </div>
            </div>
          ))}
        </div>
        {/* Input */}
        <div className="flex items-center gap-2 pt-3 border-t border-border">
          <Button variant="ghost" size="icon" className="h-9 w-9 flex-shrink-0"><Paperclip className="w-4 h-4" /></Button>
          <Input value={messageInput} onChange={e => setMessageInput(e.target.value)} placeholder="Mesajınızı yazın..." className="rounded-pill h-9 bg-input border-0 flex-1" />
          <button className="w-9 h-9 rounded-full bg-accent text-accent-foreground flex items-center justify-center flex-shrink-0"><Send className="w-4 h-4" /></button>
        </div>
      </div>
    );
  }

  return (
    <Tabs defaultValue="conversations" className="space-y-4">
      <TabsList className="bg-muted p-1 rounded-lg h-auto">
        <TabsTrigger value="conversations" className="rounded-md text-sm data-[state=active]:bg-card data-[state=active]:shadow-sm">Konuşmalar</TabsTrigger>
        <TabsTrigger value="auto" className="rounded-md text-sm data-[state=active]:bg-card data-[state=active]:shadow-sm">Otomatik Mesajlar</TabsTrigger>
        <TabsTrigger value="quick" className="rounded-md text-sm data-[state=active]:bg-card data-[state=active]:shadow-sm">Hazır Yanıtlar</TabsTrigger>
      </TabsList>

      <TabsContent value="conversations">
        <div className={cn("bg-card rounded-lg card-shadow overflow-hidden", !isMobile && "flex h-[600px]")}>
          {/* Left Panel */}
          <div className={cn("border-r border-border flex flex-col", isMobile ? "w-full" : "w-[35%]")}>
            <div className="p-3 space-y-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input placeholder="Mesaj ara..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="pl-9 rounded-pill h-9 bg-input border-0 text-sm" />
              </div>
              <div className="flex gap-1">
                {[{ v: "all", l: "Tümü" }, { v: "unread", l: `Okunmamış (${unreadCount})` }].map(f => (
                  <button key={f.v} onClick={() => setConvFilter(f.v)}
                    className={cn("px-3 py-1 rounded-full text-xs font-medium transition-colors",
                      convFilter === f.v ? "bg-accent text-accent-foreground" : "bg-input text-foreground"
                    )}>{f.l}</button>
                ))}
              </div>
            </div>
            <div className="flex-1 overflow-y-auto divide-y divide-border">
              {filteredConvs.map(c => (
                <button key={c.id} onClick={() => setSelectedConv(c)}
                  className={cn("w-full p-3 flex items-center gap-3 text-left hover:bg-muted/30 transition-colors",
                    selectedConv?.id === c.id && "bg-muted/50"
                  )}>
                  <GuestAvatar letter={c.guest.avatar} size={40} />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className={cn("text-sm truncate", c.unread ? "font-bold text-foreground" : "font-medium text-foreground")}>{c.guest.name}</span>
                      <span className="text-[10px] text-muted-foreground flex-shrink-0">{c.time}</span>
                    </div>
                    <div className="flex items-center justify-between mt-0.5">
                      <span className="text-xs text-muted-foreground truncate">{c.lastMessage}</span>
                      <div className="flex items-center gap-1 flex-shrink-0">
                        <ChannelIcon channel={c.channel} />
                        {c.unread && <span className="w-2 h-2 rounded-full bg-info" />}
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Right Panel - Chat */}
          {!isMobile && (
            <div className="flex-1 flex flex-col">
              {selectedConv ? (
                <>
                  <div className="px-4 py-3 border-b border-border flex items-center gap-3">
                    <GuestAvatar letter={selectedConv.guest.avatar} size={36} />
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-foreground">{selectedConv.guest.name}</p>
                      <p className="text-xs text-muted-foreground">Son görülme: {selectedConv.lastSeen}</p>
                    </div>
                    <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                      <ChannelIcon channel={selectedConv.channel} />
                      <span>{selectedConv.channel === "whatsapp" ? "WhatsApp" : selectedConv.channel === "email" ? "Email" : "Uygulama"}</span>
                    </div>
                  </div>
                  <div className="flex-1 overflow-y-auto p-4 space-y-3">
                    {selectedConv.messages.map(m => (
                      <div key={m.id} className={cn("flex", m.sender === "organizer" ? "justify-end" : "justify-start")}>
                        <div className={cn("max-w-[70%] rounded-xl px-3.5 py-2", m.sender === "organizer" ? "bg-primary text-primary-foreground rounded-tr-sm" : "bg-input text-foreground rounded-tl-sm")}>
                          <p className="text-sm">{m.text}</p>
                          <div className={cn("flex items-center gap-1 mt-1", m.sender === "organizer" ? "justify-end" : "justify-start")}>
                            <span className={cn("text-[10px]", m.sender === "organizer" ? "text-primary-foreground/60" : "text-muted-foreground")}>{m.time}</span>
                            {m.sender === "organizer" && <CheckCheck className={cn("w-3 h-3", m.read ? "text-info" : "text-primary-foreground/40")} />}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="px-4 py-3 border-t border-border">
                    <div className="text-[10px] text-muted-foreground mb-2 flex items-center gap-1">
                      <ChannelIcon channel={selectedConv.channel} />
                      Bu konuşma {selectedConv.channel === "whatsapp" ? "WhatsApp" : "uygulama"} üzerinden
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="icon" className="h-9 w-9 flex-shrink-0"><Paperclip className="w-4 h-4" /></Button>
                      <Input value={messageInput} onChange={e => setMessageInput(e.target.value)} placeholder="Mesajınızı yazın..." className="rounded-pill h-9 bg-input border-0 flex-1" />
                      <button className="w-9 h-9 rounded-full bg-accent text-accent-foreground flex items-center justify-center flex-shrink-0 hover:bg-gold-hover transition-colors">
                        <Send className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </>
              ) : (
                <div className="flex-1 flex items-center justify-center text-center">
                  <div>
                    <MessageSquare className="w-12 h-12 text-muted-foreground/30 mx-auto mb-3" />
                    <p className="text-sm text-muted-foreground">Bir konuşma seçin</p>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </TabsContent>

      <TabsContent value="auto" className="space-y-3">
        {autoMessages.map(am => (
          <div key={am.id} className="bg-card rounded-lg card-shadow p-4 flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center flex-shrink-0">
              <MessageSquare className="w-5 h-5 text-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-foreground">{am.trigger}</p>
              <p className="text-xs text-muted-foreground truncate mt-0.5">"{am.template}"</p>
            </div>
            <Switch defaultChecked={am.enabled} />
            <Button variant="ghost" size="sm" className="text-xs text-navy-medium">Düzenle</Button>
          </div>
        ))}
      </TabsContent>

      <TabsContent value="quick" className="space-y-3">
        {quickReplies.map((qr, i) => (
          <div key={i} className="bg-card rounded-lg card-shadow p-4 flex items-center justify-between gap-3">
            <p className="text-sm text-foreground flex-1 truncate">"{qr}"</p>
            <div className="flex gap-1">
              <Button variant="ghost" size="sm" className="text-xs text-navy-medium">Düzenle</Button>
              <Button variant="ghost" size="sm" className="text-xs text-destructive">Sil</Button>
            </div>
          </div>
        ))}
        <Button variant="outline" className="rounded-pill border-primary text-primary text-sm">
          <MessageSquare className="w-4 h-4 mr-1.5" /> Yeni Hazır Yanıt
        </Button>
      </TabsContent>
    </Tabs>
  );
}
