// resources/js/components/frontend/ProgramCard.tsx

export default function ProgramCard({ program }: { program: any }) {

  return (
    <div className="border rounded-lg bg-card">
      <img className="rounded-t-lg" src={`/storage/${program.image}`} alt="" />
      <div className="p-4">
        <h4 className="font-semibold">{program.title}</h4>
        <p className="text-sm text-muted-foreground mt-2 line-clamp-3">{program.description}</p>
      </div>
    </div>
  );
}
