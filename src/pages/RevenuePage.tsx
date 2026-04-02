import { useState } from "react";
import { TrendingUp, DollarSign, Percent, Clock, FileDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid,
  PieChart, Pie, Cell, Legend,
} from "recharts";

const periods = [
  { value: "today", label: "Bugün" },
  { value: "week", label: "Bu Hafta" },
  { value: "month", label: "Bu Ay" },
  { value: "year", label: "Bu Yıl" },
];

const kpis = [
  { label: "BRÜT GELİR", value: "₺12,450", change: "+%12", positive: true, icon: DollarSign, tint: "bg-gold-tint text-accent" },
  { label: "KOMİSYON", value: "₺996", change: "%8 ort.", positive: false, icon: Percent, tint: "bg-muted text-primary" },
  { label: "NET GELİR", value: "₺11,454", change: "+%14", positive: true, icon: TrendingUp, tint: "bg-gold-tint text-accent" },
  { label: "BEKLEYEN ÖDEME", value: "₺3,200", change: "15 Nis", positive: false, icon: Clock, tint: "bg-muted text-primary" },
];

const monthlyRevenue = [
  { month: "Oca", revenue: 6200, prev: 5100 },
  { month: "Şub", revenue: 7400, prev: 6000 },
  { month: "Mar", revenue: 8550, prev: 7200 },
  { month: "Nis", revenue: 12450, prev: 9800 },
  { month: "May", revenue: 0, prev: 10200 },
  { month: "Haz", revenue: 0, prev: 11500 },
  { month: "Tem", revenue: 0, prev: 13200 },
  { month: "Ağu", revenue: 0, prev: 14100 },
  { month: "Eyl", revenue: 0, prev: 9600 },
  { month: "Eki", revenue: 0, prev: 8400 },
  { month: "Kas", revenue: 0, prev: 7100 },
  { month: "Ara", revenue: 0, prev: 6800 },
];

const experienceRevenue = [
  { name: "Kadıköy Turu", value: 45, color: "hsl(207, 61%, 28%)" },
  { name: "Kahve Workshop", value: 25, color: "hsl(46, 87%, 38%)" },
  { name: "Seramik", value: 18, color: "hsl(204, 64%, 47%)" },
  { name: "Yoga", value: 12, color: "hsl(195, 7%, 53%)" },
];

const commissionData = [
  { date: "15 Nis", guest: "Ahmet M.", experience: "Kadıköy Turu", brut: 350, komisyon: 28, islem: 10, kdv: 5, net: 307 },
  { date: "14 Nis", guest: "Elif K.", experience: "Kahve Workshop", brut: 280, komisyon: 22, islem: 8, kdv: 4, net: 246 },
  { date: "13 Nis", guest: "Can D.", experience: "Yoga", brut: 200, komisyon: 16, islem: 6, kdv: 3, net: 175 },
  { date: "12 Nis", guest: "Zeynep A.", experience: "Seramik Atölyesi", brut: 420, komisyon: 34, islem: 12, kdv: 6, net: 368 },
  { date: "11 Nis", guest: "Burak S.", experience: "Kadıköy Turu", brut: 350, komisyon: 28, islem: 10, kdv: 5, net: 307 },
  { date: "10 Nis", guest: "Deniz F.", experience: "Kahve Workshop", brut: 280, komisyon: 22, islem: 8, kdv: 4, net: 246 },
];

const pastPayouts = [
  { date: "8 Nis 2026", amount: "₺2,800", iban: "TR**...2341", status: "tamamlandi" },
  { date: "1 Nis 2026", amount: "₺3,100", iban: "TR**...2341", status: "tamamlandi" },
  { date: "25 Mar 2026", amount: "₺2,450", iban: "TR**...2341", status: "tamamlandi" },
];

const invoices = [
  { period: "Mart 2026", amount: "₺8,550", no: "JI-2026-03" },
  { period: "Şubat 2026", amount: "₺7,400", no: "JI-2026-02" },
  { period: "Ocak 2026", amount: "₺6,200", no: "JI-2026-01" },
];

function ChartTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-card rounded-lg card-shadow px-3 py-2 border border-border text-sm">
      <p className="font-semibold text-foreground">{label}</p>
      {payload.map((p: any, i: number) => (
        <p key={i} style={{ color: p.color }} className="text-xs">
          {p.dataKey === "revenue" ? "Bu Yıl" : "Geçen Yıl"}: ₺{p.value.toLocaleString("tr-TR")}
        </p>
      ))}
    </div>
  );
}

export default function RevenuePage() {
  const isMobile = useIsMobile();
  const [period, setPeriod] = useState("month");
  const [showPrev, setShowPrev] = useState(false);

  return (
    <div className="space-y-6">
      {/* Period Selector */}
      <div className="flex gap-1 bg-muted rounded-lg p-1 w-fit">
        {periods.map(p => (
          <button
            key={p.value}
            onClick={() => setPeriod(p.value)}
            className={cn(
              "px-4 py-2 text-sm font-medium rounded-md transition-colors",
              period === p.value ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
            )}
          >
            {p.label}
          </button>
        ))}
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {kpis.map(kpi => (
          <div key={kpi.label} className="bg-card rounded-lg card-shadow p-4 lg:p-5 space-y-2">
            <div className={cn("w-9 h-9 rounded-full flex items-center justify-center", kpi.tint)}>
              <kpi.icon className="w-4 h-4" />
            </div>
            <p className="text-[11px] uppercase tracking-wider text-muted-foreground font-semibold">{kpi.label}</p>
            <p className="text-2xl lg:text-[28px] font-bold text-foreground font-body">{kpi.value}</p>
            <span className={cn(
              "text-xs font-semibold px-2 py-0.5 rounded-full inline-block",
              kpi.positive ? "bg-success/10 text-success" : "bg-muted text-muted-foreground"
            )}>
              {kpi.change}
            </span>
          </div>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
        {/* Bar Chart */}
        <div className="lg:col-span-3 bg-card rounded-lg card-shadow p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base font-bold text-foreground">Aylık Gelir Trendi</h3>
            <label className="flex items-center gap-2 text-xs text-muted-foreground cursor-pointer select-none">
              <input type="checkbox" checked={showPrev} onChange={e => setShowPrev(e.target.checked)} className="rounded" />
              Geçen Yılla Karşılaştır
            </label>
          </div>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={monthlyRevenue} barGap={2}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(213, 27%, 91%)" />
              <XAxis dataKey="month" tickLine={false} axisLine={false} tick={{ fontSize: 12, fill: "hsl(195, 7%, 53%)" }} />
              <YAxis tickLine={false} axisLine={false} tick={{ fontSize: 11, fill: "hsl(195, 7%, 53%)" }} tickFormatter={v => `₺${(v / 1000).toFixed(0)}k`} />
              <Tooltip content={<ChartTooltip />} />
              {showPrev && <Bar dataKey="prev" fill="hsl(207, 61%, 28%)" opacity={0.2} radius={[4, 4, 0, 0]} />}
              <Bar dataKey="revenue" fill="hsl(207, 61%, 28%)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Donut Chart */}
        <div className="lg:col-span-2 bg-card rounded-lg card-shadow p-5">
          <h3 className="text-base font-bold text-foreground mb-4">Deneyim Bazlı Gelir</h3>
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie data={experienceRevenue} innerRadius={55} outerRadius={85} dataKey="value" paddingAngle={3} strokeWidth={0}>
                {experienceRevenue.map((entry, i) => <Cell key={i} fill={entry.color} />)}
              </Pie>
              <Legend
                verticalAlign="bottom"
                iconType="circle"
                iconSize={8}
                formatter={(value: string) => <span className="text-xs text-foreground ml-1">{value}</span>}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Commission Table */}
      <div className="bg-card rounded-lg card-shadow overflow-hidden">
        <div className="p-5 pb-0">
          <h3 className="text-base font-bold text-foreground">Rezervasyon Bazlı Gelir Detayı</h3>
        </div>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-background hover:bg-background">
                {["Tarih", "Misafir", "Deneyim", "Brüt", "Komisyon %8", "İşlem %2.9", "KDV %18", "Net"].map(h => (
                  <TableHead key={h} className="text-[11px] uppercase tracking-wider text-muted-foreground font-semibold whitespace-nowrap">{h}</TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {commissionData.map((row, i) => (
                <TableRow key={i} className="hover:bg-muted/30">
                  <TableCell className="text-sm text-foreground whitespace-nowrap">{row.date}</TableCell>
                  <TableCell className="text-sm font-medium text-foreground">{row.guest}</TableCell>
                  <TableCell className="text-sm text-foreground">{row.experience}</TableCell>
                  <TableCell className="text-sm text-foreground">₺{row.brut}</TableCell>
                  <TableCell className="text-sm text-destructive">-₺{row.komisyon}</TableCell>
                  <TableCell className="text-sm text-destructive">-₺{row.islem}</TableCell>
                  <TableCell className="text-sm text-destructive">-₺{row.kdv}</TableCell>
                  <TableCell className="text-sm font-bold text-foreground">₺{row.net}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Payout Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Next Payout */}
        <div className="bg-gold-tint rounded-lg p-5 space-y-2 border border-accent/20">
          <p className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">Sonraki Ödeme</p>
          <p className="text-3xl font-bold text-foreground font-body">₺3,200</p>
          <p className="text-sm text-muted-foreground">15 Nisan 2026 • Haftalık</p>
          <p className="text-xs text-muted-foreground">IBAN: TR89 0006 4000 0017 1234 **2341</p>
          <Button variant="outline" size="sm" className="mt-2 rounded-pill text-xs border-primary text-primary">Detay</Button>
        </div>

        {/* Past Payouts */}
        <div className="bg-card rounded-lg card-shadow overflow-hidden">
          <div className="p-4 pb-0">
            <h3 className="text-sm font-bold text-foreground mb-3">Geçmiş Ödemeler</h3>
          </div>
          <Table>
            <TableHeader>
              <TableRow className="bg-background hover:bg-background">
                <TableHead className="text-[11px] uppercase tracking-wider text-muted-foreground font-semibold">Tarih</TableHead>
                <TableHead className="text-[11px] uppercase tracking-wider text-muted-foreground font-semibold">Tutar</TableHead>
                <TableHead className="text-[11px] uppercase tracking-wider text-muted-foreground font-semibold">IBAN</TableHead>
                <TableHead className="text-[11px] uppercase tracking-wider text-muted-foreground font-semibold">Durum</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {pastPayouts.map((p, i) => (
                <TableRow key={i} className="hover:bg-muted/30">
                  <TableCell className="text-sm text-foreground whitespace-nowrap">{p.date}</TableCell>
                  <TableCell className="text-sm font-medium text-foreground">{p.amount}</TableCell>
                  <TableCell className="text-sm text-muted-foreground">{p.iban}</TableCell>
                  <TableCell><span className="badge-aktif">✅ Tamamlandı</span></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Invoices */}
      <div className="bg-card rounded-lg card-shadow overflow-hidden">
        <div className="p-5 pb-0">
          <h3 className="text-base font-bold text-foreground">Faturalar</h3>
        </div>
        <div className="divide-y divide-border">
          {invoices.map((inv, i) => (
            <div key={i} className="flex items-center justify-between px-5 py-3">
              <div>
                <p className="text-sm font-medium text-foreground">{inv.period}</p>
                <p className="text-xs text-muted-foreground">Fatura #{inv.no}</p>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-sm font-bold text-foreground">{inv.amount}</span>
                <Button variant="ghost" size="sm" className="text-primary text-xs gap-1.5">
                  <FileDown className="w-3.5 h-3.5" /> PDF İndir
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
