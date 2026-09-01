/*
  Le nom Pulpp est toujours écrit dans le rouge du studio, où qu'il
  apparaisse — footer, menu, expérience. Le reste de la phrase ne bouge pas.
*/
export function highlightPulpp(text) {
  if (typeof text !== "string" || !text.includes("Pulpp")) return text;

  return text.split(/(Pulpp)/g).map((part, i) =>
    part === "Pulpp" ? (
      <span key={i} className="text-rouge">
        {part}
      </span>
    ) : (
      part
    )
  );
}
