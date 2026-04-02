import { useState } from "react";
import { CalendarPlus, ChevronLeft, ChevronRight, Users, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const views = [
  { value: "month", label: "Ay" },
  { value: "week", label: "Hafta" },
  { value: "day", label: "Gün" },
  { value: "list", label: "Liste" },
];

const dayNames = ["Pzt", "Sal", "Çar", "Per", "Cum", "Cmt", "Paz"];

interface Slot {
  id: string;
  day: number;
  time: string;
  endTime: string;
  experience: string;
  booked: number;
  capacity: number;
}

const slots: Slot[] = [
  { id: "1", day: 1, time: "10:00", endTime: "12:00", experience: "Türk Kahvesi Workshop", booked: 6, capacity: 10 },
  { id: "2", day: 1, time: "14:00", endTime: "17:00", experience: "Kadıköy Sokak Lezzetleri", booked: 12, capacity: 12 },
  { id: "3", day: 2, time: "10:00", endTime: "12:00", experience: "Seramik Atölyesi", booked: 4, capacity: 8 },
  { id: "4", day: 3, time: "18:00", endTime: "20:00", experience: "Bosphorus Yoga", booked: 3, capacity: 8 },
  { id: "5", day: 5, time: "14:00", endTime: "17:00", experience: "Kadıköy Sokak Lezzetleri", booked: 8, capacity: 12 },
  { id: "6", day: 6, time: "10:00", endTime: "12:00", experience: "Türk Kahvesi Workshop", booked: 9, capacity: 10 },
  { id: "7", day: 6, time: "14:00", endTime: "17:00", experience: "Kadıköy Sokak Lezzetleri", booked: 5, capacity: 12 },
  { id: "8", day: 8, time: "10:00", endTime: "13:00", experience: "Osmanlı Mutfağı Atölyesi", booked: 7, capacity: 10 },
  { id: "9", day: 10, time: "14:00", endTime: "16:00", experience: "Ebru Sanatı Workshop", booked: 3, capacity: 6 },
  { id: "10", day: 12, time: "18:00", endTime: "20:00", experience: "Bosphorus Yoga", booked: 6, capacity: 8 },
  { id: "11", day: 15, time: "10:00", endTime: "12:00", experience: "Türk Kahvesi Workshop", booked: 10, capacity: 10 },
  { id: "12", day: 15, time: "14:00", endTime: "17:00", experience: "Kadıköy Sokak Lezzetleri", booked: 11, capacity: 12 },
  { id: "13", day: 18, time: "10:00", endTime: "12:00", experience: "Seramik Atölyesi", booked: 2, capacity: 8 },
  { id: "14", day: 20, time: "14:00", endTime: "17:00", experience: "Kadıköy Sokak Lezzetleri", booked: 0, capacity: 12 },
  { id: "15", day: 22, time: "10:00", endTime: "12:00", experience: "Türk Kahvesi Workshop", booked: 5, capacity: 10 },
  { id: "16", day: 25, time: "18:00", endTime: "20:00", experience: "Bosphorus Yoga", booked: 8, capacity: 8 },
  { id: "17", day: 27, time: "10:00", endTime: "13:00", experience: "Osmanlı Mutfağı Atölyesi", booked: 4, capacity: 10 },
  { id: "18", day: 29, time: "14:00", endTime: "16:00", experience: "Ebru Sanatı Workshop", booked: 1, capacity: 6 },
];

function SlotCard({ slot, compact = false }: { slot: Slot; compact?: boolean }) {
  const full = slot.booked >= slot.capacity;
  const pct = (slot.booked / slot.capacity) * 100;
  return (
    <div className={cn(
      "rounded-lg p-2 text-xs border-l-[3px] transition-card",
      full ? "bg-primary/5 border-l-primary" : "bg-card border-l-accent"
    )}>
      <div className="flex items-center justify-between gap-1">
        <span className="font-semibold text-foreground truncate">{compact ? slot.experience.split(" ")[0] : slot.experience}</span>
        {full && <span className="badge-iptal text-[9px] px-1.5 py-0">DOLU</span>}
      </div>
      <p className="text-muted-foreground mt-0.5">{slot.time}-{slot.endTime}</p>
      {!compact && (
        <div className="mt-1.5">
          <div className="h-1 bg-input rounded-full overflow-hidden">
            <div className="h-full rounded-full bg-primary transition-all" style={{ width: `${pct}%` }} />
          </div>
          <p className="text-muted-foreground mt-0.5">{slot.booked}/{slot.capacity} misafir</p>
        </div>
      )}
    </div>
  );
}

function QuickAddDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="rounded-pill bg-accent text-accent-foreground hover:bg-gold-hover h-9 px-4 text-sm">
          <CalendarPlus className="w-4 h-4 mr-1.5" /> Slot Ekle
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md rounded-2xl">
        <DialogHeader><DialogTitle className="font-headline text-primary">Hızlı Slot Ekle</DialogTitle></DialogHeader>
        <div className="space-y-4 py-2">
          <div className="space-y-1.5">
            <Label className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">Deneyim</Label>
            <Select><SelectTrigger className="rounded-lg h-10"><SelectValue placeholder="Deneyim seçin" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="kadikoy">Kadıköy Sokak Lezzetleri</SelectItem>
                <SelectItem value="kahve">Türk Kahvesi Workshop</SelectItem>
                <SelectItem value="seramik">Seramik Atölyesi</SelectItem>
                <SelectItem value="yoga">Bosphorus Yoga</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">Başlangıç</Label>
              <Select><SelectTrigger className="rounded-lg h-10"><SelectValue placeholder="Saat" /></SelectTrigger>
                <SelectContent>{["09:00","10:00","11:00","12:00","13:00","14:00","15:00","16:00","17:00","18:00","19:00"].map(t=><SelectItem key={t} value={t}>{t}</SelectItem>)}</SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">Bitiş</Label>
              <Select><SelectTrigger className="rounded-lg h-10"><SelectValue placeholder="Saat" /></SelectTrigger>
                <SelectContent>{["10:00","11:00","12:00","13:00","14:00","15:00","16:00","17:00","18:00","19:00","20:00"].map(t=><SelectItem key={t} value={t}>{t}</SelectItem>)}</SelectContent>
              </Select>
            </div>
          </div>
          <div className="space-y-1.5">
            <Label className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">Kapasite</Label>
            <Input type="number" placeholder="12" className="rounded-lg h-10" />
          </div>
        </div>
        <DialogFooter><Button className="w-full rounded-pill bg-accent text-accent-foreground hover:bg-gold-hover h-10">Ekle</Button></DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default function CalendarPage() {
  const isMobile = useIsMobile();
  const [view, setView] = useState(isMobile ? "list" : "month");
  const [selectedDay, setSelectedDay] = useState<number | null>(null);

  const daysInMonth = 30;
  const firstDayOffset = 2; // Nisan 2026 Çarşamba'dan başlıyor

  const calendarDays = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
        <div className="flex gap-1 bg-muted rounded-lg p-1">
          {views.map(v => (
            <button key={v.value} onClick={() => setView(v.value)}
              className={cn("px-3 py-1.5 text-sm font-medium rounded-md transition-colors",
                view === v.value ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
              )}>{v.label}</button>
          ))}
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="h-8 w-8"><ChevronLeft className="w-4 h-4" /></Button>
            <span className="text-base font-bold text-foreground min-w-[120px] text-center">Nisan 2026</span>
            <Button variant="ghost" size="icon" className="h-8 w-8"><ChevronRight className="w-4 h-4" /></Button>
            <Button variant="ghost" size="sm" className="text-sm text-primary">Bugün</Button>
          </div>
          <QuickAddDialog />
        </div>
      </div>

      {/* Month View */}
      {view === "month" && (
        <div className="bg-card rounded-lg card-shadow overflow-hidden">
          <div className="grid grid-cols-7 border-b border-border">
            {dayNames.map(d => (
              <div key={d} className="text-center py-2 text-[11px] uppercase tracking-wider text-muted-foreground font-semibold">{d}</div>
            ))}
          </div>
          <div className="grid grid-cols-7">
            {Array.from({ length: firstDayOffset }, (_, i) => (
              <div key={`e${i}`} className="min-h-[100px] border-b border-r border-border bg-muted/30" />
            ))}
            {calendarDays.map(day => {
              const daySlots = slots.filter(s => s.day === day);
              const isToday = day === 3;
              return (
                <div
                  key={day}
                  className={cn("min-h-[100px] border-b border-r border-border p-1.5 cursor-pointer hover:bg-muted/20 transition-colors",
                    selectedDay === day && "bg-gold-tint"
                  )}
                  onClick={() => setSelectedDay(selectedDay === day ? null : day)}
                >
                  <span className={cn("text-sm font-medium inline-flex w-6 h-6 items-center justify-center rounded-full",
                    isToday ? "bg-accent text-accent-foreground" : "text-foreground"
                  )}>{day}</span>
                  <div className="mt-1 space-y-1">
                    {daySlots.slice(0, 2).map(s => {
                      const full = s.booked >= s.capacity;
                      return (
                        <div key={s.id} className="flex items-center gap-1">
                          <span className={cn("w-1.5 h-1.5 rounded-full flex-shrink-0", full ? "bg-destructive" : s.booked > 0 ? "bg-primary" : "bg-accent")} />
                          <span className="text-[10px] text-muted-foreground truncate">{s.time} {s.experience.split(" ")[0]}</span>
                        </div>
                      );
                    })}
                    {daySlots.length > 2 && <span className="text-[10px] text-muted-foreground">+{daySlots.length - 2} daha</span>}
                  </div>
                </div>
              );
            })}
          </div>
          {/* Expanded day detail */}
          {selectedDay && (
            <div className="p-4 border-t border-border bg-background">
              <h4 className="text-sm font-bold text-foreground mb-3">{selectedDay} Nisan 2026</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                {slots.filter(s => s.day === selectedDay).length > 0
                  ? slots.filter(s => s.day === selectedDay).map(s => <SlotCard key={s.id} slot={s} />)
                  : <p className="text-sm text-muted-foreground col-span-full">Bu gün için slot bulunmuyor.</p>
                }
              </div>
            </div>
          )}
        </div>
      )}

      {/* List View */}
      {view === "list" && (
        <div className="space-y-4">
          {[1, 2, 3, 5, 6, 8, 10, 12, 15, 18, 20, 22, 25, 27, 29].map(day => {
            const daySlots = slots.filter(s => s.day === day);
            if (daySlots.length === 0) return null;
            const dayOfWeek = dayNames[(day + firstDayOffset - 1) % 7];
            return (
              <div key={day}>
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">{dayOfWeek}, {day} Nisan 2026</p>
                <div className="space-y-2">
                  {daySlots.map(s => (
                    <div key={s.id} className="bg-card rounded-lg card-shadow p-3 flex items-center gap-3">
                      <div className="bg-primary text-primary-foreground rounded-lg px-3 py-2 text-center flex-shrink-0">
                        <p className="text-xs font-bold">{s.time}</p>
                        <p className="text-[10px] opacity-70">{s.endTime}</p>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-foreground truncate">{s.experience}</p>
                        <div className="flex items-center gap-3 mt-1">
                          <div className="flex-1">
                            <div className="h-1 bg-input rounded-full overflow-hidden">
                              <div className="h-full rounded-full bg-primary" style={{ width: `${(s.booked / s.capacity) * 100}%` }} />
                            </div>
                          </div>
                          <span className="text-xs text-muted-foreground flex-shrink-0">{s.booked}/{s.capacity}</span>
                        </div>
                      </div>
                      {s.booked >= s.capacity && <span className="badge-iptal text-[10px]">DOLU</span>}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Week View */}
      {view === "week" && (
        <div className="bg-card rounded-lg card-shadow overflow-x-auto">
          <div className="min-w-[700px]">
            <div className="grid grid-cols-7 border-b border-border">
              {dayNames.map((d, i) => (
                <div key={d} className="text-center py-2 border-r border-border last:border-r-0">
                  <span className="text-[11px] uppercase tracking-wider text-muted-foreground font-semibold">{d}</span>
                  <p className={cn("text-lg font-bold mt-0.5", i === 2 ? "text-accent" : "text-foreground")}>{i + 1}</p>
                </div>
              ))}
            </div>
            <div className="grid grid-cols-7">
              {dayNames.map((_, i) => {
                const day = i + 1;
                const daySlots = slots.filter(s => s.day === day);
                return (
                  <div key={i} className="border-r border-border last:border-r-0 p-2 min-h-[300px] space-y-2">
                    {daySlots.map(s => <SlotCard key={s.id} slot={s} compact />)}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Day View */}
      {view === "day" && (
        <div className="bg-card rounded-lg card-shadow">
          <div className="p-4 border-b border-border">
            <p className="text-sm font-bold text-foreground">Çarşamba, 3 Nisan 2026</p>
          </div>
          <div className="divide-y divide-border">
            {Array.from({ length: 15 }, (_, i) => i + 8).map(hour => {
              const timeStr = `${hour.toString().padStart(2, "0")}:00`;
              const hourSlots = slots.filter(s => s.day === 3 && parseInt(s.time) === hour);
              return (
                <div key={hour} className="flex min-h-[60px]">
                  <div className="w-16 flex-shrink-0 py-2 pr-2 text-right text-xs text-muted-foreground">{timeStr}</div>
                  <div className="flex-1 border-l border-border p-2 space-y-1">
                    {hourSlots.map(s => <SlotCard key={s.id} slot={s} />)}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
