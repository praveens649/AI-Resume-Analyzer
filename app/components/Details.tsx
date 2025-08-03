import React from 'react';
import { cn } from "~/lib/utils";
import {
  Accordion,
  AccordionContent,
  AccordionHeader,
  AccordionItem,
} from "./Accordion";
import { Check, AlertTriangle, CheckCircle, AlertCircle, XCircle } from 'lucide-react';

interface BadgeStyles {
  bg: string;
  text: string;
  border: string;
  icon: React.ReactElement<{ className?: string }>;
}

const ScoreBadge: React.FC<{ score: number }> = ({ score }) => {
const getBadgeStyles = (): BadgeStyles => {
  if (score > 69) {
    return {
      bg: 'bg-[var(--color-badge-green-bg)]',
      text: 'text-[var(--color-badge-green-text)]',
      border: 'border-[var(--color-badge-green)]',
      icon: <CheckCircle className="w-5 h-5" />,
    };
  } else if (score > 39) {
    return {
      bg: 'bg-[var(--color-badge-yellow-bg)]',
      text: 'text-[var(--color-badge-yellow-text)]',
      border: 'border-[var(--color-badge-yellow)]',
      icon: <AlertCircle className="w-5 h-5" />
    };
  } else {
    return {
      bg: 'bg-[var(--color-badge-red-bg)]',
      text: 'text-[var(--color-badge-red-text)]',
      border: 'border-[var(--color-badge-red)]',
      icon: <XCircle className="w-5 h-5" />
    };
  }
  };

  const { bg, text, border, icon } = getBadgeStyles();

  return (
    <div className={cn(
      "flex items-center gap-2 px-3 py-1 rounded-full border",
      bg,
      text,
      border
    )}>
      {React.isValidElement(icon) ? React.cloneElement(icon, { className: "w-4 h-4" }) : null}
      <span className="text-sm font-medium">{score}/100</span>
    </div>
  );
};

const CategoryHeader = ({
  title,
  categoryScore,
}: {
  title: string;
  categoryScore: number;
}) => {
  return (
    <div className="flex justify-between items-center py-3">
      <h3 className="text-xl font-semibold text-white">{title}</h3>
      <ScoreBadge score={categoryScore} />
    </div>
  );
};

const CategoryContent = ({
  tips,
}: {
  tips: { type: "good" | "improve"; tip: string; explanation: string }[];
}) => {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {tips.map((tip, index) => (
          <div 
            key={index} 
            className="flex items-center gap-3 p-3 bg-gray-800 rounded-lg"
          >
            <div className={`p-1.5 rounded-full ${
              tip.type === "good" 
                ? "bg-green-900/50 text-green-400" 
                : "bg-amber-900/50 text-amber-400"
            }`}>
              {tip.type === "good" ? (
                <Check className="w-4 h-4" />
              ) : (
                <AlertTriangle className="w-4 h-4" />
              )}
            </div>
            <p className="text-gray-200">{tip.tip}</p>
          </div>
        ))}
      </div>
      
      <div className="space-y-3">
        {tips.map((tip, index) => (
          <div
            key={`detail-${index}`}
            className={cn(
              "p-4 rounded-xl border",
              tip.type === "good"
                ? "bg-green-900/10 border-green-800/50"
                : "bg-amber-900/10 border-amber-800/50"
            )}
          >
            <div className="flex items-center gap-2 mb-2">
              {tip.type === "good" ? (
                <Check className="w-5 h-5 text-green-400" />
              ) : (
                <AlertTriangle className="w-5 h-5 text-amber-400" />
              )}
              <h4 className={`text-sm font-medium ${
                tip.type === "good" ? "text-green-300" : "text-amber-300"
              }`}>
                {tip.tip}
              </h4>
            </div>
            <p className="text-sm text-gray-300 pl-7">{tip.explanation}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

const Details = ({ feedback }: { feedback: Feedback }) => {
  return (
      <div className="flex flex-col gap-4 w-full">
        <Accordion>
          <AccordionItem id="tone-style">
            <AccordionHeader itemId="tone-style">
              <CategoryHeader
                  title="Tone & Style"
                  categoryScore={feedback.toneAndStyle.score}
              />
            </AccordionHeader>
            <AccordionContent itemId="tone-style">
              <CategoryContent tips={feedback.toneAndStyle.tips} />
            </AccordionContent>
          </AccordionItem>
          <AccordionItem id="content">
            <AccordionHeader itemId="content">
              <CategoryHeader
                  title="Content"
                  categoryScore={feedback.content.score}
              />
            </AccordionHeader>
            <AccordionContent itemId="content">
              <CategoryContent tips={feedback.content.tips} />
            </AccordionContent>
          </AccordionItem>
          <AccordionItem id="structure">
            <AccordionHeader itemId="structure">
              <CategoryHeader
                  title="Structure"
                  categoryScore={feedback.structure.score}
              />
            </AccordionHeader>
            <AccordionContent itemId="structure">
              <CategoryContent tips={feedback.structure.tips} />
            </AccordionContent>
          </AccordionItem>
          <AccordionItem id="skills">
            <AccordionHeader itemId="skills">
              <CategoryHeader
                  title="Skills"
                  categoryScore={feedback.skills.score}
              />
            </AccordionHeader>
            <AccordionContent itemId="skills">
              <CategoryContent tips={feedback.skills.tips} />
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
  );
};

export default Details;