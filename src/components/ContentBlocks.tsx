import { Card } from "./ui/card";

export type ContentBlock = {
  title: string;
  body: string[];
  points?: string[];
};

export function ContentBlocks({ blocks }: { blocks: ContentBlock[] }) {
  return (
    <div className="grid gap-6">
      {blocks.map((block) => (
        <Card key={block.title}>
          <h2 className="text-2xl font-bold">{block.title}</h2>
          <div className="mt-4 grid gap-4 text-sm leading-8 text-muted-foreground">
            {block.body.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
          {block.points ? (
            <ul className="mt-5 grid gap-2 text-sm leading-7 text-muted-foreground">
              {block.points.map((point) => (
                <li key={point}>· {point}</li>
              ))}
            </ul>
          ) : null}
        </Card>
      ))}
    </div>
  );
}
