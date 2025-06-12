'use client';
import React, { useState } from 'react';
import Pokemon from '@/model/pokemon';
import { Card, Button, Form, Image } from 'react-bootstrap';

type Props = {
  currentPokemon: Pokemon;
  allPokemons: Record<string, Pokemon>;
};

export default function BattleSimulator({ currentPokemon, allPokemons }: Props) {
  const [opponentName, setOpponentName] = useState('');
  const [opponent, setOpponent] = useState<Pokemon | null>(null);
  const [result, setResult] = useState<string | null>(null);

  const handleBattle = () => {
    if (!opponent) return;
    const currentScore = currentPokemon.attack + currentPokemon.defense + currentPokemon.speed;
    const opponentScore = opponent.attack + opponent.defense + opponent.speed;

    if (currentScore > opponentScore) {
      setResult(`${currentPokemon.pokemonName} wins!`);
    } else if (opponentScore > currentScore) {
      setResult(`${opponent.pokemonName} wins!`);
    } else {
      setResult("It's a tie!");
    }
  };

  const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selected = e.target.value.toLowerCase();
    setOpponentName(selected);
    setOpponent(allPokemons[selected]);
    setResult(null); // reset
  };

  return (
    <Card className="mt-4 shadow-sm">
      <Card.Body>
        <Card.Title>Battle Simulator</Card.Title>

        <Form.Select onChange={handleSelect} value={opponentName}>
          <option value="">Select an opponent</option>
          {Object.values(allPokemons)
            .filter(p => p.pokemonName !== currentPokemon.pokemonName)
            .map(p => (
              <option key={p.pokemonName} value={p.pokemonName}>
                {p.pokemonName}
              </option>
            ))}
        </Form.Select>

        {opponent && (
          <>
            <div className="d-flex align-items-center mt-3">
              <Image src={opponent.mainImage} style={{ height: '100px', marginRight: '1rem' }} />
              <strong>{opponent.pokemonName}</strong>
            </div>
            <Button className="mt-3" onClick={handleBattle}>Simulate Battle</Button>
          </>
        )}

        {result && <p className="mt-3"><strong>Result:</strong> {result}</p>}
      </Card.Body>
    </Card>
  );
}
