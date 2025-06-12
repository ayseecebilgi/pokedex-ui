"use client";

import { Badge } from "react-bootstrap";

interface PokemonTypeBadgeCompProps {
  pokemonTypes: string[];
}

const typeColorMap: Record<string, string> = {
  Water: "primary",
  Fire: "danger",
  Grass: "success",
  Electric: "warning",
  Bug: "success",
  Psychic: "info",
  Normal: "secondary",
  Poison: "dark",
  Flying: "info",
  Ground: "warning",       
  Rock: "dark",            
  Ice: "info",
  Ghost: "dark",
  Dragon: "danger",
  Dark: "dark",
  Steel: "secondary",
  Fairy: "light",
  Fighting: "danger"      
};


export default function PokemonTypeBadgeComp({ pokemonTypes }: PokemonTypeBadgeCompProps) {
  return (
    <>
      {pokemonTypes?.map((pokemonType, index) => {
        const badgeColor = typeColorMap[pokemonType] ?? "secondary";
        return (
          <Badge key={index} bg={badgeColor} className="me-1">
            {pokemonType}
          </Badge>
        );
      })}
    </>
  );
}
