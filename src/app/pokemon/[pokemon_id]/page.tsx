'use client';

import Pokemon from '@/model/pokemon';
import { useEffect, useState } from 'react';
import { Container, Image, Spinner, Row } from 'react-bootstrap';
import PokemonComponent from './pokemon';
import PokeNavBar from '@/components/pokeNavBarComp';
import React from 'react';

type Params = {
  params: Promise<{ pokemon_id: string }>
};

export default function PokemonPage({ params }: Params) {
  const { pokemon_id } = React.use(params);

  const [pokemon, setPokemon] = useState<Pokemon>();
  const [isPokemonLoaded, setPokemonLoaded] = useState(false);
  const [nameToIdMap, setNameToIdMap] = useState<Record<string, number>>({});
  const [allPokemonsByName, setAllPokemonsByName] = useState<Record<string, Pokemon>>({}); 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const detailResp = await fetch('/api/pokemon/' + pokemon_id);
        const listResp = await fetch('/api/pokemon');



        if (detailResp.ok && listResp.ok) {
          const currentPokemon: Pokemon = await detailResp.json();
          const allPokemons: Pokemon[] = (await listResp.json()).items;

          setPokemon(currentPokemon);

          const nameMap = Object.fromEntries(
          allPokemons.map((p) => [p.pokemonName.toLowerCase(), p.pokemonNumber])
          );

          setNameToIdMap(nameMap);

          const byNameMap = Object.fromEntries(
            allPokemons.map((p) => [p.pokemonName.toLowerCase(), p])
          );
          setAllPokemonsByName(byNameMap);
          console.log("Fetched Pokémon names:", allPokemons.map(p => p.pokemonName));

        }
      } catch (error) {
        console.error('Failed to fetch:', error);
      } finally {
        setPokemonLoaded(true);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <PokeNavBar />
      {isPokemonLoaded ? (
        pokemon ? (
          <PokemonComponent
            pokemon={pokemon}
            nameToIdMap={nameToIdMap}
            allPokemonsByName={allPokemonsByName}
          />
        ) : (
          <Container className="text-center p-5">
            <h2>Pokémon Not Found</h2>
            <Image
              className="img-fluid mx-auto d-block rounded"
              src="https://cdn.dribbble.com/users/2805817/screenshots/13206178/media/6bd36939f8a01d4480cb1e08147e20f3.png"
              alt="Not Found"
            />
          </Container>
        )
      ) : (
        <Container className="text-center p-5">
          <Spinner animation="border" role="status" className="mb-3" />
          <div>Loading Pokémon...</div>
        </Container>
      )}
    </>
  );
}
