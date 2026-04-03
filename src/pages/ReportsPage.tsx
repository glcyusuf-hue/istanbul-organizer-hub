import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  BarChart3, TrendingUp, TrendingDown, Download, FileText, Calendar,
  Users, Star, DollarSign, Clock, ArrowUpRight, ArrowDownRight
} from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from "recharts";

const monthlyData = [
  { month: "Oca", reservations: 42, revenue: 33600, guests: 126 },
  { month: "Şub", reservations: 38, revenue: 30400, guests: 114 },
  { month: "Mar", reservations: 56, revenue: 44800, guests: 168 },
  { month: "Nis", reservations: 71, revenue: 56800, guests: 213 },
  { month: "May", reservations: 89, revenue: 71200, guests: 267 },
  { month: "Haz", reservations: 104, revenue: 83200, guests: 312 },
];

const experiencePerformance = [
  { name: "Boğaz Turu", bookings: 156, revenue: 124800, rating: 4.8, occupancy: 87, trend: "up" },
  { name: "Tarihi Yarımada", bookings: 98, revenue: 58800, rating: 4.6, occupancy: 72, trend: "up" },
  { name: "Kapadokya Balon", bookings: 67, revenue: 134000, rating: 4.9, occupancy: 94, trend: "up" },
  { name: "Pamukkale Turu", bookings: 45, revenue: 36000, rating: 4.3, occupancy: 58, trend: "down" },
];

const pieData = [
  { name: "Boğaz Turu", value: 35, color: "hsl(207, 61%, 28%)" },
  { name: "Tarihi Yarımada", value: 25, color: "hsl(204, 64%, 47%)" },
  { name: "Kapadokya Balon", value: 28, color: "hsl(46, 87%, 38%)" },
  { name: "Diğer", value: 12, color: "hsl(210, 14%, 83%)" },
];

const savedReports = [
  { id: 1, name: "Aylık Performans Raporu", type: "Otomatik", lastRun: "1 Haz 2024", schedule: "Aylık" },
  { id: 2, name: "Deneyim Karşılaştırma", type: "Manuel", lastRun: "28 May 2024", schedule: "—" },
  { id: 3, name: "Misafir Analizi Q2", type: "Manuel", lastRun: "15 May 2024", schedule: "—" },
];

