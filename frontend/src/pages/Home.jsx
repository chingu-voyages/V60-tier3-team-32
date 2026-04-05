import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/app/hooks'; 
import { fetchTest, addTest } from '@/features/test/testActions'; 

// shadcn/ui Imports using the @ alias
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Loader2, Send, Database } from "lucide-react";

export default function Home() {
  const [content, setContent] = useState('');
  const dispatch = useAppDispatch();
  const { items, status } = useAppSelector((state) => state.test);

  useEffect(() => {
    dispatch(fetchTest());
  }, [dispatch]);

  const onSave = (e) => {
    e.preventDefault();
    if (content.trim()) {
      dispatch(addTest({ title: 'Internal Log', content }));
      setContent('');
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 p-4 md:p-12 font-sans selection:bg-indigo-500/30 text-slate-200">
      <div className="max-w-3xl mx-auto space-y-10">
        
        {/* Header Section */}
        <header className="space-y-2 text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-3 mb-2">
            <div className="h-10 w-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-[0_0_20px_rgba(79,70,229,0.4)] border border-indigo-400/20">
              <Database className="text-white h-6 w-6" />
            </div>
            <div>
              <h1 className="text-3xl font-black tracking-tight text-white italic leading-none">LinguaLoop</h1>
              <p className="text-slate-500 text-[10px] font-bold tracking-[0.2em] uppercase mt-1">
                Neural Data Bridge
              </p>
            </div>
          </div>
        </header>

        {/* Input Section */}
        <Card className="bg-slate-900/40 border-slate-800/60 shadow-2xl backdrop-blur-xl rounded-3xl overflow-hidden">
          <CardHeader className="pb-4">
            <CardTitle className="text-slate-100 text-lg">Synchronize Cluster</CardTitle>
            <CardDescription className="text-slate-500 italic text-xs">
              Direct pipeline to MongoDB Atlas instance...
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={onSave} className="flex flex-col md:flex-row gap-3">
              <Input 
                className="flex-1 bg-slate-950/50 border-slate-800 text-slate-200 focus-visible:ring-indigo-600 transition-all h-12 rounded-xl placeholder:text-slate-700"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Enter string to persist..."
              />
              <Button 
                type="submit" 
                disabled={status === 'loading'}
                className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold h-12 px-8 rounded-xl shadow-lg active:scale-95 transition-all flex gap-2 border-t border-indigo-400/30"
              >
                {status === 'loading' ? <Loader2 className="animate-spin h-4 w-4" /> : <Send className="h-4 w-4" />}
                {status === 'loading' ? 'Syncing' : 'Push to Cloud'}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Live Feed Section */}
        <div className="space-y-6">
          <div className="flex items-center justify-between px-2">
            <div className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <h2 className="text-xs font-bold text-slate-500 uppercase tracking-[0.2em]">Live Database Feed</h2>
            </div>
            <Badge variant="outline" className={`border-slate-800 px-3 py-1 text-[10px] rounded-full ${status === 'loading' ? 'text-amber-400 border-amber-900/30' : 'text-emerald-400 border-emerald-900/30'}`}>
              {status === 'loading' ? 'BUSY' : 'STABLE'}
            </Badge>
          </div>

          <div className="grid gap-3">
            {items.length === 0 && status !== 'loading' && (
              <div className="text-center py-20 text-slate-600 border-2 border-dashed border-slate-900/50 rounded-[2rem] bg-slate-900/10">
                <p className="text-sm italic font-medium">Vault currently empty. Awaiting first handshake...</p>
              </div>
            )}

            {items.map((item) => (
              <div 
                key={item._id} 
                className="group flex items-center justify-between p-5 bg-slate-900/20 border border-slate-800/40 rounded-2xl hover:border-indigo-500/40 hover:bg-slate-900/40 transition-all duration-500"
              >
                <div className="space-y-1">
                  <p className="text-slate-300 font-medium tracking-tight leading-relaxed selection:bg-indigo-500/40">{item.content}</p>
                  <div className="flex items-center gap-2 text-[10px] text-slate-600 font-mono italic">
                    <span className="text-indigo-500/70"># {item._id.slice(-6)}</span>
                    <span>•</span>
                    <span>{new Date(item.createdAt).toLocaleTimeString()}</span>
                  </div>
                </div>
                <div className="opacity-0 group-hover:opacity-100 transition-all translate-x-2 group-hover:translate-x-0">
                  <Badge className="bg-indigo-950/40 text-indigo-400 border-indigo-500/20 text-[9px] font-bold tracking-widest px-2">
                    VERIFIED
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}