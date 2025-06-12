import Link from 'next/link';
import PokemonCard from "@/model/pokemonCard";
import { Card } from "react-bootstrap";
import PokemonTypeBadgeComp from "./pokemonTypeBadgeComp";

interface PokemonCardCompProps {
  pokemon: PokemonCard;
}

export default function PokemonCardComp({ pokemon }: PokemonCardCompProps) {
  if (!pokemon || !pokemon.pokemonNumber) return null;

  const pokemonUrl = `/pokemon/${pokemon.pokemonNumber}`;

  return (
    <Card as={Link} href={pokemonUrl} className="h-100 text-decoration-none text-dark">
      <Card.Img variant="top" src={pokemon.mainImage} />
      <Card.Body>
        <Card.Title>{pokemon.pokemonName}</Card.Title>
        <PokemonTypeBadgeComp pokemonTypes={pokemon.pokemonType} />
      </Card.Body>
    </Card>
  );
}