export default function ReportsPage() {
  const [period, setPeriod] = useState("6m");

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-xl font-headline font-semibold text-foreground">Performans Raporları</h2>
          <p className="text-sm text-muted-foreground">İşletmenizin detaylı analizleri</p>
        </div>
        <div className="flex gap-2">
          <Select value={period} onValueChange={setPeriod}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1m">Son 1 Ay</SelectItem>
              <SelectItem value="3m">Son 3 Ay</SelectItem>
              <SelectItem value="6m">Son 6 Ay</SelectItem>
              <SelectItem value="1y">Son 1 Yıl</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="sm">
            <Download size={16} /> Dışa Aktar
          </Button>
        </div>
      </div>

      {/* KPI Summary */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Toplam Rezervasyon", value: "400", change: "+18%", up: true, icon: Calendar },
          { label: "Toplam Gelir", value: "₺320.000", change: "+24%", up: true, icon: DollarSign },
          { label: "Ortalama Puan", value: "4.7", change: "+0.2", up: true, icon: Star },
          { label: "Tekrar Misafir", value: "%28", change: "+5%", up: true, icon: Users },
        ].map((kpi) => (
          <Card key={kpi.label} className="card-shadow">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <kpi.icon size={18} className="text-muted-foreground" />
                <span className={`text-xs font-medium flex items-center gap-0.5 ${kpi.up ? "text-success" : "text-destructive"}`}>
                  {kpi.up ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
                  {kpi.change}
                </span>
              </div>
              <p className="text-2xl font-headline font-bold text-foreground">{kpi.value}</p>
              <p className="text-xs text-muted-foreground mt-1">{kpi.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs defaultValue="overview">
        <TabsList>
          <TabsTrigger value="overview">Genel Bakış</TabsTrigger>
          <TabsTrigger value="experiences">Deneyim Analizi</TabsTrigger>
          <TabsTrigger value="saved">Kayıtlı Raporlar</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4 mt-4">
          <div className="grid gap-4 lg:grid-cols-2">
            {/* Revenue Trend */}
            <Card className="card-shadow">
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Gelir Trendi</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={240}>
                  <LineChart data={monthlyData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(213, 27%, 91%)" />
                    <XAxis dataKey="month" fontSize={12} tick={{ fill: "hsl(195, 7%, 53%)" }} />
                    <YAxis fontSize={12} tick={{ fill: "hsl(195, 7%, 53%)" }} tickFormatter={(v) => `₺${(v / 1000).toFixed(0)}k`} />
                    <Tooltip formatter={(v: number) => [`₺${v.toLocaleString()}`, "Gelir"]} />
                    <Line type="monotone" dataKey="revenue" stroke="hsl(46, 87%, 38%)" strokeWidth={2} dot={{ r: 4, fill: "hsl(46, 87%, 38%)" }} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Bookings Chart */}
            <Card className="card-shadow">
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Rezervasyon Sayıları</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={240}>
                  <BarChart data={monthlyData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(213, 27%, 91%)" />
                    <XAxis dataKey="month" fontSize={12} tick={{ fill: "hsl(195, 7%, 53%)" }} />
                    <YAxis fontSize={12} tick={{ fill: "hsl(195, 7%, 53%)" }} />
                    <Tooltip />
                    <Bar dataKey="reservations" fill="hsl(207, 61%, 28%)" radius={[4, 4, 0, 0]} name="Rezervasyon" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Distribution Pie */}
          <Card className="card-shadow">
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Gelir Dağılımı</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col sm:flex-row items-center gap-6">
                <ResponsiveContainer width={200} height={200}>
                  <PieChart>
                    <Pie data={pieData} cx="50%" cy="50%" innerRadius={50} outerRadius={80} dataKey="value" paddingAngle={2}>
                      {pieData.map((entry, i) => (
                        <Cell key={i} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(v: number) => [`%${v}`, "Oran"]} />
                  </PieChart>
                </ResponsiveContainer>
                <div className="space-y-2">
                  {pieData.map((item) => (
                    <div key={item.name} className="flex items-center gap-2 text-sm">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                      <span className="text-foreground">{item.name}</span>
                      <span className="text-muted-foreground">%{item.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="experiences" className="space-y-4 mt-4">
          <div className="space-y-3">
            {experiencePerformance.map((exp) => (
              <Card key={exp.name} className="card-shadow">
                <CardContent className="p-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h4 className="font-medium text-foreground">{exp.name}</h4>
                        {exp.trend === "up" ? (
                          <TrendingUp size={14} className="text-success" />
                        ) : (
                          <TrendingDown size={14} className="text-destructive" />
                        )}
                      </div>
                      <div className="flex items-center gap-1 mb-2">
                        <span className="text-xs text-muted-foreground">Doluluk:</span>
                        <Progress value={exp.occupancy} className="h-2 flex-1 max-w-[120px]" />
                        <span className="text-xs font-medium">%{exp.occupancy}</span>
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-4 text-center">
                      <div>
                        <p className="text-sm font-semibold">{exp.bookings}</p>
                        <p className="text-[10px] text-muted-foreground">Rezervasyon</p>
                      </div>
                      <div>
                        <p className="text-sm font-semibold">₺{(exp.revenue / 1000).toFixed(0)}k</p>
                        <p className="text-[10px] text-muted-foreground">Gelir</p>
                      </div>
                      <div>
                        <div className="flex items-center justify-center gap-0.5">
                          <Star size={12} className="text-accent fill-accent" />
                          <span className="text-sm font-semibold">{exp.rating}</span>
                        </div>
                        <p className="text-[10px] text-muted-foreground">Puan</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="saved" className="space-y-4 mt-4">
          <div className="flex justify-between items-center">
            <p className="text-sm text-muted-foreground">Önceden oluşturulmuş raporlarınız</p>
            <Button className="rounded-full" size="sm">
              <FileText size={16} /> Yeni Rapor
            </Button>
          </div>
          <div className="space-y-3">
            {savedReports.map((report) => (
              <Card key={report.id} className="card-shadow">
                <CardContent className="p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center">
                      <FileText size={18} className="text-muted-foreground" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">{report.name}</p>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <span>{report.type}</span>
                        <span>•</span>
                        <span>Son: {report.lastRun}</span>
                        {report.schedule !== "—" && (
                          <>
                            <span>•</span>
                            <Clock size={10} />
                            <span>{report.schedule}</span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" className="text-xs">
                      <Download size={14} /> İndir
                    </Button>
                    <Button size="sm" variant="ghost" className="text-xs">Çalıştır</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
