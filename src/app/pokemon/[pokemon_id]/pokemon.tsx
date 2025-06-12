'use client';

import React, { useState } from 'react';
import Pokemon from "@/model/pokemon";
import { Row, Col, Container, Image, Card, ProgressBar, Badge, Form, Button } from 'react-bootstrap';
import PokemonTypeBadgeComp from '@/components/pokemonTypeBadgeComp';

type Props = {
  pokemon: Pokemon;
  nameToIdMap: Record<string, number>;
  allPokemonsByName: Record<string, Pokemon>;
};

export default function PokemonComponent({ pokemon, nameToIdMap, allPokemonsByName }: Props) {
  const [selectedOpponent, setSelectedOpponent] = useState<string>('');
  const [currentHP, setCurrentHP] = useState<number>(pokemon.healthPoints);
  const [opponentHP, setOpponentHP] = useState<number>(100);
  const [battleStarted, setBattleStarted] = useState<boolean>(false);
  const [battleLog, setBattleLog] = useState<string[]>([]);
  const [turn, setTurn] = useState<number>(0);
  const [battleOver, setBattleOver] = useState<boolean>(false);

  const startBattle = () => {
    const opponent = allPokemonsByName[selectedOpponent.toLowerCase()];
    if (!opponent) return;

    setCurrentHP(pokemon.healthPoints);
    setOpponentHP(opponent.healthPoints);
    setBattleStarted(true);
    setBattleLog([`Battle started between ${pokemon.pokemonName} and ${opponent.pokemonName}!`]);
    setTurn(0);
    setBattleOver(false);
  };

  const nextTurn = () => {
    const opponent = allPokemonsByName[selectedOpponent.toLowerCase()];
    if (!opponent) return;

    const attacker = turn % 2 === 0 ? pokemon : opponent;
    const defender = turn % 2 === 0 ? opponent : pokemon;
    const defenderHP = turn % 2 === 0 ? opponentHP : currentHP;

    const damage = Math.max(1, Math.floor(attacker.attack / 5));
    const newHP = Math.max(0, defenderHP - damage);

    if (turn % 2 === 0) {
      setOpponentHP(newHP);
    } else {
      setCurrentHP(newHP);
    }

    setBattleLog(prev => [...prev, `${attacker.pokemonName} attacks ${defender.pokemonName} for ${damage} damage!`]);

    if (newHP === 0) {
      setBattleOver(true);
      setBattleLog(prev => [...prev, `${attacker.pokemonName} wins the battle!`]);
    } else {
      setTurn(prev => prev + 1);
    }
  };

  const resetBattle = () => {
    setBattleStarted(false);
    setSelectedOpponent('');
    setBattleLog([]);
    setCurrentHP(pokemon.healthPoints);
    setOpponentHP(100);
    setTurn(0);
    setBattleOver(false);
  };

  const typeColorMap: Record<string, string> = {
    Water: "primary", Fire: "danger", Grass: "success", Electric: "warning",
    Bug: "success", Psychic: "info", Normal: "secondary", Poison: "dark",
    Flying: "light", Ground: "secondary", Rock: "secondary", Ice: "info",
    Ghost: "dark", Dragon: "warning", Dark: "dark", Steel: "secondary", Fairy: "light"
  };

  return (
    <Container className="pt-4">
      <Row className="justify-content-md-center mb-4">
        <Col md="auto">
          <h1>{pokemon.pokemonName}</h1>
        </Col>
      </Row>

      <Row>
        <Col md={5} className="mb-4">
          <Image src={pokemon.mainImage} thumbnail fluid />
        </Col>

        <Col md={7}>
          <Card className="mb-4 shadow-sm">
            <Card.Body>
              <Card.Title>Stats</Card.Title>
              <div className="mb-2"><strong>Speed</strong>
                <ProgressBar now={pokemon.speed} label={pokemon.speed.toString()} />
              </div>
              <div className="mb-2"><strong>Health Points</strong>
                <ProgressBar variant="danger" now={pokemon.healthPoints} label={pokemon.healthPoints.toString()} />
              </div>
              <div className="mb-2"><strong>Attack</strong>
                <ProgressBar variant="warning" now={pokemon.attack} label={pokemon.attack.toString()} />
              </div>
              <div className="mb-2"><strong>Defense</strong>
                <ProgressBar variant="success" now={pokemon.defense} label={pokemon.defense.toString()} />
              </div>
            </Card.Body>
          </Card>

          <Card className="mb-4 shadow-sm">
            <Card.Body>
              <Card.Title>Pokémon Type</Card.Title>
              <PokemonTypeBadgeComp pokemonTypes={pokemon.pokemonType} />
            </Card.Body>
          </Card>

          <Card className="shadow-sm mb-4">
            <Card.Body>
              <Card.Title>Battle Simulator</Card.Title>
              {!battleStarted ? (
                <>
                  <Form>
                    <Form.Group className="mb-3">
                      <Form.Label>Select Opponent Pokémon</Form.Label>
                      <Form.Control
                        as="select"
                        value={selectedOpponent}
                        onChange={(e) => setSelectedOpponent(e.target.value)}
                      >
                        <option value=""> Choose </option>
                        {Object.keys(allPokemonsByName)
                          .filter(name => allPokemonsByName[name] && name !== pokemon.pokemonName.toLowerCase())
                          .sort()
                          .map(name => (
                            <option key={name} value={name}>
                              {allPokemonsByName[name].pokemonName}
                            </option>
                          ))}
                      </Form.Control>
                    </Form.Group>
                    <Button
                      style={{ backgroundColor: 'black', borderColor: 'black' }}
                      onClick={startBattle}
                      disabled={!selectedOpponent}
                    >
                      Start Battle
                    </Button>
                  </Form>
                </>
              ) : (
                <>
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <div className="text-center">
                      <Image
                        src={pokemon.mainImage}
                        alt={pokemon.pokemonName}
                        style={{ maxHeight: '150px' }}
                        rounded
                      />
                      <p><strong>{pokemon.pokemonName} HP:</strong></p>
                      <ProgressBar
                        variant="danger"
                        now={currentHP}
                        max={pokemon.healthPoints}
                        label={`${currentHP} / ${pokemon.healthPoints}`}
                        className="mb-3"
                      />
                    </div>

                    <span style={{ fontSize: '2rem' }}>🆚</span>

                    <div className="text-center">
                      <Image
                        src={allPokemonsByName[selectedOpponent]?.mainImage}
                        alt={allPokemonsByName[selectedOpponent]?.pokemonName}
                        style={{ maxHeight: '150px' }}
                        rounded
                      />
                      <p><strong>{allPokemonsByName[selectedOpponent]?.pokemonName} HP:</strong></p>
                      <ProgressBar
                        variant="danger"
                        now={opponentHP}
                        max={allPokemonsByName[selectedOpponent]?.healthPoints || 100}
                        label={`${opponentHP} / ${allPokemonsByName[selectedOpponent]?.healthPoints || 100}`}
                        className="mb-3"
                      />
                    </div>
                  </div>

                  <div className="d-flex gap-2 mb-3">
                    <Button
                      style={{ backgroundColor: 'black', borderColor: 'black' }}
                      onClick={nextTurn}
                      disabled={battleOver}
                    >
                      Next Turn
                    </Button>
                    <Button
                      style={{ backgroundColor: 'black', borderColor: 'black' }}
                      onClick={resetBattle}
                    >
                      Battle Over
                    </Button>
                  </div>
                  <div className="mt-3">
                    {battleLog.map((log, idx) => (
                      <div key={idx}>• {log}</div>
                    ))}
                  </div>
                </>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
