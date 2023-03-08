//TO DO: make styles responsive based on screen widths (@media for example, or using minmax)

type Props = {
  gamesPerPage: number,
  totalGames: number,
  paginate: (pageNumber: number) => void,
}

export default function Paginate({
  gamesPerPage,
  totalGames,
  paginate,
}: Props) {
  const pageNumbers = []

  for (let i = 1; i <= Math.ceil(totalGames / gamesPerPage); i++) {
    pageNumbers.push(i)
  }

  return (
    <PagesList>
      {pageNumbers.map((number) => (
        <Button key={number} onClick={() => paginate(number)}>
          {number}
        </Button>
      ))}
    </PagesList>
  )
}

import { useEffect, useState } from 'react'

import { Game, gamesData } from '../lib/store.js'

import GamesList from '../components/GamesList'
import Paginate from '../components/Paginate'

const HomePage = () => {
    const [games, setGames] = useState<Game[]>([]);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [gamesPerPage] = useState<number>(6);

    const indexOfLastGame = currentPage * gamesPerPage;
    const indexOfFirstGame = indexOfLastGame - gamesPerPage;
    const currentGames = games.slice(indexOfFirstGame, indexOfLastGame);
    const totalGames = games.length;

    const paginate = (pageNumber: number) => {
        setCurrentPage(pageNumber);
    };

    useEffect(() => {
        async function fetchGames() {
            let allGames = await gamesData();

            setGames(allGames.games);
        }
        fetchGames();
    }, []);

    return (
        <>
            <Wrapper>
                <GamesList currentGames={currentGames} />
                <Paginate gamesPerPage={gamesPerPage} totalGames={totalGames} paginate={paginate} />
            </Wrapper>
        </>
    );
};
