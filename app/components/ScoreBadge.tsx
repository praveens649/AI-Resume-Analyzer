interface ScoreBadgeProps {
  score: number;
}

const ScoreBadge: React.FC<ScoreBadgeProps> = ({ score }) => {
  let badgeVariant = '';
  let badgeText = '';

  if (score > 70) {
    badgeVariant = 'badge-green';
    badgeText = 'Strong';
  } else if (score > 49) {
    badgeVariant = 'badge-yellow';
    badgeText = 'Good Start';
  } else {
    badgeVariant = 'badge-red';
    badgeText = 'Needs Work';
  }

  return (
    <div className={`px-3 py-1 rounded-full text-sm font-medium ${badgeVariant}`}>
      {badgeText}
    </div>
  );
};

export default ScoreBadge;