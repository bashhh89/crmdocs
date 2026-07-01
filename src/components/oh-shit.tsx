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
    <div className="my-5 rounded-lg border border-orange-200 bg-[#fff7ed] p-4 text-sm">
      <div className="border-l-4 border-[#f97316] pl-3">
        <div className="font-semibold text-orange-950">Emergency: {symptom}</div>
        <div className="mt-2 text-orange-950">
          <span className="font-semibold">Fix:</span> {fix}
        </div>
        {prevention ? (
          <div className="mt-1 text-orange-900">
            <span className="font-semibold">Prevention:</span> {prevention}
          </div>
        ) : null}
      </div>
    </div>
  );
}
