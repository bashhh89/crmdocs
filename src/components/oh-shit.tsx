export function OhShit({
  symptom,
  fix,
  prevention,
}: {
  symptom: string;
  fix: string;
  prevention?: string;
}) {
  return (
    <div className="my-5 rounded-lg border border-orange-200 bg-orange-50 p-4 text-sm dark:border-orange-900/60 dark:bg-orange-950/40">
      <div className="border-l-4 border-orange-500 pl-3">
        <div className="font-semibold text-orange-950 dark:text-orange-200">Emergency: {symptom}</div>
        <div className="mt-2 text-orange-950 dark:text-orange-100">
          <span className="font-semibold">Fix:</span> {fix}
        </div>
        {prevention ? (
          <div className="mt-1 text-orange-900 dark:text-orange-200/90">
            <span className="font-semibold">Prevention:</span> {prevention}
          </div>
        ) : null}
      </div>
    </div>
  );
}
