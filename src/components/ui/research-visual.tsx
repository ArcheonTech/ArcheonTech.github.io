import React from "react";

/**
 * Small abstract animations that sit at the centre of each research category.
 * Pure SVG + CSS so they cost nothing next to the 3D marble; all motion is
 * dropped under `prefers-reduced-motion`.
 */

const INK = "#560591";

type Props = { className?: string };

function Frame({ children, className = "" }: React.PropsWithChildren<Props>) {
  return (
    <div className={"grid aspect-[4/3] place-items-center " + className} aria-hidden="true">
      <svg viewBox="0 0 200 150" className="h-full w-full overflow-visible">
        {children}
      </svg>
    </div>
  );
}

/** Two rings turning against each other around a steady centre. */
export function DialogueVisual(props: Props) {
  return (
    <Frame {...props}>
      <g stroke={INK} fill="none">
        <g className="origin-center motion-safe:animate-[spin_26s_linear_infinite]">
          <circle cx="100" cy="75" r="52" strokeWidth="1" strokeOpacity="0.25" strokeDasharray="4 9" />
          <circle cx="152" cy="75" r="4.5" fill={INK} stroke="none" />
        </g>
        <g className="origin-center motion-safe:animate-[spin_17s_linear_infinite_reverse]">
          <circle cx="100" cy="75" r="33" strokeWidth="1.25" strokeOpacity="0.45" strokeDasharray="52 14" />
          <circle cx="67" cy="75" r="3.5" fill={INK} fillOpacity="0.7" stroke="none" />
        </g>
        <circle cx="100" cy="75" r="13" fill={INK} fillOpacity="0.1" stroke="none" />
        <circle
          cx="100"
          cy="75"
          r="6"
          fill={INK}
          stroke="none"
          className="origin-center motion-safe:animate-pulse"
        />
      </g>
    </Frame>
  );
}

/** A mesh of nodes with signal moving between them, kept on the device. */
export function EdgeVisual(props: Props) {
  const nodes = [
    [58, 40],
    [142, 40],
    [100, 75],
    [58, 110],
    [142, 110],
  ] as const;

  return (
    <Frame {...props}>
      <g stroke={INK} strokeOpacity="0.3" strokeWidth="1">
        <path d="M58 40 L100 75 L142 40 M58 110 L100 75 L142 110 M58 40 L58 110 M142 40 L142 110" fill="none" />
        <path
          d="M58 40 L100 75 L142 110"
          fill="none"
          strokeOpacity="0.85"
          strokeWidth="1.75"
          strokeDasharray="16 130"
          className="motion-safe:animate-[dash-travel_4.5s_linear_infinite]"
        />
      </g>
      {nodes.map(([x, y], i) => (
        <rect
          key={`${x}-${y}`}
          x={x - 7}
          y={y - 7}
          width="14"
          height="14"
          rx="4.5"
          fill={INK}
          fillOpacity={i === 2 ? 1 : 0.28}
          className="motion-safe:animate-pulse"
          style={{ animationDelay: `${i * 0.45}s`, animationDuration: "3.6s" }}
        />
      ))}
    </Frame>
  );
}

/** A class as a ring of people, one of them lit at a time. */
export function ClassroomVisual(props: Props) {
  const dots = Array.from({ length: 12 }, (_, i) => {
    const a = (i / 12) * Math.PI * 2 - Math.PI / 2;
    return { x: 100 + Math.cos(a) * 46, y: 75 + Math.sin(a) * 46, i };
  });

  return (
    <Frame {...props}>
      <circle cx="100" cy="75" r="46" fill="none" stroke={INK} strokeOpacity="0.18" strokeWidth="1" />
      {dots.map((d) => (
        <circle
          key={d.i}
          cx={d.x}
          cy={d.y}
          r="5"
          fill={INK}
          fillOpacity="0.35"
          className="motion-safe:animate-pulse"
          style={{ animationDelay: `${d.i * 0.22}s`, animationDuration: "2.8s" }}
        />
      ))}
      <g className="origin-center motion-safe:animate-[spin_20s_linear_infinite]">
        <path
          d="M100 29 A46 46 0 0 1 146 75"
          fill="none"
          stroke={INK}
          strokeWidth="2"
          strokeOpacity="0.75"
          strokeLinecap="round"
        />
      </g>
      <circle cx="100" cy="75" r="10" fill={INK} fillOpacity="0.12" />
    </Frame>
  );
}
