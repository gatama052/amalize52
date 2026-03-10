import { useMemo } from 'react';
import { getMotivationByProgress, getAnalysis, getSuggestion } from '@/data/tracker-insights';

interface InsightCardProps {
  completed: number;
  total: number;
  progress: number;
  uncheckedLabels: string[];
}

export default function InsightCard({ completed, total, progress, uncheckedLabels }: InsightCardProps) {
  const daySeed = new Date().getDate();

  const insight = useMemo(() => {
    const motivation = getMotivationByProgress(progress, daySeed);
    const analysis = getAnalysis(completed, total);
    const suggestion = getSuggestion(completed, total, progress, uncheckedLabels);
    return { analysis, suggestion, motivation };
  }, [completed, total, progress, uncheckedLabels, daySeed]);

  return (
    <div className="rounded-xl bg-card p-4 shadow-sm border border-accent/20">
      <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-1.5">
        <span>Insight Hari Ini</span>
        <span>✨</span>
      </h3>

      <div className="space-y-2.5 text-sm">
        {/* Analysis */}
        <p className="text-foreground/90 leading-relaxed">{insight.analysis}</p>

        {/* Suggestion */}
        {progress < 100 && (
          <p className="text-muted-foreground leading-relaxed">{insight.suggestion}</p>
        )}
        {progress === 100 && (
          <p className="text-accent font-medium leading-relaxed">{insight.suggestion}</p>
        )}

        {/* Motivation */}
        <blockquote className="border-l-2 border-accent/40 pl-3 mt-1">
          <p className="text-muted-foreground italic text-xs leading-relaxed">
            "{insight.motivation.text}"
          </p>
          <p className="text-[10px] text-muted-foreground/70 mt-0.5">
            ({insight.motivation.source})
          </p>
        </blockquote>
      </div>
    </div>
  );
}
