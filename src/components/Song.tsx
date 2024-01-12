import { useEffect, useState } from "react";
import { SearchResults, SpotifyApi } from "@spotify/web-api-ts-sdk";

export const Song = ({ sdk }: { sdk: SpotifyApi }) => {
    const [results, setResults] = useState<SearchResults<["artist"]>>({} as SearchResults<["artist"]>);
  
    useEffect(() => {
      (async () => {
        const results = await sdk.search("Benatar", ["artist"]);
        setResults(() => results);
      })();
    }, [sdk]);
  
    // generate a table for the results
    const tableRows = results.artists?.items.map((artist) => {
      return (
        <tr key={artist.id}>
          <td>{artist.name}</td>
          <td>{artist.popularity}</td>
          <td>{artist.followers.total}</td>
        </tr>
      );
    });
  
    return (
      <>
        <h3>Spotify Search for Benatar</h3>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Popularity</th>
              <th>Followers</th>
            </tr>
          </thead>
          <tbody>
            {tableRows}
          </tbody>
        </table>
      </>
    )
  }
  